import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const maxLengths = {
  fullName: 120,
  organization: 160,
  jobTitle: 120,
  email: 160,
  phone: 80,
  message: 3000,
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function cleanValue(
  body: Record<string, unknown>,
  key: keyof typeof maxLengths,
) {
  const value = body[key]
  if (typeof value !== 'string') return ''

  return value.trim().slice(0, maxLengths[key])
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function getRecipients(value: string) {
  return value
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const from = process.env.CONTACT_FROM_EMAIL?.trim()
  const to = getRecipients(process.env.CONTACT_TO_EMAIL || '')

  if (!apiKey || !from || !to.length) {
    return NextResponse.json(
      { message: 'Contact form email is not configured yet.' },
      { status: 500 },
    )
  }

  let body: Record<string, unknown>

  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json(
      { message: 'Please check the form and try again.' },
      { status: 400 },
    )
  }

  if (typeof body.companyWebsite === 'string' && body.companyWebsite.trim()) {
    return NextResponse.json({ message: 'Message sent successfully.' })
  }

  const fullName = cleanValue(body, 'fullName')
  const organization = cleanValue(body, 'organization')
  const jobTitle = cleanValue(body, 'jobTitle')
  const email = cleanValue(body, 'email')
  const phone = cleanValue(body, 'phone')
  const message = cleanValue(body, 'message')

  if (!fullName || !email || !message) {
    return NextResponse.json(
      { message: 'Please enter your name, email, and message.' },
      { status: 400 },
    )
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: 'Please enter a valid email address.' },
      { status: 400 },
    )
  }

  const subject = `New Sunstone Cities contact request from ${fullName}`
  const submittedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Los_Angeles',
  })

  const rows = [
    ['Name', fullName],
    ['Email', email],
    ['Organization', organization || 'Not provided'],
    ['Job title', jobTitle || 'Not provided'],
    ['Phone', phone || 'Not provided'],
    ['Submitted', `${submittedAt} PT`],
  ]

  const text = [
    subject,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    message,
  ].join('\n')

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e6eaf9;color:#6b7391;font-size:13px;font-weight:600;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e6eaf9;color:#333b52;font-size:14px;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join('')

  const html = `
    <div style="margin:0;padding:28px;background:#f6f7fd;font-family:Inter,Arial,sans-serif;color:#333b52;">
      <div style="max-width:680px;margin:0 auto;border:1px solid #e6eaf9;border-radius:16px;background:#ffffff;overflow:hidden;">
        <div style="padding:24px 28px;background:#0f3a63;color:#ffffff;">
          <p style="margin:0 0 8px;color:#b8cff8;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Sunstone Cities</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">New contact form submission</h1>
        </div>
        <div style="padding:24px 28px;">
          <table style="width:100%;border-collapse:collapse;border:1px solid #e6eaf9;border-radius:12px;overflow:hidden;">
            <tbody>${htmlRows}</tbody>
          </table>
          <div style="margin-top:24px;">
            <p style="margin:0 0 10px;color:#6b7391;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Message</p>
            <div style="white-space:pre-wrap;border-radius:14px;background:#f6f7fd;padding:18px;color:#333b52;font-size:15px;line-height:1.7;">${escapeHtml(message)}</div>
          </div>
        </div>
      </div>
    </div>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text,
      reply_to: email,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()

    console.warn('Resend contact email failed', {
      status: response.status,
      body: errorText,
    })

    return NextResponse.json(
      { message: 'We could not send your message. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ message: 'Message sent successfully.' })
}
