import { type ResumeData } from '../types'

export function getBaseUrl(): string {
  const scripts = document.querySelectorAll('script[src*="resume.bundle"]')
  if (scripts.length > 0) {
    const src = (scripts[0] as HTMLScriptElement).src
    const url = new URL(src)
    return url.origin
  }
  return ''
}

export function openDownloadPage(data: ResumeData, styleId: string) {
  const baseUrl = getBaseUrl()
  const payload = JSON.stringify({ data, styleId })
  const encoded = btoa(unescape(encodeURIComponent(payload)))
  const url = `${baseUrl}/resume/download?d=${encodeURIComponent(encoded)}`
  window.open(url, '_blank')
}
