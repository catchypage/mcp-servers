import React from 'react'
import { type ResumeData } from '../types'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  LinkIcon,
  TargetIcon,
  BriefcaseIcon,
  AwardIcon,
} from '../icons'

export function SidebarResume({ data }: { data: ResumeData }) {
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
                  <AwardIcon
                    className="text-indigo-300 mt-0.5 shrink-0"
                    size={12}
                  />
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
            <p className="text-gray-600 leading-relaxed text-sm">
              {data.summary}
            </p>
          </div>
        )}

        {/* experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BriefcaseIcon className="text-indigo-400" size={14} /> Experience
            </h2>
            {data.experience.map((exp, i) => (
              <div
                key={i}
                className="mb-5 pb-5 border-b border-gray-100 last:border-0"
              >
                <div className="flex justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {exp.position}
                    </h3>
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
