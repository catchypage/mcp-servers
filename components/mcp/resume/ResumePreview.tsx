'use client'

import React from 'react'
import { type ResumeStyle } from './styles'
import { type ResumeData } from './types'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  LinkIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  CodeIcon,
  TargetIcon,
  AwardIcon,
} from './icons'

interface ResumePreviewProps {
  data: ResumeData
  style: ResumeStyle
}

export default function ResumePreview({ data, style }: ResumePreviewProps) {
  const s = style.styles

  // Sidebar layout for 'sidebar' style
  if (style.id === 'sidebar') {
    return (
      <div className="flex min-h-[800px] shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Sidebar */}
        <div className="w-1/3 bg-indigo-600 text-white p-6 flex flex-col">
          <div className={s.header}>
            <h1 className={s.name}>{data.fullName || 'Your Name'}</h1>
            <p className={s.title}>{data.jobTitle || 'Job Title'}</p>
          </div>

          {/* Contact in sidebar */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-3">
              Contact
            </h3>
            <div className="space-y-2 text-sm text-indigo-100">
              {data.contact.email && (
                <div className="flex items-center gap-2">
                  <MailIcon size={14} />
                  <span>{data.contact.email}</span>
                </div>
              )}
              {data.contact.phone && (
                <div className="flex items-center gap-2">
                  <PhoneIcon size={14} />
                  <span>{data.contact.phone}</span>
                </div>
              )}
              {data.contact.location && (
                <div className="flex items-center gap-2">
                  <MapPinIcon size={14} />
                  <span>{data.contact.location}</span>
                </div>
              )}
              {data.contact.website && (
                <div className="flex items-center gap-2">
                  <GlobeIcon size={14} />
                  <span>{data.contact.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills in sidebar */}
          {data.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-indigo-500/50 text-white px-2 py-0.5 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education in sidebar */}
          {data.education.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-wider mb-3">
                Education
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3 text-sm">
                  <p className="font-semibold text-white">{edu.degree}</p>
                  <p className="text-indigo-200">{edu.institution}</p>
                  <p className="text-indigo-300 text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="w-2/3 p-6 bg-white">
          {/* Summary */}
          {data.summary && (
            <div className="mb-6">
              <h3 className={s.sectionTitle}>
                <TargetIcon className={s.icon} size={16} />
                Profile
              </h3>
              <p className={s.sectionContent}>{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h3 className={s.sectionTitle}>
                <BriefcaseIcon className={s.icon} size={16} />
                Experience
              </h3>
              {data.experience.map((exp, i) => (
                <div key={i} className={s.experienceItem}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {exp.position}
                      </h4>
                      <p className="text-indigo-600 text-sm">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Default single-column layout for all other styles
  return (
    <div className={`${s.container} min-h-[800px] p-8 shadow-lg rounded-lg`}>
      {/* Header */}
      <div className={`${s.header} ${s.headerBg} rounded-t-lg`}>
        <h1 className={s.name}>{data.fullName || 'Your Name'}</h1>
        <p className={s.title}>{data.jobTitle || 'Job Title'}</p>

        {/* Contact Info */}
        <div className={s.contact}>
          {data.contact.email && (
            <span className="flex items-center gap-1.5">
              <MailIcon className={s.icon} size={14} />
              {data.contact.email}
            </span>
          )}
          {data.contact.phone && (
            <span className="flex items-center gap-1.5">
              <PhoneIcon className={s.icon} size={14} />
              {data.contact.phone}
            </span>
          )}
          {data.contact.location && (
            <span className="flex items-center gap-1.5">
              <MapPinIcon className={s.icon} size={14} />
              {data.contact.location}
            </span>
          )}
          {data.contact.website && (
            <span className="flex items-center gap-1.5">
              <GlobeIcon className={s.icon} size={14} />
              {data.contact.website}
            </span>
          )}
          {data.contact.linkedin && (
            <span className="flex items-center gap-1.5">
              <LinkIcon className={s.icon} size={14} />
              {data.contact.linkedin}
            </span>
          )}
        </div>
      </div>

      {/* Summary / Objective */}
      {data.summary && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>
            <TargetIcon className={s.icon} size={16} />
            {style.id === 'terminal'
              ? ' profile --summary'
              : 'Professional Summary'}
          </h2>
          <p className={s.sectionContent}>{data.summary}</p>
        </div>
      )}

      <div className={s.divider} />

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>
            <BriefcaseIcon className={s.icon} size={16} />
            {style.id === 'terminal' ? ' work --history' : 'Work Experience'}
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className={s.experienceItem}>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-semibold">{exp.position}</h3>
                  <p
                    className={
                      style.id === 'terminal'
                        ? 'text-blue-400'
                        : 'text-gray-600'
                    }
                  >
                    {exp.company}
                  </p>
                </div>
                <span className="text-sm opacity-70">{exp.period}</span>
              </div>
              <p className={`${s.sectionContent} mt-2`}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className={s.divider} />

      {/* Education */}
      {data.education.length > 0 && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>
            <GraduationCapIcon className={s.icon} size={16} />
            {style.id === 'terminal' ? ' edu --list' : 'Education'}
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className={s.educationItem}>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h3 className="font-semibold">{edu.degree}</h3>
                  <p className="opacity-70">{edu.institution}</p>
                </div>
                <span className="text-sm opacity-70">{edu.period}</span>
              </div>
              {edu.description && (
                <p className={`${s.sectionContent} mt-1 text-sm`}>
                  {edu.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className={s.divider} />

      {/* Skills */}
      {data.skills.length > 0 && (
        <div className={s.section}>
          <h2 className={s.sectionTitle}>
            <CodeIcon className={s.icon} size={16} />
            {style.id === 'terminal' ? ' skills --all' : 'Skills'}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills.map((skill, i) => (
              <span key={i} className={s.skillTag}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications (if present) */}
      {data.certifications && data.certifications.length > 0 && (
        <>
          <div className={s.divider} />
          <div className={s.section}>
            <h2 className={s.sectionTitle}>
              <AwardIcon className={s.icon} size={16} />
              {style.id === 'terminal' ? ' certs --list' : 'Certifications'}
            </h2>
            <ul className="list-disc list-inside mt-2">
              {data.certifications.map((cert, i) => (
                <li key={i} className={s.sectionContent}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Languages (if present) */}
      {data.languages && data.languages.length > 0 && (
        <>
          <div className={s.divider} />
          <div className={s.section}>
            <h2 className={s.sectionTitle}>
              <GlobeIcon className={s.icon} size={16} />
              {style.id === 'terminal' ? ' lang --spoken' : 'Languages'}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.languages.map((lang, i) => (
                <span key={i} className={s.skillTag}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
