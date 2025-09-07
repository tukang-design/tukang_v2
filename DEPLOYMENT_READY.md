Deployment ready checklist

If you're ready to deploy to Vercel, follow this checklist:

1. Confirm repository is pushed to GitHub on the `main` branch.
2. In Vercel, create/import the project and connect the `main` branch.
3. Add the required Environment Variables (see `DEPLOYMENT.md`).
4. Remove committed build artifacts if desired:

   git rm -r --cached .next
   git commit -m "Remove committed build artifacts (.next)"
   git push origin main

5. Trigger a production deploy in Vercel and verify logs.
6. Smoke test site pages and API endpoints that send email or write to Sanity.

If you want, I can run `npm run build` locally now to validate the build (I will need permission to run terminal commands).

Environment variables (Production & Preview)
- NEXT_PUBLIC_BASE_URL: https://tukang.design
- NEXT_PUBLIC_SITE_URL: https://tukang.design
- NEXT_PUBLIC_SANITY_PROJECT_ID: 330f0le5
- NEXT_PUBLIC_SANITY_DATASET: production
- NEXT_PUBLIC_BUSINESS_EMAIL: studio@tukang.design
- SANITY_API_TOKEN: your Sanity write token (Editor role or custom role with create/update)
- SMTP_HOST: your SMTP host
- SMTP_PORT: 587 (or per provider)
- SMTP_USER: SMTP username
- SMTP_PASS: SMTP password/app password
- SMTP_FROM: Optional explicit from address
