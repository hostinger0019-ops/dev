import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LuArrowLeft, LuShoppingCart, LuHeart,
  LuTruck, LuShield, LuRefreshCw, LuHeadphones,
  LuStar, LuShirt, LuWatch, LuGem, LuFootprints,
} from 'react-icons/lu';
import productData, { productCategories } from './data/productData';
import heroBg from './images/hero-bg.png';
import './EcommercePage.css';

const ease = [0.4, 0, 0, 1];

const categories = [
  { icon: <LuShirt />, name: 'Fashion', count: '2,400+ items' },
  { icon: <LuWatch />, name: 'Accessories', count: '850+ items' },
  { icon: <LuFootprints />, name: 'Footwear', count: '1,200+ items' },
  { icon: <LuGem />, name: 'Jewellery', count: '600+ items' },
];

const features = [
  { icon: <LuTruck />, name: 'Free Shipping', desc: 'Free delivery on orders above ₹999 across India' },
  { icon: <LuShield />, name: '100% Authentic', desc: 'Every product is verified and brand-authorized' },
  { icon: <LuRefreshCw />, name: 'Easy Returns', desc: '7-day hassle-free returns and exchanges' },
  { icon: <LuHeadphones />, name: '24/7 Support', desc: 'Dedicated customer support via chat, call & email' },
];

const navLinks = [
  { label: 'Categories', href: '#ec-categories' },
  { label: 'Shop', href: '#ec-products' },
  { label: 'Offers', href: '#ec-offers' },
];

export default function EcommercePage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const filteredProducts = activeFilter === 'all'
    ? productData
    : productData.filter((p) => p.category === activeFilter);

  const handleAddToCart = (name) => {
    setCartCount((c) => c + 1);
    setToastMsg(`✓ ${name} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="ec-page">
      <Link to="/" className="ec-back-badge">
        <LuArrowLeft size={14} /> Back to Tarik
      </Link>

      {/* Navbar */}
      <nav className={`ec-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="ec-navbar-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Zest<span>ora</span>
        </div>
        <div className="ec-nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
          ))}
          <div className="ec-cart-icon" onClick={() => { setToastMsg('🛒 Cart feature — coming soon!'); setShowToast(true); setTimeout(() => setShowToast(false), 2000); }}>
            <LuShoppingCart size={16} />
            {cartCount > 0 && <span className="ec-cart-badge">{cartCount}</span>}
          </div>
        </div>
        <div className={`ec-mobile-toggle ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`ec-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
        ))}
      </div>

      {/* Hero */}
      <section className="ec-hero">
        <div className="ec-hero-bg">
          <img src={heroBg} alt="Zestora premium shopping" />
        </div>
        <div className="ec-hero-overlay" />
        <motion.div className="ec-hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
          <div className="ec-hero-badge">✦ Festive Season Sale ✦</div>
          <h1 className="ec-hero-title">
            Shop the <span className="ec-hero-title-accent">Finest</span> Indian Fashion
          </h1>
          <p className="ec-hero-desc">
            From designer kurtas to handcrafted jewellery — discover curated collections from India&apos;s most loved brands.
          </p>
          <div className="ec-hero-buttons">
            <a href="#ec-products" className="ec-cta-btn" onClick={(e) => handleNavClick(e, '#ec-products')}>
              Shop Now
            </a>
            <a href="#ec-categories" className="ec-btn-outline" onClick={(e) => handleNavClick(e, '#ec-categories')}>
              Browse Categories
            </a>
          </div>
          <div className="ec-hero-features">
            <div className="ec-hero-feature"><span className="ec-hero-feature-icon">✓</span> Free Shipping above ₹999</div>
            <div className="ec-hero-feature"><span className="ec-hero-feature-icon">✓</span> COD Available</div>
            <div className="ec-hero-feature"><span className="ec-hero-feature-icon">✓</span> 7-Day Returns</div>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="ec-categories" id="ec-categories">
        <motion.div className="ec-categories-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="ec-section-label">Shop by Category</div>
          <h2 className="ec-section-title">Explore Collections</h2>
        </motion.div>
        <div className="ec-categories-grid">
          {categories.map((cat, i) => (
            <motion.div key={i} className="ec-category-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              <div className="ec-category-icon">{cat.icon}</div>
              <div className="ec-category-name">{cat.name}</div>
              <div className="ec-category-count">{cat.count}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="ec-products" id="ec-products">
        <motion.div className="ec-products-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="ec-section-label">Trending Now</div>
          <h2 className="ec-section-title">Bestselling Products</h2>
        </motion.div>

        <div className="ec-filter-tabs">
          {productCategories.map((t) => (
            <button key={t.id} className={`ec-filter-tab ${activeFilter === t.id ? 'active' : ''}`} onClick={() => setActiveFilter(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <motion.div className="ec-product-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} className="ec-product-card" layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3, ease }}>
                <div className="ec-product-img">
                  <img src={product.image} alt={product.name} />
                  <span className="ec-product-tag">{product.tag}</span>
                  <div className="ec-product-wishlist"><LuHeart size={14} /></div>
                </div>
                <div className="ec-product-info">
                  <div className="ec-product-brand">{product.brand}</div>
                  <div className="ec-product-name">{product.name}</div>
                  <div className="ec-product-pricing">
                    <span className="ec-product-price">{product.price}</span>
                    <span className="ec-product-original">{product.originalPrice}</span>
                    <span className="ec-product-discount">{product.discount}</span>
                  </div>
                  <div className="ec-product-rating">
                    <span className="ec-product-stars"><LuStar size={10} /> {product.rating}</span>
                    <span className="ec-product-reviews">({product.reviews.toLocaleString('en-IN')})</span>
                  </div>
                  <button className="ec-product-add" onClick={() => handleAddToCart(product.name)}>
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Offer Banner */}
      <section className="ec-offers" id="ec-offers">
        <motion.div className="ec-offer-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, ease }}>
          <div className="ec-offer-tag">Limited Time Offer</div>
          <h2 className="ec-offer-title">Festive Season Sale — Flat 40% Off</h2>
          <p className="ec-offer-desc">On ethnic wear, jewellery, and accessories. Use code at checkout. Valid till Diwali.</p>
          <div className="ec-offer-code">ZESTORA40</div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="ec-features">
        <div className="ec-features-grid">
          {features.map((f, i) => (
            <motion.div key={i} className="ec-feature-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5, ease }}>
              <div className="ec-feature-icon">{f.icon}</div>
              <div className="ec-feature-name">{f.name}</div>
              <div className="ec-feature-desc">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="ec-footer">
        <div className="ec-footer-grid">
          <div>
            <div className="ec-footer-brand">Zest<span>ora</span></div>
            <div className="ec-footer-desc">India&apos;s premium online destination for fashion, accessories, and lifestyle. Curated collections from 500+ brands.</div>
          </div>
          <div>
            <div className="ec-footer-col-title">Quick Links</div>
            <div className="ec-footer-links">
              <a href="#">New Arrivals</a>
              <a href="#">Bestsellers</a>
              <a href="#">Festive Edit</a>
              <a href="#">Wedding Shop</a>
            </div>
          </div>
          <div>
            <div className="ec-footer-col-title">Help</div>
            <div className="ec-footer-links">
              <a href="#">Track Order</a>
              <a href="#">Returns & Refunds</a>
              <a href="#">Size Guide</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div>
            <div className="ec-footer-col-title">Contact</div>
            <div className="ec-footer-links">
              <a href="#">support@zestora.in</a>
              <a href="#">+91 1800 123 4567</a>
              <a href="#">Mon-Sat, 9am-9pm IST</a>
            </div>
          </div>
        </div>
        <div className="ec-footer-bottom">
          <div className="ec-footer-copy">© 2026 Zestora India Pvt. Ltd. All rights reserved. CIN: U74999DL2020PTC123456</div>
          <div className="ec-footer-payments">
            <span>UPI</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>RuPay</span>
            <span>COD</span>
          </div>
        </div>
      </footer>

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div className="ec-toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
