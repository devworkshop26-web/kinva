

import React from 'react';
import { motion } from 'framer-motion';
import { X, FileText, CheckCircle2, ArrowRight, AlertTriangle, Hammer, Shield, HardHat, Server, Cable, Wifi, Cloud } from 'lucide-react';
import { AUDIT_CHECKPOINTS, INSTALLATION_SERVICES } from '../constants';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

interface AuditOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const AuditOverlay: React.FC<AuditOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const { content } = useLanguage();
  if (!isOpen) return null;

   // Find the translated text for this overlay from the context
  const overlayData = content.overlays.services.find(s => s.id === 'network');

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
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden md:block">Infrastructures & Réseaux</span>
          <span className="font-bold text-slate-900 md:hidden">Infrastructure IT</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Intro */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-teal/10 text-brand-teal font-bold text-sm mb-6"
          >
            Neufs & Rénovations
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.subtitle : "Internet & Sécurité" }}
          />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.description : "Description..." }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
            {/* Scenario A : Nouveau Projet */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-teal/10 rounded-bl-full -mr-10 -mt-10"></div>
               <div className="flex items-center gap-3 mb-4 relative z-10">
                  <HardHat className="w-8 h-8 text-brand-teal" />
                  <h3 className="text-xl font-bold text-slate-900">Projets Neufs (De A à Z)</h3>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 Nous travaillons sur plan avec vos architectes et électriciens.
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                    Étude des plans & pré-câblage
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                    Installation baies & onduleurs
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-2 h-2 bg-brand-teal rounded-full"></div>
                    Déploiement Wi-Fi & Postes
                  </li>
               </ul>
            </motion.div>

            {/* Scenario B : Audit & Rénov */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border-2 border-slate-100 relative overflow-hidden"
            >
               <div className="flex items-center gap-3 mb-4 relative z-10">
                  <Shield className="w-8 h-8 text-brand-purple" />
                  <h3 className="text-xl font-bold text-slate-900">Rénovation (Anti-Spaghetti)</h3>
               </div>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 Votre réseau ressemble à un plat de pâtes ? On démêle tout.
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                    Cartographie & repérage câbles
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                    Tests de débit & sécurité
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <div className="w-2 h-2 bg-brand-purple rounded-full"></div>
                    Nettoyage & remise aux normes
                  </li>
               </ul>
            </motion.div>
        </div>

        {/* --- DÉTAILS TECHNIQUES --- */}
        
        {/* PARTIE 1 : INSTALLATION */}
        <div className="mb-20 relative">
          <div className="flex items-center gap-4 mb-10">
             <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-teal text-white font-bold text-lg shadow-lg shadow-brand-teal/30">1</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Nos Domaines d'Intervention</h3>
          </div>

          <p className="text-slate-600 text-lg mb-8 max-w-3xl">
             Nos équipes interviennent sur tout le territoire malgache pour déployer des solutions pérennes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {INSTALLATION_SERVICES.map((service, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:border-brand-teal/50 transition-all group"
                >
                   <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-teal/5 text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-white transition-colors">
                         <service.icon className="w-6 h-6" />
                      </div>
                   </div>
                   <h4 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h4>
                   <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.description}</p>
                   <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, tIdx) => (
                         <span key={tIdx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">
                            {tag}
                         </span>
                      ))}
                   </div>
                </motion.div>
             ))}
          </div>
        </div>

        {/* PARTIE 2 : AUDIT POINTS */}
        <div className="mb-24">
          <div className="relative">
            <div className="absolute left-5 -top-12 h-12 w-0.5 bg-slate-200 md:hidden"></div>
            <div className="flex items-center gap-4 mb-10">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-900 font-bold text-lg border border-slate-200 shadow-sm">2</div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Check-list Qualité</h3>
            </div>
          </div>
          
          <p className="text-slate-600 text-lg mb-8 max-w-3xl">
             On ne part pas tant que tout n'est pas vert.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {AUDIT_CHECKPOINTS.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{category.category}</h3>
                </div>
                
                <ul className="space-y-4">
                  {category.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-snug">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deliverables Section */}
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-16"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

           <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Livrables & Garanties</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Nous ne travaillons pas "au noir" ou "au feeling". Chaque intervention est encadrée.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Dossier technique (Plan de réseau PDF)
                  </li>
                  <li className="flex items-center gap-3 text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Étiquetage complet (Fini de deviner quel câble fait quoi)
                  </li>
                  <li className="flex items-center gap-3 text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Garantie sur l'installation
                  </li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                 <div className="flex items-center gap-3 mb-4 text-amber-400 font-bold text-sm uppercase tracking-wider">
                    <AlertTriangle className="w-5 h-5" />
                    Pourquoi c'est urgent ?
                 </div>
                 <p className="text-sm text-slate-200 leading-relaxed">
                   À Madagascar, 70% des pannes sont dues à des problèmes électriques ou à la poussière. Nous installons du matériel tropicalisé pour que ça tienne.
                 </p>
              </div>
           </div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-6">Vous avez un projet de construction ou un besoin de maintenance ?</p>
          <Button 
            onClick={() => { onClose(); onContactClick(); }}
            className="py-4 px-10 text-lg bg-brand-teal text-white shadow-xl shadow-brand-teal/30 hover:bg-brand-teal/90"
          >
            Parler à un ingénieur
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

      </div>
    </motion.div>
  );
};
