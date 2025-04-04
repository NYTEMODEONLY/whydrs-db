#!/bin/bash

# Sync GitHub and Vercel changes
# Usage: ./deploy.sh "Your commit message"

# Exit on any error
set -e

# Default commit message if none provided
COMMIT_MESSAGE=${1:-"Update landing page content"}

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== WhyDRS Deployment Script ===${NC}"
echo -e "${BLUE}This script syncs changes between GitHub and Vercel${NC}"
echo

# Check if git is available
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: git is not installed${NC}"
    exit 1
fi

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo -e "${RED}Error: Vercel CLI is not installed. Please install with: npm i -g vercel${NC}"
    exit 1
fi

# Step 1: Stage all changes
echo -e "${GREEN}Staging changes...${NC}"
git add .

# Step 2: Commit changes
echo -e "${GREEN}Committing changes with message: ${COMMIT_MESSAGE}${NC}"
git commit -m "$COMMIT_MESSAGE"

# Step 3: Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push

# Step 4: Deploy to Vercel
echo -e "${GREEN}Deploying to Vercel...${NC}"
vercel --prod

echo
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo -e "${BLUE}Your changes have been:${NC}"
echo -e "  1. Committed and pushed to GitHub"
echo -e "  2. Deployed to Vercel production"
echo

# Optional Vercel link display (if available)
VERCEL_URL=$(vercel --prod --confirm)
if [[ $VERCEL_URL == *"https://"* ]]; then
    echo -e "${GREEN}Your site is live at: $VERCEL_URL${NC}"
fi 