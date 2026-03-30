import { type ResumeData, type Experience, type Education } from '../types'

export const emptyExperience: Experience = {
  company: '',
  position: '',
  period: '',
  description: '',
}

export const emptyEducation: Education = {
  institution: '',
  degree: '',
  period: '',
  description: '',
}

export const initialResumeData: ResumeData = {
  fullName: '',
  jobTitle: '',
  summary: '',
  contact: {
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
  },
  experience: [{ ...emptyExperience }],
  education: [{ ...emptyEducation }],
  skills: [],
  languages: [],
  certifications: [],
}

export const demoData: ResumeData = {
  fullName: 'Alex Johnson',
  jobTitle: 'Senior Product Designer',
  summary:
    'Creative professional with 8+ years of experience in user-centered design, leading cross-functional teams.',
  contact: {
    email: 'alex@example.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    website: 'alexjohnson.design',
    linkedin: 'linkedin.com/in/alexj',
  },
  experience: [
    {
      company: 'TechCorp Inc.',
      position: 'Lead Designer',
      period: '2021 - Present',
      description:
        'Led redesign of flagship product, increasing user engagement by 40%.',
    },
    {
      company: 'StartupXYZ',
      position: 'UX Designer',
      period: '2018 - 2021',
      description: 'Built design system from scratch serving 12 product teams.',
    },
  ],
  education: [
    {
      institution: 'Stanford University',
      degree: 'M.S. Human-Computer Interaction',
      period: '2016 - 2018',
    },
  ],
  skills: ['Figma', 'React', 'User Research', 'Design Systems', 'Prototyping'],
  languages: ['English', 'Spanish'],
  certifications: [],
}
