import React from 'react'
import { type ResumeData } from '../types'
import { ContactRow } from '../shared/ContactRow'

export function SwissResume({ data }: { data: ResumeData }) {
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
              <div key={i} className="mb-8 grid grid-cols-4 gap-6">
                <div className="col-span-1">
                  <p className="text-sm text-neutral-400">{exp.period}</p>
                  <p className="text-sm text-neutral-500 mt-1">{exp.company}</p>
                </div>
                <div className="col-span-3">
                  <h3 className="font-bold text-neutral-900 text-lg">
                    {exp.position}
                  </h3>
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
