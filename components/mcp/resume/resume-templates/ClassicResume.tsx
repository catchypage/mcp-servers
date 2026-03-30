import React from 'react'
import { type ResumeData } from '../types'
import { ContactRow } from '../shared/ContactRow'
import {
  BriefcaseIcon,
  GraduationCapIcon,
  CodeIcon,
  TargetIcon,
  AwardIcon,
  GlobeIcon,
} from '../icons'

export function ClassicResume({ data }: { data: ResumeData }) {
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
            <TargetIcon className="text-[#1e3a5f]" size={14} /> Professional
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* experience */}
      {data.experience.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 flex items-center gap-2">
            <BriefcaseIcon className="text-[#1e3a5f]" size={14} /> Work
            Experience
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
              <p className="text-gray-700 mt-1 leading-relaxed">
                {exp.description}
              </p>
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
