import ResumeDownloadClient from './client'
import type { ResumeData } from '@/components/mcp/resume/types'

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

interface DownloadPayload {
  data: ResumeData
  styleId?: string
}

export default async function ResumeDownloadPage({ searchParams }: Props) {
  const params = await searchParams
  const encoded = typeof params.d === 'string' ? params.d : ''

  let data: ResumeData | null = null
  let styleId = 'modern'
  let error = ''

  if (!encoded) {
    error =
      'No resume data found. Please go back to the widget and click Download PDF again.'
  } else {
    try {
      const raw = Buffer.from(encoded, 'base64').toString('utf-8')
      const parsed: unknown = JSON.parse(raw)
      if (
        typeof parsed !== 'object' ||
        parsed === null ||
        !('data' in parsed)
      ) {
        error =
          'No resume data found. Please go back to the widget and click Download PDF again.'
      } else {
        const payload = parsed as DownloadPayload
        if (!payload.data) {
          error =
            'No resume data found. Please go back to the widget and click Download PDF again.'
        } else {
          data = payload.data
          styleId = payload.styleId ?? 'modern'
        }
      }
    } catch {
      error = 'Failed to read resume data. Please go back and try again.'
    }
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="text-center text-gray-400 max-w-md">
          <p className="text-lg">{error || 'No data'}</p>
        </div>
      </div>
    )
  }

  return <ResumeDownloadClient data={data} styleId={styleId} />
}
