import React from 'react'
import { type ResumeData } from '../types'
import { ContactRow } from '../shared/ContactRow'
import { AwardIcon } from '../icons'

export function CreativeResume({ data }: { data: ResumeData }) {
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
