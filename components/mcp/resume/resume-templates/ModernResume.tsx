import React from 'react'
import { type ResumeData } from '../types'
import { ContactRow } from '../shared/ContactRow'

export function ModernResume({ data }: { data: ResumeData }) {
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
