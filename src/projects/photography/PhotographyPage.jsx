import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown } from 'react-icons/lu';
import portfolioData, { portfolioCategories } from './data/portfolioData';
import './PhotographyPage.css';
const heroBg = 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1600&h=900&fit=crop';
const ease=[0.4,0,0,1];
const navLinks=[{label:'Portfolio',href:'#ph-portfolio'},{label:'Book',href:'#ph-booking'}];
export default function PhotographyPage(){
  const[scrolled,setScrolled]=useState(false);const[mobileOpen,setMobileOpen]=useState(false);const[activeFilter,setActiveFilter]=useState('all');const[showToast,setShowToast]=useState(false);const[formData,setFormData]=useState({name:'',phone:'',email:'',service:'',date:'',notes:''});
  useEffect(()=>{window.scrollTo(0,0)},[]);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);
  useEffect(()=>{document.body.style.overflow=mobileOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[mobileOpen]);
  const handleNavClick=useCallback((e,href)=>{e.preventDefault();setMobileOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'})},[]);
  const filtered=activeFilter==='all'?portfolioData:portfolioData.filter(p=>p.category===activeFilter);
  const handleFormChange=e=>setFormData(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit=e=>{e.preventDefault();setShowToast(true);setFormData({name:'',phone:'',email:'',service:'',date:'',notes:''});setTimeout(()=>setShowToast(false),3000)};
  return(
    <div className="ph-page">
      <Link to="/" className="ph-back-badge"><LuArrowLeft size={14}/> Back to Tarik</Link>
      <nav className={`ph-navbar ${scrolled?'scrolled':''}`}><div className="ph-navbar-logo" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Lens<span>Kraft</span></div><div className="ph-nav-links">{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#ph-booking" className="ph-cta-btn" onClick={e=>handleNavClick(e,'#ph-booking')}>Book a Shoot</a></div><div className={`ph-mobile-toggle ${mobileOpen?'active':''}`} onClick={()=>setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span/><span/><span/></div></nav>
      <div className={`ph-mobile-menu ${mobileOpen?'open':''}`}>{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#ph-booking" className="ph-cta-btn" onClick={e=>handleNavClick(e,'#ph-booking')}>Book a Shoot</a></div>
      <section className="ph-hero"><div className="ph-hero-bg"><img src={heroBg} alt="LensKraft"/></div><div className="ph-hero-overlay"/>
        <motion.div className="ph-hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.2}}>
          <div className="ph-hero-badge">✦ Award-Winning Photography ✦</div>
          <h1 className="ph-hero-title">Lens<span className="ph-hero-title-accent">Kraft</span></h1>
          <p className="ph-hero-tagline">Delhi&apos;s premier photography studio — weddings, portraits, products & events captured with cinematic brilliance.</p>
          <div className="ph-hero-buttons"><a href="#ph-booking" className="ph-cta-btn" onClick={e=>handleNavClick(e,'#ph-booking')}>Book a Shoot</a><a href="#ph-portfolio" className="ph-btn-outline" onClick={e=>handleNavClick(e,'#ph-portfolio')}>View Portfolio</a></div>
        </motion.div><div className="ph-hero-scroll">Scroll <LuChevronDown/></div>
      </section>
      <section className="ph-portfolio" id="ph-portfolio">
        <motion.div className="ph-portfolio-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="ph-section-label">Our Work</div><h2 className="ph-section-title">Services & Pricing</h2></motion.div>
        <div className="ph-filter-tabs">{portfolioCategories.map(t=><button key={t.id} className={`ph-filter-tab ${activeFilter===t.id?'active':''}`} onClick={()=>setActiveFilter(t.id)}>{t.label}</button>)}</div>
        <motion.div className="ph-grid" layout><AnimatePresence mode="popLayout">{filtered.map(p=>(
          <motion.div key={p.id} className="ph-card" layout initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}} transition={{duration:.3,ease}}>
            <div className="ph-card-img"><img src={p.image} alt={p.name}/></div>
            <div className="ph-card-info"><div className="ph-card-name">{p.name}</div><p className="ph-card-desc">{p.description}</p><div className="ph-card-bottom"><span className="ph-card-price">{p.price}</span><button className="ph-card-book" onClick={()=>document.querySelector('#ph-booking')?.scrollIntoView({behavior:'smooth'})}>Book</button></div></div>
          </motion.div>))}</AnimatePresence></motion.div>
      </section>
      <section className="ph-booking" id="ph-booking">
        <motion.div className="ph-booking-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="ph-section-label">Book Now</div><h2 className="ph-section-title">Let&apos;s Create Magic</h2></motion.div>
        <motion.form className="ph-form" onSubmit={handleSubmit} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.6,ease,delay:.1}}>
          <div className="ph-form-group"><label className="ph-form-label">Name</label><input className="ph-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required/></div>
          <div className="ph-form-group"><label className="ph-form-label">Phone</label><input className="ph-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required/></div>
          <div className="ph-form-group"><label className="ph-form-label">Service</label><select className="ph-select" name="service" value={formData.service} onChange={handleFormChange} required><option value="">Select</option><option value="wedding-film">Wedding Film</option><option value="candid">Candid Photography</option><option value="prewedding">Pre-Wedding</option><option value="product">Product Shoot</option><option value="headshots">Corporate Headshots</option><option value="food">Food Photography</option><option value="maternity">Maternity/Newborn</option><option value="event">Event Coverage</option></select></div>
          <div className="ph-form-group"><label className="ph-form-label">Date</label><input className="ph-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required/></div>
          <div className="ph-form-group full-width"><label className="ph-form-label">Details</label><textarea className="ph-textarea" name="notes" placeholder="Location, number of people, special requests..." value={formData.notes} onChange={handleFormChange}/></div>
          <div className="ph-form-submit"><button type="submit" className="ph-cta-btn">Book My Shoot</button></div>
        </motion.form>
      </section>
      <footer className="ph-footer"><div className="ph-footer-inner"><div className="ph-footer-logo">Lens<span>Kraft</span></div><div className="ph-footer-copy">© 2026 LensKraft Studios, Hauz Khas Village, New Delhi | hello@lenskraft.in</div></div></footer>
      <AnimatePresence>{showToast&&(<motion.div className="ph-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:.3}}>✓ Booking received! We&apos;ll confirm your shoot within 4 hours.</motion.div>)}</AnimatePresence>
    </div>);
}
