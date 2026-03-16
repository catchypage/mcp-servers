'use client'

import { useEffect, useRef } from 'react'

export default function MetricsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    const characters = '0123456789'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / fontSize)
    }

    const draw = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark'

      ctx.fillStyle = isDark
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = isDark
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.1)'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const animationId = setInterval(draw, 40)

    const handleResize = () => {
      resizeCanvas()
      const newColumns = Math.floor(canvas.width / fontSize)
      drops.length = newColumns
      for (let i = 0; i < newColumns; i++) {
        if (drops[i] === undefined) {
          drops[i] = Math.floor((Math.random() * canvas.height) / fontSize)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div className="absolute inset-0 company-bg-primary" />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
