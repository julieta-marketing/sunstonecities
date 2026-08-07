import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function getMailchimpServer(apiKey: string) {
  return apiKey.split('-').pop()
}

export async function POST(request: Request) {
  const apiKey = process.env.MAILCHIMP_API_KEY?.trim()
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID?.trim()
  const server = apiKey ? getMailchimpServer(apiKey) : undefined

  if (!apiKey || !audienceId || !server || !/^us\d+$/i.test(server)) {
    return NextResponse.json(
      { message: 'Newsletter signup is not configured yet.' },
      { status: 500 },
    )
  }

  let email = ''

  try {
    const body = (await request.json()) as { email?: unknown }
    email = typeof body.email === 'string' ? body.email.trim() : ''
  } catch {
    return NextResponse.json(
      { message: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const response = await fetch(
    `https://${server}.api.mailchimp.com/3.0/lists/${encodeURIComponent(
      audienceId,
    )}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`newsletter:${apiKey}`).toString(
          'base64',
        )}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    },
  )

  if (!response.ok) {
    const errorText = await response.text()
    let errorTitle = ''

    try {
      errorTitle = (JSON.parse(errorText) as { title?: string }).title || ''
    } catch {
      errorTitle = ''
    }

    if (response.status === 400 && errorTitle === 'Member Exists') {
      return NextResponse.json({ message: 'Subscribed successfully.' })
    }

    console.warn('Mailchimp newsletter signup failed', {
      status: response.status,
      body: errorText,
    })

    return NextResponse.json(
      { message: 'We could not subscribe that email. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ message: 'Subscribed successfully.' })
}
