import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ConnectionStatus from './components/ConnectionStatus'
import CountrySelector from './components/CountrySelector'
import ConnectionButton from './components/ConnectionButton'
import ConnectionInfo from './components/ConnectionInfo'
import { VPNProvider } from './context/VPNContext'

function App() {
  return (
    <VPNProvider>
      <div className="container">
        <Header />
        <ConnectionStatus />
        <CountrySelector />
        <ConnectionButton />
        <ConnectionInfo />
      </div>
    </VPNProvider>
  )
}

export default App
