#!/usr/bin/env bash
set -euo pipefail

# Usage: set VERCEL_TOKEN env var, then run ./scripts/deploy.sh
# This script does NOT embed secrets. Provide the VERCEL_TOKEN locally.

if [ -z "${VERCEL_TOKEN-}" ]; then
  echo "ERROR: VERCEL_TOKEN must be set in your environment. Create one at https://vercel.com/account/tokens"
  exit 1
fi

echo "Deploying to Vercel (production)..."

# Link project if not already linked (interactive may be required on first run)
vercel --prod --confirm --token "$VERCEL_TOKEN"

echo "\nDeployment requested. If you need to add environment variables, run the following commands (replace values):\n"
echo "vercel env add STRIPE_SECRET_KEY production --token \"$VERCEL_TOKEN\""
echo "vercel env add STRIPE_PRICE_FOUNDATIONAL production --token \"$VERCEL_TOKEN\""
echo "vercel env add STRIPE_SHIPPING_RATE_ID production --token \"$VERCEL_TOKEN\""
echo "vercel env add STRIPE_WEBHOOK_SECRET production --token \"$VERCEL_TOKEN\""

echo "After adding env vars, run: vercel --prod --confirm --token \"$VERCEL_TOKEN\""
