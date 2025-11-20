#!/bin/bash

# Installation Script for Linux/Mac

echo "===================================="
echo "Real-Time Chat App - Installation"
echo "===================================="
echo ""

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Install server dependencies
echo "📦 Installing server dependencies..."
cd "$SCRIPT_DIR/server"
npm install

if [ $? -eq 0 ]; then
    echo "✅ Server dependencies installed successfully!"
else
    echo "❌ Failed to install server dependencies"
    exit 1
fi

echo ""

# Install client dependencies
echo "📦 Installing client dependencies..."
cd "$SCRIPT_DIR/client"
npm install

if [ $? -eq 0 ]; then
    echo "✅ Client dependencies installed successfully!"
else
    echo "❌ Failed to install client dependencies"
    exit 1
fi

echo ""
echo "===================================="
echo "🎉 Installation Complete!"
echo "===================================="
echo ""
echo "To start the application:"
echo "1. Start the server:"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "2. In a new terminal, start the client:"
echo "   cd client"
echo "   npm run dev"
echo ""
echo "3. Open http://localhost:5173 in your browser"
echo ""

# Return to original directory
cd "$SCRIPT_DIR"
