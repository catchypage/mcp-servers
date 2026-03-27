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

/* ──────────────────────── helpers ──────────────────────── */

function ContactRow({
  data,
  className,
  iconClass,
  separator,
}: {
  data: ResumeData
  className?: string
  iconClass?: string
  separator?: React.ReactNode
}) {
  const items: { icon: typeof MailIcon; value: string }[] = []
  if (data.contact.email) items.push({ icon: MailIcon, value: data.contact.email })
  if (data.contact.phone) items.push({ icon: PhoneIcon, value: data.contact.phone })
  if (data.contact.location)
    items.push({ icon: MapPinIcon, value: data.contact.location })
  if (data.contact.website)
    items.push({ icon: GlobeIcon, value: data.contact.website })
  if (data.contact.linkedin)
    items.push({ icon: LinkIcon, value: data.contact.linkedin })
  if (items.length === 0) return null
  return (
    <div className={className}>
      {items.map((c, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-1.5">
            <c.icon className={iconClass} size={14} />
            {c.value}
          </span>
          {separator && i < items.length - 1 && separator}
        </React.Fragment>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   1. CLASSIC PROFESSIONAL
   Single-column, serif, centered header, formal grey borders
   ════════════════════════════════════════════════════════════ */
function ClassicResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 shadow-lg rounded font-serif text-gray-800">
      {/* header */}
      <div className="text-center border-b-2 border-[#1e3a5f] pb-6">
        <h1 className="text-3xl font-bold text-[#1e3a5f] tracking-widest uppercase">
          {data.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-500 mt-1 italic">
          {data.jobTitle || 'Job Title'}
        </p>
        <ContactRow
          data={data}
          className="text-sm text-gray-500 mt-3 flex flex-wrap justify-center gap-x-6 gap-y-1"
          iconClass="text-[#1e3a5f]"
        />
      </div>

      {/* summary */}
      {data.summary && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <TargetIcon className="text-[#1e3a5f]" size={14} /> Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* experience */}
      {data.experience.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <BriefcaseIcon className="text-[#1e3a5f]" size={14} /> Work Experience
          </h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-5 pl-4 border-l-2 border-gray-300">
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600 italic">{exp.company}</p>
                </div>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className="text-gray-700 mt-1 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* education */}
      {data.education.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <GraduationCapIcon className="text-[#1e3a5f]" size={14} /> Education
          </h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <h3 className="font-bold">{edu.degree}</h3>
                  <p className="text-gray-600 italic">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-500">{edu.period}</span>
              </div>
              {edu.description && (
                <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* skills */}
      {data.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <CodeIcon className="text-[#1e3a5f]" size={14} /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 px-3 py-1 text-sm border border-gray-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <AwardIcon className="text-[#1e3a5f]" size={14} /> Certifications
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {data.certifications.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* languages */}
      {data.languages && data.languages.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <GlobeIcon className="text-[#1e3a5f]" size={14} /> Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((l, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-700 px-3 py-1 text-sm border border-gray-300"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   2. MODERN MINIMAL
   Left blue accent bar, sans-serif, airy spacing, top-aligned header
   ════════════════════════════════════════════════════════════ */
function ModernResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden font-sans text-gray-800 flex">
      {/* thin left accent bar */}
      <div className="w-1.5 bg-sky-500 shrink-0" />

      <div className="flex-1 p-10">
        {/* header */}
        <div className="pb-8">
          <h1 className="text-4xl font-extralight text-gray-900 tracking-tight">
            {data.fullName || 'Your Name'}
          </h1>
          <p className="text-xl text-sky-600 mt-1 font-medium">
            {data.jobTitle || 'Job Title'}
          </p>
          <ContactRow
            data={data}
            className="text-sm text-gray-400 mt-4 flex flex-wrap gap-x-6 gap-y-1"
            iconClass="text-sky-400"
          />
        </div>

        <div className="border-t border-gray-200" />

        {/* summary */}
        {data.summary && (
          <div className="mt-8">
            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-3">
              Profile
            </h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* experience */}
        {data.experience.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-4">
              Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sky-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-400">{exp.period}</span>
                </div>
                <p className="text-gray-600 mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* two-column: education + skills */}
        <div className="mt-8 grid grid-cols-2 gap-8">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-4">
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-500 text-sm">{edu.institution}</p>
                  <p className="text-gray-400 text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            {data.skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-sky-50 text-sky-700 px-3 py-1 text-sm rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-3">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((l, i) => (
                    <span
                      key={i}
                      className="bg-sky-50 text-sky-700 px-3 py-1 text-sm rounded-full"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {data.certifications && data.certifications.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.2em] mb-3">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              {data.certifications.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   3. EXECUTIVE DARK
   Full dark background, gold accents, top banner, bold presence
   ════════════════════════════════════════════════════════════ */
function ExecutiveResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#1a1a2e] text-gray-100 shadow-lg rounded-lg overflow-hidden font-sans">
      {/* gold top banner header */}
      <div
        className="px-10 py-8"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
        }}
      >
        <h1 className="text-4xl font-bold text-white tracking-wide">
          {data.fullName || 'Your Name'}
        </h1>
        <p className="text-xl text-amber-400 mt-2 font-light tracking-wide">
          {data.jobTitle || 'Job Title'}
        </p>
        <div className="h-px bg-amber-500/40 mt-6" />
        <ContactRow
          data={data}
          className="text-sm text-gray-400 mt-4 flex flex-wrap gap-x-6 gap-y-1"
          iconClass="text-amber-400"
        />
      </div>

      <div className="px-10 py-8">
        {/* summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <TargetIcon className="text-amber-400" size={14} /> Executive Summary
            </h2>
            <p className="text-gray-300 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* experience — timeline style with gold left border */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <BriefcaseIcon className="text-amber-400" size={14} /> Career History
            </h2>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="mb-6 pl-5 border-l-2 border-amber-500/50 relative"
              >
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-amber-400" />
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold text-white">{exp.position}</h3>
                    <p className="text-amber-300/80 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{exp.period}</span>
                </div>
                <p className="text-gray-400 mt-2 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* two-column bottom: education + skills/certs */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            {data.education.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-4">
                  Education
                </h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                    <p className="text-gray-400 text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.period}</p>
                  </div>
                ))}
              </div>
            )}
            {data.languages && data.languages.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-3">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.languages.map((l, i) => (
                    <span
                      key={i}
                      className="bg-amber-500/10 text-amber-300 px-3 py-1 text-sm border border-amber-500/30"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div>
            {data.skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-4">
                  Expertise
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span
                      key={i}
                      className="bg-amber-500/10 text-amber-300 px-3 py-1.5 text-sm border border-amber-500/30"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.certifications && data.certifications.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-3">
                  Certifications
                </h2>
                <ul className="text-gray-300 text-sm space-y-1">
                  {data.certifications.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <AwardIcon className="text-amber-400" size={12} /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   4. CREATIVE BOLD
   Vibrant gradient header, two-column body, colorful cards
   ════════════════════════════════════════════════════════════ */
function CreativeResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden font-sans text-gray-800">
      {/* massive gradient header */}
      <div
        className="px-10 py-10 text-white"
        style={{
          background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)',
        }}
      >
        <h1 className="text-5xl font-black">{data.fullName || 'Your Name'}</h1>
        <p className="text-xl text-pink-100 mt-2 font-medium">
          {data.jobTitle || 'Job Title'}
        </p>
        <ContactRow
          data={data}
          className="text-sm text-pink-100/80 mt-4 flex flex-wrap gap-x-6 gap-y-1"
          iconClass="text-white/70"
        />
      </div>

      <div className="p-10">
        {/* summary */}
        {data.summary && (
          <div className="mb-8 bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
            <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase tracking-wider mb-2">
              About Me
            </h2>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* two-column body: left experience, right skills/edu/etc */}
        <div className="grid grid-cols-3 gap-8">
          {/* left — 2/3 experience */}
          <div className="col-span-2">
            {data.experience.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase tracking-wider mb-4">
                  Experience
                </h2>
                {data.experience.map((exp, i) => (
                  <div
                    key={i}
                    className="mb-5 p-4 rounded-xl border border-purple-100 bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{exp.position}</h3>
                        <p className="text-purple-600 text-sm font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 bg-purple-50 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-2 leading-relaxed text-sm">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* right — 1/3 sidebar content */}
          <div className="space-y-6">
            {data.skills.length > 0 && (
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-5 rounded-xl">
                <h2 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 uppercase tracking-wider mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-white text-xs px-3 py-1 rounded-full font-medium"
                      style={{
                        background:
                          'linear-gradient(135deg, #ec4899, #a855f7)',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.education.length > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl">
                <h2 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 uppercase tracking-wider mb-3">
                  Education
                </h2>
                {data.education.map((edu, i) => (
                  <div key={i} className="mb-3 last:mb-0">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-500 text-xs">{edu.institution}</p>
                    <p className="text-gray-400 text-xs">{edu.period}</p>
                  </div>
                ))}
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div className="bg-pink-50 p-5 rounded-xl">
                <h2 className="text-xs font-bold text-pink-600 uppercase tracking-wider mb-3">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.languages.map((l, i) => (
                    <span
                      key={i}
                      className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.certifications && data.certifications.length > 0 && (
              <div className="bg-indigo-50 p-5 rounded-xl">
                <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                  Certifications
                </h2>
                <ul className="text-gray-600 text-xs space-y-1">
                  {data.certifications.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <AwardIcon className="text-indigo-400" size={12} /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   5. TECH TERMINAL
   Dark terminal UI, monospace, command-line headers, green-on-black
   ════════════════════════════════════════════════════════════ */
function TerminalResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#0d1117] text-gray-300 shadow-lg rounded-lg overflow-hidden font-mono">
      {/* terminal title bar */}
      <div className="bg-[#161b22] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-3 text-xs text-gray-500">
          resume.sh — {data.fullName || 'user'}@portfolio
        </span>
      </div>

      <div className="p-8">
        {/* header as command output */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            $ <span className="text-green-400">whoami</span>
          </p>
          <h1 className="text-3xl font-bold text-green-400 mt-1">
            {data.fullName || 'Your Name'}
          </h1>
          <p className="text-blue-400 mt-1">{data.jobTitle || 'Job Title'}</p>
        </div>

        {/* contact as key-value pairs */}
        <div className="mb-6 bg-[#161b22] rounded p-4 border border-gray-700">
          <p className="text-gray-500 text-sm mb-2">$ cat contact.json</p>
          <div className="text-sm space-y-1">
            {data.contact.email && (
              <p>
                <span className="text-purple-400">&quot;email&quot;</span>:{' '}
                <span className="text-yellow-300">&quot;{data.contact.email}&quot;</span>
              </p>
            )}
            {data.contact.phone && (
              <p>
                <span className="text-purple-400">&quot;phone&quot;</span>:{' '}
                <span className="text-yellow-300">&quot;{data.contact.phone}&quot;</span>
              </p>
            )}
            {data.contact.location && (
              <p>
                <span className="text-purple-400">&quot;location&quot;</span>:{' '}
                <span className="text-yellow-300">
                  &quot;{data.contact.location}&quot;
                </span>
              </p>
            )}
            {data.contact.website && (
              <p>
                <span className="text-purple-400">&quot;website&quot;</span>:{' '}
                <span className="text-yellow-300">
                  &quot;{data.contact.website}&quot;
                </span>
              </p>
            )}
            {data.contact.linkedin && (
              <p>
                <span className="text-purple-400">&quot;linkedin&quot;</span>:{' '}
                <span className="text-yellow-300">
                  &quot;{data.contact.linkedin}&quot;
                </span>
              </p>
            )}
          </div>
        </div>

        {/* summary */}
        {data.summary && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm">
              $ <span className="text-green-400">cat</span> profile.md
            </p>
            <p className="text-gray-400 mt-2 leading-relaxed">{data.summary}</p>
          </div>
        )}

        <div className="border-t border-gray-800 my-4" />

        {/* experience */}
        {data.experience.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-3">
              $ <span className="text-green-400">git log</span>{' '}
              <span className="text-gray-600">--oneline --work-history</span>
            </p>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="mb-4 pl-4 border-l border-green-500/40"
              >
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-green-300 font-bold">{exp.position}</h3>
                    <p className="text-blue-400 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 text-sm">{exp.period}</span>
                </div>
                <p className="text-gray-500 mt-1 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* skills as terminal output */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-3">
              $ <span className="text-green-400">ls</span> skills/
            </p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-[#161b22] text-blue-400 px-3 py-1 text-sm border border-gray-700 rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* education */}
        {data.education.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-3">
              $ <span className="text-green-400">cat</span> education.log
            </p>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="text-green-300 font-semibold text-sm">{edu.degree}</h3>
                <p className="text-gray-500 text-sm">
                  {edu.institution} — {edu.period}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-2">
              $ <span className="text-green-400">ls</span> certs/
            </p>
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((c, i) => (
                <span
                  key={i}
                  className="bg-[#161b22] text-yellow-400 px-3 py-1 text-sm border border-gray-700 rounded"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-4">
            <p className="text-gray-500 text-sm mb-2">
              $ <span className="text-green-400">echo</span> $LANGUAGES
            </p>
            <p className="text-yellow-300 text-sm">{data.languages.join(' | ')}</p>
          </div>
        )}

        <div className="mt-6">
          <span className="text-green-400">$</span>
          <span className="ml-2 inline-block w-2 h-4 bg-green-400 animate-pulse" />
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   6. ELEGANT SIDEBAR
   Deep indigo sidebar (1/3) + white main area (2/3)
   ════════════════════════════════════════════════════════════ */
function SidebarResume({ data }: { data: ResumeData }) {
  return (
    <div className="flex shadow-lg rounded-lg overflow-hidden font-sans bg-white">
      {/* sidebar */}
      <div className="w-1/3 bg-indigo-700 text-white p-8 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-tight">
            {data.fullName || 'Your Name'}
          </h1>
          <p className="text-indigo-200 mt-1 text-sm">
            {data.jobTitle || 'Job Title'}
          </p>
        </div>

        {/* contact */}
        <div className="mb-8">
          <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-indigo-100">
            {data.contact.email && (
              <div className="flex items-center gap-2">
                <MailIcon size={13} className="text-indigo-300" />
                <span>{data.contact.email}</span>
              </div>
            )}
            {data.contact.phone && (
              <div className="flex items-center gap-2">
                <PhoneIcon size={13} className="text-indigo-300" />
                <span>{data.contact.phone}</span>
              </div>
            )}
            {data.contact.location && (
              <div className="flex items-center gap-2">
                <MapPinIcon size={13} className="text-indigo-300" />
                <span>{data.contact.location}</span>
              </div>
            )}
            {data.contact.website && (
              <div className="flex items-center gap-2">
                <GlobeIcon size={13} className="text-indigo-300" />
                <span>{data.contact.website}</span>
              </div>
            )}
            {data.contact.linkedin && (
              <div className="flex items-center gap-2">
                <LinkIcon size={13} className="text-indigo-300" />
                <span>{data.contact.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* skills */}
        {data.skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s, i) => (
                <span
                  key={i}
                  className="bg-indigo-600 text-indigo-100 px-2.5 py-1 text-xs rounded"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* education */}
        {data.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
              Education
            </h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3 last:mb-0 text-sm">
                <p className="font-semibold text-white">{edu.degree}</p>
                <p className="text-indigo-200">{edu.institution}</p>
                <p className="text-indigo-300 text-xs">{edu.period}</p>
              </div>
            ))}
          </div>
        )}

        {/* languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
              Languages
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {data.languages.map((l, i) => (
                <span
                  key={i}
                  className="bg-indigo-600 text-indigo-100 px-2.5 py-1 text-xs rounded"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3">
              Certifications
            </h3>
            <ul className="text-indigo-100 text-xs space-y-1">
              {data.certifications.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <AwardIcon className="text-indigo-300 mt-0.5 shrink-0" size={12} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* main content */}
      <div className="w-2/3 p-8 text-gray-700">
        {/* summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-2 flex items-center gap-2">
              <TargetIcon className="text-indigo-400" size={14} /> Profile
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">{data.summary}</p>
          </div>
        )}

        {/* experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BriefcaseIcon className="text-indigo-400" size={14} /> Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-5 pb-5 border-b border-gray-100 last:border-0">
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                    <p className="text-indigo-600 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-gray-400">{exp.period}</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
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

/* ════════════════════════════════════════════════════════════
   7. SWISS MINIMALIST
   Giant typography, red accent, grid-based layout, bold hierarchy
   ════════════════════════════════════════════════════════════ */
function SwissResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white text-neutral-900 shadow-lg rounded-lg overflow-hidden font-sans">
      {/* header with bold red left border */}
      <div className="border-l-[10px] border-red-600 pl-8 pr-10 py-10">
        <h1 className="text-6xl font-black text-neutral-900 leading-none tracking-tight">
          {data.fullName || 'Your Name'}
        </h1>
        <p className="text-2xl text-neutral-400 mt-3 font-light">
          {data.jobTitle || 'Job Title'}
        </p>
        <ContactRow
          data={data}
          className="text-sm text-neutral-400 mt-6 flex flex-wrap gap-x-8 gap-y-1"
          iconClass="text-red-600"
          separator={<span className="text-neutral-300">|</span>}
        />
      </div>

      <div className="px-10 pb-10">
        <div className="border-t-2 border-neutral-200 mb-10" />

        {/* summary */}
        {data.summary && (
          <div className="mb-10">
            <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-4">
              Profile
            </h2>
            <p className="text-neutral-700 leading-relaxed text-lg font-light">
              {data.summary}
            </p>
          </div>
        )}

        {/* experience — grid layout */}
        {data.experience.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-6">
              Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="mb-8 grid grid-cols-4 gap-6"
              >
                <div className="col-span-1">
                  <p className="text-sm text-neutral-400">{exp.period}</p>
                  <p className="text-sm text-neutral-500 mt-1">{exp.company}</p>
                </div>
                <div className="col-span-3">
                  <h3 className="font-bold text-neutral-900 text-lg">{exp.position}</h3>
                  <p className="text-neutral-600 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* two-column: education + skills */}
        <div className="grid grid-cols-2 gap-10">
          {data.education.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-6">
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <h3 className="font-bold text-neutral-900">{edu.degree}</h3>
                  <p className="text-neutral-500">{edu.institution}</p>
                  <p className="text-neutral-400 text-sm">{edu.period}</p>
                </div>
              ))}
            </div>
          )}

          <div>
            {data.skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-6">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {data.skills.map((s, i) => (
                    <span
                      key={i}
                      className="text-neutral-900 py-1 text-sm border-b-2 border-red-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.languages && data.languages.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-4">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {data.languages.map((l, i) => (
                    <span
                      key={i}
                      className="text-neutral-900 py-1 text-sm border-b-2 border-red-600"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {data.certifications && data.certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-red-600 uppercase tracking-[0.3em] mb-4">
                  Certifications
                </h2>
                <ul className="text-neutral-700 text-sm space-y-1">
                  {data.certifications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   8. NATURE ORGANIC
   Warm earthy palette, centered header, rounded shapes, soft tones
   ════════════════════════════════════════════════════════════ */
function NatureResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#faf8f5] text-stone-700 shadow-lg rounded-2xl overflow-hidden font-sans">
      {/* soft gradient header — centered */}
      <div
        className="text-center px-10 py-10"
        style={{
          background: 'linear-gradient(180deg, #ecfccb 0%, #faf8f5 100%)',
        }}
      >
        <div className="inline-block bg-lime-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
          {(data.fullName || 'Y')[0].toUpperCase()}
        </div>
        <h1 className="text-3xl font-semibold text-stone-800">
          {data.fullName || 'Your Name'}
        </h1>
        <p className="text-lg text-lime-700 mt-1">{data.jobTitle || 'Job Title'}</p>
        <ContactRow
          data={data}
          className="text-sm text-stone-500 mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1"
          iconClass="text-lime-600"
        />
      </div>

      <div className="px-10 pb-10">
        {/* summary */}
        {data.summary && (
          <div className="mb-8 bg-lime-50 p-6 rounded-xl border border-lime-100">
            <h2 className="text-sm font-semibold text-lime-700 mb-2 flex items-center gap-2">
              <TargetIcon className="text-lime-600" size={14} /> About
            </h2>
            <p className="text-stone-600 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* experience — with left lime border */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-lime-700 mb-4 flex items-center gap-2">
              <BriefcaseIcon className="text-lime-600" size={14} /> Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="mb-5 pl-5 border-l-2 border-lime-300 relative"
              >
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-lime-500" />
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-stone-800">{exp.position}</h3>
                    <p className="text-lime-700 text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-stone-400 bg-lime-50 px-3 py-1 rounded-full">
                    {exp.period}
                  </span>
                </div>
                <p className="text-stone-600 mt-2 leading-relaxed text-sm">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* three-column bottom: education, skills, langs/certs */}
        <div className="grid grid-cols-3 gap-6">
          {data.education.length > 0 && (
            <div className="bg-stone-50 p-5 rounded-xl">
              <h2 className="text-xs font-semibold text-lime-700 uppercase tracking-wider mb-3">
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <h3 className="font-semibold text-stone-800 text-sm">{edu.degree}</h3>
                  <p className="text-stone-500 text-xs">{edu.institution}</p>
                  <p className="text-stone-400 text-xs">{edu.period}</p>
                </div>
              ))}
            </div>
          )}

          {data.skills.length > 0 && (
            <div className="bg-lime-50 p-5 rounded-xl">
              <h2 className="text-xs font-semibold text-lime-700 uppercase tracking-wider mb-3">
                Skills
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="bg-lime-100 text-lime-800 px-3 py-1 text-xs rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {data.languages && data.languages.length > 0 && (
              <div className="bg-stone-50 p-5 rounded-xl">
                <h2 className="text-xs font-semibold text-lime-700 uppercase tracking-wider mb-3">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {data.languages.map((l, i) => (
                    <span
                      key={i}
                      className="bg-lime-100 text-lime-800 px-3 py-1 text-xs rounded-full"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.certifications && data.certifications.length > 0 && (
              <div className="bg-stone-50 p-5 rounded-xl">
                <h2 className="text-xs font-semibold text-lime-700 uppercase tracking-wider mb-3">
                  Certifications
                </h2>
                <ul className="text-stone-600 text-xs space-y-1">
                  {data.certifications.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <AwardIcon className="text-lime-600 mt-0.5 shrink-0" size={12} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
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
