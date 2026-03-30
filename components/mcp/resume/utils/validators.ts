import { type ResumeData } from '../types'

export function isPersonalFilled(d: ResumeData): boolean {
  return !!(d.fullName.trim() || d.jobTitle.trim() || d.summary.trim())
}

export function isContactFilled(d: ResumeData): boolean {
  const c = d.contact
  return !!(c.email?.trim() || c.phone?.trim() || c.location?.trim() || c.website?.trim() || c.linkedin?.trim())
}

export function isExperienceFilled(d: ResumeData): boolean {
  return d.experience.some((e) => e.position.trim() || e.company.trim())
}

export function isEducationFilled(d: ResumeData): boolean {
  return d.education.some((e) => e.degree.trim() || e.institution.trim())
}

export function isSkillsFilled(d: ResumeData): boolean {
  return d.skills.length > 0
}

export function isLanguagesFilled(d: ResumeData): boolean {
  return (d.languages || []).length > 0
}

export function isCertificationsFilled(d: ResumeData): boolean {
  return (d.certifications || []).length > 0
}
