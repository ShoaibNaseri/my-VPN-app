const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// VPN Server configurations
const vpnServers = {
  us: {
    name: "United States",
    flag: "🇺🇸",
    server: "us-east-1.vpn.com",
    config: "us-east.ovpn",
    country: "US",
  },
  uk: {
    name: "United Kingdom",
    flag: "🇬🇧",
    server: "uk-london.vpn.com",
    config: "uk-london.ovpn",
    country: "UK",
  },
  de: {
    name: "Germany",
    flag: "🇩🇪",
    server: "de-frankfurt.vpn.com",
    config: "de-frankfurt.ovpn",
    country: "DE",
  },
  jp: {
    name: "Japan",
    flag: "🇯🇵",
    server: "jp-tokyo.vpn.com",
    config: "jp-tokyo.ovpn",
    country: "JP",
  },
  ca: {
    name: "Canada",
    flag: "🇨🇦",
    server: "ca-toronto.vpn.com",
    config: "ca-toronto.ovpn",
    country: "CA",
  },
  au: {
    name: "Australia",
    flag: "🇦🇺",
    server: "au-sydney.vpn.com",
    config: "au-sydney.ovpn",
    country: "AU",
  },
  fr: {
    name: "France",
    flag: "🇫🇷",
    server: "fr-paris.vpn.com",
    config: "fr-paris.ovpn",
    country: "FR",
  },
  sg: {
    name: "Singapore",
    flag: "🇸🇬",
    server: "sg-singapore.vpn.com",
    config: "sg-singapore.ovpn",
    country: "SG",
  },
  nl: {
    name: "Netherlands",
    flag: "🇳🇱",
    server: "nl-amsterdam.vpn.com",
    config: "nl-amsterdam.ovpn",
    country: "NL",
  },
  ch: {
    name: "Switzerland",
    flag: "🇨🇭",
    server: "ch-zurich.vpn.com",
    config: "ch-zurich.ovpn",
    country: "CH",
  },
  se: {
    name: "Sweden",
    flag: "🇸🇪",
    server: "se-stockholm.vpn.com",
    config: "se-stockholm.ovpn",
    country: "SE",
  },
  no: {
    name: "Norway",
    flag: "🇳🇴",
    server: "no-oslo.vpn.com",
    config: "no-oslo.ovpn",
    country: "NO",
  },
};

// VPN Connection state
let vpnState = {
  isConnected: false,
  isConnecting: false,
  currentServer: null,
  connectionInfo: {
    server: "",
    ip: "",
    location: "",
    ping: 0,
  },
  process: null,
};

// Create WebSocket server
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send current VPN state to new client
  ws.send(
    JSON.stringify({
      type: "state_update",
      data: vpnState,
    })
  );

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Broadcast function to send updates to all connected clients
function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// VPN Management functions
async function connectVPN(countryCode) {
  if (vpnState.isConnected || vpnState.isConnecting) {
    return {
      success: false,
      message: "VPN is already connected or connecting",
    };
  }

  const server = vpnServers[countryCode];
  if (!server) {
    return { success: false, message: "Invalid country code" };
  }

  vpnState.isConnecting = true;
  vpnState.currentServer = server;
  broadcast({ type: "state_update", data: vpnState });

  try {
    // Check if OpenVPN is available
    const configPath = path.join(__dirname, "configs", server.config);

    if (!fs.existsSync(configPath)) {
      throw new Error(`Configuration file not found: ${server.config}`);
    }

    // For demo purposes, we'll simulate the connection
    // In production, you would use actual OpenVPN commands:
    // const openvpnProcess = spawn('openvpn', [
    //   '--config', configPath,
    //   '--daemon',
    //   '--log', '/tmp/openvpn.log'
    // ]);

    // Simulate connection process with real timing
    console.log(`🔗 Simulating VPN connection to ${server.name}...`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`🌐 Routing traffic through ${server.server}...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate realistic connection info
    const mockIP = `10.${Math.floor(Math.random() * 255)}.${Math.floor(
      Math.random() * 255
    )}.${Math.floor(Math.random() * 255)}`;
    const mockPing = Math.floor(Math.random() * 50) + 20;

    vpnState.isConnected = true;
    vpnState.isConnecting = false;
    vpnState.connectionInfo = {
      server: server.server,
      ip: mockIP,
      location: server.name,
      ping: mockPing,
    };

    // Store the process reference for disconnection
    vpnState.process = { pid: Math.floor(Math.random() * 10000) };

    broadcast({ type: "state_update", data: vpnState });

    return { success: true, message: "Connected successfully" };
  } catch (error) {
    vpnState.isConnecting = false;
    vpnState.currentServer = null;
    broadcast({ type: "state_update", data: vpnState });

    return { success: false, message: error.message };
  }
}

async function disconnectVPN() {
  if (!vpnState.isConnected) {
    return { success: false, message: "VPN is not connected" };
  }

  vpnState.isConnecting = true;
  broadcast({ type: "state_update", data: vpnState });

  try {
    // In production, you would kill the OpenVPN process:
    // if (vpnState.process) {
    //   process.kill(vpnState.process.pid, 'SIGTERM');
    // }

    // Simulate disconnection process
    await new Promise((resolve) => setTimeout(resolve, 1500));

    vpnState.isConnected = false;
    vpnState.isConnecting = false;
    vpnState.currentServer = null;
    vpnState.process = null;
    vpnState.connectionInfo = {
      server: "",
      ip: "",
      location: "",
      ping: 0,
    };

    broadcast({ type: "state_update", data: vpnState });

    return { success: true, message: "Disconnected successfully" };
  } catch (error) {
    vpnState.isConnecting = false;
    broadcast({ type: "state_update", data: vpnState });

    return { success: false, message: error.message };
  }
}

// API Routes
app.get("/api/servers", (req, res) => {
  res.json(
    Object.keys(vpnServers).map((code) => ({
      code,
      ...vpnServers[code],
    }))
  );
});

app.get("/api/status", (req, res) => {
  res.json(vpnState);
});

app.post("/api/connect", async (req, res) => {
  const { country } = req.body;

  if (!country) {
    return res
      .status(400)
      .json({ success: false, message: "Country code is required" });
  }

  const result = await connectVPN(country);
  res.json(result);
});

app.post("/api/disconnect", async (req, res) => {
  const result = await disconnectVPN();
  res.json(result);
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Start server
server.listen(PORT, "0.0.0.0", () => {
  console.log(`VPN Backend Server running on port ${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  if (vpnState.process) {
    vpnState.process.kill();
  }
  server.close(() => {
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received, shutting down gracefully");
  if (vpnState.process) {
    vpnState.process.kill();
  }
  server.close(() => {
    process.exit(0);
  });
});
