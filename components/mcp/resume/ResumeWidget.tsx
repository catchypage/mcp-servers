'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { RESUME_STYLES, getStyleById, type ResumeStyle } from './styles'
import {
  type ResumeData,
  type Experience,
  type Education,
  type ContactInfo,
} from './types'
import ResumePreview from './ResumePreview'
import { DownloadIcon } from './icons'
import '../openai-types'

type Step = 'style' | 'form' | 'preview' | 'vacancy'

const emptyExperience: Experience = {
  company: '',
  position: '',
  period: '',
  description: '',
}

const emptyEducation: Education = {
  institution: '',
  degree: '',
  period: '',
  description: '',
}

const initialResumeData: ResumeData = {
  fullName: '',
  jobTitle: '',
  summary: '',
  contact: {
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  experience: [{ ...emptyExperience }],
  education: [{ ...emptyEducation }],
  skills: [],
  languages: [],
  certifications: [],
}

/* ── demo data for style preview thumbnails ── */

const demoData: ResumeData = {
  fullName: 'Alex Johnson',
  jobTitle: 'Senior Product Designer',
  summary:
    'Creative professional with 8+ years of experience in user-centered design, leading cross-functional teams.',
  contact: {
    email: 'alex@example.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    website: 'alexjohnson.design',
    linkedin: 'linkedin.com/in/alexj',
  },
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Lead Designer',
      period: '2021 - Present',
      description:
        'Led redesign of flagship product, increasing user engagement by 40%.',
    },
    {
      company: 'StartupXYZ',
      position: 'UX Designer',
      period: '2018 - 2021',
      description: 'Built design system from scratch serving 12 product teams.',
    },
  ],
  education: [
    {
      institution: 'Stanford University',
      degree: 'M.S. Human-Computer Interaction',
      period: '2016 - 2018',
    },
  ],
  skills: ['Figma', 'React', 'User Research', 'Design Systems', 'Prototyping'],
  languages: ['English', 'Spanish'],
  certifications: [],
}

/* ── Collapsible section component ── */

function CollapsibleSection({
  title,
  filled,
  defaultOpen = false,
  children,
  headerRight,
}: {
  title: string
  filled: boolean
  defaultOpen?: boolean
  children: React.ReactNode
  headerRight?: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-4 rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Chevron */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`text-gray-400 transition-transform ${open ? 'rotate-90' : ''}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {/* Fill indicator */}
          {filled ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-400 bg-green-500/15 px-2 py-0.5 rounded-full">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Filled
            </span>
          ) : (
            <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
              Empty
            </span>
          )}
        </div>
        {headerRight && (
          <div onClick={(e) => e.stopPropagation()}>
            {headerRight}
          </div>
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2">
          {children}
        </div>
      )}
    </section>
  )
}

/* ── mini-resume preview card ── */

function StylePreviewCard({
  style,
  selected,
  onSelect,
}: {
  style: ResumeStyle
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative rounded-lg border-2 transition-all text-left overflow-hidden ${
        selected
          ? 'border-blue-500 ring-2 ring-blue-500/30'
          : 'border-white/10 hover:border-white/30'
      }`}
    >
      {/* Thumbnail: scaled resume */}
      <div
        className="relative overflow-hidden"
        style={{ height: 220, background: style.preview.bg }}
      >
        <div
          style={{
            transform: 'scale(0.25)',
            transformOrigin: 'top left',
            width: 800,
            height: 1050,
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <ResumePreview data={demoData} style={style} />
        </div>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background:
              'linear-gradient(to top, rgba(3,7,18,1) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* Label */}
      <div className="px-2.5 pb-2 pt-1 bg-gray-950">
        <h3 className="font-semibold text-white text-xs">{style.name}</h3>
      </div>

      {selected && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      )}
    </button>
  )
}

/* ── PDF: open download page on our domain (bypasses iframe CSP) ── */

function getBaseUrl(): string {
  const scripts = document.querySelectorAll('script[src*="resume.bundle"]')
  if (scripts.length > 0) {
    const src = (scripts[0] as HTMLScriptElement).src
    const url = new URL(src)
    return url.origin
  }
  return ''
}

function openDownloadPage(data: ResumeData, styleId: string) {
  const baseUrl = getBaseUrl()
  const payload = JSON.stringify({ data, styleId })
  const encoded = btoa(unescape(encodeURIComponent(payload)))
  const url = `${baseUrl}/resume/download?d=${encodeURIComponent(encoded)}`
  window.open(url, '_blank')
}

/* ── Section fill-status helpers ── */

function isPersonalFilled(d: ResumeData): boolean {
  return !!(d.fullName.trim() || d.jobTitle.trim() || d.summary.trim())
}

function isContactFilled(d: ResumeData): boolean {
  const c = d.contact
  return !!(c.email?.trim() || c.phone?.trim() || c.location?.trim() || c.website?.trim() || c.linkedin?.trim())
}

function isExperienceFilled(d: ResumeData): boolean {
  return d.experience.some((e) => e.position.trim() || e.company.trim())
}

function isEducationFilled(d: ResumeData): boolean {
  return d.education.some((e) => e.degree.trim() || e.institution.trim())
}

function isSkillsFilled(d: ResumeData): boolean {
  return d.skills.length > 0
}

function isLanguagesFilled(d: ResumeData): boolean {
  return (d.languages || []).length > 0
}

function isCertificationsFilled(d: ResumeData): boolean {
  return (d.certifications || []).length > 0
}

/* ══════════════════════════════════════════════════════════ */

export default function ResumeWidget() {
  const [step, setStep] = useState<Step>('style')
  const [selectedStyleId, setSelectedStyleId] = useState<string>('modern')
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [skillInput, setSkillInput] = useState('')
  const [langInput, setLangInput] = useState('')
  const [certInput, setCertInput] = useState('')

  // Vacancy page state
  const [vacancyText, setVacancyText] = useState('')
  const [vacancyImageUrl, setVacancyImageUrl] = useState('')
  const [vacancyLoading, setVacancyLoading] = useState(false)
  const [vacancyResult, setVacancyResult] = useState<{
    resumeData: ResumeData
    suggestedStyleId: string
    explanation: string
  } | null>(null)

  // Read tool result via window.openai bridge (ChatGPT MCP Apps)
  useEffect(() => {
    function applyToolResult(result: Record<string, unknown>) {
      const sc = (result.structuredContent ?? result) as Record<string, unknown>
      const vd = sc.vacancyData as {
        vacancyDescription?: string
        vacancyImageUrl?: string
        fullName?: string
        jobTitle?: string
      } | undefined

      if (vd?.vacancyDescription) {
        setVacancyText(vd.vacancyDescription)
        if (vd.vacancyImageUrl) setVacancyImageUrl(vd.vacancyImageUrl)
        if (vd.fullName) setResumeData((prev) => ({ ...prev, fullName: vd.fullName! }))
        if (vd.jobTitle) setResumeData((prev) => ({ ...prev, jobTitle: vd.jobTitle! }))
        setStep('vacancy')
        return true
      }

      // Handle prefilled data from create_resume tool
      const pf = sc.prefilledData as {
        style?: string
        jobTitle?: string
        fullName?: string
      } | undefined
      if (pf) {
        if (pf.style) setSelectedStyleId(pf.style)
        if (pf.fullName) setResumeData((prev) => ({ ...prev, fullName: pf.fullName! }))
        if (pf.jobTitle) setResumeData((prev) => ({ ...prev, jobTitle: pf.jobTitle! }))
        if (pf.fullName || pf.jobTitle) setStep('form')
      }
      return false
    }

    // 1. Try direct toolResult property
    if (window.openai?.toolResult) {
      if (applyToolResult(window.openai.toolResult)) return
    }

    // 2. Try async getToolResult
    if (window.openai?.getToolResult) {
      window.openai.getToolResult()
        .then((result) => {
          if (result) applyToolResult(result)
        })
        .catch(() => {})
    }
  }, [])

  const selectedStyle = getStyleById(selectedStyleId)

  const updateContact = useCallback(
    (field: keyof ContactInfo, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [field]: value },
      }))
    },
    [],
  )

  const updateExperience = useCallback(
    (index: number, field: keyof Experience, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp, i) =>
          i === index ? { ...exp, [field]: value } : exp,
        ),
      }))
    },
    [],
  )

  const addExperience = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }))
  }, [])

  const removeExperience = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }, [])

  const updateEducation = useCallback(
    (index: number, field: keyof Education, value: string) => {
      setResumeData((prev) => ({
        ...prev,
        education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [field]: value } : edu,
        ),
      }))
    },
    [],
  )

  const addEducation = useCallback(() => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, { ...emptyEducation }],
    }))
  }, [])

  const removeEducation = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }, [])

  const addSkill = useCallback(() => {
    if (skillInput.trim()) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput('')
    }
  }, [skillInput])

  const removeSkill = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }, [])

  const addLanguage = useCallback(() => {
    if (langInput.trim()) {
      setResumeData((prev) => ({
        ...prev,
        languages: [...(prev.languages || []), langInput.trim()],
      }))
      setLangInput('')
    }
  }, [langInput])

  const removeLanguage = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      languages: (prev.languages || []).filter((_, i) => i !== index),
    }))
  }, [])

  const addCertification = useCallback(() => {
    if (certInput.trim()) {
      setResumeData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications || []), certInput.trim()],
      }))
      setCertInput('')
    }
  }, [certInput])

  const removeCertification = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }))
  }, [])

  const handleDownloadPdf = useCallback(() => {
    openDownloadPage(resumeData, selectedStyleId)
  }, [resumeData, selectedStyleId])

  /* ── Vacancy: call LLM to tailor resume ── */
  const handleTailorForVacancy = useCallback(async () => {
    if (!vacancyText.trim() && !vacancyImageUrl.trim()) return

    setVacancyLoading(true)
    setVacancyResult(null)

    try {
      const baseUrl = getBaseUrl()
      const vacancyInfo = [
        vacancyText.trim() && `Vacancy description:\n${vacancyText.trim()}`,
        vacancyImageUrl.trim() && `Vacancy image URL: ${vacancyImageUrl.trim()}`,
      ].filter(Boolean).join('\n\n')

      const stylesList = RESUME_STYLES.map((s) => `- ${s.id}: ${s.name} — ${s.description}`).join('\n')

      const response = await fetch(`${baseUrl}/api/llm-router`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: `You are a professional resume consultant. You receive the user's current resume data and a job vacancy description. Your task is to:
1. Adapt the resume to better match the vacancy — adjust summary, highlight relevant experience, reorder/emphasize skills
2. Suggest the best resume style from this list:
${stylesList}
3. Explain your changes briefly

IMPORTANT: Return ONLY valid JSON in this exact format, no markdown, no extra text:
{
  "resumeData": { /* full ResumeData object with adapted content */ },
  "suggestedStyleId": "style_id_here",
  "explanation": "Brief explanation of changes made"
}

The ResumeData structure:
{
  "fullName": string,
  "jobTitle": string,
  "summary": string,
  "contact": { "email": string, "phone": string, "location": string, "website": string, "linkedin": string },
  "experience": [{ "company": string, "position": string, "period": string, "description": string }],
  "education": [{ "institution": string, "degree": string, "period": string, "description": string }],
  "skills": string[],
  "languages": string[],
  "certifications": string[]
}`,
          user: `Here is my current resume data:
${JSON.stringify(resumeData, null, 2)}

${vacancyInfo}

Please adapt my resume for this vacancy. Keep all my real data (name, contacts, dates, companies) but adjust descriptions, summary, skills emphasis, and job title to better match the vacancy. Suggest the best style.`,
          temperature: 0.3,
          max_output_tokens: 25000,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      const text = data.text || data.response || ''

      // Parse JSON from LLM response — handle possible markdown wrapping
      let jsonStr = text.trim()
      const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (jsonMatch) {
        jsonStr = jsonMatch[1].trim()
      }

      const parsed = JSON.parse(jsonStr)
      setVacancyResult({
        resumeData: parsed.resumeData,
        suggestedStyleId: parsed.suggestedStyleId || selectedStyleId,
        explanation: parsed.explanation || 'Resume adapted for the vacancy.',
      })
    } catch (error) {
      console.error('Failed to tailor resume:', error)
      alert('Failed to tailor resume. Please try again.')
    } finally {
      setVacancyLoading(false)
    }
  }, [vacancyText, vacancyImageUrl, resumeData, selectedStyleId])

  const applyVacancyResult = useCallback(() => {
    if (!vacancyResult) return
    setResumeData(vacancyResult.resumeData)
    setSelectedStyleId(vacancyResult.suggestedStyleId)
    setVacancyResult(null)
    setVacancyText('')
    setVacancyImageUrl('')
    setStep('preview')
  }, [vacancyResult])

  const inputClass =
    'w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors'
  const labelClass = 'block text-sm text-gray-400 mb-1.5'
  const buttonClass =
    'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50'
  const primaryBtnClass = `${buttonClass} bg-blue-600 text-white hover:bg-blue-700`
  const secondaryBtnClass = `${buttonClass} bg-white/10 text-white hover:bg-white/20`

  // ───────────────── Step 1: Style Selection ─────────────────
  if (step === 'style') {
    return (
      <div className="bg-gray-950 p-6 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold mb-2">Choose Your Resume Style</h1>
          <p className="text-gray-400 mb-6">
            Select one of 8 unique professional designs
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {RESUME_STYLES.map((style) => (
              <StylePreviewCard
                key={style.id}
                style={style}
                selected={selectedStyleId === style.id}
                onSelect={() => setSelectedStyleId(style.id)}
              />
            ))}
          </div>

          <div className="flex justify-end pb-2">
            <button onClick={() => setStep('form')} className={primaryBtnClass}>
              Continue with {selectedStyle.name}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ───────────────── Step 2: Form (Collapsible) ─────────────────
  if (step === 'form') {
    return (
      <div className="bg-gray-950 p-6 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Fill Your Resume</h1>
              <p className="text-gray-400 text-sm">
                Style: {selectedStyle.name}
              </p>
            </div>
            <button
              onClick={() => setStep('style')}
              className={secondaryBtnClass}
            >
              Change Style
            </button>
          </div>

          {/* Personal Info */}
          <CollapsibleSection
            title="Personal Information"
            filled={isPersonalFilled(resumeData)}
            defaultOpen
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="John Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Job Title *</label>
                <input
                  type="text"
                  value={resumeData.jobTitle}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      jobTitle: e.target.value,
                    }))
                  }
                  placeholder="Software Engineer"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelClass}>Professional Summary</label>
              <textarea
                value={resumeData.summary}
                onChange={(e) =>
                  setResumeData((prev) => ({
                    ...prev,
                    summary: e.target.value,
                  }))
                }
                placeholder="Brief overview of your professional background and goals..."
                rows={3}
                className={inputClass}
              />
            </div>
          </CollapsibleSection>

          {/* Contact */}
          <CollapsibleSection
            title="Contact Information"
            filled={isContactFilled(resumeData)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={resumeData.contact.email}
                  onChange={(e) => updateContact('email', e.target.value)}
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={resumeData.contact.phone}
                  onChange={(e) => updateContact('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={resumeData.contact.location}
                  onChange={(e) => updateContact('location', e.target.value)}
                  placeholder="New York, NY"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Website</label>
                <input
                  type="url"
                  value={resumeData.contact.website}
                  onChange={(e) => updateContact('website', e.target.value)}
                  placeholder="www.example.com"
                  className={inputClass}
                />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>LinkedIn</label>
                <input
                  type="text"
                  value={resumeData.contact.linkedin}
                  onChange={(e) => updateContact('linkedin', e.target.value)}
                  placeholder="linkedin.com/in/johnsmith"
                  className={inputClass}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Experience */}
          <CollapsibleSection
            title="Work Experience"
            filled={isExperienceFilled(resumeData)}
            headerRight={
              <button onClick={addExperience} className={secondaryBtnClass}>
                + Add
              </button>
            }
          >
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-gray-500">
                    Experience {index + 1}
                  </span>
                  {resumeData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(index, 'position', e.target.value)
                      }
                      placeholder="Senior Developer"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, 'company', e.target.value)
                      }
                      placeholder="Tech Corp Inc."
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Period</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) =>
                        updateExperience(index, 'period', e.target.value)
                      }
                      placeholder="Jan 2020 - Present"
                      className={inputClass}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClass}>Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(index, 'description', e.target.value)
                      }
                      placeholder="Key responsibilities and achievements..."
                      rows={3}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleSection>

          {/* Education */}
          <CollapsibleSection
            title="Education"
            filled={isEducationFilled(resumeData)}
            headerRight={
              <button onClick={addEducation} className={secondaryBtnClass}>
                + Add
              </button>
            }
          >
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="mb-6 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-gray-500">
                    Education {index + 1}
                  </span>
                  {resumeData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, 'degree', e.target.value)
                      }
                      placeholder="Bachelor of Science in Computer Science"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        updateEducation(index, 'institution', e.target.value)
                      }
                      placeholder="University of Technology"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Period</label>
                    <input
                      type="text"
                      value={edu.period}
                      onChange={(e) =>
                        updateEducation(index, 'period', e.target.value)
                      }
                      placeholder="2016 - 2020"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Description (optional)</label>
                    <input
                      type="text"
                      value={edu.description || ''}
                      onChange={(e) =>
                        updateEducation(index, 'description', e.target.value)
                      }
                      placeholder="GPA, honors, relevant coursework..."
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CollapsibleSection>

          {/* Skills */}
          <CollapsibleSection
            title="Skills"
            filled={isSkillsFilled(resumeData)}
          >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addSkill())
                }
                placeholder="Add a skill..."
                className={inputClass}
              />
              <button onClick={addSkill} className={secondaryBtnClass}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:text-red-400"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </CollapsibleSection>

          {/* Languages */}
          <CollapsibleSection
            title="Languages"
            filled={isLanguagesFilled(resumeData)}
          >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={langInput}
                onChange={(e) => setLangInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addLanguage())
                }
                placeholder="e.g. English (Native)"
                className={inputClass}
              />
              <button onClick={addLanguage} className={secondaryBtnClass}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(resumeData.languages || []).map((lang, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1.5 rounded-full text-sm"
                >
                  {lang}
                  <button
                    onClick={() => removeLanguage(index)}
                    className="hover:text-red-400"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </CollapsibleSection>

          {/* Certifications */}
          <CollapsibleSection
            title="Certifications"
            filled={isCertificationsFilled(resumeData)}
          >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), addCertification())
                }
                placeholder="e.g. AWS Solutions Architect"
                className={inputClass}
              />
              <button onClick={addCertification} className={secondaryBtnClass}>
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {(resumeData.certifications || []).map((cert, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full text-sm"
                >
                  {cert}
                  <button
                    onClick={() => removeCertification(index)}
                    className="hover:text-red-400"
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          </CollapsibleSection>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep('style')}
              className={secondaryBtnClass}
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => setStep('vacancy')}
                disabled={
                  !resumeData.fullName.trim() || !resumeData.jobTitle.trim()
                }
                className={`${buttonClass} bg-purple-600 text-white hover:bg-purple-700`}
              >
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                  Tailor for Vacancy
                </span>
              </button>
              <button
                onClick={() => setStep('preview')}
                disabled={
                  !resumeData.fullName.trim() || !resumeData.jobTitle.trim()
                }
                className={primaryBtnClass}
              >
                Preview Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ───────────────── Step 4: Vacancy ─────────────────
  if (step === 'vacancy') {
    return (
      <div className="bg-gray-950 p-6 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Tailor for Vacancy</h1>
              <p className="text-gray-400 text-sm">
                Provide vacancy info and AI will adapt your resume
              </p>
            </div>
            <button
              onClick={() => setStep('form')}
              className={secondaryBtnClass}
            >
              Back to Form
            </button>
          </div>

          {/* Vacancy screenshot / image URL */}
          <section className="mb-6 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Vacancy Screenshot</h2>
            <p className="text-gray-400 text-sm mb-3">
              Paste a URL to a screenshot of the vacancy posting (optional)
            </p>
            <input
              type="url"
              value={vacancyImageUrl}
              onChange={(e) => setVacancyImageUrl(e.target.value)}
              placeholder="https://i.imgur.com/vacancy-screenshot.png"
              className={inputClass}
            />
            {vacancyImageUrl.trim() && (
              <div className="mt-4 rounded-lg overflow-hidden border border-white/10">
                <img
                  src={vacancyImageUrl}
                  alt="Vacancy screenshot"
                  className="max-w-full max-h-64 object-contain mx-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </section>

          {/* Vacancy text description */}
          <section className="mb-6 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Vacancy Description</h2>
            <p className="text-gray-400 text-sm mb-3">
              Paste the job description, requirements, and any relevant info about the position
            </p>
            <textarea
              value={vacancyText}
              onChange={(e) => setVacancyText(e.target.value)}
              placeholder="Paste the full job description here...

Example:
- Job Title: Senior Frontend Developer
- Company: TechCorp
- Requirements: 5+ years React, TypeScript, Next.js
- Responsibilities: Lead frontend team, architect solutions..."
              rows={10}
              className={inputClass}
            />
          </section>

          {/* Current resume summary */}
          <section className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-sm font-semibold text-blue-300 mb-2">Your current resume</h3>
            <p className="text-sm text-gray-300">
              <strong>{resumeData.fullName}</strong> — {resumeData.jobTitle}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {resumeData.experience.length} experience(s), {resumeData.skills.length} skill(s), Style: {selectedStyle.name}
            </p>
          </section>

          {/* Result */}
          {vacancyResult && (
            <section className="mb-6 p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-300 mb-3">AI Suggestions</h3>
              <p className="text-gray-300 text-sm mb-4">{vacancyResult.explanation}</p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-400">Suggested style:</span>
                <span className="text-sm font-medium text-white bg-white/10 px-3 py-1 rounded-full">
                  {getStyleById(vacancyResult.suggestedStyleId).name}
                </span>
              </div>

              {/* Mini preview of tailored resume */}
              <div className="mb-4 rounded-lg overflow-hidden border border-white/10"
                style={{ height: 300, position: 'relative' }}
              >
                <div
                  style={{
                    transform: 'scale(0.35)',
                    transformOrigin: 'top left',
                    width: 800,
                    height: 1100,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                  }}
                >
                  <ResumePreview
                    data={vacancyResult.resumeData}
                    style={getStyleById(vacancyResult.suggestedStyleId)}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={applyVacancyResult}
                  className={`${buttonClass} bg-green-600 text-white hover:bg-green-700`}
                >
                  Apply & Preview
                </button>
                <button
                  onClick={() => setVacancyResult(null)}
                  className={secondaryBtnClass}
                >
                  Discard
                </button>
              </div>
            </section>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep('form')}
              className={secondaryBtnClass}
            >
              Back
            </button>
            <button
              onClick={handleTailorForVacancy}
              disabled={vacancyLoading || (!vacancyText.trim() && !vacancyImageUrl.trim())}
              className={`${buttonClass} bg-purple-600 text-white hover:bg-purple-700`}
            >
              {vacancyLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Tailor Resume with AI
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ───────────────── Step 3: Preview ─────────────────
  return (
    <div className="text-white">
      {/* Header controls */}
      <div className="p-4 border-b border-white/10 bg-gray-900 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Resume Preview</h1>
            <p className="text-gray-400 text-xs">{selectedStyle.name}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setStep('form')}
              className={secondaryBtnClass}
            >
              Edit
            </button>
            <button
              onClick={() => setStep('vacancy')}
              className={`${buttonClass} bg-purple-600 text-white hover:bg-purple-700`}
            >
              <span className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                Tailor for Vacancy
              </span>
            </button>
            <button
              onClick={() => setStep('style')}
              className={secondaryBtnClass}
            >
              Change Style
            </button>
            <button
              onClick={handleDownloadPdf}
              className={primaryBtnClass}
            >
              <span className="flex items-center gap-2">
                <DownloadIcon size={16} />
                Download PDF
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Resume preview */}
      <div className="p-6 bg-gray-950">
        <div className="mx-auto max-w-4xl">
          <ResumePreview data={resumeData} style={selectedStyle} />
        </div>
      </div>
    </div>
  )
}
