

import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Layout, Smartphone, Code, Laptop, ExternalLink, Check, Minus, Star, AlertTriangle, Zap, Pizza } from 'lucide-react';
import { WEB_SOLUTIONS, WEB_FEATURES, WEB_PORTFOLIO_EXAMPLES, WEB_PRICING_PLANS, WEB_PRICING_ROWS, WEB_MODULES } from '../constants';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

interface WebOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const WebOverlay: React.FC<WebOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const { content } = useLanguage();
  if (!isOpen) return null;

  // Find the translated text for this overlay from the context
  const overlayData = content.overlays.services.find(s => s.id === 'web');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-white overflow-y-auto"
    >
      {/* Header / Nav */}
      <div className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden md:block">Web, Apps & E-commerce</span>
          <span className="font-bold text-slate-900 md:hidden">Web & Apps</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Intro */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple font-bold text-sm mb-6"
          >
            Solutions sur mesure & Accessibles
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.subtitle : "Sites Web & Applications Métiers" }}
          />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.description : "Nous créons des outils digitaux..." }}
          />
        </div>

        {/* --- SOLUTIONS GRID (MOVED TO TOP) --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
             <h3 className="text-3xl font-bold text-slate-900 mb-4">Nos Solutions Web</h3>
             <p className="text-slate-600 max-w-2xl mx-auto">Des technologies modernes, robustes et évolutives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {WEB_SOLUTIONS.map((sol, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-brand-purple/30 transition-all group"
                >
                   <div className="w-12 h-12 rounded-xl bg-brand-purple/5 text-brand-purple flex items-center justify-center mb-4 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                      <sol.icon className="w-6 h-6" />
                   </div>
                   <h4 className="text-lg font-bold text-slate-900 mb-2">{sol.title}</h4>
                   <p className="text-slate-600 text-sm leading-relaxed mb-4">{sol.description}</p>
                   <div className="flex flex-wrap gap-2 mt-auto">
                      {sol.tags.map((tag, tIdx) => (
                         <span key={tIdx} className="px-2 py-1 rounded-md bg-slate-50 text-slate-500 text-xs font-bold border border-slate-100">
                            {tag}
                         </span>
                      ))}
                   </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* --- PRICING SECTION --- */}
        <div className="mb-12 scroll-mt-28" id="pricing">
            <div className="text-center mb-12">
               <h3 className="text-3xl font-bold text-slate-900 mb-4">Abonnements Clés en Main</h3>
               <p className="text-slate-600 max-w-2xl mx-auto">Votre présence en ligne, simplifiée. Votre croissance, accélérée.</p>
            </div>

            {/* Desktop Pricing Table */}
            <div className="hidden lg:block bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Header Row (Names only) */}
                <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200">
                   <div className="p-6 font-bold text-slate-400 uppercase tracking-wider text-sm flex items-end">Options</div>
                   {WEB_PRICING_PLANS.map(plan => (
                      <div 
                        key={plan.name} 
                        className={`p-6 text-center border-l border-slate-100 relative ${plan.popular ? 'bg-brand-purple/10' : ''} ${plan.name === 'Entreprise' ? 'bg-slate-900' : ''}`}
                      >
                          <h4 className={`text-xl font-bold ${plan.textColor}`}>{plan.name}</h4>
                      </div>
                   ))}
                </div>
                
                {/* Data Rows */}
                {WEB_PRICING_ROWS.map((row, idx) => (
                    <div key={idx} className={`grid grid-cols-4 border-b border-slate-100 group ${idx === 0 ? 'bg-slate-50/50' : 'hover:bg-slate-50/50 transition-colors'}`}>
                        <div className={`p-4 px-6 text-sm font-bold flex items-center ${idx === 0 ? 'text-brand-purple' : 'text-slate-700'}`}>
                           {row.label}
                        </div>
                        
                        {/* Vitrine */}
                        <div className="p-4 flex items-center justify-center border-l border-slate-100 relative">
                           {typeof row.vitrine === 'boolean' ? (
                              row.vitrine ? <Check className="w-5 h-5 text-green-500" /> : <Minus className="w-5 h-5 text-slate-200" />
                           ) : (
                              row.vitrine === 'star' ? <Star className="w-6 h-6 text-slate-200" /> : 
                              <span className="text-sm font-medium text-slate-600">{row.vitrine}</span>
                           )}
                        </div>

                        {/* Commercial (Highlighted) */}
                        <div className="p-4 flex items-center justify-center border-l border-slate-100 bg-brand-purple/10 relative">
                           {typeof row.commercial === 'boolean' ? (
                              row.commercial ? <Check className="w-5 h-5 text-brand-purple" /> : <Minus className="w-5 h-5 text-slate-300" />
                           ) : (
                              row.commercial === 'star' ? <div className="p-2 bg-white rounded-full shadow-lg scale-125 border border-brand-purple/20"><Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-pulse" /></div> :
                              <span className="text-sm font-bold text-brand-purple">{row.commercial}</span>
                           )}
                        </div>

                        {/* Entreprise (Dark Mode) */}
                        <div className="p-4 flex items-center justify-center border-l border-slate-100 bg-slate-900 relative">
                           {typeof row.entreprise === 'boolean' ? (
                              row.entreprise ? <Check className="w-5 h-5 text-white" /> : <Minus className="w-5 h-5 text-slate-600" />
                           ) : (
                               row.entreprise === 'star' ? <Star className="w-6 h-6 text-slate-600" /> :
                              <span className="text-sm font-bold text-white">{row.entreprise}</span>
                           )}
                        </div>
                    </div>
                ))}

                {/* Price Footer Row */}
                <div className="grid grid-cols-4 bg-slate-50/50">
                    <div className="p-6 font-bold text-slate-900 flex items-center text-lg">Tarif Mensuel</div>
                    {WEB_PRICING_PLANS.map(plan => (
                      <div 
                        key={plan.name} 
                        className={`p-10 text-center border-l border-slate-200 ${plan.popular ? 'bg-brand-purple/10' : ''} ${plan.name === 'Entreprise' ? 'bg-slate-900' : ''}`}
                      >
                          <div className={`text-4xl font-black ${plan.textColor} mb-1`}>{plan.price} <span className={`text-sm font-medium ${plan.name === 'Entreprise' ? 'text-slate-400' : 'text-slate-500'}`}>Ar</span></div>
                      </div>
                   ))}
                </div>
            </div>

            {/* Mobile Pricing Cards */}
            <div className="lg:hidden grid gap-6">
                {WEB_PRICING_PLANS.map((plan, idx) => (
                    <div key={plan.name} className={`rounded-2xl border-2 p-6 flex flex-col relative overflow-hidden ${plan.borderColor} ${plan.name === 'Entreprise' ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
                        {plan.popular && (
                           <div className="absolute top-0 right-0 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                              <Star className="w-3 h-3 fill-white" /> Recommandé
                           </div>
                        )}
                        <h4 className="text-2xl font-bold mb-6">{plan.name}</h4>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                           {WEB_PRICING_ROWS.filter(r => r.label !== "Notre Recommandation").map((row, rIdx) => {
                              // Access the correct property dynamically
                              const val = (row as any)[plan.name.toLowerCase()];
                              if (!val) return null; // Don't show if false/null
                              
                              return (
                                 <li key={rIdx} className="flex items-center justify-between text-sm border-b border-white/10 pb-2 last:border-0">
                                    <span className="opacity-80">{row.label}</span>
                                    <span className="font-bold">
                                       {val === true ? <Check className="w-4 h-4" /> : val}
                                    </span>
                                 </li>
                              );
                           })}
                        </ul>

                        <div className="text-4xl font-black mb-6 text-center">{plan.price} <span className={`text-sm font-medium ${plan.name === 'Entreprise' ? 'text-slate-400' : 'text-slate-500'}`}>Ar / mois</span></div>

                        <Button className="w-full" onClick={onContactClick} variant={plan.name === 'Entreprise' ? 'secondary' : 'primary'}>
                           Choisir {plan.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>

        {/* FUNNY / SERIOUS WARNING */}
        <div className="mb-24 flex justify-center">
             <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 max-w-2xl shadow-sm transform -rotate-1 hover:rotate-0 transition-transform cursor-help">
                <div className="bg-amber-100 p-3 rounded-full shrink-0">
                   <Pizza className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-amber-900 text-sm font-medium text-center sm:text-left">
                   <strong>Conseil d'ami :</strong> Ne sacrifiez pas la crédibilité de votre business pour le prix d'une pizza moyenne. Un site web professionnel est un investissement, pas une dépense.
                </p>
             </div>
        </div>

        {/* --- MODULES SECTION --- */}
        <div className="mb-24">
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200">
               <div className="flex flex-col md:flex-row gap-12">
                   <div className="md:w-1/3">
                      <div className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600 mb-4">
                         Sur Mesure
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Modules & Options</h3>
                      <p className="text-slate-600 leading-relaxed mb-6">
                         Ajoutez facilement des fonctionnalités selon vos besoins. Nos options modulaires permettent de transformer votre site en un outil complet.
                      </p>
                      <div className="p-4 bg-brand-purple/10 rounded-xl border border-brand-purple/20">
                         <h4 className="font-bold text-brand-purple mb-1 text-sm">Besoin d'un système métier complet ?</h4>
                         <p className="text-xs text-slate-700 leading-relaxed">
                            Nous développons des applications SaaS sur mesure : CRM, ERP léger, gestion de stock, facturation...
                         </p>
                      </div>
                   </div>

                   <div className="md:w-2/3 grid grid-cols-1 gap-4">
                      {WEB_MODULES.map((mod, idx) => (
                         <div key={idx} className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between border transition-all ${mod.highlight ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-900 border-slate-200 hover:border-brand-purple/50'}`}>
                             <div className="flex items-center gap-3 mb-2 sm:mb-0">
                                {mod.bubble && <div className="p-2 bg-brand-purple rounded-full"><Zap className="w-4 h-4 text-white" /></div>}
                                <div>
                                   <div className="font-bold text-base flex items-center gap-2">
                                      {mod.name} 
                                      {mod.bubble && <span className="text-[10px] bg-brand-purple text-white px-2 py-0.5 rounded-full animate-bounce">Indispensable</span>}
                                   </div>
                                   {mod.desc && <div className={`text-xs mt-1 ${mod.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{mod.desc}</div>}
                                </div>
                             </div>
                             <span className={`text-sm font-bold whitespace-nowrap mt-2 sm:mt-0 ${mod.highlight ? 'text-brand-purple' : 'text-slate-600'}`}>{mod.price}</span>
                         </div>
                      ))}
                   </div>
               </div>
            </div>
        </div>

         {/* --- PORTFOLIO EXAMPLES (NEW SECTION) --- */}
         <div className="mb-24">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
                Portfolio
             </div>
             <h3 className="text-3xl font-bold text-slate-900 mb-4">Exemples de Réalisations</h3>
             <p className="text-slate-600 max-w-2xl mx-auto">Quelques projets types que nous réalisons pour nos clients à Madagascar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {WEB_PORTFOLIO_EXAMPLES.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group cursor-pointer"
                >
                   <div className="relative overflow-hidden rounded-2xl mb-5 shadow-md group-hover:shadow-xl transition-all duration-300 aspect-[4/3]">
                      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 z-10 transition-colors duration-300"></div>
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        {project.category}
                      </div>
                   </div>
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-brand-purple transition-colors flex items-center gap-2">
                     {project.title}
                     <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                   </h4>
                   <p className="text-slate-600 text-sm leading-relaxed">
                      {project.description}
                   </p>
                </motion.div>
             ))}
          </div>
        </div>


        {/* --- FEATURES HIGHLIGHTS (MADA CONTEXT) --- */}
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 mb-16">
           <div className="max-w-4xl mx-auto">
             <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">Pourquoi confier votre projet à Kinva Web ?</h3>
             
             <div className="grid md:grid-cols-2 gap-10">
                {WEB_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white shadow-sm text-brand-purple flex items-center justify-center border border-slate-100">
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">{feat.title}</h4>
                      <p className="text-slate-600 leading-relaxed text-sm">{feat.description}</p>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-6 text-lg">Vous avez un cahier des charges ou juste une idée ?</p>
          <Button 
            onClick={() => { onClose(); onContactClick(); }}
            className="py-4 px-10 text-lg bg-brand-purple text-white shadow-xl shadow-brand-purple/30 hover:bg-brand-purple/90"
          >
            Obtenir un devis
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

      </div>
    </motion.div>
  );
};
