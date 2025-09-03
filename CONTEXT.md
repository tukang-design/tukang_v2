# Project Context for AI Assistant

## 1. Technology Stack

### Frontend Framework

- **Next.js `15.5.2`**: React framework with app router.
- **React `18.3.1`**: UI library for building components.
- **TypeScript**: Ensures type safety and improves the development experience.

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **Custom Design System**: Utilizes an olive/accent/brown color scheme.
- **Responsive Design**: Built with a mobile-first approach.
- **Next.js Image**: For optimized image handling.

### Content Management

- **Sanity CMS**: Headless CMS for blog posts, portfolio projects, and booking submissions.
- **Sanity Studio**: Content editing interface available at `https://tukangdesign.sanity.studio/`.
- **PortableText**: Used for rendering rich text content from Sanity.

### Development & Deployment

- **ESLint**: For code linting and maintaining code quality.
- **VS Code**: Primary development environment.
- **Git**: Version control system.
- **Vercel**: Deployment platform for Next.js.
- **Sanity CDN**: Image hosting and content delivery network.

---

## 2. Project Structure

### Core Directory Structure

app/
├── en/ # English routes
│ ├── page.tsx # Homepage
│ ├── about/page.tsx # About page
│ ├── portfolio/
│ │ ├── page.tsx # Portfolio listing
│ │ └── [slug]/page.tsx # Portfolio detail pages
│ ├── blog/
│ │ ├── page.tsx # Blog listing
│ │ └── [slug]/page.tsx # Blog detail pages
│ ├── contact/page.tsx # Contact page
│ ├── booking/page.tsx # 6-step booking flow
│ └── thank-you/page.tsx # Post-booking thank you
├── ms/ # Malay routes (mirrors en/ structure)
├── admin/
│ └── bookings-simple/page.tsx # Admin dashboard for bookings
├── api/
│ └── booking/route.js # Booking submission API
├── components/ # Global shared components
└── layout.tsx # Root layout

### Key Reusable Components

- **Navigation**: `NavigationBar.simple.tsx` and an alternative `NavigationBar.tsx`.
- **Page-Specific**: `homepage-client.tsx`, `portfolio-preview.tsx`, `region-selector.js`.
- **Content**: Components for rendering blog posts (PortableText), portfolio cards, and booking form steps.

---

## 3. Coding Rules & Conventions

### Component Architecture

- **Server Components by Default**: Use server components for data fetching and static content.
- **Client Components When Needed**: Only use `"use client"` for interactivity (e.g., forms, state management).
- **Async Server Components**: For fetching data from Sanity.

### File Naming Conventions

- **kebab-case**: For file and folder names (e.g., `portfolio-preview.tsx`).
- **PascalCase**: For component names (e.g., `PortfolioPreview`).
- **camelCase**: For variables and functions (e.g., `fetchBookings`).

### TypeScript Standards

- **Explicit Types**: Use interfaces for component props.
- **Type Annotations**: For complex data structures from Sanity.
- **Optional Chaining**: For safely accessing nested Sanity data (e.g., `project.mainImage?.asset?.url`).

### Styling Guidelines

- **Tailwind Utility Classes**: The primary method for styling.
- **Custom Color Palette**:
  - `bg-olive`: Main background.
  - `text-accent`: Yellow accent (`#F4D03F`).
  - `text-brown`: Brown highlights.
  - `text-gray-300`: Secondary text.
- **Responsive Design**: Use `sm:`, `md:`, and `lg:` prefixes.
- **Consistent Spacing**: Follow patterns like `py-20`, `px-4`, `gap-8`.

### Data Fetching

- **Sanity Queries**: Use `sanityClient.fetch()` directly in server components.
- **Language Filtering**: Filter content with `language == "en"` or `language == "ms"`.
- **Error Handling**: Use `try/catch` blocks and Next.js's `notFound()` for missing content.

### Internationalization (i18n)

- **Route-based Localization**: Content is separated by `/en/` and `/ms/` URL prefixes.
- **Duplicate Components**: Separate components are used for each language to manage translated content.

### API & Security

- **RESTful Endpoints**: `POST /api/booking` for form submissions.
- **Server-Side Validation**: Data is validated before being written to Sanity.
- **Environment Variables**: Sanity tokens and other secrets are stored in `.env.local`.

## 4. Code Quality & Validation Rules

- **Valid JSX Syntax**: All generated components **must** contain syntactically correct JSX. Pay close attention to closing all tags (e.g., `</div>` or `/>`) and correctly matching all curly braces (`{}`).
- **ESLint Compliance**: Code should adhere to the project's ESLint rules to avoid common syntax and formatting errors.
- **No Unclosed Comments**: Ensure any JSX comments (`{/* ... */}`) are properly closed.
- **Review Before Output**: Before providing the final code, perform a self-correction pass to check for common mistakes like unclosed tags, mismatched braces, or invalid syntax inside JSX expressions.
