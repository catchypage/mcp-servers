'use client'

import React from 'react'
import { type ResumeStyle } from './styles'
import { type ResumeData } from './types'
import {
  ClassicResume,
  ModernResume,
  ExecutiveResume,
  CreativeResume,
  TerminalResume,
  SidebarResume,
  SwissResume,
  NatureResume,
} from './resume-templates'

interface ResumePreviewProps {
  data: ResumeData
  style: ResumeStyle
}

/* ══════════════════════════ ROUTER ══════════════════════════ */

export default function ResumePreview({ data, style }: ResumePreviewProps) {
  switch (style.id) {
    case 'classic':
      return <ClassicResume data={data} />
    case 'modern':
      return <ModernResume data={data} />
    case 'executive':
      return <ExecutiveResume data={data} />
    case 'creative':
      return <CreativeResume data={data} />
    case 'terminal':
      return <TerminalResume data={data} />
    case 'sidebar':
      return <SidebarResume data={data} />
    case 'swiss':
      return <SwissResume data={data} />
    case 'nature':
      return <NatureResume data={data} />
    default:
      return <ClassicResume data={data} />
  }
}
