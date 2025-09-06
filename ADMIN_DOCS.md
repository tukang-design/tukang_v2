# Admin Booking Management

## Overview

The admin booking management system has been simplified to use server-side rendering (like the blog) instead of complex API calls and client-side state management.

## Access

**Admin URL:** `https://tukang.design/admin/bookings-simple?key=admin-access-2025`

### Security

- Simple access key protection: `admin-access-2025`
- Direct Sanity integration (no API endpoints needed)
- Server-side rendering for better performance

## Features

### Dashboard Overview

- **Total bookings count** - Shows number of submissions
- **Real-time data** - Fetches directly from Sanity on each page load
- **Clean interface** - Similar to blog layout

### Booking Display

- **Submission ID** - Unique identifier for each booking
- **Contact Information** - Name, email, company, phone
- **Service Details** - Service type, region, language
- **Pricing** - Estimated cost with currency
- **Status** - Current booking status with color coding
- **Submission Date** - When the booking was submitted

### Quick Stats

- **New Bookings** - Count of bookings pending review
- **Active Projects** - Count of accepted/in-progress bookings
- **Scheduled Calls** - Count of bookings with call requests

## Status Types

- `new` - Blue - Just submitted, pending review
- `reviewing` - Yellow - Under review by team
- `proposal_sent` - Purple - Proposal sent to client
- `accepted` - Green - Client accepted proposal
- `in_progress` - Indigo - Project is active
- `completed` - Gray - Project finished
- `cancelled` - Red - Project cancelled

## Technical Details

### Data Flow

1. **Bookings submitted** → Sanity CMS storage
2. **Admin visits page** → Server fetches from Sanity
3. **Page renders** → Static HTML with booking data
4. **No JavaScript needed** → Pure server-side rendering

### Advantages

- **No loading states** - Data pre-rendered
- **No API complexity** - Direct Sanity integration
- **Better SEO** - Server-side rendering
- **Faster load times** - No client-side fetching
- **Simpler debugging** - No complex state management

### File Structure

```
app/
├── admin/
│   └── bookings-simple/
│       └── page.tsx          # Main admin page
├── api/
│   └── booking/
│       └── route.js           # Booking submission endpoint
└── lib/
    └── sanity.js              # Sanity client configuration
```

## Usage

### For Admins

1. Bookmark: `https://tukang.design/admin/bookings-simple?key=admin-access-2025`
2. Visit link to see all bookings
3. Refresh page to see latest submissions
4. Review booking details and contact information

### For Developers

- All booking data comes from Sanity query in `getBookings()` function
- No client-side JavaScript required
- Easy to add new fields by updating the Sanity query
- Status updates would need to be implemented separately if needed

## Migration Notes

- Removed complex API routes (`/api/admin/bookings`)
- Removed client-side state management
- Removed authentication complexity
- Kept simple access key for basic protection
- Maintained all existing booking submission functionality
