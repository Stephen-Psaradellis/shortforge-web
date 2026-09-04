import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Container } from '@/components/ui/Container';
import { SITE } from '@/content/site';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-paper-deep">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
              Hand-built websites you own outright, and automation only where it pays. One
              engineer, {SITE.location}.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-mute">Pages</h2>
            <ul className="mt-4 space-y-2.5">
              {SITE.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-ink-soft hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-mute">Get in touch</h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all text-ink-soft hover:text-ink">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.phoneHref} className="text-ink-soft hover:text-ink">
                  {SITE.phone}
                </a>
              </li>
              <li className="text-ink-soft">{SITE.areaServed}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name}. {SITE.owner}.
          </p>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
