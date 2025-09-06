# 🚀 Tukang V2 - Production Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Environment Setup

- [ ] Copy `.env.example` to `.env.local`
- [ ] Update Google Analytics ID: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
- [ ] Update Google Tag Manager ID: `NEXT_PUBLIC_GTM_ID=GTM-PVX9R926`
- [ ] Update site URL: `NEXT_PUBLIC_SITE_URL=https://tukang.design`
- [ ] Set Google verification: `NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code`
- [ ] Verify email credentials (Gmail app password working)
- [ ] Verify Sanity CMS connection

### 2. Analytics & SEO Setup

#### Google Tag Manager (Primary - Recommended)

1. Create GTM container at [Google Tag Manager](https://tagmanager.google.com)
2. Get container ID (GTM-XXXXXXX) - already set to `GTM-PVX9R926`
3. Configure GA4 tag in GTM with your GA4 measurement ID
4. Set up conversion tracking for `quote_submission` event
5. Configure enhanced ecommerce tracking

#### Google Analytics 4 (Backup/Direct)

1. Create new GA4 property at [Google Analytics](https://analytics.google.com)
2. Get measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
4. Verify tracking with GA4 Real-time reports

#### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://tukang.design`
3. Download HTML verification file OR get meta tag verification code
4. Add verification code to `.env.local`: `NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code`
5. Submit sitemap: `https://tukang.design/sitemap.xml`

### 3. Build & Test

```bash
# Install dependencies
npm install

# Type check
npm run type-check

# Build for production
npm run build

# Test production build locally
npm run start
```

### 4. Deployment Platforms

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod

# Add environment variables in Vercel dashboard
```

#### Netlify

```bash
# Build command: npm run build
# Publish directory: .next
# Add environment variables in Netlify dashboard
```

#### Traditional VPS/Server

```bash
# PM2 for production
npm install -g pm2
pm2 start npm --name "tukang-v2" -- start
pm2 startup
pm2 save
```

## 📊 Analytics Implementation

### Conversion Funnel Tracking

✅ Page views (automatic)
✅ Service selection tracking
✅ Addon selection tracking
✅ Form step completion
✅ Quote submission conversion
✅ Enhanced ecommerce events

### Key Events Tracked

- `funnel_step` - Each step in booking process
- `service_selection` - When user selects a service
- `addon_selection` - When user adds/removes addons
- `form_submit` - Form submissions at each step
- `quote_submission` - Final quote conversion
- `purchase` - Completed quote (conversion goal)

## 🔍 SEO Features Implemented

### Technical SEO

✅ Sitemap.xml generation (`/sitemap.xml`)
✅ Robots.txt configuration (`/robots.txt`)
✅ Canonical URLs for all pages
✅ Meta tags optimization
✅ Open Graph tags for social sharing
✅ Twitter Card tags
✅ Structured data (JSON-LD)

### Content SEO

✅ Optimized page titles and descriptions
✅ Keyword optimization for Malaysian market
✅ Breadcrumb navigation
✅ Image alt text optimization
✅ Internal linking structure

### Performance SEO

✅ Core Web Vitals optimization
✅ Image optimization with Next.js
✅ Security headers
✅ Compression enabled

## 🎯 Google Search Console Setup

### 1. Property Verification

After deployment, verify ownership:

- HTML file method OR meta tag method implemented
- DNS verification (for advanced users)

### 2. Sitemap Submission

Submit these URLs in Search Console:

- `https://tukang.design/sitemap.xml`

### 3. Performance Monitoring

Monitor these metrics:

- Index coverage
- Core Web Vitals
- Mobile usability
- Search performance

## 📈 Analytics Goals & Conversions

### GA4 Conversion Events

Set up these conversions in GA4:

1. `quote_submission` - Primary conversion goal
2. `form_submit` - Engagement goal
3. `service_selection` - Micro conversion

### Enhanced Ecommerce

✅ Item tracking for services
✅ Purchase events with transaction value
✅ Currency tracking (MYR/SGD/USD)

## 🔒 Security & Performance

### Headers Implemented

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin
- Permissions-Policy restrictions

### Performance Features

- Image optimization with Next.js
- Compression enabled
- Static generation where possible
- Preconnect to external domains

## 📱 Post-Deployment Tasks

### Week 1

- [ ] Verify GA4 tracking in real-time
- [ ] Submit sitemap to Google Search Console
- [ ] Check all forms are working (test quote submission)
- [ ] Verify email delivery
- [ ] Test across different devices/browsers

### Week 2-4

- [ ] Monitor Core Web Vitals in Search Console
- [ ] Check indexing status
- [ ] Review conversion funnel data
- [ ] Optimize based on real user data

### Ongoing

- [ ] Weekly GA4 reports review
- [ ] Monthly Search Console performance review
- [ ] Quarterly SEO audit
- [ ] Conversion rate optimization

## 🆘 Troubleshooting

### Analytics Not Working

1. Check GA4 measurement ID in environment variables
2. Verify gtag script loading in browser dev tools
3. Use GA4 DebugView for real-time debugging

### SEO Issues

1. Test structured data: [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Verify sitemap: `https://tukang.design/sitemap.xml`
3. Check robots.txt: `https://tukang.design/robots.txt`

### Performance Issues

1. Use [PageSpeed Insights](https://pagespeed.web.dev/)
2. Monitor Core Web Vitals in Search Console
3. Check Next.js bundle analyzer: `npm run build:analyze`

## 📞 Support Contacts

- Analytics Setup: Google Analytics Help Center
- SEO Questions: Google Search Console Help
- Technical Issues: Developer documentation
- Emergency: Check error logs in deployment platform
