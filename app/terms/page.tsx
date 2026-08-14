import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText } from 'lucide-react'

import { SectionLabel } from '@/components/section-heading'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Terms of Use | Sunstone Cities',
  description:
    'Review the Sunstone Cities Terms of Use for website access, content usage, disclaimers, liability, and contact information.',
}

const termsSections = [
  {
    id: 'use-of-website-content',
    title: '1. Use of Website Content',
    paragraphs: [
      'Sunstone Cities grants you a limited, non-exclusive, non-transferable right to access, view, download, and print Website Content solely for your personal, informational, and non-commercial use.',
      'You may not modify, reproduce, distribute, publish, transmit, display, perform, create derivative works from, license, sell, or otherwise use any Website Content without the prior written permission of Sunstone Cities, except as expressly permitted by these Terms or applicable law.',
      'Any permitted copies of Website Content must retain all copyright, trademark, and other proprietary notices contained in the original material.',
    ],
  },
  {
    id: 'general-purposes',
    title: '2. Information Provided for General Purposes',
    paragraphs: [
      'The information provided on the Website is intended for general informational purposes only. While Sunstone Cities makes reasonable efforts to provide accurate and current information, we do not warrant or guarantee that the Website Content is complete, accurate, current, or error-free.',
      'Website Content should not be construed as legal, financial, investment, engineering, construction, governmental, or other professional advice. Nothing on the Website creates a consulting, advisory, fiduciary, contractual, or other professional relationship between you and Sunstone Cities unless expressly agreed to in writing.',
      'You should seek appropriate professional advice before making decisions or taking action based on information provided through the Website.',
    ],
  },
  {
    id: 'no-guarantee',
    title: '3. No Guarantee of Results',
    paragraphs: [
      'References to projects, services, case studies, partnerships, outcomes, or other examples on the Website are provided for informational purposes only. Past projects, experiences, or results do not guarantee or represent future outcomes.',
      'Any descriptions of potential opportunities, strategies, project approaches, or anticipated outcomes are subject to numerous factors and uncertainties and should not be understood as guarantees or promises of future results.',
    ],
  },
  {
    id: 'forward-looking-statements',
    title: '4. Forward-Looking Statements',
    paragraphs: [
      'Certain statements on the Website may relate to anticipated plans, future projects, goals, expectations, or other future events. These statements are based on information and assumptions available at the time they are made and are subject to risks, uncertainties, and other factors that may cause actual results or circumstances to differ materially.',
      'Sunstone Cities undertakes no obligation to update forward-looking statements except as required by applicable law.',
    ],
  },
  {
    id: 'contact-information',
    title: '5. Contact Information and Communications',
    paragraphs: [
      'If you voluntarily provide your name, email address, phone number, or other contact information through the Website, including through a contact form, newsletter signup, event registration, or other form, you authorize Sunstone Cities to use that information to respond to your request and provide the information or communications you have requested.',
    ],
    customContent: (
      <p className="text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]">
        Your use of the Website and submission of personal information is also
        subject to our{' '}
        <a
          href="/documents/sunstone-cities-privacy-policy.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Privacy Policy
        </a>
        , which is incorporated into these Terms by reference.
      </p>
    ),
  },
  {
    id: 'third-party-links',
    title: '6. Third-Party Websites and Links',
    paragraphs: [
      'The Website may contain links to websites, resources, or services operated by third parties. These links are provided for convenience and informational purposes only.',
      'Sunstone Cities does not control, operate, or endorse third-party websites and is not responsible for their content, availability, security, privacy practices, or policies. Your use of third-party websites is subject to the terms and policies applicable to those websites.',
    ],
  },
  {
    id: 'disclaimer',
    title: '7. Disclaimer of Warranties',
    paragraphs: [
      'EXCEPT WHERE EXPRESSLY PROVIDED OTHERWISE, THE WEBSITE AND ALL WEBSITE CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS.',
      'TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUNSTONE CITIES DISCLAIMS ALL WARRANTIES AND CONDITIONS, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, ACCURACY, AVAILABILITY, AND RELIABILITY.',
      'SUNSTONE CITIES DOES NOT WARRANT THAT:',
    ],
    bullets: [
      'THE WEBSITE WILL MEET YOUR REQUIREMENTS;',
      'THE WEBSITE OR WEBSITE CONTENT WILL BE AVAILABLE AT ALL TIMES OR WITHOUT INTERRUPTION;',
      'THE WEBSITE WILL BE SECURE OR FREE FROM VIRUSES, MALWARE, OR OTHER HARMFUL COMPONENTS;',
      'THE WEBSITE CONTENT WILL BE ACCURATE, COMPLETE, CURRENT, OR ERROR-FREE; OR',
      'ANY RESULTS OBTAINED THROUGH USE OF THE WEBSITE WILL BE ACCURATE OR RELIABLE.',
    ],
  },
  {
    id: 'limitation-of-liability',
    title: '8. Limitation of Liability',
    paragraphs: [
      'TO THE MAXIMUM EXTENT PERMITTED BY LAW, SUNSTONE CITIES AND ITS MEMBERS, MANAGERS, OFFICERS, EMPLOYEES, AFFILIATES, CONSULTANTS, AGENTS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY OTHER LOSSES, COSTS, CLAIMS, OR EXPENSES ARISING OUT OF OR RELATED TO YOUR ACCESS TO OR USE OF, OR INABILITY TO ACCESS OR USE, THE WEBSITE OR WEBSITE CONTENT.',
      'THIS INCLUDES, WITHOUT LIMITATION, DAMAGES ARISING FROM ERRORS, OMISSIONS, INTERRUPTIONS, DELAYS, COMPUTER OR NETWORK FAILURES, VIRUSES, OR OTHER TECHNICAL ISSUES, TO THE MAXIMUM EXTENT PERMITTED BY LAW.',
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to the Website and These Terms',
    paragraphs: [
      'Sunstone Cities reserves the right to modify, suspend, or discontinue the Website or any portion of the Website Content at any time, with or without notice.',
      'Sunstone Cities may also update these Terms from time to time. Any changes will become effective when the updated Terms are posted on the Website, unless otherwise stated. Your continued use of the Website after changes are posted constitutes your acceptance of the revised Terms.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '10. Intellectual Property',
    paragraphs: [
      'All Website Content, including but not limited to text, graphics, photographs, designs, logos, service names, trademarks, and other materials, is owned by or licensed to Sunstone Cities unless otherwise indicated.',
      'The Sunstone Cities name, logo, and other marks displayed on the Website are trademarks or service marks of Sunstone Cities or their respective owners. You may not use any such marks without prior written permission from the applicable owner.',
      'Nothing in these Terms grants you any ownership interest in or license to any intellectual property belonging to Sunstone Cities or any third party, except for the limited right to use the Website as expressly provided in these Terms.',
    ],
  },
  {
    id: 'governing-law',
    title: '11. Governing Law',
    paragraphs: [
      'These Terms and your use of the Website shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict-of-law principles.',
      'Any legal action or proceeding arising out of or relating to these Terms or your use of the Website shall be brought in a court of competent jurisdiction located in California, and you consent to the jurisdiction and venue of such courts.',
    ],
  },
  {
    id: 'severability',
    title: '12. Severability',
    paragraphs: [
      'If any provision of these Terms is determined to be invalid or unenforceable, that provision shall be enforced to the maximum extent permitted by law, and the remaining provisions shall remain in full force and effect.',
    ],
  },
  {
    id: 'entire-agreement',
    title: '13. Entire Agreement',
    paragraphs: [
      'These Terms, together with the Privacy Policy and any other policies expressly incorporated by reference, constitute the entire agreement between you and Sunstone Cities regarding your use of the Website and supersede any prior or contemporaneous understandings relating to such use.',
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="relative overflow-hidden bg-surface pt-32 pb-8 sm:pt-36 sm:pb-10 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
          <div className="pointer-events-none absolute right-0 top-0 size-[28rem] rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

          <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back to homepage
            </Link>

            <div className="mt-12">
              <SectionLabel>Legal</SectionLabel>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl">
                Terms of Use
              </h1>
              <p className="mt-6 max-w-none text-lg leading-relaxed text-muted-foreground md:whitespace-nowrap">
                Effective Date: August 13, 2026
              </p>
            </div>
          </div>
        </section>

        <section className="px-5 pt-8 pb-14 sm:px-8 sm:pt-8 sm:pb-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-lg border border-border bg-card p-5 shadow-[0_24px_70px_-56px_rgba(15,58,99,0.45)]">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  <FileText className="size-4" />
                  Contents
                </div>
                <nav className="mt-5 space-y-2">
                  {termsSections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-sm font-medium leading-5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      {section.title}
                    </a>
                  ))}
                  <a
                    href="#contact-us"
                    className="block rounded-md px-3 py-2 text-sm font-medium leading-5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    14. Contact Us
                  </a>
                </nav>
              </div>
            </aside>

            <article className="rounded-lg border border-border bg-card px-5 py-8 shadow-[0_24px_70px_-56px_rgba(15,58,99,0.45)] sm:px-8 lg:px-10">
              <div className="border-b border-border pb-8">
                <p className="text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]">
                  Sunstone Cities, LLC ("Sunstone Cities," "we," "us," or
                  "our") owns and operates the website located at{' '}
                  <a
                    href="https://www.sunstonecities.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    SunstoneCities.com
                  </a>{' '}
                  (the "Website"). The content available on the Website,
                  including text, graphics, images, logos, documents, and other
                  materials (collectively, the "Website Content"), is owned by
                  Sunstone Cities or its licensors and is protected by
                  applicable intellectual property laws.
                </p>
                <p className="mt-5 text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]">
                  By accessing or using the Website, you agree to be bound by
                  these Terms of Use ("Terms"). If you do not agree with these
                  Terms, please do not access or use the Website.
                </p>
              </div>

              <div className="divide-y divide-border">
                {termsSections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 py-9"
                  >
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.customContent}
                      {section.bullets && (
                        <ul className="space-y-3 pt-1">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex gap-3 text-base leading-relaxed text-muted-foreground"
                            >
                              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}

                <section id="contact-us" className="scroll-mt-28 pt-9">
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    14. Contact Us
                  </h2>
                  <p className="mt-5 text-base leading-[1.75] text-muted-foreground sm:text-[1.05rem]">
                    If you have questions regarding these Terms of Use, please
                    contact:
                  </p>
                  <div className="mt-6 rounded-lg border border-primary/15 bg-primary/5 p-5">
                    <p className="font-semibold text-foreground">
                      Sunstone Cities, LLC
                    </p>
                    <a
                      href="mailto:Contact@sunstonecities.com"
                      className="mt-2 block font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Contact@sunstonecities.com
                    </a>
                    <a
                      href="https://www.sunstonecities.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-medium text-primary underline-offset-4 hover:underline"
                    >
                      https://www.sunstonecities.com/
                    </a>
                  </div>
                  <p className="mt-8 text-sm text-muted-foreground">
                    Copyright © 2026 Sunstone Cities, LLC. All rights reserved.
                  </p>
                </section>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter showFaq={false} />
    </div>
  )
}
