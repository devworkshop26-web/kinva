

import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight, Bot, Workflow, BrainCircuit, Sparkles, ExternalLink, MessageCircle, Clock, AlertTriangle } from 'lucide-react';
import { AI_SOLUTIONS, AI_FEATURES, AI_PORTFOLIO_EXAMPLES } from '../constants';
import { Button } from './Button';
import { useLanguage } from '../LanguageContext';

interface AiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

export const AiOverlay: React.FC<AiOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const { content } = useLanguage();
  if (!isOpen) return null;

  // Find the translated text for this overlay from the context
  const overlayData = content.overlays.services.find(s => s.id === 'ai');

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
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 hidden md:block">Intelligence Artificielle & Automatisation</span>
          <span className="font-bold text-slate-900 md:hidden">IA & Automatisation</span>
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
            className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 font-bold text-sm mb-6"
          >
            Productivité & Relation Client
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.subtitle : "Chatbots & Automatisation" }}
          />
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            dangerouslySetInnerHTML={{ __html: overlayData ? overlayData.description : "Description IA..." }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-24">
            {/* Scenario A : Back Office (Automatisation) */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
               <div>
                 <div className="flex items-center gap-3 mb-6 relative z-10">
                    <Workflow className="w-8 h-8 text-cyan-600" />
                    <h3 className="text-2xl font-bold text-slate-900">Automatisation (Interne)</h3>
                 </div>
                 <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                   Pour gagner du temps sur les tâches administratives et la gestion de données.
                 </p>
                 <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                      Traitement automatique des factures
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                      Synchronisation de bases de données
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 bg-cyan-600 rounded-full"></div>
                      Alertes et reporting automatique
                    </li>
                 </ul>
               </div>
            </motion.div>

            {/* Scenario B : Front Office (Conversationnel) */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 border border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[300px]"
            >
               <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"></div>
               <div>
                 <div className="flex items-center gap-3 mb-6 relative z-10">
                    <MessageCircle className="w-8 h-8 text-cyan-400" />
                    <h3 className="text-2xl font-bold">Assistants Intelligents</h3>
                 </div>
                 <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                   Pour améliorer l'expérience client et ne manquer aucune opportunité.
                 </p>
                 <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      Chatbots WhatsApp & Facebook 24/7
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      Support bilingue (FR / MG)
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                      Qualification de prospects
                    </li>
                 </ul>
               </div>
            </motion.div>
        </div>

        {/* --- SOLUTIONS GRID --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
             <h3 className="text-3xl font-bold text-slate-900 mb-4">Nos Solutions IA</h3>
             <p className="text-slate-600 max-w-2xl mx-auto">Des outils pragmatiques, faciles à prendre en main.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {AI_SOLUTIONS.map((sol, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:border-cyan-500/30 transition-all group"
                >
                   <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
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

         {/* --- PORTFOLIO EXAMPLES --- */}
         <div className="mb-24">
          <div className="text-center mb-12">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                Cas d'usage
             </div>
             <h3 className="text-3xl font-bold text-slate-900 mb-4">IA en Action à Madagascar</h3>
             <p className="text-slate-600 max-w-2xl mx-auto">Exemples concrets de déploiements récents.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {AI_PORTFOLIO_EXAMPLES.map((project, idx) => (
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
                   
                   <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors flex items-center gap-2">
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
             <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">Pourquoi l'IA avec Kinva ?</h3>
             
             <div className="grid md:grid-cols-2 gap-10">
                {AI_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white shadow-sm text-cyan-600 flex items-center justify-center border border-slate-100">
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

        {/* --- COST OF INACTION (BANNER) --- */}
        <div className="mb-24 flex justify-center">
             <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 max-w-2xl shadow-sm">
                <div className="bg-red-100 p-3 rounded-full shrink-0 animate-pulse">
                   <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-red-900 text-sm font-medium text-center sm:text-left">
                   <strong>Le coût de l'inaction :</strong> Chaque jour sans IA, vos concurrents répondent plus vite que vous sur Facebook. Ne leur laissez pas le champ libre.
                </p>
             </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-slate-500 mb-6 text-lg">Curieux de voir ce que ça donne en vrai ?</p>
          <Button 
            onClick={() => { onClose(); onContactClick(); }}
            className="py-4 px-10 text-lg bg-cyan-600 text-white shadow-xl shadow-cyan-500/30 hover:bg-cyan-700"
          >
            Demander une démo
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>

      </div>
    </motion.div>
  );
};
