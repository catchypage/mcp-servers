import React from 'react'
import { type ResumeData } from '../types'
import { ContactRow } from '../shared/ContactRow'
import { BriefcaseIcon, TargetIcon, AwardIcon } from '../icons'

export function ExecutiveResume({ data }: { data: ResumeData }) {
  return (
    <div className="bg-[#1a1a2e] text-gray-100 shadow-lg rounded-lg overflow-hidden font-sans">
      {/* gold top banner header */}
      <div
        className="px-10 py-8"
        style={{
          background:
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
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
              <TargetIcon className="text-amber-400" size={14} /> Executive
              Summary
            </h2>
            <p className="text-gray-300 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* experience — timeline style with gold left border */}
        {data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <BriefcaseIcon className="text-amber-400" size={14} /> Career
              History
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
                <p className="text-gray-400 mt-2 leading-relaxed">
                  {exp.description}
                </p>
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
