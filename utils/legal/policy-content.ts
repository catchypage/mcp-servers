import type { BrandConfig } from '@/utils/branding'

export interface PolicySection {
  title: string
  description: string
  items?: string[]
  isContact?: boolean
}

export interface PolicyDocument {
  pageTitle: string
  hostLabel: string
  effectiveDate: string
  intro: string
  sections: PolicySection[]
  footer: string
  contact: { company: string; email: string; emailLabel: string }
}

const FOOTER =
  'This Privacy Policy is provided for transparency. We recommend reviewing it with legal counsel for your jurisdiction. Where OpenAI ChatGPT is involved, OpenAI’s own policies apply to their processing of chat data; see openai.com/policies.'

export function getPolicyDocument(
  brand: BrandConfig,
  host: string,
): PolicyDocument {
  const hostLabel = host.replace(/:\d+$/, '')
  const siteUrl = `https://${hostLabel}`

  const langCoachBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} (“we”, “us”) is operated in connection with this website (${siteUrl}). When you use ${brand.name} inside OpenAI ChatGPT, you also interact with OpenAI’s services as described in their policies.`,
    },
    {
      title: '2. Information we collect',
      description:
        'We collect categories of information in line with how you use our product:',
      items: [
        'Account and identity: email address, name, and profile image when you sign in (e.g. via Google OAuth or email/password on our site).',
        `OAuth and MCP: when you connect ${brand.name} to ChatGPT, we process OAuth authorization data needed to complete login and issue tokens for our MCP (Model Context Protocol) server.`,
        `Lang Coach usage: placement test answers, derived CEFR level, scores, and preferences such as UI language and theme stored in your profile (${brand.name} app data).`,
        'Technical data: standard server logs (e.g. IP address, timestamps, user agent) for security, abuse prevention, and operations.',
        'ChatGPT context: when you invoke our tools in ChatGPT, OpenAI may process conversation content to run the model. We receive only what your client sends to our MCP tools (e.g. tool arguments and structured results), not the full chat log from OpenAI.',
      ],
    },
    {
      title: '3. How we use information',
      description: 'Purposes include:',
      items: [
        'to provide and improve the Lang Coach placement test, scoring, and profile features;',
        'to authenticate you and secure your account;',
        'to operate our MCP server and widget experience in ChatGPT;',
        'to communicate support responses when you contact us;',
        'to comply with law and enforce our Terms of Service.',
      ],
    },
    {
      title: '4. Legal bases (EEA/UK users)',
      description:
        'Where GDPR applies, we rely on contract (providing the service), legitimate interests (security, product improvement), and consent where required (e.g. optional cookies).',
    },
    {
      title: '5. Sharing and recipients',
      description:
        'We do not sell your personal information. We may share data with:',
      items: [
        'Infrastructure and hosting providers (e.g. database and application hosting) who process data on our behalf under agreements.',
        'OpenAI: when you use our app inside ChatGPT, OpenAI processes data under their own terms and privacy policy; we do not control OpenAI’s processing of the chat.',
        'Law enforcement or regulators when required by applicable law.',
      ],
    },
    {
      title: '6. Data retention',
      description:
        'We retain account and profile data while your account is active. You may request deletion of your account data subject to legal and security obligations. Some logs may be retained for a limited period for security.',
    },
    {
      title: '7. Your rights and controls',
      description: 'Depending on your region, you may have rights to:',
      items: [
        'access, correct, or delete your personal data;',
        'object to or restrict certain processing;',
        'port your data where applicable;',
        'lodge a complaint with a supervisory authority.',
      ],
    },
    {
      title: '8. International transfers',
      description:
        'Our service providers may process data in countries outside your own. Where required, we use appropriate safeguards (e.g. standard contractual clauses).',
    },
    {
      title: '9. Children',
      description:
        'Our service is not directed at children under 13. We do not knowingly collect personal data from children under 13.',
    },
    {
      title: '10. Changes',
      description:
        'We may update this Privacy Policy. We will post the new version on this page and update the effective date.',
    },
    {
      title: '11. Contact',
      description:
        'For privacy questions or requests regarding this policy, contact:',
      isContact: true,
    },
  ]

  const platformBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} (“we”, “us”) operates this website (${siteUrl}) and related services, including integrations with OpenAI ChatGPT via MCP where applicable.`,
    },
    {
      title: '2. Information we collect',
      description:
        'We may collect account information (email, name, profile image), usage data, payment-related data where applicable, technical logs, and content you submit through our services or connected apps.',
    },
    {
      title: '3. How we use information',
      description:
        'We use data to provide and improve our services, authenticate users, process transactions, secure our systems, and comply with legal obligations.',
    },
    {
      title: '4. ChatGPT and OpenAI',
      description:
        'When you use our services through OpenAI ChatGPT, OpenAI processes data under their own terms and privacy policy. We receive only information sent to our MCP tools or our website as part of that use.',
    },
    {
      title: '5. Sharing',
      description:
        'We do not sell your personal information. We may share data with service providers, for legal compliance, or as described in this policy.',
    },
    {
      title: '6. Your rights',
      description:
        'Depending on your region, you may have rights to access, correct, delete, or object to processing of your data. Contact us using the details below.',
    },
    {
      title: '7. Contact',
      description: 'Questions about privacy:',
      isContact: true,
    },
  ]

  const introLangCoach = `This Privacy Policy describes how ${brand.name} (“we”, “us”) collects, uses, and shares personal information when you use our English language learning and placement services at ${siteUrl}. It also describes how ${brand.name} works when you connect through OpenAI ChatGPT using our Model Context Protocol (MCP) integration.`

  const introPlatform = `This Privacy Policy describes how ${brand.name} (“we”, “us”) handles personal information when you use ${siteUrl} and related services, including when you connect third-party integrations such as OpenAI ChatGPT.`

  return {
    pageTitle: `Privacy Policy — ${brand.name}`,
    hostLabel,
    effectiveDate: 'March 26, 2026',
    intro:
      brand.legalProductLine === 'langcoach' ? introLangCoach : introPlatform,
    sections:
      brand.legalProductLine === 'langcoach' ? langCoachBlocks : platformBlocks,
    footer: FOOTER,
    contact: {
      company: brand.name,
      email: brand.supportEmail,
      emailLabel: 'Email:',
    },
  }
}
