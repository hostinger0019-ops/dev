import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown } from 'react-icons/lu';
import carData, { carCategories } from './data/carData';
import './CarDealerPage.css';
const heroBg = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&h=900&fit=crop';
const ease=[0.4,0,0,1]; const navLinks=[{label:'Cars',href:'#cd-items'},{label:'Test Drive',href:'#cd-booking'}];
export default function CarDealerPage(){
  const[scrolled,setScrolled]=useState(false);const[mobileOpen,setMobileOpen]=useState(false);const[activeFilter,setActiveFilter]=useState('all');const[showToast,setShowToast]=useState(false);const[formData,setFormData]=useState({name:'',phone:'',car:'',variant:'',date:'',notes:''});
  useEffect(()=>{window.scrollTo(0,0)},[]);useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);useEffect(()=>{document.body.style.overflow=mobileOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[mobileOpen]);
  const handleNavClick=useCallback((e,href)=>{e.preventDefault();setMobileOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'})},[]);
  const filtered=activeFilter==='all'?carData:carData.filter(c=>c.category===activeFilter);
  const handleFormChange=e=>setFormData(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit=e=>{e.preventDefault();setShowToast(true);setFormData({name:'',phone:'',car:'',variant:'',date:'',notes:''});setTimeout(()=>setShowToast(false),3000)};
  return(
    <div className="cd-page">
      <Link to="/" className="cd-back-badge"><LuArrowLeft size={14}/> Back to Tarik</Link>
      <nav className={`cd-navbar ${scrolled?'scrolled':''}`}><div className="cd-navbar-logo" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Auto<span>Bharat</span></div><div className="cd-nav-links">{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#cd-booking" className="cd-cta-btn" onClick={e=>handleNavClick(e,'#cd-booking')}>Book Test Drive</a></div><div className={`cd-mobile-toggle ${mobileOpen?'active':''}`} onClick={()=>setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span/><span/><span/></div></nav>
      <div className={`cd-mobile-menu ${mobileOpen?'open':''}`}>{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#cd-booking" className="cd-cta-btn" onClick={e=>handleNavClick(e,'#cd-booking')}>Book Test Drive</a></div>
      <section className="cd-hero"><div className="cd-hero-bg"><img src={heroBg} alt="AutoBharat"/></div><div className="cd-hero-overlay"/>
        <motion.div className="cd-hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.2}}>
          <div className="cd-hero-badge">✦ Multi-Brand Showroom ✦</div><h1 className="cd-hero-title">Auto<span className="cd-hero-title-accent">Bharat</span></h1>
          <p className="cd-hero-tagline">Delhi&apos;s trusted multi-brand car dealership — Maruti, Hyundai, Tata, Mahindra & more. Best prices, instant finance.</p>
          <div className="cd-hero-buttons"><a href="#cd-booking" className="cd-cta-btn" onClick={e=>handleNavClick(e,'#cd-booking')}>Book Test Drive</a><a href="#cd-items" className="cd-btn-outline" onClick={e=>handleNavClick(e,'#cd-items')}>Browse Cars</a></div>
        </motion.div><div className="cd-hero-scroll">Scroll <LuChevronDown/></div></section>
      <section className="cd-items" id="cd-items">
        <motion.div className="cd-items-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="cd-section-label">Showroom</div><h2 className="cd-section-title">Our Cars</h2></motion.div>
        <div className="cd-filter-tabs">{carCategories.map(t=><button key={t.id} className={`cd-filter-tab ${activeFilter===t.id?'active':''}`} onClick={()=>setActiveFilter(t.id)}>{t.label}</button>)}</div>
        <motion.div className="cd-grid" layout><AnimatePresence mode="popLayout">{filtered.map(c=>(<motion.div key={c.id} className="cd-card" layout initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}} transition={{duration:.3,ease}}><div className="cd-card-img"><img src={c.image} alt={c.name}/></div><div className="cd-card-info"><div className="cd-card-name">{c.name}</div><p className="cd-card-desc">{c.description}</p><div className="cd-card-bottom"><div><span className="cd-card-price">{c.price}</span><div className="cd-card-emi">EMI from {c.emi}</div></div><button className="cd-card-book" onClick={()=>document.querySelector('#cd-booking')?.scrollIntoView({behavior:'smooth'})}>Test Drive</button></div></div></motion.div>))}</AnimatePresence></motion.div>
      </section>
      <section className="cd-booking" id="cd-booking">
        <motion.div className="cd-booking-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="cd-section-label">Test Drive</div><h2 className="cd-section-title">Book Your Test Drive</h2></motion.div>
        <motion.form className="cd-form" onSubmit={handleSubmit} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.6,ease,delay:.1}}>
          <div className="cd-form-group"><label className="cd-form-label">Name</label><input className="cd-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required/></div>
          <div className="cd-form-group"><label className="cd-form-label">Phone</label><input className="cd-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required/></div>
          <div className="cd-form-group"><label className="cd-form-label">Car Model</label><select className="cd-select" name="car" value={formData.car} onChange={handleFormChange} required><option value="">Select</option><option value="swift">Maruti Swift</option><option value="creta">Hyundai Creta</option><option value="nexon-ev">Tata Nexon EV</option><option value="xuv700">Mahindra XUV700</option><option value="brezza">Maruti Brezza</option><option value="punch">Tata Punch</option><option value="mg-zs">MG ZS EV</option><option value="city">Honda City</option></select></div>
          <div className="cd-form-group"><label className="cd-form-label">Preferred Date</label><input className="cd-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required/></div>
          <div className="cd-form-group full-width"><label className="cd-form-label">Notes</label><textarea className="cd-textarea" name="notes" placeholder="Preferred time, finance interest, exchange car details..." value={formData.notes} onChange={handleFormChange}/></div>
          <div className="cd-form-submit"><button type="submit" className="cd-cta-btn">Book Test Drive</button></div>
        </motion.form>
      </section>
      <footer className="cd-footer"><div className="cd-footer-inner"><div className="cd-footer-logo">Auto<span>Bharat</span></div><div className="cd-footer-copy">© 2026 AutoBharat Motors, Rajouri Garden, New Delhi | DL-XXXXX | sales@autobharat.in</div></div></footer>
      <AnimatePresence>{showToast&&(<motion.div className="cd-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:.3}}>✓ Test drive booked! Our executive will confirm within 2 hours.</motion.div>)}</AnimatePresence>
    </div>);
}
