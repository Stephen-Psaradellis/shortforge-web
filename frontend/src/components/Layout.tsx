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
import { ShortForgeLogo } from '@/components/logos';

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

  // Determine if we should show the ElevenLabs widget (exclude agent pages - they handle their own)
  const shouldShowElevenLabsWidget = !router.pathname.startsWith('/agent/') && (
    router.pathname === '/contact' ||
    router.pathname === '/'
  );

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
    <div className="min-h-screen bg-forge-black text-secondary-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-forge border-b border-forge-steel/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <ShortForgeLogo size="md" showText={true} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                    router.pathname === item.href
                      ? 'bg-gradient-to-r from-ember-700 to-ember-600 text-white shadow-glow'
                      : 'text-secondary-100 hover:text-white hover:bg-forge-smoke'
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
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-secondary-100 hover:text-white hover:bg-forge-smoke transition-all duration-200"
                  >
                    <UserCircle size={24} />
                    <span className="hidden md:block font-medium">{user?.full_name}</span>
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {mobileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-forge-charcoal rounded-lg shadow-glow border border-forge-steel/30 py-2 overflow-hidden"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-secondary-100 hover:text-white hover:bg-forge-smoke transition-all duration-200"
                        >
                          <Settings size={18} />
                          <span className="font-medium">Dashboard</span>
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            href="/admin"
                            className="flex items-center space-x-3 px-4 py-3 text-ember-400 hover:text-ember-300 hover:bg-forge-smoke transition-all duration-200"
                          >
                            <Settings size={18} />
                            <span className="font-medium">Admin Panel</span>
                          </Link>
                        )}
                        <div className="border-t border-forge-steel/20 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-secondary-100 hover:text-white hover:bg-ember-900/30 transition-all duration-200"
                        >
                          <LogOut size={18} />
                          <span className="font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/auth/login"
                    className="hidden sm:block text-secondary-100 hover:text-white font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="btn-primary text-sm sm:text-base"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-secondary-100 hover:text-white hover:bg-forge-smoke rounded-lg transition-all duration-200"
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
              className="md:hidden bg-forge-charcoal border-t border-forge-steel/20"
            >
              <div className="px-4 pt-4 pb-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      router.pathname === item.href
                        ? 'bg-gradient-to-r from-ember-700 to-ember-600 text-white shadow-glow'
                        : 'text-secondary-100 hover:text-white hover:bg-forge-smoke'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon size={20} />
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
      <footer className="relative bg-gradient-to-b from-forge-obsidian to-forge-black border-t border-forge-steel/20 mt-20">
        {/* Subtle ember glow effect at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ember-700/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <ShortForgeLogo size="lg" showText={true} />
              </div>
              <p className="text-secondary-200 mb-6 leading-relaxed max-w-md">
                Empowering businesses with AI, automation, and innovative IT solutions.
                Building the future of intelligent systems.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 font-medium">
                  LinkedIn
                </a>
                <a href="#" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 font-medium">
                  Twitter
                </a>
                <a href="#" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 font-medium">
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/services#ai-agents" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    AI Agents
                  </a>
                </li>
                <li>
                  <a href="/services#automation" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    Automation Systems
                  </a>
                </li>
                <li>
                  <a href="/services#consulting" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    IT Consulting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary-200 hover:text-ember-400 transition-colors duration-200 flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-ember-600 mr-2 group-hover:shadow-glow-sm transition-all duration-200"></span>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-forge-steel/20 mt-12 pt-8 text-center">
            <p className="text-secondary-300">
              © 2024 <span className="font-bold"><span className="text-forge-charcoal">Short</span><span className="text-ember-600">Forge</span></span>. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
