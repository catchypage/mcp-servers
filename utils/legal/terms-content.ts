import type { BrandConfig } from '@/utils/branding'

export interface TermsSection {
  title: string
  description: string
  items?: string[]
  isContact?: boolean
}

export interface TermsDocument {
  pageTitle: string
  hostLabel: string
  effectiveDate: string
  intro: string
  sections: TermsSection[]
  footer: string
  contact: { company: string; email: string; emailLabel: string }
}

const FOOTER =
  'If you use OpenAI ChatGPT, OpenAI’s terms and policies also apply to your use of ChatGPT. Nothing in these terms grants any rights in OpenAI trademarks or implies endorsement by OpenAI.'

export function getTermsDocument(
  brand: BrandConfig,
  host: string,
): TermsDocument {
  const hostLabel = host.replace(/:\d+$/, '')
  const siteUrl = `https://${hostLabel}`

  const langCoachSections: TermsSection[] = [
    {
      title: '1. Agreement',
      description: `By using ${brand.name} at ${siteUrl} or through OpenAI ChatGPT (including our MCP integration), you agree to these Terms of Service. If you disagree, do not use the service.`,
    },
    {
      title: '2. Description of service',
      description: `${brand.name} provides English language learning features, including a placement test, level feedback, and related profile settings. The service may be accessed via our website and through ChatGPT using authorized MCP tools and widgets.`,
    },
    {
      title: '3. OpenAI ChatGPT',
      description:
        'Your use of ChatGPT is governed by OpenAI’s terms and policies. We are not responsible for OpenAI’s services, model output, or availability. Our app appears inside ChatGPT only after you connect your account as prompted.',
      items: [
        'You must comply with OpenAI’s usage policies when using our integration.',
        'We do not control how OpenAI processes general chat content; we process only data sent to our MCP server as part of tool calls you authorize.',
      ],
    },
    {
      title: '4. Accounts and eligibility',
      description:
        'You must provide accurate registration information and keep credentials secure. You are responsible for activity under your account. You must be old enough to enter a binding agreement in your jurisdiction.',
    },
    {
      title: '5. User content and placement data',
      description:
        'You retain rights in content you provide. You grant us permission to process placement answers and related data to run scoring, store your level in your profile, and display results in the widget.',
    },
    {
      title: '6. Acceptable use',
      description: 'You must not:',
      items: [
        'use the service unlawfully or to harm others;',
        'attempt to access others’ accounts or our systems without authorization;',
        'reverse engineer or abuse the MCP or APIs;',
        'use the service to generate misleading or harmful educational content at scale in violation of applicable law.',
      ],
    },
    {
      title: '7. Disclaimers',
      description:
        'Placement results are approximate indicators of proficiency, not a certified exam. The service is provided “as is” without warranties of uninterrupted or error-free operation.',
    },
    {
      title: '8. Limitation of liability',
      description:
        'To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the service.',
    },
    {
      title: '9. Changes',
      description:
        'We may modify these terms or the service. Continued use after changes constitutes acceptance where permitted by law.',
    },
    {
      title: '10. Contact',
      description: 'Questions about these terms:',
      isContact: true,
    },
  ]

  const platformSections: TermsSection[] = [
    {
      title: '1. Agreement',
      description: `By using ${siteUrl}, you agree to these Terms of Service.`,
    },
    {
      title: '2. Services',
      description: `${brand.name} provides websites and related services, which may include integrations with third parties such as OpenAI ChatGPT.`,
    },
    {
      title: '3. Third-party services',
      description:
        'Third-party terms (including OpenAI’s) may apply when you use integrations. We are not responsible for third-party services.',
    },
    {
      title: '4. Accounts',
      description:
        'You are responsible for your account security and for activity under your account.',
    },
    {
      title: '5. Acceptable use',
      description:
        'You agree not to misuse the service, violate law, or interfere with other users or our systems.',
    },
    {
      title: '6. Disclaimers and limitation of liability',
      description:
        'Services are provided as-is to the extent permitted by law. Liability is limited as allowed by applicable law.',
    },
    {
      title: '7. Contact',
      description: 'Questions:',
      isContact: true,
    },
  ]

  const introLangCoach = `These Terms of Service (“Terms”) govern your use of ${brand.name} at ${siteUrl} and when you access ${brand.name} through OpenAI ChatGPT via our MCP-based integration.`

  const introPlatform = `These Terms of Service govern your use of ${brand.name} services at ${siteUrl}.`

  return {
    pageTitle: `Terms of Service — ${brand.name}`,
    hostLabel,
    effectiveDate: 'March 26, 2026',
    intro:
      brand.legalProductLine === 'langcoach' ? introLangCoach : introPlatform,
    sections:
      brand.legalProductLine === 'langcoach'
        ? langCoachSections
        : platformSections,
    footer: FOOTER,
    contact: {
      company: brand.name,
      email: brand.supportEmail,
      emailLabel: 'Email:',
    },
  }
}
