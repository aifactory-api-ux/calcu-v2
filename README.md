# Calculadora

Simple calculator web application with sum and subtract operations.

## Prerequisites

- Docker 24.x
- Docker Compose 2.x

## Setup

1. Clone the repository
2. Run `./run.sh`

The application will be available at http://localhost:8080

## Local Development

```bash
cd frontend
npm install
npm run dev
```

## Build

```bash
cd frontend
npm install
npm run build
```

## Deployment

The application can be deployed to any static hosting service (Netlify, GitHub Pages, etc.) by deploying the `dist/` folder.

## Troubleshooting

If you encounter issues:
1. Ensure Docker is running
2. Check that ports 8080 and 80 are available
3. Run `docker-compose down -v` to reset