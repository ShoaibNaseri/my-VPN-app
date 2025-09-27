import React from 'react'
import { useVPN } from '../context/VPNContext'

const CountrySelector = () => {
  const { countries, selectedCountry, selectCountry, isConnected, isConnecting } = useVPN()

  return (
    <div className="country-selector">
      <h3>Select Server Location</h3>
      <div className="country-grid">
        {countries.map((country) => (
          <div
            key={country.code}
            className={`country-option ${selectedCountry === country.code ? 'selected' : ''}`}
            onClick={() => selectCountry(country.code)}
            style={{
              opacity: isConnected || isConnecting ? 0.6 : 1,
              cursor: isConnected || isConnecting ? 'not-allowed' : 'pointer'
            }}
          >
            <div className="country-flag">{country.flag}</div>
            <div>{country.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CountrySelector
