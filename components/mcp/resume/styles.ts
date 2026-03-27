/**
 * 8 unique resume styles — each with radically different layout,
 * color scheme, typography, and section arrangement.
 */

export interface ResumeStyle {
  id: string
  name: string
  description: string
  preview: {
    bg: string
    accent: string
    text: string
  }
}

export const RESUME_STYLES: ResumeStyle[] = [
  {
    id: 'classic',
    name: 'Classic Professional',
    description:
      'Traditional single-column layout with serif typography, formal borders, and corporate feel',
    preview: { bg: '#ffffff', accent: '#1e3a5f', text: '#333333' },
  },
  {
    id: 'modern',
    name: 'Modern Minimal',
    description:
      'Ultra-clean design with generous whitespace, thin lines, and a left accent stripe',
    preview: { bg: '#fafafa', accent: '#0ea5e9', text: '#1f2937' },
  },
  {
    id: 'executive',
    name: 'Executive Dark',
    description:
      'Premium dark background with gold accents, top banner header, and bold presence',
    preview: { bg: '#1a1a2e', accent: '#d4af37', text: '#f5f5f5' },
  },
  {
    id: 'creative',
    name: 'Creative Bold',
    description:
      'Vibrant gradient header, two-column body with colorful cards and playful typography',
    preview: { bg: '#ffffff', accent: '#ec4899', text: '#1f2937' },
  },
  {
    id: 'terminal',
    name: 'Tech Terminal',
    description:
      'Dark terminal UI with monospace font, green-on-black, command-line section headers',
    preview: { bg: '#0d1117', accent: '#58a6ff', text: '#c9d1d9' },
  },
  {
    id: 'sidebar',
    name: 'Elegant Sidebar',
    description:
      'Two-column layout with a deep indigo sidebar for contact, skills, and education',
    preview: { bg: '#ffffff', accent: '#4f46e5', text: '#374151' },
  },
  {
    id: 'swiss',
    name: 'Swiss Minimalist',
    description:
      'Bold red accent, massive typography, grid-based layout inspired by Swiss design',
    preview: { bg: '#ffffff', accent: '#dc2626', text: '#171717' },
  },
  {
    id: 'nature',
    name: 'Nature Organic',
    description:
      'Warm earthy palette with rounded shapes, centered header, and soft organic feel',
    preview: { bg: '#faf8f5', accent: '#65a30d', text: '#44403c' },
  },
]

export function getStyleById(id: string): ResumeStyle {
  return RESUME_STYLES.find((s) => s.id === id) || RESUME_STYLES[0]
}
