#!/bin/bash

echo "🗑️  Cleaning up unused files..."

# Test files
rm -f test-automated-booking.js
rm -f test-complete-flow.js
rm -f test-complete-flow-updated.js
rm -f test-gtm-analytics.js
rm -f test-addon-mapping.js
rm -f test-acceptance-url.js
rm -f test-email-links.js
rm -f test-simple-booking.js
rm -f test-fixed-booking.js
rm -f test-booking-schema.js
rm -f test-production-deployment.js
rm -f test-quote-acceptance.js
rm -f test-real-booking.mjs

# Backup/alternative page versions
rm -f app/about/page-test.tsx
rm -f app/about/AboutPageClient.tsx
rm -f app/page-new.tsx
rm -f app/booking/page-new.tsx
rm -f app/booking/page-clean.tsx
rm -f app/blog/page_clean.tsx
rm -f app/blog/page_new.tsx
rm -f app/portfolio/[slug]/page-fixed.tsx

# Duplicate component files
rm -f app/components/portfolio-preview-new.tsx
rm -f app/components/portfolio-preview-old.tsx
rm -f app/components/region-selector.js

# Unused root-level components
rm -f components/AdvancedPackageCTA.js
rm -f components/GoogleAnalytics.tsx
rm -f components/GoogleTagManager.tsx
rm -f components/SEO.tsx

# Duplicate configuration files
rm -f next.config.js
rm -f tailwind.config.js
rm -f postcss.config.js
rm -f .eslintrc.json

# Legacy source directory
rm -rf src/

# Sanity backup files
rm -f sanity/sanity.cli.ts.backup
rm -f sanity/schemas/quote_backup.js
rm -f sanity/schemas/quote_test.js
rm -f sanity/schemas/quote_new.js

# Unused hooks
rm -f hooks/useAnalytics.ts

# Documentation files
rm -f ADMIN_DOCS.md
rm -f BOOKING_IMPLEMENTATION.md
rm -f DEPLOYMENT.md
rm -f DEPLOYMENT_READY.md
rm -f TAILWIND_GUIDE.md

echo "✅ Cleanup complete!"
echo "📁 Files remaining to investigate manually:"
echo "  - app/contact/ContactPageClient.tsx"
echo "  - get-stripe-prices.js"
echo "  - middleware.js"
echo "  - lib/gtag.ts"
echo "  - lib/gtm.ts"
