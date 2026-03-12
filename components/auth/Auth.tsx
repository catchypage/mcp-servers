'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/hooks/UI/Modal'
import SignModal from './SignModal'
import RegisterModal from './RegisterModal'

interface AuthProps {
  modalAuth?: string | null
  modalRegister?: string | null
  onModalOpen?: (modalId: string) => void
}

const Auth = ({
  modalAuth = 'modal__auth',
  modalRegister = 'modal__register',
  onModalOpen,
}: AuthProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [options, setOptions] = useState({
    scope: 'email profile',
    state: 'default_state',
  })
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  // Initialize options only on client side
  useEffect(() => {
    const newOptions = {
      scope: 'email profile',
      state: 'default_state',
    }
    setOptions(newOptions)
  }, [])

  const handleOpenModal = (modalId: string) => {
    if (onModalOpen) {
      onModalOpen(modalId)
    } else {
      setActiveModal(modalId)
    }
  }

  const handleCloseModal = () => {
    setActiveModal(null)
  }

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => modalAuth && handleOpenModal(modalAuth)}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap company-shadow-sm"
          style={{
            backgroundColor: 'var(--company-button-primary-bg)',
            color: 'var(--company-button-primary-text)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--company-button-primary-hover)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--company-button-primary-bg)'
          }}
        >
          Sign in
        </button>
        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap border-2"
          style={{
            color: 'var(--company-button-secondary-text)',
            borderColor: 'var(--company-button-secondary-border)',
            backgroundColor: 'var(--company-button-secondary-bg)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--company-button-secondary-hover-bg)'
            e.currentTarget.style.color = 'var(--company-button-secondary-hover-text)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--company-button-secondary-bg)'
            e.currentTarget.style.color = 'var(--company-button-secondary-text)'
          }}
        >
          Sign up
        </button>
      </div>

      {/* Fallback modals if no parent handler */}
      {!onModalOpen && modalAuth && (
        <Modal
          id={modalAuth}
          isOpen={activeModal === modalAuth}
          onClose={handleCloseModal}
          showStripe={false}
        >
          <SignModal options={options} />
        </Modal>
      )}

      {!onModalOpen && modalRegister && (
        <Modal
          id={modalRegister}
          isOpen={activeModal === modalRegister}
          onClose={handleCloseModal}
          showStripe={false}
        >
          <SignModal options={options} register />
        </Modal>
      )}

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => {
          setShowRegisterModal(false)
        }}
      />
    </>
  )
}

export default Auth
