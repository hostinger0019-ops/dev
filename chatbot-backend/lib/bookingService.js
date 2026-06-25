/**
 * Razorpay Booking Service
 * Handles order creation, payment verification, and booking storage.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_live_T5qGiTdJMDaPrs';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'bFbV6ikTnERU1w37UVoiAQYB';
const BOOKINGS_DIR = path.join(__dirname, '..', 'bookings');

// Ensure bookings directory exists
if (!fs.existsSync(BOOKINGS_DIR)) {
  fs.mkdirSync(BOOKINGS_DIR, { recursive: true });
}

/**
 * Create a Razorpay order via API
 */
async function createOrder({ amount, currency = 'INR', notes = {} }) {
  const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');

  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: amount * 100, // Convert to paise
      currency,
      notes,
      receipt: `booking_${Date.now()}`,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Razorpay order creation failed: ${error}`);
  }

  return await res.json();
}

/**
 * Verify Razorpay payment signature
 */
function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === razorpay_signature;
}

/**
 * Save booking to a text file
 */
function saveBooking({ name, phone, industry, paymentId, orderId, amount, status }) {
  const now = new Date();
  const timestamp = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const filename = `${now.toISOString().replace(/[:.]/g, '-')}_${paymentId}.txt`;

  const content = `═══════════════════════════════════════
BOOKING CONFIRMATION
═══════════════════════════════════════

Date:         ${timestamp}
Status:       ${status}

───────────────────────────────────────
CUSTOMER DETAILS
───────────────────────────────────────

Name:         ${name}
Phone:        ${phone}
Industry:     ${industry}

───────────────────────────────────────
PAYMENT DETAILS
───────────────────────────────────────

Payment ID:   ${paymentId}
Order ID:     ${orderId}
Amount:       ₹${amount}
Status:       ${status}

═══════════════════════════════════════
`;

  const filepath = path.join(BOOKINGS_DIR, filename);
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`💰 Booking saved: ${filepath}`);
  return filepath;
}

/**
 * Get all bookings
 */
function getAllBookings() {
  if (!fs.existsSync(BOOKINGS_DIR)) return [];
  return fs.readdirSync(BOOKINGS_DIR)
    .filter(f => f.endsWith('.txt'))
    .sort()
    .reverse();
}

module.exports = { createOrder, verifyPayment, saveBooking, getAllBookings };
