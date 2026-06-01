import Hero from '../components/Hero';
import TrustedBy from '../components/TrustedBy';
import Services from '../components/Services';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

export default function LandingPage({ introComplete }) {
  return (
    <main>
      <Hero introComplete={introComplete} />
      <TrustedBy />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
    </main>
  );
}
