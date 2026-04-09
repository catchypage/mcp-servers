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
  "This Privacy Policy is provided for transparency. We recommend reviewing it with legal counsel for your jurisdiction. Where OpenAI ChatGPT is involved, OpenAI's own policies apply to their processing of chat data; see openai.com/policies."

export function getPolicyDocument(
  brand: BrandConfig,
  host: string,
): PolicyDocument {
  const hostLabel = host.replace(/:\d+$/, '')
  const siteUrl = `https://${hostLabel}`

  const langCoachBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} ("we", "us") is operated in connection with this website (${siteUrl}). When you use ${brand.name} inside OpenAI ChatGPT, you also interact with OpenAI's services as described in their policies.`,
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
        "OpenAI: when you use our app inside ChatGPT, OpenAI processes data under their own terms and privacy policy; we do not control OpenAI's processing of the chat.",
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

  const resumeBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} ("we", "us") operates this website (${siteUrl}) and the Resume Builder app available through OpenAI ChatGPT via MCP (Model Context Protocol).`,
    },
    {
      title: '2. Information we collect',
      description: 'Resume Builder is designed to minimize data collection:',
      items: [
        'Resume content: name, job title, work experience, education, and skills that you enter into the widget. This data is processed in your browser session and is NOT stored on our servers.',
        'No authentication required: we do not collect email addresses, passwords, or OAuth tokens. The app works without sign-in.',
        'Technical data: standard server logs (IP address, timestamps, user agent) retained briefly for security and operations.',
        'ChatGPT context: when you invoke our tool in ChatGPT, OpenAI may pass tool arguments (e.g. job title, name, style) to our MCP server. We process these transiently and do not persist them.',
      ],
    },
    {
      title: '3. How we use information',
      description: 'Purposes include:',
      items: [
        'to render the resume builder widget and generate your resume layout in the browser;',
        'to operate our MCP server and respond to tool calls from ChatGPT;',
        'to maintain security and prevent abuse via server logs;',
        'to comply with applicable law.',
      ],
    },
    {
      title: '4. Data storage and retention',
      description:
        'Resume content you enter is processed entirely in the browser widget and in transient server memory. We do not save your resume data to any database. When your session ends, the data is gone. Server logs are retained for a limited period for security purposes.',
    },
    {
      title: '5. ChatGPT and OpenAI',
      description:
        'When you use Resume Builder through OpenAI ChatGPT, OpenAI processes data under their own terms and privacy policy. We receive only the structured arguments sent to our MCP tool (such as job title or name), not your full chat history.',
    },
    {
      title: '6. Sharing',
      description:
        'We do not sell your personal information. We do not share resume content with third parties. Data may be disclosed to law enforcement when required by law.',
    },
    {
      title: '7. Cookies and tracking',
      description:
        'We do not use cookies, analytics trackers, or advertising pixels on this service.',
    },
    {
      title: '8. Children',
      description:
        'This service is not directed at children under 13. We do not knowingly collect personal data from children.',
    },
    {
      title: '9. Your rights',
      description:
        'Since we do not store your personal data beyond the session, there is generally nothing to delete. If you have questions about server logs or wish to exercise data rights under GDPR, CCPA, or similar laws, contact us below.',
    },
    {
      title: '10. Changes',
      description:
        'We may update this Privacy Policy. The new version will be posted on this page with an updated effective date.',
    },
    {
      title: '11. Contact',
      description: 'Privacy questions or requests:',
      isContact: true,
    },
  ]

  const chefplanBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} ("we", "us") operates this website (${siteUrl}) and the ChefPlan app available through OpenAI ChatGPT via MCP (Model Context Protocol).`,
    },
    {
      title: '2. Information we collect',
      description: 'ChefPlan is designed to minimize data collection:',
      items: [
        'Body metrics: weight, height, age, gender, and activity level that you provide for metabolism calculation. These are processed transiently and NOT stored on our servers.',
        'Recipe searches: search queries you enter to find recipes. These are forwarded to TheMealDB (a free, public recipe API) and are not stored by us.',
        'No authentication required: we do not collect email addresses, passwords, or OAuth tokens. The app works without sign-in.',
        'Technical data: standard server logs (IP address, timestamps, user agent) retained briefly for security.',
        'ChatGPT context: when you invoke our tools in ChatGPT, OpenAI may pass tool arguments (e.g. body metrics, recipe query) to our MCP server. We process these transiently and do not persist them.',
      ],
    },
    {
      title: '3. How we use information',
      description: 'Purposes include:',
      items: [
        'to calculate BMR, TDEE, and macronutrient targets using the Mifflin-St Jeor equation;',
        'to search and display recipes from TheMealDB API;',
        'to proxy recipe images through our server to comply with browser security policies;',
        'to operate our MCP server and respond to tool calls from ChatGPT;',
        'to maintain security and prevent abuse via server logs.',
      ],
    },
    {
      title: '4. Data storage and retention',
      description:
        'Body metrics and recipe searches are processed transiently in server memory and the browser. We do not save your health data or search history to any database. When your session ends, the data is gone. Server logs are retained for a limited period for security.',
    },
    {
      title: '5. Third-party services',
      description: 'We use the following third-party services:',
      items: [
        'OpenAI ChatGPT: when you use ChefPlan through ChatGPT, OpenAI processes data under their own terms and privacy policy. We receive only structured tool arguments, not your full chat.',
        'TheMealDB (themealdb.com): a free, public recipe database. Recipe search queries are sent to their API. See their terms for details.',
      ],
    },
    {
      title: '6. Sharing',
      description:
        'We do not sell your personal information. We do not share your body metrics or health calculations with third parties. Recipe search queries are sent to TheMealDB as described above. Data may be disclosed to law enforcement when required by law.',
    },
    {
      title: '7. Cookies and tracking',
      description:
        'We do not use cookies, analytics trackers, or advertising pixels on this service.',
    },
    {
      title: '8. Health disclaimer',
      description:
        'ChefPlan provides general nutritional estimates for informational purposes only. It is not medical advice. Consult a healthcare professional before making dietary changes, especially if you have health conditions.',
    },
    {
      title: '9. Children',
      description:
        'This service is not directed at children under 13. We do not knowingly collect personal data from children.',
    },
    {
      title: '10. Your rights',
      description:
        'Since we do not store your personal data beyond the session, there is generally nothing to delete. If you have questions about server logs or wish to exercise data rights under GDPR, CCPA, or similar laws, contact us below.',
    },
    {
      title: '11. Changes',
      description:
        'We may update this Privacy Policy. The new version will be posted on this page with an updated effective date.',
    },
    {
      title: '12. Contact',
      description: 'Privacy questions or requests:',
      isContact: true,
    },
  ]

  const moviepickBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} ("we", "us") operates this website (${siteUrl}) and the MoviePick experience available through OpenAI ChatGPT via MCP (Model Context Protocol).`,
    },
    {
      title: '2. Information we collect',
      description:
        'MoviePick is built to avoid accounts and long-term personal profiles. We may process:',
      items: [
        'MCP tool inputs: when you use MoviePick inside ChatGPT, OpenAI sends tool requests to our server. Typical arguments include search text (titles), optional genre filters, year or year-range filters, and media type (movie, TV, or both). We use these values only to fetch matching titles and return structured results to your client.',
        'Transient processing: search and random responses are assembled in server memory. We do not use your queries to build a personal watch history database tied to your identity on our side.',
        'Image proxy: poster and still URLs may be requested through our image proxy endpoint so the widget can load images under the same origin. We do not store poster images for later use.',
        'No sign-in required: the public MoviePick MCP flow does not require you to log in to our site. We do not collect email, passwords, or OAuth tokens for that flow.',
        'Technical data: standard server logs (for example IP address, timestamps, request path, and user agent) for security, abuse prevention, and operations. These logs are not used for marketing.',
        'ChatGPT and conversation context: OpenAI may process your chat under their own policies. We receive only what the ChatGPT client sends as MCP tool parameters and structured tool outputs, not your full conversation log from OpenAI.',
      ],
    },
    {
      title: '3. How we use information',
      description: 'Purposes include:',
      items: [
        'to run title search, detail lookup, and random discovery against a third-party film and TV metadata catalog;',
        'to return posters, titles, years, descriptions, and related metadata to your ChatGPT session or browser;',
        'to operate and secure our MCP server and HTTP APIs;',
        'to diagnose errors and protect against abuse.',
      ],
    },
    {
      title: '4. Data storage and retention',
      description:
        'We do not intentionally retain your search queries or tool arguments as a personal history in application databases for MoviePick. Processing is short-lived on the server for each request. Server logs may be kept for a limited period for security and then rotated or deleted according to our infrastructure practices.',
    },
    {
      title: '5. Third-party metadata',
      description:
        'Movie titles, TV series data, genres, release years, posters, and related facts are retrieved from an external catalog API (commercial metadata provider). That provider receives API requests needed to resolve your search or random filters (for example query strings and filter parameters). Their handling of requests is governed by their own terms and policies.',
    },
    {
      title: '6. Sharing',
      description:
        'We do not sell your personal information. We do not share tool arguments with advertisers. Metadata requests are sent to the catalog provider as described above. We may disclose information to law enforcement when required by applicable law.',
    },
    {
      title: '7. Cookies and tracking',
      description:
        'The MoviePick widget and MCP APIs described here do not use advertising cookies or cross-site tracking pixels. ChatGPT or your browser may use their own storage or cookies according to their settings.',
    },
    {
      title: '8. Children',
      description:
        'MoviePick is not directed at children under 13. We do not knowingly collect personal data from children under 13.',
    },
    {
      title: '9. Your rights',
      description:
        'Depending on your region, you may have rights to access, correct, delete, or restrict processing of personal data. Because we minimize retention of query content, some requests may apply mainly to server logs. Contact us using the details below.',
    },
    {
      title: '10. Changes',
      description:
        'We may update this Privacy Policy. The new version will be posted on this page with an updated effective date.',
    },
    {
      title: '11. Contact',
      description: 'Privacy questions or requests:',
      isContact: true,
    },
  ]

  const gamepickBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} ("we", "us") operates this website (${siteUrl}) and the GamePick experience available through OpenAI ChatGPT via MCP (Model Context Protocol).`,
    },
    {
      title: '2. Information we collect',
      description:
        'GamePick is built to avoid accounts and long-term personal profiles. We may process:',
      items: [
        'MCP tool inputs: when you use GamePick inside ChatGPT, OpenAI sends tool requests to our server. Typical arguments include search text, optional catalog game id, genre filters for top-rated browsing, and pagination offsets. We use these values only to fetch matching games and return structured results to your client.',
        'Transient processing: search, suggestions, detail, similar-games, and top-rated responses are assembled in server memory. We do not use your queries to build a personal game library tied to your identity on our side.',
        'Game imagery: cover and screenshot URLs may be loaded in the widget from third-party CDNs (e.g. game image hosts used by our metadata provider). We do not store those images for your profile.',
        'No sign-in required: the public GamePick MCP flow does not require you to log in to our site. We do not collect email, passwords, or OAuth tokens for that flow.',
        'Technical data: standard server logs (for example IP address, timestamps, request path, and user agent) for security, abuse prevention, and operations. These logs are not used for marketing.',
        'ChatGPT and conversation context: OpenAI may process your chat under their own policies. We receive only what the ChatGPT client sends as MCP tool parameters and structured tool outputs, not your full conversation log from OpenAI.',
      ],
    },
    {
      title: '3. How we use information',
      description: 'Purposes include:',
      items: [
        'to run game search, suggestions, detail lookup, similar titles, and top-rated lists against a third-party video game metadata catalog;',
        'to return titles, years, genres, descriptions, ratings, and related metadata to your ChatGPT session or browser;',
        'to operate and secure our MCP server and HTTP APIs;',
        'to diagnose errors and protect against abuse.',
      ],
    },
    {
      title: '4. Data storage and retention',
      description:
        'We do not intentionally retain your search queries or tool arguments as a personal history in application databases for GamePick. Processing is short-lived on the server for each request. Server logs may be kept for a limited period for security and then rotated or deleted according to our infrastructure practices.',
    },
    {
      title: '5. Third-party metadata',
      description:
        'Game titles, descriptions, genres, release years, images, ratings, and related facts are retrieved from an external games catalog API. That provider receives API requests needed to resolve your search or filters. Their handling of requests is governed by their own terms and policies.',
    },
    {
      title: '6. Sharing',
      description:
        'We do not sell your personal information. We do not share tool arguments with advertisers. Metadata requests are sent to the catalog provider as described above. We may disclose information to law enforcement when required by applicable law.',
    },
    {
      title: '7. Cookies and tracking',
      description:
        'The GamePick widget and MCP APIs described here do not use advertising cookies or cross-site tracking pixels. ChatGPT or your browser may use their own storage or cookies according to their settings.',
    },
    {
      title: '8. Children',
      description:
        'GamePick is not directed at children under 13. Some catalog entries may be marked mature; parents and guardians should supervise use. We do not knowingly collect personal data from children under 13.',
    },
    {
      title: '9. Your rights',
      description:
        'Depending on your region, you may have rights to access, correct, delete, or restrict processing of personal data. Because we minimize retention of query content, some requests may apply mainly to server logs. Contact us using the details below.',
    },
    {
      title: '10. Changes',
      description:
        'We may update this Privacy Policy. The new version will be posted on this page with an updated effective date.',
    },
    {
      title: '11. Contact',
      description: 'Privacy questions or requests:',
      isContact: true,
    },
  ]

  const platformBlocks: PolicySection[] = [
    {
      title: '1. Who we are',
      description: `${brand.name} ("we", "us") operates this website (${siteUrl}) and related services, including integrations with OpenAI ChatGPT via MCP where applicable.`,
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

  const introLangCoach = `This Privacy Policy describes how ${brand.name} ("we", "us") collects, uses, and shares personal information when you use our English language learning and placement services at ${siteUrl}. It also describes how ${brand.name} works when you connect through OpenAI ChatGPT using our Model Context Protocol (MCP) integration.`

  const introResume = `This Privacy Policy describes how ${brand.name} ("we", "us") handles your information when you use our resume builder at ${siteUrl} or through OpenAI ChatGPT. ${brand.name} is designed with privacy in mind — we do not require sign-in and do not permanently store your resume data.`

  const introChefplan = `This Privacy Policy describes how ${brand.name} ("we", "us") handles your information when you use our metabolism calculator and recipe finder at ${siteUrl} or through OpenAI ChatGPT. ${brand.name} does not require sign-in and does not permanently store your health data or search history.`

  const introMoviepick = `This Privacy Policy describes how ${brand.name} ("we", "us") handles information when you use our movie and TV discovery service at ${siteUrl} or through OpenAI ChatGPT via MCP. ${brand.name} does not require sign-in for the public MCP experience and does not maintain a personal watch-history database tied to you on our servers.`

  const introGamepick = `This Privacy Policy describes how ${brand.name} ("we", "us") handles information when you use our video game discovery service at ${siteUrl} or through OpenAI ChatGPT via MCP. ${brand.name} does not require sign-in for the public MCP experience and does not maintain a personal game library tied to you on our servers.`

  const introPlatform = `This Privacy Policy describes how ${brand.name} ("we", "us") handles personal information when you use ${siteUrl} and related services, including when you connect third-party integrations such as OpenAI ChatGPT.`

  const introMap: Record<string, string> = {
    langcoach: introLangCoach,
    resume: introResume,
    chefplan: introChefplan,
    moviepick: introMoviepick,
    gamepick: introGamepick,
  }

  const sectionsMap: Record<string, PolicySection[]> = {
    langcoach: langCoachBlocks,
    resume: resumeBlocks,
    chefplan: chefplanBlocks,
    moviepick: moviepickBlocks,
    gamepick: gamepickBlocks,
  }

  return {
    pageTitle: `Privacy Policy — ${brand.name}`,
    hostLabel,
    effectiveDate: 'April 3, 2026',
    intro: introMap[brand.legalProductLine] ?? introPlatform,
    sections: sectionsMap[brand.legalProductLine] ?? platformBlocks,
    footer: FOOTER,
    contact: {
      company: brand.name,
      email: brand.supportEmail,
      emailLabel: 'Email:',
    },
  }
}
