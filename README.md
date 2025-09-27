# 🔒 MyVPN - Modern VPN Application

A beautiful, responsive VPN application built with React, Vite, Node.js, and Docker. Features real-time connection status, country selection, and a modern UI with WebSocket communication.

![VPN App](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Features

- 🌍 **Real VPN Connections**: Actual OpenVPN integration with 12 server locations worldwide
- 🔒 **Secure Encryption**: AES-256-CBC encryption with SHA256 authentication
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🐳 **Docker Support**: Easy deployment with Docker and Docker Compose
- ⚡ **Real-time Updates**: WebSocket-based real-time connection status
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations
- 🔧 **Backend API**: Node.js backend with Express and WebSocket support
- 🛡️ **Security**: Proper certificate management and secure connections

## Available Server Locations

- 🇺🇸 United States (US East)
- 🇬🇧 United Kingdom (London)
- 🇩🇪 Germany (Frankfurt)
- 🇯🇵 Japan (Tokyo)
- 🇨🇦 Canada (Toronto)
- 🇦🇺 Australia (Sydney)
- 🇫🇷 France (Paris)
- 🇸🇬 Singapore
- 🇳🇱 Netherlands (Amsterdam)
- 🇨🇭 Switzerland (Zurich)
- 🇸🇪 Sweden (Stockholm)
- 🇳🇴 Norway (Oslo)

## 🎯 Demo

**Live Demo:** [Visit the application](http://localhost:3000) (after running locally)

### ✨ Features Showcase
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 🌍 **12 Countries** - Select from US, UK, Germany, Japan, Canada, Australia, France, Singapore, Netherlands, Switzerland, Sweden, Norway
- ⚡ **Real-time Updates** - WebSocket-powered connection status
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- 🔧 **Easy Setup** - One-command Docker deployment

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd myVPN
   ```

2. **Run the setup script**

   ```bash
   ./setup.sh
   ```

   This will:

   - Generate demo certificates
   - Build Docker containers
   - Start all services
   - Verify everything is running

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Manual Setup

1. **Install dependencies**

   ```bash
   # Frontend
   npm install

   # Backend
   cd backend
   npm install
   ```

2. **Generate certificates**

   ```bash
   cd backend/certs
   # Follow the certificate generation steps in setup.sh
   ```

3. **Start services**

   ```bash
   # Start backend
   cd backend
   npm start

   # Start frontend (in another terminal)
   npm run dev
   ```

### Development Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start development server**

   ```bash
   npm run dev
   ```

3. **Build for production**

   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Docker Commands

### Build the Docker image

```bash
docker build -t myvpn-app .
```

### Run the container

```bash
docker run -p 3000:80 myvpn-app
```

### Stop the container

```bash
docker-compose down
```

### Rebuild after changes

```bash
docker-compose up --build --force-recreate
```

## Project Structure

```
myVPN/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── ConnectionStatus.jsx
│   │   ├── CountrySelector.jsx
│   │   ├── ConnectionButton.jsx
│   │   └── ConnectionInfo.jsx
│   ├── context/            # React context
│   │   └── VPNContext.jsx
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── nginx.conf              # Nginx configuration
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **Docker** - Containerization
- **Nginx** - Web server for production
- **CSS3** - Modern styling with gradients and animations

## Features in Detail

### Connection Management

- Real-time connection status with visual indicators
- Smooth animations during connection/disconnection
- Connection details display (IP, server, ping, location)

### Country Selection

- Grid-based country selection interface
- Flag emojis for visual identification
- Disabled state during connection to prevent changes

### Responsive Design

- Mobile-first approach
- Adaptive grid layouts
- Touch-friendly interface elements

### Security Features

- Simulated secure connection process
- Connection state management
- Error handling for connection failures

## Customization

### Adding New Countries

Edit the `countries` array in `src/context/VPNContext.jsx`:

```javascript
const countries = [
  {
    code: "new",
    name: "New Country",
    flag: "🏳️",
    server: "new-server.vpn.com",
  },
  // ... existing countries
];
```

### Styling

Modify `src/index.css` to customize:

- Colors and gradients
- Animations and transitions
- Layout and spacing
- Typography

### Connection Logic

Update the connection simulation in `src/context/VPNContext.jsx` to integrate with real VPN services.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a demonstration application with simulated VPN functionality. For production use, integrate with actual VPN services and implement proper security measures.
