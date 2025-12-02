import { z } from 'zod';

/**
 * Accepts strings like: "200 80% 50%"
 * - Hue: 0–360 (integer)
 * - Saturation: 0–100% (integer + %)
 * - Lightness: 0–100% (integer + %)
 * - Flexible spaces allowed between parts
 */

const hslRegex = /^(?:360|3[0-5]\d|[0-2]?\d{1,2})(?:\s+(?:10{2}|\d?\d)%){2}$/;

const hslColorSchema = z
  .string()
  .min(1, 'Color is required')
  .regex(
    hslRegex,
    'Invalid HSL color. Use the format: "H S% L%" (e.g., "200 80% 50%").'
  );

export const chatWidgetCtaSchema = z.object({
  title: z
    .string()
    .min(1, 'CTA title is required')
    .max(100, 'CTA title must be less than 100 characters'),
  subtitle: z
    .string()
    .min(1, 'CTA subtitle is required')
    .max(100, 'CTA subtitle must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'CTA description is required')
    .max(100, 'CTA description must be less than 100 characters'),
  buttonText: z
    .string()
    .min(1, 'CTA button text is required')
    .max(50, 'CTA button text must be less than 50 characters'),
});

export const chatWidgetBannerSchema = z.object({
  title: z
    .string()
    .min(1, 'Banner title is required')
    .max(100, 'Banner title must be less than 100 characters'),
  subtitle: z
    .string()
    .min(1, 'Banner subtitle is required')
    .max(100, 'Banner subtitle must be less than 100 characters'),
});

export const chatWidgetColorsSchema = z.object({
  background: hslColorSchema,
  foreground: hslColorSchema,
  primary: hslColorSchema,
  primaryForeground: hslColorSchema,
  logoBadgeBackgroundColor: hslColorSchema,
});
