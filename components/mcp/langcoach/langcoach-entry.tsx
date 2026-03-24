import React from 'react'
import ReactDOM from 'react-dom/client'
import LangCoachWidget from './LangCoachWidget'

function initWidget() {
  const rootElement = document.getElementById('langcoach-widget-root')

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <LangCoachWidget />
      </React.StrictMode>,
    )
  } else {
    console.error('Lang Coach widget root element not found')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget)
} else {
  initWidget()
}
