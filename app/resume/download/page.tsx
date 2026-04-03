import ResumeDownloadClient from './client'
import type { ResumeData } from '@/components/mcp/resume/types'

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

interface DownloadPayload {
  data: ResumeData
  styleId?: string
}

function decodeBase64Payload(encoded: string): DownloadPayload | null {
  try {
    const raw = Buffer.from(encoded, 'base64').toString('utf-8')
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed === 'object' && parsed !== null && 'data' in parsed) {
      const p = parsed as DownloadPayload
      if (p.data) return p
    }
  } catch { /* invalid */ }
  return null
}

async function fetchByToken(
  id: string,
  baseUrl: string,
): Promise<DownloadPayload | null> {
  try {
    const res = await fetch(
      `${baseUrl}/api/mcp/resume/download-token?id=${encodeURIComponent(id)}`,
      { cache: 'no-store' },
    )
    if (!res.ok) return null
    const body = (await res.json()) as { data?: ResumeData; styleId?: string }
    if (body.data) return { data: body.data, styleId: body.styleId }
  } catch { /* fetch failed */ }
  return null
}

export default async function ResumeDownloadPage({ searchParams }: Props) {
  const params = await searchParams
  const tokenId = typeof params.id === 'string' ? params.id : ''
  const encoded = typeof params.d === 'string' ? params.d : ''

  let payload: DownloadPayload | null = null

  if (tokenId) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    payload = await fetchByToken(tokenId, baseUrl)
  }

  if (!payload && encoded) {
    payload = decodeBase64Payload(encoded)
  }

  if (!payload) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="text-center text-gray-400 max-w-md">
          <p className="text-lg">
            No resume data found. Please go back to the widget and click
            Download PDF again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <ResumeDownloadClient
      data={payload.data}
      styleId={payload.styleId ?? 'modern'}
    />
  )
}
