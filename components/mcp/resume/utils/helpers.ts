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

function openUrl(url: string) {
  const oa = (window as { openai?: { openExternal?: (p: { href: string }) => void } }).openai
  if (oa?.openExternal) {
    oa.openExternal({ href: url })
  } else {
    window.open(url, '_blank')
  }
}

export async function openDownloadPage(
  data: ResumeData,
  styleId: string,
): Promise<void> {
  const baseUrl = getBaseUrl()

  try {
    const res = await fetch(`${baseUrl}/api/mcp/resume/download-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, styleId }),
    })

    if (res.ok) {
      const { id } = (await res.json()) as { id: string }
      openUrl(`${baseUrl}/resume/download?id=${id}`)
      return
    }
  } catch (e) {
    console.error('[Resume] download-token failed, falling back to base64:', e)
  }

  const payload = JSON.stringify({ data, styleId })
  const encoded = btoa(unescape(encodeURIComponent(payload)))
  openUrl(`${baseUrl}/resume/download?d=${encodeURIComponent(encoded)}`)
}
