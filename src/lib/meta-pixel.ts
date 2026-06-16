/**
 * Meta Pixel Helper
 * -----------------
 * Central wrapper around the Facebook (Meta) Pixel so the rest of the
 * application never has to touch `window.fbq` directly. This keeps
 * TypeScript happy and guarantees events are silently no-ops when the
 * pixel has not loaded yet (e.g. during SSR or if the user is running
 * an ad-blocker).
 *
 * Pixel ID: 1017999920890440  (provided by the client)
 * Documentation: https://www.facebook.com/business/help/952192354843755
 */

export const META_PIXEL_ID = '1017999920890440';

/**
 * Reference to the global fbq function. We deliberately cast to any
 * because Meta's snippet does not ship types and we want to avoid
 * pulling in extra @types packages for a one-line interface.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Track a standard Meta Pixel event.
 *
 * Standard events Meta recognises out-of-the-box include:
 *   PageView, ViewContent, Lead, Contact, CompleteRegistration,
 *   InitiateCheckout, AddToCart, Purchase, Search, ...
 *
 * @param eventName   Standard event name (e.g. "Lead")
 * @param params      Optional event-level parameters
 *                    (content_name, content_category, value, currency, ...)
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  if (params) {
    window.fbq('track', eventName, params);
  } else {
    window.fbq('track', eventName);
  }
}

/**
 * Track a custom Meta Pixel event.
 *
 * Use this for events that don't map to any of Meta's standard
 * categories (e.g. "WhatsAppClick", "ServiceViewed", "BrochureOpened").
 * Custom events can still be used for custom audiences and conversions
 * inside Meta Ads Manager.
 *
 * @param eventName   Free-form event name (snake_case recommended)
 * @param params      Optional event-level parameters
 */
export function trackMetaCustomEvent(
  eventName: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;

  if (params) {
    window.fbq('trackCustom', eventName, params);
  } else {
    window.fbq('trackCustom', eventName);
  }
}

/**
 * Pre-baked event helpers — import these from components instead of
 * calling trackMetaEvent() directly with a string literal. This makes
 * grepping for "which button fires Lead?" trivial.
 */
export const metaEvents = {
  /** Fire when the visitor submits the contact form successfully. */
  lead: (source: string = 'contact_form') =>
    trackMetaEvent('Lead', {
      content_name: 'Contact Form Submission',
      content_category: 'Lead Generation',
      source,
    }),

  /** Fire when the visitor clicks any WhatsApp CTA. */
  contact: (source: string = 'whatsapp_button') =>
    trackMetaEvent('Contact', {
      content_name: 'WhatsApp Click',
      content_category: 'Engagement',
      source,
    }),

  /** Fire when the visitor views the Results/Portfolio section. */
  viewContent: (contentName: string = 'Our Results') =>
    trackMetaEvent('ViewContent', {
      content_name: contentName,
      content_category: 'Portfolio',
    }),
};
