/**
 * Resume data types
 */

export interface ContactInfo {
  email?: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
}

export interface Experience {
  company: string
  position: string
  period: string
  description: string
}

export interface Education {
  institution: string
  degree: string
  period: string
  description?: string
}

export interface ResumeData {
  fullName: string
  jobTitle: string
  summary: string
  contact: ContactInfo
  experience: Experience[]
  education: Education[]
  skills: string[]
  languages?: string[]
  certifications?: string[]
}
