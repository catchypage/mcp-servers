import React from 'react'
import ReactDOM from 'react-dom/client'
import NutriWidget from './NutriWidget'

function initWidget() {
  const rootElement = document.getElementById('nutri-widget-root')
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <NutriWidget />
      </React.StrictMode>,
    )
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget)
} else {
  initWidget()
}
