# Text Transformer Pro — Next.js 15

Free online text tools — 60+ utilities including case converters, JSON formatter, image converters, random generators, and more.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** + shadcn/ui
- **Supabase** (blog + auth)
- **next/font** (zero CLS fonts)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

## Deploy on Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy

## Features

- 60+ free online tools
- 14 language support (lazy-loaded — only English bundled by default)
- Full SEO: metadata, OpenGraph, Twitter Cards, JSON-LD schema on every page
- Dynamic sitemap + robots.txt
- Web app manifest (PWA-ready)
- Dynamic OG image generation
- Blog with Supabase CMS
- Admin panel with rich text editor
