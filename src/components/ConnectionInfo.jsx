import React from "react";
import { useVPN } from "../context/VPNContext";

const ConnectionInfo = () => {
  const { isConnected, connectionInfo } = useVPN();

  if (!isConnected) {
    return null;
  }

  return (
    <div className="connection-info">
      <h4>Connection Details</h4>
      <div className="info-item">
        <span className="info-label">Server:</span>
        <span className="info-value">{connectionInfo.server}</span>
      </div>
      <div className="info-item">
        <span className="info-label">IP Address:</span>
        <span className="info-value">{connectionInfo.ip}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Location:</span>
        <span className="info-value">{connectionInfo.location}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Ping:</span>
        <span className="info-value">{connectionInfo.ping}ms</span>
      </div>
    </div>
  );
};

export default ConnectionInfo;
