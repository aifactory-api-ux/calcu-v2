#!/bin/bash

set -e

echo "Checking Docker..."
if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Please install Docker: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "Docker Compose is not installed. Please install Docker Compose: https://docs.docker.com/compose/install/"
    exit 1
fi

COMPOSE_CMD="docker-compose"
if ! command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker compose"
fi

echo "Building and starting containers..."
$COMPOSE_CMD up --build -d

echo "Waiting for frontend to be healthy..."
sleep 5

echo ""
echo "=========================================="
echo "Calculadora is running!"
echo "Access the app at: http://localhost:8080"
echo "=========================================="
echo ""