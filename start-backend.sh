#!/bin/bash

echo "Starting CalGuru Backend Server..."
echo "=================================="
echo ""
echo "This will start the Inquiries backend on http://localhost:5002"
echo ""

cd inquiries/backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
    echo ""
fi

echo "Starting server..."
npm start
