import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getBrandByDomain } from '@/utils/branding'
import { getPolicyDocument } from '@/utils/legal/policy-content'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const h = await headers()
  const host = h.get('host') ?? h.get('x-forwarded-host') ?? 'localhost'
  const brand = getBrandByDomain(host)
  return {
    title: `Privacy Policy — ${brand.name}`,
    description: `How ${brand.name} collects and uses personal data, including when you use ChatGPT.`,
  }
}

export default async function PolicyPage() {
  const h = await headers()
  const host = h.get('host') ?? h.get('x-forwarded-host') ?? 'localhost'
  const brand = getBrandByDomain(host)
  const doc = getPolicyDocument(brand, host)

  return (
    <div className="min-h-screen company-bg-primary pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-8 text-sm company-text-secondary">
          <Link href="/" className="hover:company-text-primary underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="company-text-primary">Privacy Policy</span>
        </nav>

        <article className="rounded-xl border company-border-primary company-bg-secondary p-6 sm:p-10">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold company-text-primary mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm company-text-secondary">
              {doc.hostLabel} · Effective {doc.effectiveDate}
            </p>
            <p className="mt-6 text-base leading-relaxed company-text-primary">
              {doc.intro}
            </p>
          </header>

          {doc.sections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-xl font-semibold company-text-primary mb-3">
                {section.title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed company-text-primary mb-3">
                {section.description}
              </p>
              {section.items && (
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base company-text-primary pl-1">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              {section.isContact && (
                <div className="mt-4 text-sm sm:text-base company-text-primary">
                  <p className="mb-2">{doc.contact.company}</p>
                  <p className="mb-2">{doc.contact.emailLabel}</p>
                  <a
                    href={`mailto:${doc.contact.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {doc.contact.email}
                  </a>
                </div>
              )}
            </section>
          ))}

          <hr className="company-border-primary my-8" />
          <p className="text-xs sm:text-sm company-text-secondary leading-relaxed">
            {doc.footer}
          </p>
        </article>
      </div>
    </div>
  )
}
