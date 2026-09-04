'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/content/site';

function isActive(pathname: string, href: string) {
  const root = '/' + href.split('/')[1];
  return pathname === href || pathname.startsWith(root + '/') || pathname === root;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-copper focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {SITE.nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-[15px] font-medium transition-colors ${
                  active ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`}
              >
                <span className={active ? 'border-b-2 border-copper pb-0.5' : ''}>{item.label}</span>
              </Link>
            );
          })}
          <Button href={SITE.cta.href} className="ml-3">
            Book a call
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 rounded-md p-2 text-ink md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="border-t border-line bg-paper md:hidden"
          >
            <Container className="flex flex-col py-3">
              {SITE.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  className={`rounded-md px-2 py-3 text-lg font-medium ${
                    isActive(pathname, item.href) ? 'text-copper' : 'text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button href={SITE.cta.href} size="lg" className="mt-3">
                {SITE.cta.label}
              </Button>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
