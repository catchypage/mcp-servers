/**
 * 8 unique resume styles with different visual designs and layouts
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
  styles: {
    container: string
    header: string
    headerBg: string
    name: string
    title: string
    contact: string
    section: string
    sectionTitle: string
    sectionContent: string
    skillTag: string
    experienceItem: string
    educationItem: string
    divider: string
    icon: string
  }
}

export const RESUME_STYLES: ResumeStyle[] = [
  // 1. Classic Professional - Traditional, clean, formal
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional layout with clean typography, perfect for corporate roles',
    preview: { bg: '#ffffff', accent: '#1e3a5f', text: '#333333' },
    styles: {
      container: 'bg-white text-gray-800 font-serif',
      header: 'text-center pb-6 border-b-2 border-gray-300',
      headerBg: 'bg-white',
      name: 'text-3xl font-bold text-gray-900 tracking-wide uppercase',
      title: 'text-lg text-gray-600 mt-2 italic',
      contact: 'text-sm text-gray-500 mt-3 flex justify-center gap-6',
      section: 'mt-6',
      sectionTitle: 'text-lg font-bold text-gray-800 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3',
      sectionContent: 'text-gray-700 leading-relaxed',
      skillTag: 'inline-block bg-gray-100 text-gray-700 px-3 py-1 text-sm border border-gray-300',
      experienceItem: 'mb-4 pl-4 border-l-2 border-gray-300',
      educationItem: 'mb-3',
      divider: 'border-t border-gray-200 my-4',
      icon: 'text-gray-500',
    },
  },

  // 2. Modern Minimal - Clean, lots of whitespace, modern feel
  {
    id: 'modern',
    name: 'Modern Minimal',
    description: 'Clean design with ample whitespace for creative and tech roles',
    preview: { bg: '#fafafa', accent: '#0ea5e9', text: '#1f2937' },
    styles: {
      container: 'bg-gray-50 text-gray-800 font-sans',
      header: 'pb-8',
      headerBg: 'bg-gray-50',
      name: 'text-4xl font-light text-gray-900',
      title: 'text-xl text-sky-600 mt-2 font-medium',
      contact: 'text-sm text-gray-500 mt-4 flex gap-6',
      section: 'mt-8',
      sectionTitle: 'text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-4',
      sectionContent: 'text-gray-600 leading-relaxed',
      skillTag: 'inline-block bg-sky-50 text-sky-700 px-4 py-1.5 text-sm rounded-full',
      experienceItem: 'mb-6',
      educationItem: 'mb-4',
      divider: 'border-t border-gray-200 my-6',
      icon: 'text-sky-500',
    },
  },

  // 3. Executive Dark - Premium dark theme for senior positions
  {
    id: 'executive',
    name: 'Executive Dark',
    description: 'Premium dark design for senior and executive positions',
    preview: { bg: '#1a1a2e', accent: '#d4af37', text: '#f5f5f5' },
    styles: {
      container: 'bg-[#1a1a2e] text-gray-100 font-sans',
      header: 'pb-8 border-b border-amber-500/30',
      headerBg: 'bg-gradient-to-r from-[#1a1a2e] to-[#16213e]',
      name: 'text-4xl font-bold text-white tracking-wide',
      title: 'text-xl text-amber-400 mt-3 font-light',
      contact: 'text-sm text-gray-400 mt-4 flex gap-6',
      section: 'mt-8',
      sectionTitle: 'text-sm font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2',
      sectionContent: 'text-gray-300 leading-relaxed',
      skillTag: 'inline-block bg-amber-500/10 text-amber-300 px-4 py-1.5 text-sm border border-amber-500/30',
      experienceItem: 'mb-6 pl-4 border-l-2 border-amber-500/50',
      educationItem: 'mb-4',
      divider: 'border-t border-gray-700 my-6',
      icon: 'text-amber-400',
    },
  },

  // 4. Creative Bold - Colorful, expressive for creative industries
  {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Expressive design with bold colors for creative professionals',
    preview: { bg: '#ffffff', accent: '#ec4899', text: '#1f2937' },
    styles: {
      container: 'bg-white text-gray-800 font-sans',
      header: 'pb-6 relative',
      headerBg: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white p-8 -mx-8 -mt-8',
      name: 'text-4xl font-black text-white',
      title: 'text-xl text-pink-100 mt-2 font-medium',
      contact: 'text-sm text-pink-100/80 mt-4 flex gap-6',
      section: 'mt-8',
      sectionTitle: 'text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4',
      sectionContent: 'text-gray-600 leading-relaxed',
      skillTag: 'inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1.5 text-sm rounded-full font-medium',
      experienceItem: 'mb-6 pl-4 border-l-4 border-gradient-to-b from-pink-500 to-purple-500',
      educationItem: 'mb-4',
      divider: 'h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 my-6 rounded',
      icon: 'text-pink-500',
    },
  },

  // 5. Tech Terminal - Developer-focused, code-like aesthetics
  {
    id: 'terminal',
    name: 'Tech Terminal',
    description: 'Developer-focused design with terminal aesthetics',
    preview: { bg: '#0d1117', accent: '#58a6ff', text: '#c9d1d9' },
    styles: {
      container: 'bg-[#0d1117] text-gray-300 font-mono',
      header: 'pb-6 border-b border-gray-700',
      headerBg: 'bg-[#161b22]',
      name: 'text-3xl font-bold text-green-400',
      title: 'text-lg text-blue-400 mt-2',
      contact: 'text-sm text-gray-500 mt-4 flex gap-6',
      section: 'mt-6',
      sectionTitle: 'text-sm font-bold text-green-400 mb-3 flex items-center gap-2 before:content-["$"] before:text-gray-500',
      sectionContent: 'text-gray-400 leading-relaxed',
      skillTag: 'inline-block bg-gray-800 text-blue-400 px-3 py-1 text-sm border border-gray-700 font-mono',
      experienceItem: 'mb-4 pl-4 border-l border-green-500/50',
      educationItem: 'mb-3',
      divider: 'border-t border-gray-800 my-4',
      icon: 'text-green-400',
    },
  },

  // 6. Elegant Sidebar - Two-column layout with colored sidebar
  {
    id: 'sidebar',
    name: 'Elegant Sidebar',
    description: 'Two-column design with elegant sidebar for structured presentation',
    preview: { bg: '#ffffff', accent: '#4f46e5', text: '#374151' },
    styles: {
      container: 'bg-white text-gray-700 font-sans flex',
      header: 'p-6',
      headerBg: 'bg-indigo-600 text-white',
      name: 'text-2xl font-bold text-white',
      title: 'text-md text-indigo-200 mt-1',
      contact: 'text-xs text-indigo-200 mt-4 flex flex-col gap-2',
      section: 'mt-4',
      sectionTitle: 'text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2',
      sectionContent: 'text-gray-600 text-sm leading-relaxed',
      skillTag: 'inline-block bg-indigo-100 text-indigo-700 px-2 py-0.5 text-xs rounded',
      experienceItem: 'mb-4',
      educationItem: 'mb-2 text-sm',
      divider: 'border-t border-indigo-200 my-3',
      icon: 'text-indigo-400',
    },
  },

  // 7. Swiss Minimalist - Inspired by Swiss/International typographic style
  {
    id: 'swiss',
    name: 'Swiss Minimalist',
    description: 'Typography-focused design inspired by Swiss design principles',
    preview: { bg: '#ffffff', accent: '#dc2626', text: '#171717' },
    styles: {
      container: 'bg-white text-neutral-900 font-sans',
      header: 'pb-8',
      headerBg: 'bg-white border-l-8 border-red-600 pl-6',
      name: 'text-5xl font-black text-neutral-900 leading-none',
      title: 'text-xl text-neutral-500 mt-4 font-light',
      contact: 'text-sm text-neutral-400 mt-6 flex gap-8',
      section: 'mt-10',
      sectionTitle: 'text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-6',
      sectionContent: 'text-neutral-700 leading-relaxed',
      skillTag: 'inline-block text-neutral-900 px-0 py-1 text-sm border-b-2 border-red-600 mr-6',
      experienceItem: 'mb-8',
      educationItem: 'mb-4',
      divider: 'border-t-2 border-neutral-200 my-8',
      icon: 'text-red-600',
    },
  },

  // 8. Nature Organic - Soft, organic, earthy tones
  {
    id: 'nature',
    name: 'Nature Organic',
    description: 'Soft organic design with earthy tones for wellness and sustainability roles',
    preview: { bg: '#faf8f5', accent: '#65a30d', text: '#44403c' },
    styles: {
      container: 'bg-[#faf8f5] text-stone-700 font-sans',
      header: 'pb-6 text-center',
      headerBg: 'bg-gradient-to-b from-lime-50 to-[#faf8f5]',
      name: 'text-3xl font-semibold text-stone-800',
      title: 'text-lg text-lime-700 mt-2',
      contact: 'text-sm text-stone-500 mt-4 flex justify-center gap-6',
      section: 'mt-8',
      sectionTitle: 'text-sm font-semibold text-lime-700 mb-4 flex items-center gap-2',
      sectionContent: 'text-stone-600 leading-relaxed',
      skillTag: 'inline-block bg-lime-100 text-lime-800 px-4 py-1.5 text-sm rounded-full',
      experienceItem: 'mb-6 pl-4 border-l-2 border-lime-300',
      educationItem: 'mb-4',
      divider: 'border-t border-lime-200 my-6',
      icon: 'text-lime-600',
    },
  },
]

export function getStyleById(id: string): ResumeStyle {
  return RESUME_STYLES.find((s) => s.id === id) || RESUME_STYLES[0]
}
