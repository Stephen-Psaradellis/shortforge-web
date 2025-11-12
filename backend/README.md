# ShortForge Backend API

## Production Deployment

### Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

```bash
# Application Configuration
SECRET_KEY=your-super-secret-key-change-in-production
ACCESS_TOKEN_EXPIRE_MINUTES=480

# Server
SERVER_NAME=ShortForge API
SERVER_HOST=https://your-production-domain.com

# CORS Origins (comma-separated)
BACKEND_CORS_ORIGINS=https://shortforge-web.vercel.app,https://shortforge.com

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Stripe Payment Processing
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key

# ElevenLabs AI Voice
ELEVENLABS_API_KEY=your-elevenlabs-api-key
ELEVENLABS_AGENT_ID=your-agent-id

# Supabase File Storage
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_BUCKET=shortforge-documents
```

### Railway Deployment

1. **Database**: Use Railway PostgreSQL database
2. **Environment Variables**: Set all required variables in Railway dashboard
3. **Domain**: Configure custom domain if needed
4. **Health Checks**: The `/health` endpoint is configured for monitoring

### Security Considerations

- Use strong, unique `SECRET_KEY`
- Enable HTTPS in production
- Configure proper CORS origins
- Use managed database services
- Monitor logs and set up alerts
- Regular security updates of dependencies

### Docker Deployment

Build and run with:
```bash
docker build -t shortforge-backend .
docker run -p 8000:8000 --env-file .env shortforge-backend
```
