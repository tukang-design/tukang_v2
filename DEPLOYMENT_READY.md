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
