# 🚀 Deployment Guide

This guide covers deploying ShortForge to **Vercel** (frontend) and **Railway** (backend).

## Prerequisites

1. **GitHub Repository**: Push your code to GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Railway Account**: Sign up at [railway.app](https://railway.app)
4. **Domain** (optional): Custom domain for production

---

## Backend Deployment (Railway)

### 1. Create Railway Project

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select the repository
4. Railway will automatically detect it's a Python project

### 2. Database Setup

Railway provides PostgreSQL automatically. The database URL will be available as an environment variable.

### 3. Environment Variables

In Railway dashboard, go to your project → "Variables" and add:

```env
# Database (Railway provides this automatically)
DATABASE_URL=postgresql://...

# Security
SECRET_KEY=your-super-secret-key-change-in-production

# Stripe (optional)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# ElevenLabs (optional)
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_AGENT_ID=your_agent_id

# Supabase (optional)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_BUCKET=shortforge-documents

# Email (optional)
SMTP_TLS=True
SMTP_PORT=587
SMTP_HOST=smtp.gmail.com
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAILS_FROM_EMAIL=your_email@gmail.com
EMAILS_FROM_NAME=ShortForge
```

### 4. Deploy

Railway automatically deploys when you push to your main branch. The app will be available at:
```
https://shortforge-backend-production.up.railway.app
```

---

## Frontend Deployment (Vercel)

The site in `frontend/` is a marketing site with one route handler (the contact form). It
does not call the backend.

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project" → "Import Git Repository"
3. Connect your GitHub account and select the repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Node.js Version**: 22.x

### 2. Environment Variables

In Vercel project settings → "Environment Variables", add:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=s.n.psaradellis@gmail.com
# Optional until shortforge.dev is verified in Resend; falls back to onboarding@resend.dev
CONTACT_FROM_EMAIL=ShortForge <hello@shortforge.dev>
```

Remove any leftover `NEXT_PUBLIC_*` variables from the old app; nothing reads them.

### 3. Resend

1. Create a Resend account and an API key.
2. Add `shortforge.dev` as a domain and publish the DNS records it gives you (DKIM, SPF).
3. Until the domain verifies, mail is sent from `onboarding@resend.dev` and only reaches
   the address the Resend account was created with.

### 4. Deploy

Vercel deploys on every push to main. Redirects for the old `/services` and `/work`
URLs live in `frontend/next.config.ts`.

---

## Post-Deployment Setup

### 1. Update Domain Settings

#### Vercel (Frontend):
```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=s.n.psaradellis@gmail.com
CONTACT_FROM_EMAIL=ShortForge <hello@shortforge.dev>
```

### Vercel (Frontend):
```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=s.n.psaradellis@gmail.com
CONTACT_FROM_EMAIL=ShortForge <hello@shortforge.dev>
```

---

## Monitoring & Maintenance

### Logs
- **Railway**: View logs in Railway dashboard → Deployments
- **Vercel**: View logs in Vercel dashboard → Functions

### Updates
- Push to main branch for automatic deployments
- Both platforms support preview deployments for PRs

### Scaling
- **Railway**: Automatic scaling based on usage
- **Vercel**: Serverless scaling included

---

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check BACKEND_CORS_ORIGINS in config.py
2. **Database Connection**: Verify DATABASE_URL in Railway
3. **API Timeouts**: Check Railway logs for errors
4. **Build Failures**: Check Vercel/Railway build logs

### Useful Commands

```bash
# Check Railway deployment
railway logs

# Restart Railway deployment
railway restart

# Check Vercel deployment
vercel logs [deployment-url]
```

---

## Security Checklist

- [ ] HTTPS enabled on both domains
- [ ] Environment variables not in code
- [ ] SECRET_KEY is strong and unique
- [ ] CORS origins are restricted
- [ ] Database credentials are secure
- [ ] Stripe webhooks are configured
- [ ] Debug mode disabled in production

---

**🎉 Your ShortForge platform is now live!**
