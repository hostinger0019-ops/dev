import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown } from 'react-icons/lu';
import roomData, { roomCategories } from './data/roomData';
import './HotelPage.css';
const heroBg = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=900&fit=crop';
const ease=[0.4,0,0,1]; const navLinks=[{label:'Rooms',href:'#ht-items'},{label:'Reserve',href:'#ht-booking'}];
export default function HotelPage(){
  const[scrolled,setScrolled]=useState(false);const[mobileOpen,setMobileOpen]=useState(false);const[activeFilter,setActiveFilter]=useState('all');const[showToast,setShowToast]=useState(false);const[formData,setFormData]=useState({name:'',phone:'',room:'',checkin:'',checkout:'',guests:'',notes:''});
  useEffect(()=>{window.scrollTo(0,0)},[]);useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);useEffect(()=>{document.body.style.overflow=mobileOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[mobileOpen]);
  const handleNavClick=useCallback((e,href)=>{e.preventDefault();setMobileOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'})},[]);
  const filtered=activeFilter==='all'?roomData:roomData.filter(r=>r.category===activeFilter);
  const handleFormChange=e=>setFormData(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit=e=>{e.preventDefault();setShowToast(true);setFormData({name:'',phone:'',room:'',checkin:'',checkout:'',guests:'',notes:''});setTimeout(()=>setShowToast(false),3000)};
  return(
    <div className="ht-page">
      <Link to="/" className="ht-back-badge"><LuArrowLeft size={14}/> Back to Tarik</Link>
      <nav className={`ht-navbar ${scrolled?'scrolled':''}`}><div className="ht-navbar-logo" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Stay<span>Vista</span></div><div className="ht-nav-links">{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#ht-booking" className="ht-cta-btn" onClick={e=>handleNavClick(e,'#ht-booking')}>Book Now</a></div><div className={`ht-mobile-toggle ${mobileOpen?'active':''}`} onClick={()=>setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span/><span/><span/></div></nav>
      <div className={`ht-mobile-menu ${mobileOpen?'open':''}`}>{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#ht-booking" className="ht-cta-btn" onClick={e=>handleNavClick(e,'#ht-booking')}>Book Now</a></div>
      <section className="ht-hero"><div className="ht-hero-bg"><img src={heroBg} alt="StayVista"/></div><div className="ht-hero-overlay"/>
        <motion.div className="ht-hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.2}}>
          <div className="ht-hero-badge">✦ Luxury Reimagined ✦</div><h1 className="ht-hero-title">Stay<span className="ht-hero-title-accent">Vista</span></h1>
          <p className="ht-hero-tagline">Experience India&apos;s finest luxury resort in Udaipur — heritage charm, modern luxury, and lakeside serenity.</p>
          <div className="ht-hero-buttons"><a href="#ht-booking" className="ht-cta-btn" onClick={e=>handleNavClick(e,'#ht-booking')}>Book Your Stay</a><a href="#ht-items" className="ht-btn-outline" onClick={e=>handleNavClick(e,'#ht-items')}>View Rooms</a></div>
        </motion.div><div className="ht-hero-scroll">Scroll <LuChevronDown/></div></section>
      <section className="ht-items" id="ht-items">
        <motion.div className="ht-items-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="ht-section-label">Accommodation</div><h2 className="ht-section-title">Rooms & Experiences</h2></motion.div>
        <div className="ht-filter-tabs">{roomCategories.map(t=><button key={t.id} className={`ht-filter-tab ${activeFilter===t.id?'active':''}`} onClick={()=>setActiveFilter(t.id)}>{t.label}</button>)}</div>
        <motion.div className="ht-grid" layout><AnimatePresence mode="popLayout">{filtered.map(r=>(<motion.div key={r.id} className="ht-card" layout initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}} transition={{duration:.3,ease}}><div className="ht-card-img"><img src={r.image} alt={r.name}/></div><div className="ht-card-info"><div className="ht-card-name">{r.name}</div><p className="ht-card-desc">{r.description}</p><div className="ht-card-bottom"><span className="ht-card-price">{r.price}</span><button className="ht-card-book" onClick={()=>document.querySelector('#ht-booking')?.scrollIntoView({behavior:'smooth'})}>Reserve</button></div></div></motion.div>))}</AnimatePresence></motion.div>
      </section>
      <section className="ht-booking" id="ht-booking">
        <motion.div className="ht-booking-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="ht-section-label">Reservations</div><h2 className="ht-section-title">Book Your Stay</h2></motion.div>
        <motion.form className="ht-form" onSubmit={handleSubmit} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.6,ease,delay:.1}}>
          <div className="ht-form-group"><label className="ht-form-label">Guest Name</label><input className="ht-input" type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleFormChange} required/></div>
          <div className="ht-form-group"><label className="ht-form-label">Phone</label><input className="ht-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required/></div>
          <div className="ht-form-group"><label className="ht-form-label">Room Type</label><select className="ht-select" name="room" value={formData.room} onChange={handleFormChange} required><option value="">Select</option><option value="deluxe">Deluxe Room</option><option value="premium">Premium Suite</option><option value="presidential">Presidential Suite</option><option value="villa">Pool Villa</option></select></div>
          <div className="ht-form-group"><label className="ht-form-label">Guests</label><select className="ht-select" name="guests" value={formData.guests} onChange={handleFormChange} required><option value="">Select</option><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4+">4+ Guests</option></select></div>
          <div className="ht-form-group"><label className="ht-form-label">Check-in</label><input className="ht-input" type="date" name="checkin" value={formData.checkin} onChange={handleFormChange} required/></div>
          <div className="ht-form-group"><label className="ht-form-label">Check-out</label><input className="ht-input" type="date" name="checkout" value={formData.checkout} onChange={handleFormChange} required/></div>
          <div className="ht-form-group full-width"><label className="ht-form-label">Special Requests</label><textarea className="ht-textarea" name="notes" placeholder="Airport pickup, spa booking, dietary needs..." value={formData.notes} onChange={handleFormChange}/></div>
          <div className="ht-form-submit"><button type="submit" className="ht-cta-btn">Reserve Now</button></div>
        </motion.form>
      </section>
      <footer className="ht-footer"><div className="ht-footer-inner"><div className="ht-footer-logo">Stay<span>Vista</span></div><div className="ht-footer-copy">© 2026 StayVista Luxury Resorts, Lake Pichola, Udaipur 313001 | reservations@stayvista.in</div></div></footer>
      <AnimatePresence>{showToast&&(<motion.div className="ht-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:.3}}>✓ Reservation confirmed! Confirmation email sent.</motion.div>)}</AnimatePresence>
    </div>);
}
