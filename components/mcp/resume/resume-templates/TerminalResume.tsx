import React from 'react'
import { type ResumeData } from '../types'

export function TerminalResume({ data }: { data: ResumeData }) {
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
