# ShortForge Consultancy Platform

A comprehensive AI/Automation/IT consultancy web platform built with FastAPI (Python) and Next.js (React + TypeScript). Features a sleek, modern dark-themed design with smooth animations and professional aesthetics.

## 🚀 Features

### Public Features
- **Landing Page**: Hero section with CTA, services overview, testimonials, and client logos
- **Services Pages**: Detailed information about AI Agents, Automation Systems, and IT Consulting
- **About Page**: Company mission, team profiles, and journey timeline
- **Contact Page**: Contact form with Calendly integration and ElevenLabs voice widget
- **Responsive Design**: Mobile-first approach with dark theme and smooth animations

### Authentication & User Management
- **JWT-based Authentication**: Secure login/logout with token management
- **User Registration**: Complete signup flow with validation
- **Role-based Access**: Client and admin user roles with different permissions

### Client Dashboard
- **Project Management**: View project status, updates, and timelines
- **Document Management**: Upload/download project-related documents
- **Invoice Management**: View payment history and Stripe integration
- **AI Chat Assistant**: Powered by ElevenLabs voice agents

### Admin Panel
- **User Management**: CRUD operations for clients and projects
- **Inquiry Management**: Handle contact form submissions
- **Analytics Dashboard**: API call logs and user activity monitoring
- **Content Management**: Manage testimonials, services, and company information

### Technical Features
- **RESTful API**: Complete FastAPI backend with OpenAPI documentation
- **Database**: PostgreSQL with SQLAlchemy ORM and Alembic migrations
- **Payment Integration**: Stripe for subscriptions and invoice management
- **File Storage**: Supabase integration for document management
- **Voice Integration**: ElevenLabs API for AI voice assistants
- **Email Notifications**: SMTP integration for contact confirmations
- **Docker Support**: Containerized deployment with docker-compose
- **CI/CD Ready**: GitHub Actions workflow for automated testing and deployment

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance async web framework
- **PostgreSQL**: Robust relational database
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and serialization
- **JWT**: Secure authentication tokens
- **Stripe**: Payment processing
- **ElevenLabs**: Voice AI integration

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation
- **Axios**: HTTP client for API calls
- **React Hot Toast**: Notification system

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-service orchestration
- **Nginx**: Reverse proxy and load balancing
- **GitHub Actions**: CI/CD pipeline
- **PostgreSQL**: Primary database
- **Redis**: Caching and sessions

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/shortforge-web.git
cd shortforge-web
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env

# Edit with your API keys
nano .env
```

Required environment variables:
```env
# Database
DATABASE_URL=postgresql://shortforge:shortforge_password@localhost:5432/shortforge

# Security
SECRET_KEY=your-super-secret-key-change-in-production

# Stripe (optional - for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key

# ElevenLabs (optional - for voice)
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Supabase (optional - for file storage)
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 3. Launch with Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/api/v1/docs
- **Database**: localhost:5432

### 4. Manual Setup (Alternative)

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
shortforge-web/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/v1/         # API endpoints
│   │   ├── core/           # Core functionality
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # Application entry point
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/                # Next.js frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Next.js pages
│   │   ├── lib/            # Utilities and API client
│   │   ├── styles/         # Global styles
│   │   └── types/          # TypeScript types
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml       # Docker orchestration
├── nginx.conf              # Production nginx config
├── .github/workflows/      # CI/CD pipelines
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/me` - Update profile

### Projects
- `GET /api/v1/projects` - List projects
- `POST /api/v1/projects` - Create project (admin)
- `GET /api/v1/projects/{id}` - Get project details
- `PUT /api/v1/projects/{id}` - Update project (admin)
- `POST /api/v1/projects/{id}/updates` - Add project update

### Inquiries
- `POST /api/v1/inquiries` - Submit contact form
- `GET /api/v1/inquiries` - List inquiries (admin)
- `PUT /api/v1/inquiries/{id}` - Update inquiry (admin)

### Payments
- `POST /api/v1/payments/create-payment-intent` - Create Stripe payment intent
- `GET /api/v1/payments/payment-methods` - Get saved payment methods

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest --cov=app --cov-report=html
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Production with Docker

```bash
# Build for production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Or use production profile
docker-compose --profile production up -d
```

### Manual Deployment

1. **Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm run build
   npm start
   ```

3. **Nginx** (reverse proxy):
   ```bash
   # Configure nginx.conf and restart nginx
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## 🔐 Security

- JWT tokens with configurable expiration
- Password hashing with bcrypt
- CORS configuration
- Input validation with Pydantic
- SQL injection prevention with SQLAlchemy
- XSS protection with React
- CSRF protection
- Rate limiting (configurable)

## 📊 Monitoring

- Structured logging with structlog
- Health check endpoints
- API request/response logging
- Error tracking and reporting
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - The modern Python web framework
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- [Stripe](https://stripe.com/) - Payment processing platform
- [ElevenLabs](https://elevenlabs.io/) - AI voice synthesis

## 📞 Support

For support, email hello@shortforge.com or join our Discord community.

---

## 🚀 Deployment

### Recommended Deployment Stack

- **Frontend**: [Vercel](https://vercel.com) - Optimized for Next.js
- **Backend**: [Railway](https://railway.app) - Great for Python/FastAPI apps
- **Database**: PostgreSQL (provided by Railway)

### Quick Deployment

1. **Backend (Railway)**:
   ```bash
   # Railway auto-deploys from GitHub
   # Set environment variables in Railway dashboard
   ```

2. **Frontend (Vercel)**:
   ```bash
   # Vercel auto-deploys from GitHub
   # Set NEXT_PUBLIC_API_URL to your Railway backend URL
   ```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

---

**ShortForge** - Forging the future with AI, automation, and innovation.
