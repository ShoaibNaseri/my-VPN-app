import React from 'react'

const Header = () => {
  return (
    <div className="header">
      <h1 className="logo">MyVPN</h1>
      <p className="subtitle">Secure your connection, protect your privacy</p>
      <div style={{ 
        background: 'rgba(255, 193, 7, 0.1)', 
        border: '1px solid rgba(255, 193, 7, 0.3)', 
        borderRadius: '8px', 
        padding: '10px', 
        marginTop: '10px',
        fontSize: '0.9rem',
        color: '#856404'
      }}>
        ⚠️ <strong>Demo Mode:</strong> This is a demonstration app. For real VPN functionality, integrate with actual VPN services.
      </div>
    </div>
  )
}

export default Header
