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
      className={`fixed z-[9999999] h-[100vh] w-[100vw] top-0 left-0 bg-black bg-opacity-30 flex justify-center items-center p-4 ${className}`}
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-hidden bg-gray-900/90 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl">
        {showStripe && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-fuchsia-500 to-cyan-400 h-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/5 via-fuchsia-500/5 to-cyan-400/5 opacity-30" />
          </div>
        )}
        {children}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}

export { Modal }
