import { MouseEvent, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps {
  id: string
  className?: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  showStripe?: boolean
}

const Modal = ({
  id,
  className = '',
  isOpen,
  onClose,
  children,
  showStripe = true,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || typeof window === 'undefined') {
    return null
  }

  const modalContent = (
    <div
      id={id}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
      className={`fixed z-[9999999] h-[100vh] w-[100vw] top-0 left-0 flex justify-center items-center p-4 ${className}`}
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-hidden backdrop-blur-xl rounded-xl shadow-xl"
        style={{
          backgroundColor: 'var(--company-bg-secondary)',
          border: '1px solid var(--company-border-primary)',
        }}
      >
        {showStripe && (
          <div className="relative">
            <div
              className="absolute inset-0 h-1"
              style={{
                background:
                  'linear-gradient(90deg, var(--accent-gold), var(--accent-yellow))',
              }}
            />
          </div>
        )}
        {children}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export { Modal }
