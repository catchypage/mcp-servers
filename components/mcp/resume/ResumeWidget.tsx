'use client'

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { RESUME_STYLES, getStyleById } from './styles'
import {
  type ResumeData,
  type Experience,
  type Education,
  type ContactInfo,
} from './types'
import ResumePreview from './ResumePreview'
import { DownloadIcon } from './icons'
import { CollapsibleSection } from './shared/CollapsibleSection'
import { StylePreviewCard } from './shared/StylePreviewCard'
import {
  emptyExperience,
  emptyEducation,
  initialResumeData,
  demoData,
} from './utils/constants'
import {
  isPersonalFilled,
  isContactFilled,
  isExperienceFilled,
  isEducationFilled,
  isSkillsFilled,
  isLanguagesFilled,
  isCertificationsFilled,
} from './utils/validators'
import { openDownloadPage, getBaseUrl } from './utils/helpers'
import {
  inputClass,
  labelClass,
  primaryBtnClass,
  secondaryBtnClass,
  buttonClass,
} from './utils/classNames'
import '../openai-types'
import { useToolInput, useToolOutput } from '../hooks/useOpenAiGlobals'
import {
  unwrapResumeInitPayload,
  mergeToolOutputAndInput,
} from './resolve-openai-init'

type Step = 'style' | 'form' | 'preview' | 'vacancy'

/** Response shape from POST /api/llm-router */
interface LlmRouterResponse {
  text?: string
  response?: string
}

interface TailorVacancyPayload {
  resumeData: ResumeData
  suggestedStyleId?: string
  explanation?: string
}

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

  // callTool wrapper — same pattern as LangCoach
  const callTool = useCallback(
    async (
      name: string,
      args: Record<string, unknown>,
    ): Promise<Record<string, unknown> | null> => {
      if (!window.openai?.callTool) {
        return null
      }
      try {
        const res = await window.openai.callTool(name, args)
        const flat = res.structuredContent ?? res
        const unwrapped = unwrapResumeInitPayload(flat)
        if (unwrapped) {
          return unwrapped
        }
        if (typeof flat === 'object' && flat !== null) {
          return { ...flat }
        }
        return null
      } catch (e) {
        console.error(`[ResumeWidget] callTool ${name} failed:`, e)
        return null
      }
    },
    [],
  )

  const applyResumeInitContext = useCallback((ctx: Record<string, unknown>) => {
    const mode = String(ctx.mode ?? 'create')
      .toLowerCase()
      .trim()
    const style = String(ctx.style ?? '')
    const fullName = String(ctx.fullName ?? '')
    const jobTitle = String(ctx.jobTitle ?? '')

    if (style) {
      setSelectedStyleId(style)
    }
    if (fullName) {
      setResumeData((prev) => ({ ...prev, fullName }))
    }
    if (jobTitle) {
      setResumeData((prev) => ({ ...prev, jobTitle }))
    }

    if (mode === 'vacancy') {
      const vacancyDescription = String(ctx.vacancyDescription ?? '')
      const vacancyImgUrl = String(ctx.vacancyImageUrl ?? '')
      if (vacancyDescription) {
        setVacancyText(vacancyDescription)
      }
      if (vacancyImgUrl) {
        setVacancyImageUrl(vacancyImgUrl)
      }
      setStep('vacancy')
    } else if (mode === 'improve') {
      const resumeText = String(ctx.resumeText ?? '')
      const feedback = String(ctx.feedback ?? '')
      setResumeData((prev) => {
        let summary = prev.summary
        if (resumeText.trim() && !summary.trim()) {
          summary = resumeText
        }
        if (feedback.trim()) {
          summary = summary.trim()
            ? `${summary}\n\nFeedback: ${feedback}`
            : `Feedback: ${feedback}`
        }
        return { ...prev, summary }
      })
      setStep('form')
    }
    // mode === 'create' stays on 'style' (default)
  }, [])

  const toolOutput = useToolOutput()
  const toolInput = useToolInput()
  const initAppliedRef = useRef(false)

  /*
   * ChatGPT Apps: subscribe to openai:set_globals (useToolOutput /
   * useToolInput) so late toolOutput is applied; polling alone misses host
   * updates (see astral-day useOpenAiGlobal). Fallback: legacy bridges +
   * get_init_context after a delay (serverless Map may be empty).
   */
  useEffect(() => {
    const merged = mergeToolOutputAndInput(toolOutput, toolInput)
    if (merged && typeof merged.mode === 'string') {
      initAppliedRef.current = true
      applyResumeInitContext(merged)
    }
  }, [toolOutput, toolInput, applyResumeInitContext])

  useEffect(() => {
    let cancelled = false

    void (async () => {
      for (let attempt = 0; attempt < 30; attempt++) {
        if (cancelled || initAppliedRef.current) {
          return
        }
        const w = window.openai
        if (w?.toolResult) {
          const tr = w.toolResult
          const u =
            unwrapResumeInitPayload(tr) ??
            unwrapResumeInitPayload({ structuredContent: tr })
          if (u && typeof u.mode === 'string') {
            initAppliedRef.current = true
            applyResumeInitContext(u)
            return
          }
        }
        if (attempt < 10 && w?.getToolResult) {
          try {
            const gr = await w.getToolResult()
            const u = unwrapResumeInitPayload(gr)
            if (u && typeof u.mode === 'string') {
              initAppliedRef.current = true
              applyResumeInitContext(u)
              return
            }
          } catch {
            /* host may not support */
          }
        }
        await new Promise((r) => setTimeout(r, 100))
      }

      if (cancelled || initAppliedRef.current) {
        return
      }

      const fromServer = await callTool('get_init_context', {})
      if (cancelled || !fromServer) {
        return
      }
      const payload =
        unwrapResumeInitPayload(fromServer) ??
        (typeof fromServer.mode === 'string' ? fromServer : null)
      if (payload && typeof payload.mode === 'string') {
        applyResumeInitContext(payload)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [callTool, applyResumeInitContext])

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
        languages: [...(prev.languages ?? []), langInput.trim()],
      }))
      setLangInput('')
    }
  }, [langInput])

  const removeLanguage = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      languages: (prev.languages ?? []).filter((_, i) => i !== index),
    }))
  }, [])

  const addCertification = useCallback(() => {
    if (certInput.trim()) {
      setResumeData((prev) => ({
        ...prev,
        certifications: [...(prev.certifications ?? []), certInput.trim()],
      }))
      setCertInput('')
    }
  }, [certInput])

  const removeCertification = useCallback((index: number) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: (prev.certifications ?? []).filter((_, i) => i !== index),
    }))
  }, [])

  const handleDownloadPdf = useCallback(() => {
    void openDownloadPage(resumeData, selectedStyleId)
  }, [resumeData, selectedStyleId])

  const handleTailorForVacancy = useCallback(async () => {
    if (!vacancyText.trim() && !vacancyImageUrl.trim()) {
      return
    }

    setVacancyLoading(true)
    setVacancyResult(null)

    try {
      const baseUrl = getBaseUrl()
      const vacancyInfo = [
        vacancyText.trim() && `Vacancy description:\n${vacancyText.trim()}`,
        vacancyImageUrl.trim() &&
          `Vacancy image URL: ${vacancyImageUrl.trim()}`,
      ]
        .filter(Boolean)
        .join('\n\n')

      const stylesList = RESUME_STYLES.map(
        (s) => `- ${s.id}: ${s.name} — ${s.description}`,
      ).join('\n')

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

      const data = (await response.json()) as LlmRouterResponse
      const text = data.text ?? data.response ?? ''

      let jsonStr = text.trim()
      const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/)
      if (jsonMatch?.[1]) {
        jsonStr = jsonMatch[1].trim()
      }

      const parsed = JSON.parse(jsonStr) as TailorVacancyPayload
      setVacancyResult({
        resumeData: parsed.resumeData,
        suggestedStyleId: parsed.suggestedStyleId ?? selectedStyleId,
        explanation: parsed.explanation ?? 'Resume adapted for the vacancy.',
      })
    } catch (error) {
      console.error('Failed to tailor resume:', error)
      alert('Failed to tailor resume. Please try again.')
    } finally {
      setVacancyLoading(false)
    }
  }, [vacancyText, vacancyImageUrl, resumeData, selectedStyleId])

  const applyVacancyResult = useCallback(() => {
    if (!vacancyResult) {
      return
    }
    setResumeData(vacancyResult.resumeData)
    setSelectedStyleId(vacancyResult.suggestedStyleId)
    setVacancyResult(null)
    setVacancyText('')
    setVacancyImageUrl('')
    setStep('preview')
  }, [vacancyResult])

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
                demoData={demoData}
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
                      value={edu.description ?? ''}
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
              {(resumeData.languages ?? []).map((lang, index) => (
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
              {(resumeData.certifications ?? []).map((cert, index) => (
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
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </section>

          <section className="mb-6 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Vacancy Description</h2>
            <p className="text-gray-400 text-sm mb-3">
              Paste the job description, requirements, and any relevant info
              about the position
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

          <section className="mb-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <h3 className="text-sm font-semibold text-blue-300 mb-2">
              Your current resume
            </h3>
            <p className="text-sm text-gray-300">
              <strong>{resumeData.fullName}</strong> — {resumeData.jobTitle}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {resumeData.experience.length} experience(s),{' '}
              {resumeData.skills.length} skill(s), Style: {selectedStyle.name}
            </p>
          </section>

          {vacancyResult && (
            <section className="mb-6 p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-300 mb-3">
                AI Suggestions
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {vacancyResult.explanation}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm text-gray-400">Suggested style:</span>
                <span className="text-sm font-medium text-white bg-white/10 px-3 py-1 rounded-full">
                  {getStyleById(vacancyResult.suggestedStyleId).name}
                </span>
              </div>

              <div
                className="mb-4 rounded-lg overflow-hidden border border-white/10"
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

          <div className="flex justify-between">
            <button
              onClick={() => setStep('form')}
              className={secondaryBtnClass}
            >
              Back
            </button>
            <button
              onClick={() => {
                void handleTailorForVacancy()
              }}
              disabled={
                vacancyLoading ||
                (!vacancyText.trim() && !vacancyImageUrl.trim())
              }
              className={`${buttonClass} bg-purple-600 text-white hover:bg-purple-700`}
            >
              {vacancyLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray="60"
                      strokeLinecap="round"
                    />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
            <button onClick={handleDownloadPdf} className={primaryBtnClass}>
              <span className="flex items-center gap-2">
                <DownloadIcon size={16} />
                Download PDF
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-gray-950">
        <div className="mx-auto max-w-4xl">
          <ResumePreview data={resumeData} style={selectedStyle} />
        </div>
      </div>
    </div>
  )
}
