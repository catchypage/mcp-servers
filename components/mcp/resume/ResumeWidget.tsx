'use client'

import React, { useState, useCallback } from 'react'
import { RESUME_STYLES, getStyleById, type ResumeStyle } from './styles'
import {
  type ResumeData,
  type Experience,
  type Education,
  type ContactInfo,
} from './types'
import ResumePreview from './ResumePreview'
import { DownloadIcon } from './icons'

type Step = 'style' | 'form' | 'preview'

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

function StyleCard({
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
      className={`relative p-4 rounded-xl border-2 transition-all text-left ${
        selected
          ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30'
          : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
      }`}
    >
      {/* Preview swatch */}
      <div
        className="w-full h-20 rounded-lg mb-3 flex items-center justify-center"
        style={{ background: style.preview.bg }}
      >
        <div className="text-center">
          <div
            className="text-lg font-bold"
            style={{ color: style.preview.text }}
          >
            Aa
          </div>
          <div
            className="w-12 h-1 rounded mt-1"
            style={{ background: style.preview.accent }}
          />
        </div>
      </div>

      <h3 className="font-semibold text-white text-sm">{style.name}</h3>
      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
        {style.description}
      </p>

      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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

export default function ResumeWidget() {
  const [step, setStep] = useState<Step>('style')
  const [selectedStyleId, setSelectedStyleId] = useState<string>('modern')
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [skillInput, setSkillInput] = useState('')
  const [langInput, setLangInput] = useState('')
  const [certInput, setCertInput] = useState('')

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

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  const inputClass =
    'w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors'
  const labelClass = 'block text-sm text-gray-400 mb-1.5'
  const buttonClass =
    'px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50'
  const primaryBtnClass = `${buttonClass} bg-blue-600 text-white hover:bg-blue-700`
  const secondaryBtnClass = `${buttonClass} bg-white/10 text-white hover:bg-white/20`
  const dangerBtnClass = `${buttonClass} bg-red-500/20 text-red-400 hover:bg-red-500/30`

  // Step 1: Style Selection
  if (step === 'style') {
    return (
      <div className="min-h-screen bg-gray-950 p-6 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-2">Choose Your Resume Style</h1>
          <p className="text-gray-400 mb-8">
            Select one of 8 unique professional designs
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {RESUME_STYLES.map((style) => (
              <StyleCard
                key={style.id}
                style={style}
                selected={selectedStyleId === style.id}
                onSelect={() => setSelectedStyleId(style.id)}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <button onClick={() => setStep('form')} className={primaryBtnClass}>
              Continue with {selectedStyle.name}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Form
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gray-950 p-6 text-white">
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
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
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
          </section>

          {/* Contact */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
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
          </section>

          {/* Experience */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Work Experience</h2>
              <button onClick={addExperience} className={secondaryBtnClass}>
                + Add
              </button>
            </div>
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
          </section>

          {/* Education */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Education</h2>
              <button onClick={addEducation} className={secondaryBtnClass}>
                + Add
              </button>
            </div>
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
          </section>

          {/* Skills */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
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
          </section>

          {/* Languages */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Languages</h2>
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
          </section>

          {/* Certifications */}
          <section className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
            <h2 className="text-lg font-semibold mb-4">Certifications</h2>
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
          </section>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep('style')}
              className={secondaryBtnClass}
            >
              Back
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
    )
  }

  // Step 3: Preview
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header controls - hide when printing */}
      <div className="print:hidden p-6 border-b border-white/10 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-4xl flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Resume Preview</h1>
            <p className="text-gray-400 text-sm">{selectedStyle.name}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('form')}
              className={secondaryBtnClass}
            >
              Edit
            </button>
            <button
              onClick={() => setStep('style')}
              className={secondaryBtnClass}
            >
              Change Style
            </button>
            <button onClick={handlePrint} className={primaryBtnClass}>
              <span className="flex items-center gap-2">
                <DownloadIcon size={16} />
                Print / Save PDF
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Resume preview */}
      <div className="p-6 print:p-0">
        <div className="mx-auto max-w-4xl print:max-w-none">
          <ResumePreview data={resumeData} style={selectedStyle} />
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden { display: none !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:max-w-none { max-width: none !important; }
        }
      `}</style>
    </div>
  )
}
