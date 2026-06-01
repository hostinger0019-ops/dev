import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown } from 'react-icons/lu';
import menuData, { menuCategories } from './data/menuData';
import './BakeryPage.css';
const heroBg = 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1600&h=900&fit=crop';
const ease=[0.4,0,0,1]; const navLinks=[{label:'Menu',href:'#bk-items'},{label:'Order',href:'#bk-booking'}];
export default function BakeryPage(){
  const[scrolled,setScrolled]=useState(false);const[mobileOpen,setMobileOpen]=useState(false);const[activeFilter,setActiveFilter]=useState('all');const[showToast,setShowToast]=useState(false);const[formData,setFormData]=useState({name:'',phone:'',item:'',date:'',notes:''});
  useEffect(()=>{window.scrollTo(0,0)},[]);useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);useEffect(()=>{document.body.style.overflow=mobileOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[mobileOpen]);
  const handleNavClick=useCallback((e,href)=>{e.preventDefault();setMobileOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'})},[]);
  const filtered=activeFilter==='all'?menuData:menuData.filter(m=>m.category===activeFilter);
  const handleFormChange=e=>setFormData(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit=e=>{e.preventDefault();setShowToast(true);setFormData({name:'',phone:'',item:'',date:'',notes:''});setTimeout(()=>setShowToast(false),3000)};
  return(
    <div className="bk-page">
      <Link to="/" className="bk-back-badge"><LuArrowLeft size={14}/> Back to Tarik</Link>
      <nav className={`bk-navbar ${scrolled?'scrolled':''}`}><div className="bk-navbar-logo" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Sweet<span>Crust</span></div><div className="bk-nav-links">{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#bk-booking" className="bk-cta-btn" onClick={e=>handleNavClick(e,'#bk-booking')}>Order Now</a></div><div className={`bk-mobile-toggle ${mobileOpen?'active':''}`} onClick={()=>setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span/><span/><span/></div></nav>
      <div className={`bk-mobile-menu ${mobileOpen?'open':''}`}>{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#bk-booking" className="bk-cta-btn" onClick={e=>handleNavClick(e,'#bk-booking')}>Order Now</a></div>
      <section className="bk-hero"><div className="bk-hero-bg"><img src={heroBg} alt="SweetCrust"/></div><div className="bk-hero-overlay"/>
        <motion.div className="bk-hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.2}}>
          <div className="bk-hero-badge">✦ Artisan Bakery & Café ✦</div><h1 className="bk-hero-title">Sweet<span className="bk-hero-title-accent">Crust</span></h1>
          <p className="bk-hero-tagline">Handcrafted cakes, fresh sourdough, artisan pastries, and single-origin coffees in the heart of Delhi.</p>
          <div className="bk-hero-buttons"><a href="#bk-booking" className="bk-cta-btn" onClick={e=>handleNavClick(e,'#bk-booking')}>Order Now</a><a href="#bk-items" className="bk-btn-outline" onClick={e=>handleNavClick(e,'#bk-items')}>View Menu</a></div>
        </motion.div><div className="bk-hero-scroll">Scroll <LuChevronDown/></div></section>
      <section className="bk-items" id="bk-items">
        <motion.div className="bk-items-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="bk-section-label">Our Menu</div><h2 className="bk-section-title">Fresh Daily</h2></motion.div>
        <div className="bk-filter-tabs">{menuCategories.map(t=><button key={t.id} className={`bk-filter-tab ${activeFilter===t.id?'active':''}`} onClick={()=>setActiveFilter(t.id)}>{t.label}</button>)}</div>
        <motion.div className="bk-grid" layout><AnimatePresence mode="popLayout">{filtered.map(m=>(<motion.div key={m.id} className="bk-card" layout initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}} transition={{duration:.3,ease}}><div className="bk-card-img"><img src={m.image} alt={m.name}/></div><div className="bk-card-info"><div className="bk-card-name">{m.name}</div><p className="bk-card-desc">{m.description}</p><div className="bk-card-bottom"><span className="bk-card-price">{m.price}</span><button className="bk-card-book" onClick={()=>document.querySelector('#bk-booking')?.scrollIntoView({behavior:'smooth'})}>Order</button></div></div></motion.div>))}</AnimatePresence></motion.div>
      </section>
      <section className="bk-booking" id="bk-booking">
        <motion.div className="bk-booking-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="bk-section-label">Custom Orders</div><h2 className="bk-section-title">Place Your Order</h2></motion.div>
        <motion.form className="bk-form" onSubmit={handleSubmit} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.6,ease,delay:.1}}>
          <div className="bk-form-group"><label className="bk-form-label">Name</label><input className="bk-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required/></div>
          <div className="bk-form-group"><label className="bk-form-label">Phone</label><input className="bk-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required/></div>
          <div className="bk-form-group"><label className="bk-form-label">What do you need?</label><select className="bk-select" name="item" value={formData.item} onChange={handleFormChange} required><option value="">Select</option><option value="custom-cake">Custom Cake</option><option value="cake-order">Cake (Menu)</option><option value="pastry-box">Pastry Box</option><option value="bread-order">Artisan Bread</option><option value="coffee-catering">Coffee Catering</option><option value="bulk">Bulk/Corporate</option></select></div>
          <div className="bk-form-group"><label className="bk-form-label">Delivery Date</label><input className="bk-input" type="date" name="date" value={formData.date} onChange={handleFormChange} required/></div>
          <div className="bk-form-group full-width"><label className="bk-form-label">Details</label><textarea className="bk-textarea" name="notes" placeholder="Flavour, size, dietary (eggless/vegan), message on cake, quantity..." value={formData.notes} onChange={handleFormChange}/></div>
          <div className="bk-form-submit"><button type="submit" className="bk-cta-btn">Place Order</button></div>
        </motion.form>
      </section>
      <footer className="bk-footer"><div className="bk-footer-inner"><div className="bk-footer-logo">Sweet<span>Crust</span></div><div className="bk-footer-copy">© 2026 SweetCrust Bakery & Café, Khan Market, New Delhi | FSSAI: 12345678901234 | hello@sweetcrust.in</div></div></footer>
      <AnimatePresence>{showToast&&(<motion.div className="bk-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:.3}}>✓ Order placed! We&apos;ll confirm and share the total within 1 hour.</motion.div>)}</AnimatePresence>
    </div>);
}
