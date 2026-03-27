'use client'

import React, { useRef, useCallback, useState } from 'react'
import ResumePreview from '@/components/mcp/resume/ResumePreview'
import { getStyleById } from '@/components/mcp/resume/styles'
import type { ResumeData } from '@/components/mcp/resume/types'

interface Props {
  data: ResumeData
  styleId: string
}

export default function ResumeDownloadClient({ data, styleId }: Props) {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [generating, setGenerating] = useState(false)
  const style = getStyleById(styleId)

  const handleDownload = useCallback(async () => {
    if (!resumeRef.current) return
    setGenerating(true)

    try {
      const [html2canvasModule, jspdfModule] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ])
      const html2canvas = html2canvasModule.default
      const { jsPDF } = jspdfModule

      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdfW = 210
      const pdfH = (canvas.height * pdfW) / canvas.width
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: pdfH > 297 ? [pdfW, pdfH] : 'a4',
      })
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH)

      const name = (data.fullName || 'resume')
        .replace(/[^a-zA-Z0-9_ -]/g, '')
        .replace(/\s+/g, '_')
      pdf.save(`${name}_resume.pdf`)
    } catch (e) {
      console.error('PDF generation failed:', e)
      alert('PDF generation failed. Try using Print (Ctrl+P) and save as PDF.')
    } finally {
      setGenerating(false)
    }
  }, [data])

  return (
    <div className="min-h-screen bg-gray-950 pt-24">
      {/* Sticky header bar */}
      <div className="sticky top-16 z-10 bg-gray-950/95 backdrop-blur-sm border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-white text-lg font-bold">Your Resume</h1>
          <p className="text-gray-500 text-xs">Style: {style.name}</p>
        </div>
        <button
          onClick={handleDownload}
          disabled={generating}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          {generating ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      {/* Resume preview */}
      <div className="p-6 max-w-4xl mx-auto">
        <div ref={resumeRef}>
          <ResumePreview data={data} style={style} />
        </div>
      </div>
    </div>
  )
}
