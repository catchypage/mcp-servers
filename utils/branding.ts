export type LegalProductLine = 'langcoach' | 'platform' | 'resume' | 'chefplan'

export interface BrandConfig {
  name: string
  shortName: string
  description: string
  supportEmail: string
  tagline: string
  /** Drives legal copy: Lang Coach (ChatGPT MCP) vs general Pyxl site */
  legalProductLine: LegalProductLine
}

const DOMAIN_BRANDS: Record<string, BrandConfig> = {
  'justmatch.us': {
    name: 'LangCoach',
    shortName: 'LC',
    description:
      'AI-powered language learning. Placement tests, daily practice, and personalized coaching.',
    supportEmail: 'gptprosite@gmail.com',
    tagline: 'Master any language with AI',
    legalProductLine: 'langcoach',
  },
  'mvp.mom': {
    name: 'Resume Builder',
    shortName: 'RB',
    description:
      'Create, tailor, and download professional resumes in 8 styles, directly in ChatGPT.',
    supportEmail: 'gptprosite@gmail.com',
    tagline: 'Build your perfect resume',
    legalProductLine: 'resume',
  },
  'cuto.pro': {
    name: 'ChefPlan',
    shortName: 'CP',
    description:
      'Metabolism calculator and recipe finder with photos. BMR, TDEE, macros, and recipes from around the world.',
    supportEmail: 'gptprosite@gmail.com',
    tagline: 'Your nutrition companion',
    legalProductLine: 'chefplan',
  },
  'pyxl.pro': {
    name: 'Pyxl',
    shortName: 'PX',
    description:
      "Engineering Digital Leverage. We build AI-native solutions that push the boundaries of what's possible.",
    supportEmail: 'gptprosite@gmail.com',
    tagline: 'AI-native digital studio',
    legalProductLine: 'platform',
  },
}

const DEFAULT_BRAND: BrandConfig = DOMAIN_BRANDS['pyxl.pro']

export function getBrandByDomain(hostname: string): BrandConfig {
  const clean = hostname.replace(/:\d+$/, '').toLowerCase()

  if (DOMAIN_BRANDS[clean]) {
    return DOMAIN_BRANDS[clean]
  }

  for (const [domain, brand] of Object.entries(DOMAIN_BRANDS)) {
    if (
      clean.endsWith(`.${domain}`) ||
      clean.endsWith(`.${domain.split('.')[0]}`)
    ) {
      return brand
    }
  }

  return DEFAULT_BRAND
}

export function getBrandFromEnv(): BrandConfig {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  try {
    const url = new URL(siteUrl)
    return getBrandByDomain(url.hostname)
  } catch {
    return DEFAULT_BRAND
  }
}
