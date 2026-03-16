import React from 'react'
import ReactDOM from 'react-dom/client'
import ChefPlanWidget from './ChefPlanWidget'

function initWidget() {
  const rootElement = document.getElementById('chefplan-widget-root')

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <ChefPlanWidget />
      </React.StrictMode>,
    )
  } else {
    console.error('ChefPlan widget root element not found')
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget)
} else {
  initWidget()
}
