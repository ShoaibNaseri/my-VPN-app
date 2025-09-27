import React from 'react'
import { Shield, ShieldCheck, Loader } from 'lucide-react'
import { useVPN } from '../context/VPNContext'

const ConnectionStatus = () => {
  const { isConnected, isConnecting, connectionInfo } = useVPN()

  const getStatusIcon = () => {
    if (isConnecting) {
      return <Loader className="loading-spinner" />
    }
    if (isConnected) {
      return <ShieldCheck />
    }
    return <Shield />
  }

  const getStatusText = () => {
    if (isConnecting) {
      return 'Connecting...'
    }
    if (isConnected) {
      return 'Connected'
    }
    return 'Disconnected'
  }

  const getStatusDetails = () => {
    if (isConnecting) {
      return 'Establishing secure connection...'
    }
    if (isConnected) {
      return `Connected to ${connectionInfo.location}`
    }
    return 'Click connect to secure your connection'
  }

  const getStatusClass = () => {
    if (isConnecting) return 'status-connecting'
    if (isConnected) return 'status-connected'
    return 'status-disconnected'
  }

  return (
    <div className="connection-status">
      <div className={`status-indicator ${getStatusClass()}`}>
        {getStatusIcon()}
      </div>
      <div className="status-text">{getStatusText()}</div>
      <div className="status-details">{getStatusDetails()}</div>
    </div>
  )
}

export default ConnectionStatus
