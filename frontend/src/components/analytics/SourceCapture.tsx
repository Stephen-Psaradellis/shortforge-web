'use client';

import { useEffect } from 'react';

/** sessionStorage key the contact form reads. */
export const SOURCE_KEY = 'sf.source';

const MAX_PART = 60;
const MAX_TOTAL = 300;

const TAGGED = /(^|; )(ref|utm)=/;

/**
 * Remembers which link brought a visitor here, so the contact email can say so.
 *
 * Reads ?ref=, utm_*, the referring site's hostname and the landing path into
 * one short string in sessionStorage, on a full page load. The first visit in
 * a tab wins, except that a tagged link (ref or utm) replaces an untagged
 * visit, so opening a referral link in a tab already on the site still counts.
 * No cookie and nothing sent anywhere; the form attaches it only if they
 * submit, and it disappears when the tab closes.
 */
export function SourceCapture() {
  useEffect(() => {
    try {
      const existing = window.sessionStorage.getItem(SOURCE_KEY);
      if (existing && TAGGED.test(existing)) return;
      const q = new URLSearchParams(window.location.search);
      const cut = (s: string) => s.replace(/[\r\n;]+/g, ' ').trim().slice(0, MAX_PART);
      const parts: string[] = [];

      const ref = q.get('ref');
      if (ref) parts.push(`ref=${cut(ref)}`);

      const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map((k) => cut(q.get(k) ?? ''));
      if (utm.some(Boolean)) parts.push(`utm=${utm.join('/')}`);

      if (document.referrer) {
        const host = new URL(document.referrer).hostname;
        if (host && host !== window.location.hostname) parts.push(`from=${cut(host)}`);
      }

      parts.push(`landed=${cut(window.location.pathname)}`);
      window.sessionStorage.setItem(SOURCE_KEY, parts.join('; ').slice(0, MAX_TOTAL));
    } catch {
      // Private mode or storage disabled: the form just sends "-".
    }
  }, []);

  return null;
}
