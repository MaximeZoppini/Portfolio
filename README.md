*Official website: [maximezoppini.fr](https://maximezoppini.fr)*

# Maxime's Portfolio

An interactive, chat-based personal portfolio built with React, TypeScript, and Framer Motion. The application serves as a dynamic resume, featuring a unique, conversational chat interface to present professional experience, education, and skills.

## Tech Stack

- **Framework:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS, Radix UI Primitives
- **Animations:** Framer Motion
- **Icons & UI:** Lucide React, Custom SVG elements
- **Deployment:** Docker, Nginx

## Features

- **Interactive Chat Interface:** Navigate through the portfolio by interacting with an automated chat system.
- **Responsive Design:** Fully optimized for both desktop and mobile devices.
- **Smooth Animations:** Integrated with `framer-motion` for polished transitions and UI micro-interactions.
- **Easter Eggs:** Hidden features and "infected" states scattered within the chat logic.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## 📦 Building for Production

To compile the application into static files for production usage:

```bash
npm run build
```

## 🐳 Docker Deployment

The repository includes a `Dockerfile` multi-stage build and an `nginx.conf` for serving the static files securely and efficiently.

```bash
# Build the Docker image
docker build -t portfolio .

# Run the container (e.g., on port 8080)
docker run -p 8080:80 portfolio
```