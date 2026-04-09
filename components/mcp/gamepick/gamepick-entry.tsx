import React from 'react'
import ReactDOM from 'react-dom/client'
import GamePickWidget from './GamePickWidget'

function initWidget() {
  const rootElement = document.getElementById('gamepick-root')
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <GamePickWidget />
      </React.StrictMode>,
    )
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget)
} else {
  initWidget()
}
