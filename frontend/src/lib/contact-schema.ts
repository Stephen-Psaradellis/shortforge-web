import { z } from 'zod';

export const NEEDS = ['websites', 'automation', 'not-sure'] as const;
export type Need = (typeof NEEDS)[number];

export const NEED_LABELS: Record<Need, string> = {
  websites: 'A website',
  automation: 'AI or automation',
  'not-sure': 'Not sure yet',
};

// Shared by the form (client) and the route handler (server).
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Your name, please.').max(100, 'That is a long name.'),
  email: z.email('That email does not look right.').max(200),
  phone: z.string().trim().max(40, 'That is a long phone number.').optional(),
  business: z.string().trim().max(120, 'Keep the business name short.').optional(),
  need: z.enum(NEEDS, { error: 'Pick one.' }),
  message: z
    .string()
    .trim()
    .min(10, 'A sentence or two is enough.')
    .max(4000, 'Keep it under 4,000 characters.'),
  // Honeypot: real people never see this field. The route handler treats any
  // value as a bot and answers 200 without sending, so validation must let it through.
  website: z.string().max(500).optional(),
  // Set by the form when it mounts; used to drop instant bot submissions.
  startedAt: z.number().int().optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;
