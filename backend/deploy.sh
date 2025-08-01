#!/bin/bash

# Pull latest changes
git pull

# Build and restart containers
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check logs
docker-compose logs -f
