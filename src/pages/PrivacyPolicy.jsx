import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuArrowLeft, LuShieldCheck } from 'react-icons/lu';
import './LegalPage.css';

const ease = [0.4, 0, 0, 1];

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="legal-page">
      <Link to="/" className="legal-back">
        <LuArrowLeft size={14} /> Back to Home
      </Link>

      <motion.div
        className="legal-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="legal-icon"><LuShieldCheck size={28} /></div>
        <h1 className="legal-title">Privacy Policy</h1>
        <p className="legal-updated">Last updated: June 19, 2026</p>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Tarik Services ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>tarikweb.com</strong> and use our services.
            </p>
            <p>
              By using our website, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personally identifiable information that you voluntarily provide, including:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Business name and website URL</li>
              <li>Project requirements and messages submitted through our contact forms</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information, including:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Device type and operating system</li>
              <li>Pages visited, time spent, and navigation patterns</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h3>2.3 AI Chatbot Data</h3>
            <p>
              Our AI-powered chatbot ("Tarik AI") processes your messages to provide relevant responses. Chat conversations may be temporarily stored for the duration of your session but are <strong>not permanently saved or linked to your identity</strong>.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To respond to your inquiries and project requests</li>
              <li>To provide, maintain, and improve our services</li>
              <li>To send you project updates, quotes, and relevant communications</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To comply with legal obligations</li>
              <li>To detect and prevent fraudulent or unauthorized activity</li>
            </ul>
          </section>

          <section>
            <h2>4. Sharing of Information</h2>
            <p>We do <strong>not sell, trade, or rent</strong> your personal information to third parties. We may share your information only in the following cases:</p>
            <ul>
              <li><strong>Service Providers:</strong> Trusted third-party services (hosting, analytics, email) that assist in operating our website</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section>
            <h2>5. Cookies & Tracking</h2>
            <p>
              We use cookies and similar technologies to enhance your browsing experience. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of our website.
            </p>
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
          </section>

          <section>
            <h2>6. Data Security</h2>
            <p>
              We implement industry-standard security measures including SSL encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. Contact form data is retained for up to 24 months unless you request earlier deletion.
            </p>
          </section>

          <section>
            <h2>8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the following rights:</p>
            <ul>
              <li>Access and review your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>tarik@tarikservices.in</strong>.</p>
          </section>

          <section>
            <h2>9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
            </p>
          </section>

          <section>
            <h2>10. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have collected data from a minor, we will take steps to delete it promptly.
            </p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> tarik@tarikservices.in</li>
              <li><strong>Phone:</strong> +91 98XXX XXXXX</li>
              <li><strong>Address:</strong> New Delhi, India</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
