.PHONY: install start build serve docker-build docker-up docker-down clean

# Install dependencies
install:
	npm install

# Start development server
start:
	npm run start

# Build for production
build:
	npm run build

# Serve production build locally
serve:
	npm run serve

# Build Docker image
docker-build:
	docker-compose build

# Start Docker container
docker-up:
	docker-compose up -d

# Stop Docker container
docker-down:
	docker-compose down

# Clean build artifacts
clean:
	rm -rf build node_modules

# Full rebuild
rebuild: clean install build
