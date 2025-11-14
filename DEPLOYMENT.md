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

### 1. Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project" → "Import Git Repository"
3. Connect your GitHub account and select the repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 2. Environment Variables

In Vercel project settings → "Environment Variables", add:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://shortforge-backend-production.up.railway.app

# Stripe (optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# ElevenLabs (optional)
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### 3. Update API Proxy

In `frontend/vercel.json`, update the Railway URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://shortforge-backend-production.up.railway.app/api/:path*"
    }
  ]
}
```

### 4. Deploy

Vercel automatically deploys on every push to main. Your app will be available at:
```
https://shortforge-web.vercel.app
```

---

## Post-Deployment Setup

### 1. Update Domain Settings

#### Vercel (Frontend):
- Go to Project Settings → Domains
- Add your custom domain (e.g., `shortforge.com`)
- Update DNS records as instructed

#### Railway (Backend):
- Railway provides a subdomain, but you can add a custom domain
- Go to Project Settings → Networking → Custom Domain

### 2. Update CORS Configuration

In `backend/app/core/config.py`, add your production domains:

```python
BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
    "https://shortforge.com",  # Your production domain
    "https://shortforge-web.vercel.app",  # Vercel domain
]
```

### 3. Database Migration

After deployment, run database migrations on Railway:

```bash
# Connect to Railway via CLI
railway connect

# Run migrations (if you have Alembic set up)
alembic upgrade head
```

**Important**: Business intelligence data is sourced directly from SupaGent. The frontend calls SupaGent's API endpoints to retrieve personalized business intelligence for agent conversations.

### 4. Stripe Webhooks (Optional)

If using Stripe payments:

1. In Stripe Dashboard → Webhooks
2. Add endpoint: `https://shortforge-backend-production.up.railway.app/api/v1/payments/webhook`
3. Copy the webhook secret to Railway environment variables

### 5. Test the Deployment

1. **Frontend**: Visit your Vercel URL
2. **API**: Check `https://your-backend-url/api/v1/health`
3. **Database**: Test user registration and login
4. **Contact Form**: Submit a test inquiry

---

## Environment Variables Summary

### Railway (Backend):
```env
DATABASE_URL=postgresql://... # Provided by Railway
SECRET_KEY=your-secret-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
ELEVENLABS_API_KEY=...
SUPABASE_URL=...
SUPABASE_KEY=...
```

### Vercel (Frontend):
```env
NEXT_PUBLIC_API_URL=https://your-backend-url
NEXT_PUBLIC_SUPAGENT_URL=https://your-supagent-url
NEXT_PUBLIC_SUPAGENT_API_KEY=your-supagent-api-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=...
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
