import { motion } from 'framer-motion';
import './TrustedBy.css';

const ease = [0.4, 0, 0, 1];

const logos = [
  { name: 'React', dot: 'dot-cyan' },
  { name: 'Next.js', dot: 'dot-indigo' },
  { name: 'Stripe', dot: 'dot-purple' },
  { name: 'AWS', dot: 'dot-blue' },
  { name: 'Shopify', dot: 'dot-green' },
  { name: 'Figma', dot: 'dot-pink' },
  { name: 'Vercel', dot: 'dot-indigo' },
  { name: 'Supabase', dot: 'dot-green' },
  { name: 'Tailwind', dot: 'dot-cyan' },
  { name: 'MongoDB', dot: 'dot-green' },
  { name: 'Firebase', dot: 'dot-blue' },
  { name: 'GraphQL', dot: 'dot-pink' },
];

export default function TrustedBy() {
  // Duplicate the logos array for seamless infinite scroll
  const doubledLogos = [...logos, ...logos];

  return (
    <motion.section
      className="trusted-by"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="trusted-by-label">
        Trusted technologies & partnerships
      </div>

      <div className="trusted-by-marquee">
        <div className="trusted-by-track">
          {doubledLogos.map((logo, i) => (
            <div key={i} className="trusted-by-logo">
              <span className={`trusted-by-logo-dot ${logo.dot}`} />
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
