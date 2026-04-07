import React from 'react'
import ReactDOM from 'react-dom/client'
import MoviePickWidget from './MoviePickWidget'

function initWidget() {
  const rootElement = document.getElementById('moviepick-root')
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
      <React.StrictMode>
        <MoviePickWidget />
      </React.StrictMode>,
    )
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget)
} else {
  initWidget()
}
