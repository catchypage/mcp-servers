import React from 'react'
import { type ResumeData } from '../types'
import { ContactRow } from '../shared/ContactRow'
import {
  TargetIcon,
  BriefcaseIcon,
  AwardIcon,
} from '../icons'

export function NatureResume({ data }: { data: ResumeData }) {
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
