#!/bin/bash

# Start Script for Linux/Mac
# This script starts both the server and client in separate terminals

echo "===================================="
echo "Real-Time Chat App - Starter"
echo "===================================="
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "🚀 Starting server..."

# Start server in background
cd "$SCRIPT_DIR/server"
npm run dev &
SERVER_PID=$!

sleep 2

echo "🚀 Starting client..."

# Start client in background
cd "$SCRIPT_DIR/client"
npm run dev &
CLIENT_PID=$!

echo ""
echo "✅ Server and client are running..."
echo ""
echo "Server PID: $SERVER_PID"
echo "Client PID: $CLIENT_PID"
echo ""
echo "The application will open automatically at:"
echo "http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers."

# Trap Ctrl+C and kill both processes
trap "kill $SERVER_PID $CLIENT_PID; exit" INT

# Wait for both processes
wait
