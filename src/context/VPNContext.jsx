import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const VPNContext = createContext();

export const useVPN = () => {
  const context = useContext(VPNContext);
  if (!context) {
    throw new Error("useVPN must be used within a VPNProvider");
  }
  return context;
};

export const VPNProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [connectionInfo, setConnectionInfo] = useState({
    server: "",
    ip: "",
    location: "",
    ping: 0,
  });
  const [countries, setCountries] = useState([]);
  const [ws, setWs] = useState(null);

  // WebSocket connection
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:5001");

    websocket.onopen = () => {
      console.log("Connected to VPN backend");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "state_update") {
        const vpnState = data.data;
        setIsConnected(vpnState.isConnected);
        setIsConnecting(vpnState.isConnecting);
        setConnectionInfo(vpnState.connectionInfo);
      }
    };

    websocket.onclose = () => {
      console.log("Disconnected from VPN backend");
      setWs(null);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      websocket.close();
    };
  }, []);

  // Fetch available servers
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/servers");
        const servers = await response.json();
        setCountries(servers);
      } catch (error) {
        console.error("Failed to fetch servers:", error);
        // Fallback to default servers
        setCountries([
          {
            code: "us",
            name: "United States",
            flag: "🇺🇸",
            server: "us-east-1.vpn.com",
          },
          {
            code: "uk",
            name: "United Kingdom",
            flag: "🇬🇧",
            server: "uk-london.vpn.com",
          },
          {
            code: "de",
            name: "Germany",
            flag: "🇩🇪",
            server: "de-frankfurt.vpn.com",
          },
          { code: "jp", name: "Japan", flag: "🇯🇵", server: "jp-tokyo.vpn.com" },
          {
            code: "ca",
            name: "Canada",
            flag: "🇨🇦",
            server: "ca-toronto.vpn.com",
          },
          {
            code: "au",
            name: "Australia",
            flag: "🇦🇺",
            server: "au-sydney.vpn.com",
          },
          {
            code: "fr",
            name: "France",
            flag: "🇫🇷",
            server: "fr-paris.vpn.com",
          },
          {
            code: "sg",
            name: "Singapore",
            flag: "🇸🇬",
            server: "sg-singapore.vpn.com",
          },
          {
            code: "nl",
            name: "Netherlands",
            flag: "🇳🇱",
            server: "nl-amsterdam.vpn.com",
          },
          {
            code: "ch",
            name: "Switzerland",
            flag: "🇨🇭",
            server: "ch-zurich.vpn.com",
          },
          {
            code: "se",
            name: "Sweden",
            flag: "🇸🇪",
            server: "se-stockholm.vpn.com",
          },
          { code: "no", name: "Norway", flag: "🇳🇴", server: "no-oslo.vpn.com" },
        ]);
      }
    };

    fetchServers();
  }, []);

  const connect = useCallback(async () => {
    if (isConnecting || isConnected) return;

    try {
      const response = await fetch("http://localhost:5001/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ country: selectedCountry }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert(`Connection failed: ${error.message}`);
    }
  }, [isConnecting, isConnected, selectedCountry]);

  const disconnect = useCallback(async () => {
    if (isConnecting || !isConnected) return;

    try {
      const response = await fetch("http://localhost:5001/api/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Disconnection failed:", error);
      alert(`Disconnection failed: ${error.message}`);
    }
  }, [isConnecting, isConnected]);

  const selectCountry = useCallback(
    (countryCode) => {
      if (isConnected || isConnecting) return;
      setSelectedCountry(countryCode);
    },
    [isConnected, isConnecting]
  );

  const value = {
    isConnected,
    isConnecting,
    selectedCountry,
    connectionInfo,
    countries,
    connect,
    disconnect,
    selectCountry,
  };

  return <VPNContext.Provider value={value}>{children}</VPNContext.Provider>;
};
