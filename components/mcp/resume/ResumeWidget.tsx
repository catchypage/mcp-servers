'use client'

import { useState } from 'react'

export default function ResumeWidget() {
  const [jobTitle, setJobTitle] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!jobTitle.trim()) {
      return
    }
    setLoading(true)
    setResult(null)

    try {
      if (
        typeof window !== 'undefined' &&
        (
          window as unknown as {
            openai?: {
              callTool?: (
                name: string,
                args: Record<string, unknown>,
              ) => Promise<unknown>
            }
          }
        ).openai?.callTool
      ) {
        const res = await (
          window as unknown as {
            openai: {
              callTool: (
                name: string,
                args: Record<string, unknown>,
              ) => Promise<{ structuredContent?: { resume?: unknown } }>
            }
          }
        ).openai.callTool('create_resume', {
          job_title: jobTitle,
          experience: experience || undefined,
          skills: skills
            ? skills
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
            : undefined,
        })
        setResult(
          JSON.stringify(
            (res as { structuredContent?: { resume?: unknown } })
              ?.structuredContent?.resume ?? res,
            null,
            2,
          ),
        )
      } else {
        setResult(
          JSON.stringify(
            {
              jobTitle,
              experience: experience || 'To be filled',
              skills: skills
                ? skills.split(',').map((s) => s.trim())
                : ['Add your skills'],
            },
            null,
            2,
          ),
        )
      }
    } catch (err) {
      setResult('Error: ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="resume-widget min-h-screen bg-gray-950 p-6 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-bold">Resume Builder</h1>

        <div className="mb-4">
          <label className="mb-2 block text-sm text-gray-400">
            Job Title *
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Software Engineer"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm text-gray-400">Experience</label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Brief work experience..."
            rows={3}
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-400">
            Skills (comma-separated)
          </label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. React, TypeScript, Node.js"
            className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          onClick={() => void handleCreate()}
          disabled={loading || !jobTitle.trim()}
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Resume'}
        </button>

        {result && (
          <pre className="mt-6 overflow-auto rounded-lg border border-white/10 bg-black/30 p-4 text-sm">
            {result}
          </pre>
        )}
      </div>
    </div>
  )
}
