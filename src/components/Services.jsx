import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuGlobe, LuSmartphone, LuPenTool, LuRocket } from 'react-icons/lu';
import { useCursor } from '../context/CursorContext';
import SplitText from './SplitText';
import './Services.css';

const ease = [0.4, 0, 0, 1];

const services = [
  {
    icon: <LuGlobe />,
    iconClass: 'service-icon-web',
    title: 'Website Development',
    description: 'Stunning, responsive websites built with cutting-edge technologies that convert visitors into customers.',
    features: ['Custom Design', 'SEO Optimized', 'Lightning Fast', 'Mobile First'],
  },
  {
    icon: <LuSmartphone />,
    iconClass: 'service-icon-app',
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences on every device.',
    features: ['iOS & Android', 'Cross-Platform', 'Offline Support', 'Push Notifications'],
  },
  {
    icon: <LuPenTool />,
    iconClass: 'service-icon-design',
    title: 'UI/UX Design',
    description: 'User-centered design that blends aesthetics with functionality for intuitive digital experiences.',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
  },
  {
    icon: <LuRocket />,
    iconClass: 'service-icon-strategy',
    title: 'Digital Strategy',
    description: 'Data-driven strategies that amplify your digital presence and accelerate business growth.',
    features: ['Brand Strategy', 'Growth Hacking', 'Analytics', 'Consulting'],
  },
];

function ServiceCard({ service, index }) {
  const cardRef = useRef(null);
  const { setCursorHovered, setCursorLabel } = useCursor();

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="service-card"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setCursorHovered(true); setCursorLabel(''); }}
      onMouseLeave={() => { setCursorHovered(false); setCursorLabel(''); }}
    >
      <div className={`service-icon ${service.iconClass}`}>
        {service.icon}
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="service-features">
        {service.features.map((feature, i) => (
          <div key={i} className="service-feature">
            <span className="service-feature-dot" />
            {feature}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [40, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section className="services section" id="services" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="services-header"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <span className="section-label">What We Do</span>
          <SplitText
            text="Services That Drive Results"
            as="h2"
            className="section-title"
            variant="slideUp"
            center
            stagger={0.05}
          />
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From concept to launch, we provide end-to-end digital solutions
            tailored to your unique needs and goals.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
