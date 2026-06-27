/**
 * Google Ads Conversion Tracking for Tarik Web
 * 
 * This module provides centralized conversion tracking for Google Ads.
 * 
 * HOW TO SET UP:
 * 1. Go to Google Ads → Tools → Conversions → New Conversion Action
 * 2. Choose "Website" → Set up manually
 * 3. Create these conversion actions:
 *    - "WhatsApp Click" (category: Contact)
 *    - "Booking Form Opened" (category: Lead)
 *    - "Booking Form Submitted" (category: Lead)  
 *    - "Payment Completed" (category: Purchase)
 *    - "Contact Form Submitted" (category: Lead)
 *    - "Phone Number Clicked" (category: Contact)
 * 4. Copy each Conversion Label and paste below
 * 
 * Your Google Ads Account ID: AW-XXXXXXXXXX (replace with your actual ID)
 */

// ═══════════════════════════════════════════════════════
// ⚠️  REPLACE THESE WITH YOUR ACTUAL GOOGLE ADS VALUES
// ═══════════════════════════════════════════════════════
const GOOGLE_ADS_ID = 'AW-18257387613'; // Tarik Web Google Ads Conversion ID

// Create each conversion action in Google Ads and paste the labels here
const CONVERSION_LABELS = {
  WHATSAPP_CLICK:       'REPLACE_WITH_LABEL', // When someone clicks WhatsApp
  BOOKING_OPENED:       'REPLACE_WITH_LABEL', // When booking modal opens
  BOOKING_SUBMITTED:    'REPLACE_WITH_LABEL', // When booking form Step 1 submitted
  PAYMENT_COMPLETED:    'IrraCOnyvcYoEN3ASoFE', // Purchase conversion — from Google Ads
  CONTACT_FORM_SUBMIT:  'REPLACE_WITH_LABEL', // When contact form is submitted
  PHONE_CLICK:          'REPLACE_WITH_LABEL', // When phone number is clicked
};

/**
 * Initialize Google Tag (gtag.js)
 * Call this once in index.html or main.jsx
 */
export function initGoogleTag() {
  if (typeof window === 'undefined') return;
  if (window.gtagInitialized) return;

  // Initialize dataLayer FIRST (before script loads)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // Set consent mode defaults BEFORE loading gtag
  // For India: grant all consent by default (no GDPR requirement)
  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });

  // Create gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_ID);

  window.gtagInitialized = true;
}

/**
 * Send a conversion event to Google Ads
 */
function sendConversion(label, value = 0, currency = 'INR') {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (!label || label === 'REPLACE_WITH_LABEL') {
    console.warn('[Tarik Tracking] Conversion label not configured:', label);
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
    value: value,
    currency: currency,
  });
}

// ═══════════════════════════════════════════════════════
// Conversion tracking functions — call from components
// ═══════════════════════════════════════════════════════

/**
 * Track WhatsApp button click
 * @param {string} source - Where the click came from (e.g., 'hero', 'booking_modal', 'chatbot', 'footer')
 */
export function trackWhatsAppClick(source = 'unknown') {
  sendConversion(CONVERSION_LABELS.WHATSAPP_CLICK);

  // Also send as a custom event for Google Analytics reporting
  if (window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      event_label: source,
    });
  }
}

/**
 * Track booking modal opened
 * @param {string} source - Where it was triggered (e.g., 'hero_button', 'navbar', 'chatbot')
 */
export function trackBookingOpened(source = 'unknown') {
  sendConversion(CONVERSION_LABELS.BOOKING_OPENED);

  if (window.gtag) {
    window.gtag('event', 'booking_opened', {
      event_category: 'engagement',
      event_label: source,
    });
  }
}

/**
 * Track booking form step 1 submitted (name, phone, industry)
 * @param {string} industry - The selected industry
 */
export function trackBookingSubmitted(industry = '') {
  sendConversion(CONVERSION_LABELS.BOOKING_SUBMITTED);

  if (window.gtag) {
    window.gtag('event', 'booking_submitted', {
      event_category: 'lead',
      event_label: industry,
    });
  }
}

/**
 * Track successful Razorpay payment
 * @param {number} amount - Payment amount in INR
 * @param {string} paymentId - Razorpay payment ID
 */
export function trackPaymentCompleted(amount = 2500, paymentId = '') {
  sendConversion(CONVERSION_LABELS.PAYMENT_COMPLETED, amount);

  if (window.gtag) {
    window.gtag('event', 'purchase', {
      event_category: 'conversion',
      event_label: paymentId,
      value: amount,
      currency: 'INR',
    });
  }
}

/**
 * Track contact form submission
 * @param {string} subject - Form subject
 */
export function trackContactFormSubmit(subject = '') {
  sendConversion(CONVERSION_LABELS.CONTACT_FORM_SUBMIT);

  if (window.gtag) {
    window.gtag('event', 'contact_form_submit', {
      event_category: 'lead',
      event_label: subject,
    });
  }
}

/**
 * Track phone number click
 */
export function trackPhoneClick() {
  sendConversion(CONVERSION_LABELS.PHONE_CLICK);

  if (window.gtag) {
    window.gtag('event', 'phone_click', {
      event_category: 'engagement',
    });
  }
}

/**
 * Track page view (for SPA navigation)
 * @param {string} pagePath - The page path
 * @param {string} pageTitle - The page title
 */
export function trackPageView(pagePath, pageTitle) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}
