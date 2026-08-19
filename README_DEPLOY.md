Deploying to Vercel
===================

This project is ready for Vercel. Because deployment requires secrets (Stripe keys, webhook secret, etc.), run the deployment from your machine with your Vercel token. Do NOT paste secrets into chat.

Steps (recommended)

1. Install Vercel CLI and login (if not already):

```bash
npm i -g vercel
vercel login
```

2. Export your Vercel token locally (create one at https://vercel.com/account/tokens):

```bash
export VERCEL_TOKEN=your_token_here
```

3. (Optional) Add required environment variables to Vercel using the CLI or dashboard. Example CLI commands:

```bash
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_PRICE_FOUNDATIONAL production
vercel env add STRIPE_SHIPPING_RATE_ID production
vercel env add STRIPE_WEBHOOK_SECRET production
```

4. Deploy:

```bash
./scripts/deploy.sh
```

Notes
- The repository contains a minimal `vercel.json` configured for Next.js.
- Do NOT commit secret keys. If a `.env.local` exists locally, ensure it is not pushed to git.
- After deployment, configure your Stripe webhook to point to `https://<your-deployment-domain>/api/webhook`.
