import { motion } from 'framer-motion';
import { LuShield, LuClock, LuUsers, LuHeadphones } from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import { useCountUp } from '../hooks/useCountUp';
import SplitText from './SplitText';
import './About.css';

const ease = [0.4, 0, 0, 1];

const features = [
  { icon: <LuShield />, title: 'Quality First', description: 'Meticulous attention to detail and industry best practices in every project.' },
  { icon: <LuClock />, title: 'On-Time Delivery', description: 'We respect deadlines and ensure your project launches when promised.' },
  { icon: <LuUsers />, title: 'Dedicated Team', description: 'Passionate designers, developers, and strategists committed to your success.' },
  { icon: <LuHeadphones />, title: '24/7 Support', description: 'Round-the-clock support to keep your products running flawlessly.' },
];

const stats = [
  { target: 150, suffix: '+', label: 'Projects' },
  { target: 50, suffix: '+', label: 'Clients' },
  { target: 5, suffix: '+', label: 'Years' },
  { target: 99, suffix: '%', label: 'Satisfaction' },
];

function StatCard({ target, suffix, label }) {
  const { count, ref } = useCountUp(target, 2000);
  return (
    <div ref={ref} className="about-stat-card">
      <div className="about-stat-number">
        {count}<span className="about-stat-suffix">{suffix}</span>
      </div>
      <div className="about-stat-label">{label}</div>
    </div>
  );
}

const clipReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 0.7, ease },
  },
};

export default function About() {
  const { setCursorHovered, setCursorLabel } = useCursor();

  return (
    <section className="about section" id="about">
      <div className="container">
        <div className="about-wrapper">
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          >
            <motion.span className="section-label" variants={clipReveal}>
              Why Choose Us
            </motion.span>

            <SplitText
              text="Turning Ideas Into Digital Reality"
              as="h2"
              className="section-title"
              variant="slideUp"
              stagger={0.05}
            />

            <motion.p className="section-subtitle" variants={clipReveal}>
              At Tarik Services, we don&apos;t just build products — we build
              partnerships. Creative vision meets technical excellence.
            </motion.p>

            <motion.div className="about-features">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="about-feature"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index + 0.2, duration: 0.5, ease }}
                >
                  <div className="about-feature-icon">{feature.icon}</div>
                  <div className="about-feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
            onMouseEnter={() => { setCursorHovered(true); setCursorLabel(''); }}
            onMouseLeave={() => { setCursorHovered(false); }}
          >
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
