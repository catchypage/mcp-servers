import React from 'react'
import { type ResumeData } from '../types'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeIcon,
  LinkIcon,
} from '../icons'

interface ContactRowProps {
  data: ResumeData
  className?: string
  iconClass?: string
  separator?: React.ReactNode
}

export function ContactRow({
  data,
  className,
  iconClass,
  separator,
}: ContactRowProps) {
  const items: { icon: typeof MailIcon; value: string }[] = []
  if (data.contact.email) items.push({ icon: MailIcon, value: data.contact.email })
  if (data.contact.phone) items.push({ icon: PhoneIcon, value: data.contact.phone })
  if (data.contact.location)
    items.push({ icon: MapPinIcon, value: data.contact.location })
  if (data.contact.website)
    items.push({ icon: GlobeIcon, value: data.contact.website })
  if (data.contact.linkedin)
    items.push({ icon: LinkIcon, value: data.contact.linkedin })
  if (items.length === 0) return null
  return (
    <div className={className}>
      {items.map((c, i) => (
        <React.Fragment key={i}>
          <span className="flex items-center gap-1.5">
            <c.icon className={iconClass} size={14} />
            {c.value}
          </span>
          {separator && i < items.length - 1 && separator}
        </React.Fragment>
      ))}
    </div>
  )
}
