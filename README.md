# ScamAlertDB

A production-ready, moderation-first public platform for **searching and reporting alleged scam incidents** involving payment platforms (Zelle, Venmo, Cash App, PayPal) and online marketplaces (Facebook Marketplace, Instagram, WhatsApp, Telegram, and more).

> **Important:** All reports are user-submitted allegations reviewed by admins before publication. They do not constitute findings of guilt or legal wrongdoing.

---

## Features

- 🔍 **Search** by phone number, name, username, business, or keyword
- 📋 **Submit reports** with evidence uploads (moderation-gated — pending review by default)
- ⚖️ **Dispute & removal request** workflow
- 🛡️ **Admin dashboard** with queue, reports, disputes, and messages management
- 📰 **Educational resources** on common scam types
- ⚖️ **Full legal pages** (Terms, Privacy, Content Policy, Dispute Policy, Disclaimer)
- 🗺️ **SEO-optimized** with sitemap, robots.txt, Open Graph, and JSON-LD
- 🔒 **Security headers**, RLS policies, masked phone numbers publicly

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Components | shadcn/ui (Radix UI) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Hosting | Vercel |
| Forms | React Hook Form + Zod |

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/scamalertdb.git
cd scamalertdb
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. In the **SQL Editor**, run `supabase/schema.sql`
3. Optionally run `supabase/seed.sql` for demo data
4. Create a Storage bucket named **`evidence`** (public)

### 3. Configure environment variables

```bash
cp .env.example .env.local
# Fill in your Supabase URL, anon key, and service role key
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Admin Setup

1. In Supabase Dashboard → Authentication → Users → **Add User**
2. Log in at `/admin/login`

---

## Vercel Deployment

1. Push to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy — done

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_APP_URL` | Your site URL (no trailing slash) |

---

## Troubleshooting

- **Reports not visible** → Reports start as `pending`. Approve them in `/admin/queue`.
- **Admin login fails** → Create a user in Supabase Auth → Users.
- **Uploads failing** → Confirm `evidence` storage bucket exists with INSERT + SELECT policies.
- **RLS errors** → Admin actions use the service role key which bypasses RLS. Verify `SUPABASE_SERVICE_ROLE_KEY`.

---

## Suggested Next Improvements

- Add Cloudflare Turnstile CAPTCHA to submission forms
- Email notifications on new submissions (Supabase Edge Functions + Resend)
- Full-text search upgrade using `pg_trgm` or Meilisearch
- Admin report detail/edit page
- CSV export of reports
- Dark mode toggle
