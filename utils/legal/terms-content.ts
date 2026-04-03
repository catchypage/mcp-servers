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
  "If you use OpenAI ChatGPT, OpenAI's terms and policies also apply to your use of ChatGPT. Nothing in these terms grants any rights in OpenAI trademarks or implies endorsement by OpenAI."

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
        "Your use of ChatGPT is governed by OpenAI's terms and policies. We are not responsible for OpenAI's services, model output, or availability. Our app appears inside ChatGPT only after you connect your account as prompted.",
      items: [
        "You must comply with OpenAI's usage policies when using our integration.",
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
        "attempt to access others' accounts or our systems without authorization;",
        'reverse engineer or abuse the MCP or APIs;',
        'use the service to generate misleading or harmful educational content at scale in violation of applicable law.',
      ],
    },
    {
      title: '7. Disclaimers',
      description:
        'Placement results are approximate indicators of proficiency, not a certified exam. The service is provided "as is" without warranties of uninterrupted or error-free operation.',
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

  const resumeSections: TermsSection[] = [
    {
      title: '1. Agreement',
      description: `By using ${brand.name} at ${siteUrl} or through OpenAI ChatGPT (including our MCP integration), you agree to these Terms of Service. If you disagree, do not use the service.`,
    },
    {
      title: '2. Description of service',
      description: `${brand.name} is a free resume builder that lets you create professional resumes in multiple styles. The service is available as a widget inside OpenAI ChatGPT via MCP (Model Context Protocol). No sign-in is required.`,
    },
    {
      title: '3. No account required',
      description:
        'Resume Builder works without authentication. You do not need to create an account or provide login credentials. All resume data is processed in the browser session and is not permanently stored on our servers.',
    },
    {
      title: '4. User content',
      description:
        'You retain all rights to the content you enter (name, experience, education, etc.). You grant us a limited, temporary license to process this content solely to render your resume in the widget during your session. We do not retain, sell, or share your resume content.',
    },
    {
      title: '5. OpenAI ChatGPT',
      description:
        "When you use Resume Builder through ChatGPT, OpenAI's terms and policies govern your use of ChatGPT itself.",
      items: [
        'We are not responsible for ChatGPT model output, availability, or how OpenAI processes your conversations.',
        'We receive only structured tool arguments (e.g. job title, name, style preference) from ChatGPT, not your full chat history.',
      ],
    },
    {
      title: '6. Acceptable use',
      description: 'You must not:',
      items: [
        'use the service unlawfully or to create fraudulent documents;',
        'attempt to interfere with or disrupt our systems or APIs;',
        'reverse engineer, scrape, or abuse the MCP integration;',
        'use the service to generate harmful, misleading, or deceptive content.',
      ],
    },
    {
      title: '7. Disclaimers',
      description:
        'The service is provided "as is" without warranties of any kind. Resume layouts are rendered client-side and may vary across browsers and devices. We do not guarantee that any resume produced will meet specific employer requirements or lead to employment.',
    },
    {
      title: '8. Limitation of liability',
      description:
        'To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the service, including any loss arising from reliance on generated resume content.',
    },
    {
      title: '9. Changes',
      description:
        'We may modify these terms or the service at any time. The updated terms will be posted on this page. Continued use after changes constitutes acceptance.',
    },
    {
      title: '10. Contact',
      description: 'Questions about these terms:',
      isContact: true,
    },
  ]

  const chefplanSections: TermsSection[] = [
    {
      title: '1. Agreement',
      description: `By using ${brand.name} at ${siteUrl} or through OpenAI ChatGPT (including our MCP integration), you agree to these Terms of Service. If you disagree, do not use the service.`,
    },
    {
      title: '2. Description of service',
      description: `${brand.name} provides two main features: (1) a metabolism calculator that estimates your BMR, TDEE, and recommended macronutrients based on body metrics you provide, and (2) a recipe finder that searches TheMealDB, a free public recipe database. The service is available as a widget inside OpenAI ChatGPT via MCP (Model Context Protocol). No sign-in is required.`,
    },
    {
      title: '3. No account required',
      description:
        'ChefPlan works without authentication. You do not need to create an account. Body metrics and search queries are processed transiently and are not permanently stored.',
    },
    {
      title: '4. Health and nutrition disclaimer',
      description:
        'ChefPlan provides general nutritional estimates based on the Mifflin-St Jeor equation. These are approximate values for informational purposes only.',
      items: [
        'This is NOT medical advice. Do not use ChefPlan as a substitute for professional medical or dietary guidance.',
        'Consult a qualified healthcare professional before making significant dietary changes, especially if you have diabetes, eating disorders, kidney disease, or other health conditions.',
        'Calorie and macronutrient targets vary based on individual factors that our calculator may not account for.',
        'We make no guarantees about the accuracy of calculations for your specific situation.',
      ],
    },
    {
      title: '5. Third-party content',
      description:
        'Recipe data, images, and instructions are sourced from TheMealDB (themealdb.com). We do not create, verify, or endorse recipe content.',
      items: [
        'Recipe accuracy, safety, and suitability are the responsibility of TheMealDB and the original recipe authors.',
        'Always check for allergens and dietary restrictions before preparing any recipe.',
        'Images are proxied through our server for technical reasons but originate from TheMealDB.',
      ],
    },
    {
      title: '6. OpenAI ChatGPT',
      description:
        "When you use ChefPlan through ChatGPT, OpenAI's terms and policies govern your use of ChatGPT itself.",
      items: [
        'We are not responsible for ChatGPT model output, availability, or how OpenAI processes your conversations.',
        'We receive only structured tool arguments (e.g. body metrics, recipe query) from ChatGPT, not your full chat history.',
      ],
    },
    {
      title: '7. Acceptable use',
      description: 'You must not:',
      items: [
        'use the service unlawfully or to harm others;',
        'attempt to interfere with or disrupt our systems or APIs;',
        'reverse engineer, scrape, or abuse the MCP integration or the recipe proxy;',
        'use the service to generate misleading health claims.',
      ],
    },
    {
      title: '8. Disclaimers',
      description:
        'The service is provided "as is" without warranties of any kind. Metabolism calculations are estimates. Recipe data is provided by a third party. We do not guarantee uninterrupted or error-free operation.',
    },
    {
      title: '9. Limitation of liability',
      description:
        'To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the service, including any health-related decisions made based on our calculations or recipes displayed.',
    },
    {
      title: '10. Changes',
      description:
        'We may modify these terms or the service at any time. The updated terms will be posted on this page. Continued use after changes constitutes acceptance.',
    },
    {
      title: '11. Contact',
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
        "Third-party terms (including OpenAI's) may apply when you use integrations. We are not responsible for third-party services.",
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

  const introLangCoach = `These Terms of Service ("Terms") govern your use of ${brand.name} at ${siteUrl} and when you access ${brand.name} through OpenAI ChatGPT via our MCP-based integration.`

  const introResume = `These Terms of Service ("Terms") govern your use of ${brand.name} at ${siteUrl} and when you use Resume Builder through OpenAI ChatGPT via MCP. No account or sign-in is required to use the service.`

  const introChefplan = `These Terms of Service ("Terms") govern your use of ${brand.name} at ${siteUrl} and when you use ChefPlan through OpenAI ChatGPT via MCP. No account or sign-in is required. Please read the health disclaimer carefully.`

  const introPlatform = `These Terms of Service govern your use of ${brand.name} services at ${siteUrl}.`

  const introMap: Record<string, string> = {
    langcoach: introLangCoach,
    resume: introResume,
    chefplan: introChefplan,
  }

  const sectionsMap: Record<string, TermsSection[]> = {
    langcoach: langCoachSections,
    resume: resumeSections,
    chefplan: chefplanSections,
  }

  return {
    pageTitle: `Terms of Service — ${brand.name}`,
    hostLabel,
    effectiveDate: 'April 3, 2026',
    intro: introMap[brand.legalProductLine] ?? introPlatform,
    sections: sectionsMap[brand.legalProductLine] ?? platformSections,
    footer: FOOTER,
    contact: {
      company: brand.name,
      email: brand.supportEmail,
      emailLabel: 'Email:',
    },
  }
}
