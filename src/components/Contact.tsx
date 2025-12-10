
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { Button } from './Button';
import { Logo } from './Logo';
import { Mail, Phone, MapPin, ArrowUp, Send, Facebook, Linkedin, Instagram, Calendar, Twitter, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { supabase } from '../supabaseClient';

interface ContactProps {
  onOpenAdmin: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenAdmin }) => {
  const { content } = useLanguage();
  const { contact, footer } = content;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success'>('idle');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'rdv',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const descriptionText = `Subject: ${formData.subject}. Message: ${formData.message}. Appt: ${formData.date} ${formData.time}`;

    const { error } = await supabase.from('leads').insert([{
        name: formData.name,
        email: formData.email,
        phone: 'N/A', // Form doesn't have explicit phone field here
        description: descriptionText,
        source: 'contact_form',
        status: 'new'
    }]);

    if (!error) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: 'rdv', date: '', time: '', message: '' });
        setTimeout(() => setIsSuccess(false), 5000);
    } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.");
    }
    
    setIsSubmitting(false);
  };

  const handleNewsletterSubmit = () => {
    // For simplicity, we just simulate newsletter for now or add to leads table as a 'newsletter' source
    // Real implementation would use a separate table or Mailchimp API
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="h-screen snap-start relative flex flex-col bg-slate-950 overflow-hidden flex-shrink-0">
      
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* ================= CONTACT FORM SECTION ================= */}
        <div className="bg-slate-50 pt-24 pb-32 relative overflow-hidden">
          
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-teal/5 rounded-full blur-[80px] translate-x-1/2 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left Column: Info */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 text-brand-teal text-xs font-bold uppercase tracking-widest mb-6">
                  <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                  {contact.badge}
                </div>
                
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                  {contact.title}
                </h2>
                
                <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-lg">
                  {contact.description}
                </p>

                <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-teal shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg mb-1">{contact.phone_label}</h3>
                      <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="text-slate-600 hover:text-brand-teal transition-colors block text-xl font-medium">
                        {CONTACT_INFO.phone}
                      </a>
                      <p className="text-slate-400 text-sm mt-1">{CONTACT_INFO.hours}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-purple shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg mb-1">{contact.email_label}</h3>
                      <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-600 hover:text-brand-purple transition-colors block text-xl font-medium">
                        {CONTACT_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-5 group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-coral shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 font-bold text-lg mb-1">{contact.office_label}</h3>
                      <p className="text-slate-600 text-xl font-medium">
                        {CONTACT_INFO.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 h-fit relative overflow-hidden">
                {isSuccess && (
                  <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Envoyé !</h3>
                    <p className="text-slate-500">Merci de nous avoir contactés. Nos équipes reviendront vers vous sous 24h.</p>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{contact.form.title}</h3>
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">{contact.form.name}</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        placeholder={contact.form.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">{contact.form.email}</label>
                      <input 
                        type="email" 
                        id="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-slate-700 ml-1">{contact.form.subject}</label>
                    <div className="relative">
                      <select 
                        id="subject" 
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all font-medium text-slate-900 cursor-pointer appearance-none"
                      >
                        {contact.form.subjects.map(sub => (
                          <option key={sub.value} value={sub.value}>{sub.label}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-brand-teal font-bold text-sm uppercase tracking-wide mb-1">
                        <Calendar className="w-4 h-4" />
                        {contact.form.appointment.label}
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="date" className="text-sm font-bold text-slate-700 ml-1">{contact.form.appointment.date_label}</label>
                        <input 
                          type="date" 
                          id="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="time" className="text-sm font-bold text-slate-700 ml-1">{contact.form.appointment.time_label}</label>
                        <div className="relative">
                          <select 
                             id="time" 
                             value={formData.time}
                             onChange={handleChange}
                             className="w-full px-5 py-3.5 rounded-xl bg-white border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all font-medium text-slate-900 cursor-pointer appearance-none"
                          >
                            <option value="">--</option>
                            {contact.form.appointment.time_options.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                          </div>
                        </div>
                      </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">{contact.form.message}</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                      placeholder="..."
                    ></textarea>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full py-4 text-lg bg-brand-teal hover:bg-brand-teal/90 shadow-xl shadow-brand-teal/20 text-white rounded-xl mt-2 flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Envoi...
                      </>
                    ) : (
                      <>
                        {contact.form.cta}
                        <Send className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-center text-slate-400 text-xs mt-4">
                    {contact.form.disclaimer}
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* ================= MODERN FOOTER ================= */}
        <div className="bg-slate-950 text-slate-400 py-16 relative border-t border-slate-900">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              
              {/* Brand */}
              <div className="space-y-6">
                <Logo lightMode />
                <p className="text-slate-500 leading-relaxed text-sm">
                  {footer.summary}
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-all">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-all">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:border-brand-teal hover:text-brand-teal transition-all">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Services Links */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">{footer.services_title}</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#network" onClick={(e) => scrollToId(e, '#network')} className="group flex items-center gap-2 hover:text-brand-teal transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-teal transition-colors"></span>
                      {content.nav.links[1].name}
                    </a>
                  </li>
                  <li>
                    <a href="#web" onClick={(e) => scrollToId(e, '#web')} className="group flex items-center gap-2 hover:text-brand-teal transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-teal transition-colors"></span>
                      {content.nav.links[2].name}
                    </a>
                  </li>
                  <li>
                    <a href="#ai" onClick={(e) => scrollToId(e, '#ai')} className="group flex items-center gap-2 hover:text-brand-teal transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-teal transition-colors"></span>
                      {content.nav.links[3].name}
                    </a>
                  </li>
                  <li>
                    <a href="#training" onClick={(e) => scrollToId(e, '#training')} className="group flex items-center gap-2 hover:text-brand-teal transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-teal transition-colors"></span>
                      {content.nav.links[4].name}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">{footer.company_title}</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="#about" onClick={(e) => scrollToId(e, '#about')} className="hover:text-white transition-colors">{content.nav.links[0].name}</a>
                  </li>
                  <li>
                    <a href="#contact" onClick={(e) => scrollToId(e, '#contact')} className="hover:text-white transition-colors">{contact.badge}</a>
                  </li>
                </ul>
              </div>

              {/* Newsletter / CTA */}
              <div>
                <h4 className="text-white font-bold text-lg mb-6">{footer.newsletter_title}</h4>
                <p className="text-slate-500 text-sm mb-4">
                  {footer.newsletter_desc}
                </p>
                <div className="flex flex-col gap-3">
                  <input 
                    type="email" 
                    placeholder={footer.newsletter_placeholder} 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm text-white placeholder:text-slate-600"
                  />
                  <Button 
                     variant="primary" 
                     onClick={handleNewsletterSubmit}
                     className={`w-full py-3 ${newsletterStatus === 'success' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'}`}
                  >
                    {newsletterStatus === 'success' ? 'Inscrit !' : footer.newsletter_cta}
                  </Button>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p>&copy; {new Date().getFullYear()} {footer.rights}</p>
              <div className="flex items-center gap-8">
                {footer.links.map(link => (
                  <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
                ))}
                <button onClick={scrollToTop} className="flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 font-medium">
                  {footer.back_to_top} <ArrowUp className="w-4 h-4"/>
                </button>
                {/* ADMIN LOCK BUTTON */}
                <button 
                  onClick={onOpenAdmin} 
                  className="flex items-center gap-1 text-slate-700 hover:text-red-500 transition-colors"
                  title="Accès Admin"
                >
                   <Lock className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
