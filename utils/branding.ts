export interface BrandConfig {
  name: string
  shortName: string
  description: string
  supportEmail: string
  tagline: string
}

const DOMAIN_BRANDS: Record<string, BrandConfig> = {
  'justmatch.us': {
    name: 'LangCoach',
    shortName: 'LC',
    description:
      'AI-powered language learning. Placement tests, daily practice, and personalized coaching.',
    supportEmail: 'support@justmatch.us',
    tagline: 'Master any language with AI',
  },
  'pyxl.pro': {
    name: 'Pyxl',
    shortName: 'PX',
    description:
      "Engineering Digital Leverage. We build AI-native solutions that push the boundaries of what's possible.",
    supportEmail: 'support@pyxl.pro',
    tagline: 'AI-native digital studio',
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
