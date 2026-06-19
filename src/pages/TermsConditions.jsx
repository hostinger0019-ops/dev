import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuArrowLeft, LuFileText } from 'react-icons/lu';
import './LegalPage.css';

const ease = [0.4, 0, 0, 1];

export default function TermsConditions() {
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
        <div className="legal-icon"><LuFileText size={28} /></div>
        <h1 className="legal-title">Terms & Conditions</h1>
        <p className="legal-updated">Last updated: June 19, 2026</p>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the website <strong>tarikweb.com</strong> operated by Tarik Services ("we," "our," or "us"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2>2. Services</h2>
            <p>Tarik Services provides digital solutions including but not limited to:</p>
            <ul>
              <li>Website design and development</li>
              <li>Mobile application development</li>
              <li>UI/UX design</li>
              <li>E-commerce solutions</li>
              <li>SEO and digital marketing</li>
              <li>Branding and logo design</li>
              <li>Website maintenance and support</li>
            </ul>
            <p>
              The scope, timeline, and pricing of specific projects will be outlined in individual project proposals or agreements between Tarik Services and the client.
            </p>
          </section>

          <section>
            <h2>3. Project Agreements</h2>
            <h3>3.1 Proposals & Quotations</h3>
            <p>
              All project proposals and quotations are valid for <strong>30 days</strong> from the date of issue unless otherwise specified. Prices are quoted in Indian Rupees (₹) and are subject to applicable taxes.
            </p>

            <h3>3.2 Project Scope</h3>
            <p>
              Work will be performed as described in the agreed-upon proposal. Any changes or additions to the original scope ("scope creep") may result in additional charges and timeline adjustments, which will be communicated and agreed upon before proceeding.
            </p>

            <h3>3.3 Client Responsibilities</h3>
            <p>The client agrees to:</p>
            <ul>
              <li>Provide necessary content, images, branding assets, and feedback in a timely manner</li>
              <li>Designate a single point of contact for project communications</li>
              <li>Review and approve deliverables within the agreed timelines</li>
              <li>Ensure all provided content does not infringe on third-party rights</li>
            </ul>
          </section>

          <section>
            <h2>4. Payment Terms</h2>
            <ul>
              <li><strong>Advance Payment:</strong> A minimum of 50% advance is required before project commencement</li>
              <li><strong>Milestone Payments:</strong> For larger projects, payments may be structured in milestones as outlined in the project agreement</li>
              <li><strong>Final Payment:</strong> The remaining balance is due upon project completion and before final file handover</li>
              <li><strong>Late Payments:</strong> Payments overdue by more than 15 days may incur a late fee of 2% per month</li>
              <li><strong>Payment Methods:</strong> UPI, bank transfer (NEFT/RTGS/IMPS), or other methods as agreed</li>
            </ul>
          </section>

          <section>
            <h2>5. Intellectual Property</h2>
            <h3>5.1 Ownership</h3>
            <p>
              Upon receipt of full payment, the client receives full ownership of the custom-built deliverables (website code, design files, etc.) as specified in the project agreement.
            </p>

            <h3>5.2 Pre-existing Materials</h3>
            <p>
              Any pre-existing intellectual property, frameworks, libraries, or tools used in the project remain the property of their respective owners. The client receives a license to use these materials within the scope of the delivered project.
            </p>

            <h3>5.3 Portfolio Rights</h3>
            <p>
              Tarik Services reserves the right to showcase completed projects in our portfolio, website, and marketing materials unless explicitly agreed otherwise in writing.
            </p>
          </section>

          <section>
            <h2>6. Revisions & Modifications</h2>
            <ul>
              <li>Each project includes a specified number of revision rounds as outlined in the proposal (typically 2-3 rounds)</li>
              <li>Additional revisions beyond the agreed scope will be billed at our standard hourly rate</li>
              <li>Major redesigns or structural changes after approval constitute new scope and will be quoted separately</li>
              <li>Revision requests must be consolidated and submitted in writing</li>
            </ul>
          </section>

          <section>
            <h2>7. Project Timeline</h2>
            <p>
              Estimated timelines are provided in good faith based on the project scope. Delays caused by late content submission, delayed feedback, or scope changes from the client's end may extend the timeline. We will communicate any timeline adjustments promptly.
            </p>
          </section>

          <section>
            <h2>8. Cancellation & Refunds</h2>
            <ul>
              <li>If the client cancels before work begins, a full refund of the advance will be provided minus a 10% administrative fee</li>
              <li>If cancellation occurs after work has commenced, charges will apply for the work completed to date</li>
              <li>Tarik Services reserves the right to terminate a project if the client fails to respond or provide required materials for more than 30 days</li>
              <li>Refunds, if applicable, will be processed within 15 business days</li>
            </ul>
          </section>

          <section>
            <h2>9. Warranties & Disclaimers</h2>
            <h3>9.1 Service Warranty</h3>
            <p>
              We provide a <strong>30-day warranty</strong> after project delivery for bug fixes related to the original scope of work. This does not cover issues arising from third-party modifications, hosting changes, or new feature requests.
            </p>

            <h3>9.2 Disclaimer</h3>
            <p>
              Our website and demo pages are provided "as is" for demonstration purposes. We do not guarantee specific business results, search engine rankings, or revenue outcomes from our services.
            </p>
          </section>

          <section>
            <h2>10. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Tarik Services shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services or website. Our total liability shall not exceed the total amount paid by the client for the specific project in question.
            </p>
          </section>

          <section>
            <h2>11. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the project. This obligation survives the termination of the project agreement.
            </p>
          </section>

          <section>
            <h2>12. Website Usage</h2>
            <p>When using our website, you agree not to:</p>
            <ul>
              <li>Use the site for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Copy, reproduce, or distribute our content without permission</li>
              <li>Abuse the AI chatbot feature or use it for harmful purposes</li>
              <li>Submit false or misleading information through our forms</li>
            </ul>
          </section>

          <section>
            <h2>13. Governing Law</h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of <strong>India</strong>. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in <strong>New Delhi, India</strong>.
            </p>
          </section>

          <section>
            <h2>14. Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page with the updated "Last updated" date. Continued use of our website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2>15. Contact Us</h2>
            <p>If you have any questions about these Terms and Conditions, please contact us:</p>
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
