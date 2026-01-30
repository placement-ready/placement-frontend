#!/bin/bash

# This script sets up the development environment by installing necessary dependencies.
# It should be run once after cloning the repository.

# Navigate to the script's directory
cd "$(dirname "$0")"

echo "🚀 Setting up the frontend development environment..."

# Check if .env exists, if not copy from example or create default
if [ ! -f .env ]; then
    echo "📦 Creating .env file from defaults..."
    # If .env.example exists, use it, otherwise create a basic one
    if [ -f .env.example ]; then
        cp .env.example .env
    else
        echo "# Generated .env" > .env
    fi
else
    echo "✅ .env file already exists."
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies. Please check your npm configuration."
    exit 1
fi

echo "✅ Dependencies installed successfully."
echo "🎉 You can now start the development server using 'npm run dev'."
exit 0

