'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Phone,
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

// Type declaration for ElevenLabs Convai widget
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        'agent-id'?: string;
      };
    }
  }
}

interface LayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Phone },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const elevenLabsLoaded = useRef(false);
  const [elevenLabsAgentId, setElevenLabsAgentId] = useState('agent_2001k9djx4q6fx9vcwp2dcpydvd8');

  // Update ElevenLabs agent ID after router is ready to prevent hydration mismatch
  useEffect(() => {
    if (router.isReady) {
      if (router.pathname.startsWith('/agent/') && router.query.agent_id) {
        setElevenLabsAgentId(router.query.agent_id as string);
      } else {
        setElevenLabsAgentId('agent_2001k9djx4q6fx9vcwp2dcpydvd8');
      }
    }
  }, [router.isReady, router.pathname, router.query.agent_id]);

  // Determine if we should show the ElevenLabs widget
  const shouldShowElevenLabsWidget = router.pathname.startsWith('/agent/') ||
    router.pathname === '/contact' ||
    router.pathname === '/';

  // Load ElevenLabs script only once when widget is needed
  useEffect(() => {
    if (shouldShowElevenLabsWidget && !elevenLabsLoaded.current) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
      elevenLabsLoaded.current = true;
    }
  }, [shouldShowElevenLabsWidget]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-secondary-900 text-secondary-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-secondary-900/95 backdrop-blur-sm border-b border-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SF</span>
              </div>
              <span className="text-xl font-bold text-white">ShortForge</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    router.pathname === item.href
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-300 hover:text-white hover:bg-secondary-800'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="flex items-center space-x-2 text-secondary-300 hover:text-white transition-colors"
                  >
                    <UserCircle size={24} />
                    <span className="hidden md:block">{user?.full_name}</span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {mobileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-secondary-800 rounded-lg shadow-lg border border-secondary-700 py-2"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-2 px-4 py-2 text-secondary-300 hover:text-white hover:bg-secondary-700 transition-colors"
                        >
                          <Settings size={16} />
                          <span>Dashboard</span>
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center space-x-2 px-4 py-2 text-secondary-300 hover:text-white hover:bg-secondary-700 transition-colors"
                          >
                            <Settings size={16} />
                            <span>Admin Panel</span>
                          </Link>
                        )}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-secondary-300 hover:text-white hover:bg-secondary-700 transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/auth/login"
                    className="text-secondary-300 hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="btn-primary"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-secondary-300 hover:text-white"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-secondary-800 border-t border-secondary-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      router.pathname === item.href
                        ? 'bg-primary-600 text-white'
                        : 'text-secondary-300 hover:text-white hover:bg-secondary-700'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* ElevenLabs Voice Widget - conditionally rendered */}
      {shouldShowElevenLabsWidget && (
        <elevenlabs-convai key={elevenLabsAgentId} agent-id={elevenLabsAgentId}></elevenlabs-convai>
      )}

      {/* Footer */}
      <footer className="bg-secondary-900 border-t border-secondary-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SF</span>
                </div>
                <span className="text-xl font-bold text-white">ShortForge</span>
              </div>
              <p className="text-secondary-400 mb-4">
                Empowering businesses with AI, automation, and innovative IT solutions.
                Building the future of intelligent systems.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-secondary-400 hover:text-white transition-colors">
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li><a href="/services#ai-agents" className="text-secondary-400 hover:text-white transition-colors">AI Agents</a></li>
                <li><a href="/services#automation" className="text-secondary-400 hover:text-white transition-colors">Automation Systems</a></li>
                <li><a href="/services#consulting" className="text-secondary-400 hover:text-white transition-colors">IT Consulting</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-secondary-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-secondary-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-secondary-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-secondary-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-800 mt-8 pt-8 text-center">
            <p className="text-secondary-400">
              © 2024 ShortForge. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
