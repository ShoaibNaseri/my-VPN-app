import React from "react";
import { useVPN } from "../context/VPNContext";

const ConnectionButton = () => {
  const { isConnected, isConnecting, connect, disconnect } = useVPN();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const getButtonText = () => {
    if (isConnecting) {
      return "Connecting...";
    }
    if (isConnected) {
      return "Disconnect";
    }
    return "Connect";
  };

  const getButtonClass = () => {
    if (isConnected) {
      return "connection-button disconnect-button";
    }
    return "connection-button connect-button";
  };

  return (
    <button
      className={getButtonClass()}
      onClick={handleClick}
      disabled={isConnecting}
    >
      {getButtonText()}
    </button>
  );
};

export default ConnectionButton;
