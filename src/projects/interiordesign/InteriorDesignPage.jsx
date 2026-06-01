import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuArrowLeft, LuChevronDown } from 'react-icons/lu';
import designData, { designCategories } from './data/designData';
import './InteriorDesignPage.css';
const heroBg = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&h=900&fit=crop';
const ease=[0.4,0,0,1]; const navLinks=[{label:'Services',href:'#id-services'},{label:'Consult',href:'#id-consult'}];
export default function InteriorDesignPage(){
  const[scrolled,setScrolled]=useState(false);const[mobileOpen,setMobileOpen]=useState(false);const[activeFilter,setActiveFilter]=useState('all');const[showToast,setShowToast]=useState(false);const[formData,setFormData]=useState({name:'',phone:'',type:'',area:'',budget:'',notes:''});
  useEffect(()=>{window.scrollTo(0,0)},[]);useEffect(()=>{const h=()=>setScrolled(window.scrollY>50);window.addEventListener('scroll',h,{passive:true});return()=>window.removeEventListener('scroll',h)},[]);useEffect(()=>{document.body.style.overflow=mobileOpen?'hidden':'';return()=>{document.body.style.overflow=''}},[mobileOpen]);
  const handleNavClick=useCallback((e,href)=>{e.preventDefault();setMobileOpen(false);document.querySelector(href)?.scrollIntoView({behavior:'smooth'})},[]);
  const filtered=activeFilter==='all'?designData:designData.filter(d=>d.category===activeFilter);
  const handleFormChange=e=>setFormData(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit=e=>{e.preventDefault();setShowToast(true);setFormData({name:'',phone:'',type:'',area:'',budget:'',notes:''});setTimeout(()=>setShowToast(false),3000)};
  return(
    <div className="id-page">
      <Link to="/" className="id-back-badge"><LuArrowLeft size={14}/> Back to Tarik</Link>
      <nav className={`id-navbar ${scrolled?'scrolled':''}`}><div className="id-navbar-logo" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Design<span>Nest</span></div><div className="id-nav-links">{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#id-consult" className="id-cta-btn" onClick={e=>handleNavClick(e,'#id-consult')}>Free Consultation</a></div><div className={`id-mobile-toggle ${mobileOpen?'active':''}`} onClick={()=>setMobileOpen(!mobileOpen)} role="button" aria-label="Toggle menu" tabIndex={0}><span/><span/><span/></div></nav>
      <div className={`id-mobile-menu ${mobileOpen?'open':''}`}>{navLinks.map(l=><a key={l.href} href={l.href} onClick={e=>handleNavClick(e,l.href)}>{l.label}</a>)}<a href="#id-consult" className="id-cta-btn" onClick={e=>handleNavClick(e,'#id-consult')}>Free Consultation</a></div>
      <section className="id-hero"><div className="id-hero-bg"><img src={heroBg} alt="DesignNest"/></div><div className="id-hero-overlay"/>
        <motion.div className="id-hero-content" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8,ease,delay:.2}}>
          <div className="id-hero-badge">✦ Transform Your Space ✦</div><h1 className="id-hero-title">Design<span className="id-hero-title-accent">Nest</span></h1>
          <p className="id-hero-tagline">Award-winning interior design studio in Delhi — homes, offices, and commercial spaces designed to inspire.</p>
          <div className="id-hero-buttons"><a href="#id-consult" className="id-cta-btn" onClick={e=>handleNavClick(e,'#id-consult')}>Free Consultation</a><a href="#id-services" className="id-btn-outline" onClick={e=>handleNavClick(e,'#id-services')}>Our Services</a></div>
        </motion.div><div className="id-hero-scroll">Scroll <LuChevronDown/></div></section>
      <section className="id-services" id="id-services">
        <motion.div className="id-services-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="id-section-label">Our Services</div><h2 className="id-section-title">Design Solutions</h2></motion.div>
        <div className="id-filter-tabs">{designCategories.map(t=><button key={t.id} className={`id-filter-tab ${activeFilter===t.id?'active':''}`} onClick={()=>setActiveFilter(t.id)}>{t.label}</button>)}</div>
        <motion.div className="id-grid" layout><AnimatePresence mode="popLayout">{filtered.map(d=>(<motion.div key={d.id} className="id-card" layout initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.95}} transition={{duration:.3,ease}}><div className="id-card-img"><img src={d.image} alt={d.name}/></div><div className="id-card-info"><div className="id-card-name">{d.name}</div><p className="id-card-desc">{d.description}</p><div className="id-card-bottom"><span className="id-card-price">{d.price}</span><button className="id-card-book" onClick={()=>document.querySelector('#id-consult')?.scrollIntoView({behavior:'smooth'})}>Enquire</button></div></div></motion.div>))}</AnimatePresence></motion.div>
      </section>
      <section className="id-consult" id="id-consult">
        <motion.div className="id-consult-header" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-60px'}} transition={{duration:.6,ease}}><div className="id-section-label">Get Started</div><h2 className="id-section-title">Free Design Consultation</h2></motion.div>
        <motion.form className="id-form" onSubmit={handleSubmit} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-40px'}} transition={{duration:.6,ease,delay:.1}}>
          <div className="id-form-group"><label className="id-form-label">Name</label><input className="id-input" type="text" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required/></div>
          <div className="id-form-group"><label className="id-form-label">Phone</label><input className="id-input" type="tel" name="phone" placeholder="+91 98XXX XXXXX" value={formData.phone} onChange={handleFormChange} required/></div>
          <div className="id-form-group"><label className="id-form-label">Project Type</label><select className="id-select" name="type" value={formData.type} onChange={handleFormChange} required><option value="">Select</option><option value="1bhk">1 BHK</option><option value="2bhk">2 BHK</option><option value="3bhk">3 BHK</option><option value="villa">Villa/Bungalow</option><option value="office">Office</option><option value="retail">Retail/Showroom</option><option value="restaurant">Restaurant/Café</option></select></div>
          <div className="id-form-group"><label className="id-form-label">Area (sq.ft)</label><input className="id-input" type="text" name="area" placeholder="e.g. 1200" value={formData.area} onChange={handleFormChange}/></div>
          <div className="id-form-group full-width"><label className="id-form-label">Budget Range</label><select className="id-select" name="budget" value={formData.budget} onChange={handleFormChange} required><option value="">Select</option><option value="3-5l">₹3-5 Lac</option><option value="5-10l">₹5-10 Lac</option><option value="10-20l">₹10-20 Lac</option><option value="20l+">₹20 Lac+</option></select></div>
          <div className="id-form-group full-width"><label className="id-form-label">Tell Us More</label><textarea className="id-textarea" name="notes" placeholder="Style preferences, timeline, special requirements..." value={formData.notes} onChange={handleFormChange}/></div>
          <div className="id-form-submit"><button type="submit" className="id-cta-btn">Book Free Consultation</button></div>
        </motion.form>
      </section>
      <footer className="id-footer"><div className="id-footer-inner"><div className="id-footer-logo">Design<span>Nest</span></div><div className="id-footer-copy">© 2026 DesignNest Interiors Pvt. Ltd., Saket, New Delhi | hello@designnest.in</div></div></footer>
      <AnimatePresence>{showToast&&(<motion.div className="id-toast" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}} transition={{duration:.3}}>✓ Consultation booked! Our designer will visit your site within 48 hours.</motion.div>)}</AnimatePresence>
    </div>);
}
