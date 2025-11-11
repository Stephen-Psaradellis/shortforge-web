# Pre-Deployment Checklist

## Before Deploying to Vercel + Railway

### 1. Code Preparation
- [ ] Push all code to GitHub repository
- [ ] Ensure all dependencies are in `requirements.txt` (backend)
- [ ] Ensure all dependencies are in `package.json` (frontend)
- [ ] Test the application locally with Docker: `docker-compose up`

### 2. Environment Variables

#### Backend (Railway):
- [ ] `SECRET_KEY`: Generate a strong secret key
- [ ] `DATABASE_URL`: Will be provided by Railway automatically
- [ ] `STRIPE_SECRET_KEY`: From Stripe Dashboard (optional)
- [ ] `STRIPE_WEBHOOK_SECRET`: From Stripe Dashboard (optional)
- [ ] `ELEVENLABS_API_KEY`: From ElevenLabs (optional)
- [ ] `SUPABASE_URL`: From Supabase (optional)
- [ ] `SUPABASE_KEY`: From Supabase (optional)

#### Frontend (Vercel):
- [ ] `NEXT_PUBLIC_API_URL`: Railway backend URL (after Railway deployment)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: From Stripe (optional)
- [ ] `NEXT_PUBLIC_ELEVENLABS_AGENT_ID`: From ElevenLabs (optional)

### 3. Services Setup

#### Stripe (Optional):
- [ ] Create Stripe account
- [ ] Get API keys from Dashboard
- [ ] Configure webhook endpoint (after backend deployment)

#### ElevenLabs (Optional):
- [ ] Create ElevenLabs account
- [ ] Get API key and Agent ID
- [ ] Test voice integration

#### Supabase (Optional):
- [ ] Create Supabase project
- [ ] Get project URL and API key
- [ ] Create storage bucket for documents

### 4. Domain & DNS (Optional)
- [ ] Purchase domain name
- [ ] Configure DNS for Vercel
- [ ] Configure custom domain in Railway (optional)

### 5. Testing
- [ ] Test all pages load correctly
- [ ] Test user registration and login
- [ ] Test contact form submission
- [ ] Test responsive design on mobile
- [ ] Verify all animations work
- [ ] Test voice widget (if enabled)

---

## Deployment Steps

### Phase 1: Backend (Railway)
1. [ ] Create Railway account
2. [ ] Connect GitHub repository
3. [ ] Set environment variables
4. [ ] Deploy (automatic on push)
5. [ ] Get the Railway URL for your backend

### Phase 2: Frontend (Vercel)
1. [ ] Create Vercel account
2. [ ] Connect GitHub repository
3. [ ] Set root directory to `frontend`
4. [ ] Set environment variables (including Railway URL)
5. [ ] Deploy (automatic on push)
6. [ ] Configure custom domain (optional)

### Phase 3: Post-Deployment
1. [ ] Update CORS origins in backend config
2. [ ] Test API connectivity from frontend
3. [ ] Configure Stripe webhooks (if using payments)
4. [ ] Test all features end-to-end
5. [ ] Set up monitoring and alerts

---

## Important URLs to Note

After deployment, you'll have:
- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-project-production.up.railway.app`
- **API Docs**: `https://your-project-production.up.railway.app/api/v1/docs`

---

## Quick Commands

```bash
# Test locally before deployment
docker-compose up -d

# Check backend health
curl https://your-backend-url/api/v1/health

# Check frontend build
cd frontend && npm run build
```

---

## Support

If you encounter issues:
1. Check deployment logs in Vercel/Railway dashboards
2. Verify environment variables are set correctly
3. Test API endpoints manually
4. Check CORS configuration
5. Verify database connectivity

**Ready to deploy? 🚀**
