import type { Need } from '@/lib/contact-schema';

export const contactPage = {
  eyebrow: 'Contact',
  title: 'Tell me what you sell.',
  lede: 'A few lines about your business and what you need. I reply within a business day, usually faster, and the first call is twenty minutes and free.',
  needOptions: [
    { value: 'websites', label: 'A website', hint: 'New site, or moving off a builder' },
    { value: 'automation', label: 'AI or automation', hint: 'Phone agent, bookings, a chore to remove' },
    { value: 'not-sure', label: 'Not sure yet', hint: 'Describe the problem and we work it out' },
  ] satisfies { value: Need; label: string; hint: string }[],
  success: {
    title: 'Got it.',
    body: 'I reply within a business day, usually faster. If it is urgent, call or text the number on this page.',
  },
  failure: 'That did not go through. Email me directly instead:',
  aside: {
    title: 'Or skip the form',
    next: {
      title: 'What happens next',
      steps: [
        'I reply by email, usually the same day.',
        'We find twenty minutes for a call.',
        'You get a fixed price, or an honest no.',
      ],
    },
  },
};
