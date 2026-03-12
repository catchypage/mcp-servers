import React from 'react'
import ReactDOM from 'react-dom/client'
import ResumeWidget from './ResumeWidget'

function initWidget() {
  const rootElement = document.getElementById('resume-widget-root')

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <ResumeWidget />
      </React.StrictMode>
    )
  } else {
    console.error('Resume widget root element not found')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget)
} else {
  initWidget()
}
