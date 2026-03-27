import ResumeDownloadClient from './client'

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function ResumeDownloadPage({ searchParams }: Props) {
  const params = await searchParams
  const encoded = typeof params.d === 'string' ? params.d : ''

  let data = null
  let styleId = 'modern'
  let error = ''

  if (!encoded) {
    error = 'No resume data found. Please go back to the widget and click Download PDF again.'
  } else {
    try {
      const raw = Buffer.from(encoded, 'base64').toString('utf-8')
      const payload = JSON.parse(raw)
      if (!payload?.data) {
        error = 'No resume data found. Please go back to the widget and click Download PDF again.'
      } else {
        data = payload.data
        styleId = payload.styleId || 'modern'
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
