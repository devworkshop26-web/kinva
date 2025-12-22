
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Facebook, Moon, Coffee, Zap, ArrowRight, TrendingUp, Coins, AlertOctagon, Calendar, FileText, Users, Activity, CheckCircle2, Send, Smartphone, Laptop, ShoppingBag, Home, Quote, Sparkles, Infinity as InfinityIcon, BarChart3, PieChart, Target, Search, AlertTriangle, Scale } from 'lucide-react';
import { Button } from './Button';

interface AiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

// Types pour les démos interactives
type DemoType = 'chat' | 'process';
type DeviceType = 'mobile' | 'desktop';

interface DemoStep {
  type: 'user' | 'bot' | 'system';
  text: string;
  delay: number;
}

interface UseCase {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  icon: any;
  story: string; 
  pain: string;
  solution: string;
  gain: string;
  demoType: DemoType;
  device: DeviceType;
  demoScenario: DemoStep[];
}

// --- DONNÉES IA OPÉRATIONNELLE (Robots d'action) ---
const OPERATIONAL_CASES: UseCase[] = [
  {
    id: 'facebook',
    title: "Vente Facebook",
    subtitle: "Du commentaire au MVola.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Facebook,
    story: "Il est 23h. Un client veut acheter. Vos concurrents dorment. Ils répondront demain matin (trop tard). Votre IA, elle, est réveillée. Elle répond, elle rassure, elle envoie le lien de paiement. Au réveil, vos concurrents ont des notifications, vous avez de l'argent.",
    pain: "L'humain doit dormir. Pas le business.",
    solution: "Réponse et vente immédiate en MP, 24h/24.",
    gain: "Vous raflez 100% des ventes nocturnes.",
    demoType: 'chat',
    device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Prix svp ?", delay: 500 },
      { type: 'bot', text: "Bonjour ! C'est 45.000 Ar la paire. En stock ✅", delay: 1500 },
      { type: 'bot', text: "On livre où ? (Tana / Province)", delay: 2500 },
      { type: 'user', text: "Tana, 67ha", delay: 3500 },
      { type: 'bot', text: "Ça marche. Livraison 5.000 Ar. Voici le numéro MVola pour valider.", delay: 4500 }
    ]
  },
  {
    id: 'facture',
    title: "Recouvrement Auto",
    subtitle: "Fini les impayés gênants.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: FileText,
    story: "Vos concurrents perdent du temps à appeler les clients pour réclamer de l'argent, avec la peur de froisser la relation. Vous ? Votre système envoie des rappels parfaits, polis et graduels. L'argent rentre tout seul, sans émotion, sans erreur.",
    pain: "L'hésitation humaine retarde vos encaissements.",
    solution: "Relance automatique programmée. Zéro oubli.",
    gain: "Trésorerie assainie automatiquement.",
    demoType: 'process',
    device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse des factures échues...", delay: 500 },
      { type: 'system', text: "Client 'Société ABC' : Retard 5 jours", delay: 1500 },
      { type: 'bot', text: "Génération mail de relance #1 (Ton : Courtois)", delay: 2500 },
      { type: 'system', text: "Mail envoyé 📧", delay: 3500 },
      { type: 'user', text: "Bonjour, virement effectué ce matin.", delay: 5000 },
      { type: 'system', text: "Merci. Dossier clôturé.", delay: 6000 }
    ]
  },
  {
    id: 'immo',
    title: "Agence Immobilière",
    subtitle: "Qualifiez avant de visiter.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Home,
    story: "Pendant que les autres agents perdent leur journée dans les embouteillages pour des clients qui n'ont pas le budget, vous ne vous déplacez que pour signer. Votre IA a déjà filtré les curieux. Vous travaillez moins, vous vendez plus.",
    pain: "Les visites inutiles tuent la rentabilité des agents.",
    solution: "Qualification automatique (Budget) avant RDV.",
    gain: "1 visite = 1 vente potentielle réelle.",
    demoType: 'chat',
    device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Dispo pour visite Villa Ivandry ?", delay: 500 },
      { type: 'bot', text: "Bonjour. Oui ! Juste avant, quel est votre budget max ?", delay: 1500 },
      { type: 'user', text: "Environ 200M Ar", delay: 3000 },
      { type: 'bot', text: "Cette villa est à 800M. Je peux vous proposer plutôt nos appartements à Ankorondrano ?", delay: 4500 },
      { type: 'user', text: "Ah oui, montrez-moi.", delay: 6000 }
    ]
  },
  {
    id: 'restaurant',
    title: "Restaurant & Delivery",
    subtitle: "Zéro erreur de commande.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Coffee,
    story: "Chez vos concurrents, c'est la panique : téléphone qui sonne, erreurs de noté, livreurs perdus. Chez vous ? Silence et efficacité. La commande arrive par écrit avec GPS précis. Votre cuisine tourne comme une horloge suisse.",
    pain: "Le bruit et la fatigue créent des erreurs de caisse.",
    solution: "Commande WhatsApp avec géolocalisation forcée.",
    gain: "Service impeccable, client fidélisé à vie.",
    demoType: 'chat',
    device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Je veux commander", delay: 500 },
      { type: 'bot', text: "Menu du jour 🍔. Que choisissez-vous ?", delay: 1500 },
      { type: 'user', text: "2 Cheese + 1 Frites", delay: 2500 },
      { type: 'bot', text: "Noté. Cliquez ci-dessous pour envoyer votre GPS exact.", delay: 3500 },
      { type: 'system', text: "📍 Localisation reçue : Analakely", delay: 4500 },
      { type: 'bot', text: "Le livreur part dans 10min.", delay: 5500 }
    ]
  },
  {
    id: 'hr',
    title: "Recrutement RH",
    subtitle: "Triez 500 CV en 1 minute.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Users,
    story: "Vos concurrents noient sous 500 CVs, ils en ratent les meilleurs par fatigue. Vous ? Votre système a déjà interviewé tout le monde et classé les candidats. Vous appelez directement le Top 3 avant que les autres n'aient ouvert leur premier mail.",
    pain: "Le tri manuel est lent, subjectif et coûteux.",
    solution: "Pré-qualification automatique. Filtrage immédiat.",
    gain: "Vous recrutez les meilleurs talents, plus vite.",
    demoType: 'process',
    device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Candidat : Jean (via LinkedIn)", delay: 500 },
      { type: 'bot', text: "Question 1 : Avez-vous le permis B ?", delay: 1500 },
      { type: 'user', text: "Non pas encore", delay: 2500 },
      { type: 'bot', text: "Désolé, ce poste nécessite des déplacements. Dossier archivé.", delay: 3500 },
      { type: 'system', text: "Statut: Rejeté (Automatique)", delay: 4500 }
    ]
  },
  {
    id: 'hotel',
    title: "Hôtels & Tourisme",
    subtitle: "Répondez quand vous dormez.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Moon,
    story: "Les touristes réservent quand c'est la nuit à Mada. Vos concurrents affichent 'fermé'. Vous ? Vous êtes 'Ouvert'. Votre IA accueille, montre les chambres et prend l'acompte. Vous vous réveillez avec un taux d'occupation plein.",
    pain: "Les horaires de bureau font perdre la clientèle.",
    solution: "Réceptionniste virtuel bilingue actif 24h/24.",
    gain: "Maximisation du taux d'occupation sans effort.",
    demoType: 'chat',
    device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Vous avez une chambre vue mer pour le 12 ?", delay: 500 },
      { type: 'bot', text: "Bonjour ! Oui, la Suite Océan est libre 🌊. (120€/nuit)", delay: 1500 },
      { type: 'user', text: "Super, je prends.", delay: 3000 },
      { type: 'bot', text: "Excellent choix. Voici le lien sécurisé pour l'acompte.", delay: 4000 }
    ]
  }
];

// --- DONNÉES IA DÉCISIONNELLE (Cerveau d'analyse) ---
const DECISION_CASES: UseCase[] = [
  {
    id: 'forecast',
    title: "Prévision des Ventes",
    subtitle: "Prédisez l'avenir, optimisez.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: BarChart3,
    story: "Commander trop, c'est de la trésorerie qui dort. Commander trop peu, c'est des ventes ratées. L'IA analyse votre historique, la météo, les vacances scolaires et prédit vos ventes avec 95% de précision. Vous commandez juste ce qu'il faut.",
    pain: "Le 'pifomètre' coûte cher en stock mort ou en rupture.",
    solution: "Analyse prédictive basée sur l'historique et la saisonnalité.",
    gain: "Réduction du stock de 30% sans rater de ventes.",
    demoType: 'process',
    device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse historique Ventes (3 ans)...", delay: 500 },
      { type: 'system', text: "Détection saisonnalité: Fête des Mères (+40%)", delay: 1500 },
      { type: 'bot', text: "Prévision : Vous vendrez 1200 unités le mois prochain.", delay: 2500 },
      { type: 'bot', text: "Stock actuel : 400. Recommandation : Commander 800 unités.", delay: 3500 },
      { type: 'user', text: "Valider la commande fournisseur.", delay: 4500 }
    ]
  },
  {
    id: 'pricing',
    title: "Prix Dynamique",
    subtitle: "Le bon prix, au bon moment.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: TrendingUp,
    story: "Pourquoi vendre au même prix le lundi vide et le samedi plein ? L'IA ajuste vos prix en temps réel selon la demande (comme les compagnies aériennes). Vous maximisez vos marges quand la demande est forte, et remplissez quand elle est faible.",
    pain: "Prix fixes = Manque à gagner énorme.",
    solution: "Yield Management automatisé par IA.",
    gain: "+15% de Chiffre d'Affaires immédiat.",
    demoType: 'process',
    device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse Taux d'Occupation Hôtel...", delay: 500 },
      { type: 'system', text: "Week-end prochain : 85% complet", delay: 1500 },
      { type: 'bot', text: "Forte demande détectée. Action : Augmentation prix chambres standards.", delay: 2500 },
      { type: 'system', text: "Ancien prix : 150.000 Ar -> Nouveau prix : 190.000 Ar", delay: 3500 },
      { type: 'system', text: "Gain estimé sur le WE : +2.4M Ar", delay: 4500 }
    ]
  },
  {
    id: 'churn',
    title: "Rétention Client",
    subtitle: "Sachez qui va partir.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: AlertTriangle,
    story: "Un client qui part coûte 5x plus cher à remplacer qu'à garder. L'IA détecte les signaux faibles (baisse de commande, retard paiement) avant que le client ne vous quitte. Elle vous alerte pour que vous puissiez l'appeler et le sauver.",
    pain: "On s'aperçoit qu'un client est parti quand c'est trop tard.",
    solution: "Scoring de risque de départ (Churn Rate).",
    gain: "Rétention client améliorée de 25%.",
    demoType: 'process',
    device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Audit base clients actifs...", delay: 500 },
      { type: 'system', text: "Client 'Société XYZ' : Risque Élevé 🔴", delay: 1500 },
      { type: 'bot', text: "Pourquoi ? Baisse fréquence commandes (-40%) et tickets support non résolus.", delay: 2500 },
      { type: 'bot', text: "Action suggérée : Offrir remise -10% + Appel commercial.", delay: 3500 },
      { type: 'user', text: "Générer le bon de remise.", delay: 4500 }
    ]
  },
  {
    id: 'risk',
    title: "Analyse de Risque",
    subtitle: "Évitez les mauvais payeurs.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Scale,
    story: "Ce nouveau gros client veut payer à 60 jours. Est-ce une opportunité ou un piège ? L'IA scanne le web, les bilans, et les comportements pour vous donner un score de fiabilité. Ne signez plus avec des entreprises au bord de la faillite.",
    pain: "Les impayés tuent les PME.",
    solution: "Credit Scoring prédictif B2B.",
    gain: "Zéro défaut de paiement sur les nouveaux contrats.",
    demoType: 'chat',
    device: 'desktop',
    demoScenario: [
      { type: 'user', text: "Analyse risque pour 'Entreprise Beta Mada'", delay: 500 },
      { type: 'bot', text: "Recherche données légales & financières...", delay: 1500 },
      { type: 'system', text: "⚠️ Alerte : 2 procès en cours pour impayés.", delay: 2500 },
      { type: 'bot', text: "Score de fiabilité : 3/10 (Risqué).", delay: 3500 },
      { type: 'bot', text: "Conseil : Exigez un acompte de 50% minimum.", delay: 4500 }
    ]
  },
  {
    id: 'market',
    title: "Veille Concurrentielle",
    subtitle: "Espionnez (légalement).",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Target,
    story: "Vos concurrents ont baissé leurs prix ce matin. Vous le saurez la semaine prochaine ? Trop tard. L'IA surveille leurs sites, leurs réseaux sociaux et leurs catalogues 24/7. Vous recevez un rapport chaque matin pour réagir immédiatement.",
    pain: "Être le dernier informé des mouvements du marché.",
    solution: "Monitoring web temps réel des concurrents.",
    gain: "Toujours un coup d'avance.",
    demoType: 'process',
    device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Scan quotidien des concurrents...", delay: 500 },
      { type: 'system', text: "Concurrent A : Nouveau produit lancé.", delay: 1500 },
      { type: 'system', text: "Concurrent B : Promo -20% sur Facebook.", delay: 2500 },
      { type: 'bot', text: "Rapport généré. Votre produit est 10% plus cher que la moyenne aujourd'hui.", delay: 3500 },
      { type: 'user', text: "Voir le rapport complet.", delay: 4500 }
    ]
  }
];

// --- COMPONENT SIMULATEUR ---
const Simulator: React.FC<{ 
  scenario: DemoStep[]; 
  type: DemoType; 
  device: DeviceType;
  onAction: () => void;
}> = ({ scenario, type, device, onAction }) => {
  const [visibleSteps, setVisibleSteps] = useState<DemoStep[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleSteps([]);
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    let cumulatedDelay = 0;

    scenario.forEach((step, index) => {
      if (step.type === 'bot' && index > 0) {
        const typingStart = cumulatedDelay - 800; 
        if (typingStart > 0) {
            const t = setTimeout(() => setIsTyping(true), typingStart);
            timeouts.push(t);
        }
      }
      cumulatedDelay += step.delay;
      const t = setTimeout(() => {
        setIsTyping(false);
        setVisibleSteps(prev => [...prev, step]);
      }, cumulatedDelay);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [scenario]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleSteps, isTyping]);

  // DESKTOP FRAME (PROCESS / DASHBOARD STYLE)
  if (device === 'desktop') {
     return (
        <div className="bg-slate-50 rounded-lg h-full border border-slate-200 shadow-xl overflow-hidden flex flex-col relative">
            {/* Browser Header */}
            <div className="bg-white border-b border-slate-200 h-8 flex items-center px-3 gap-2 shrink-0 z-20">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
                <div className="flex-1 bg-slate-100 h-5 rounded mx-4 opacity-50 flex items-center px-2 text-[10px] text-slate-400 font-mono">kinva.ai/dashboard</div>
            </div>
            
            {/* Desktop Content */}
            <div className="flex-1 relative overflow-hidden bg-white flex flex-col">
                <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto no-scrollbar">
                    <div className="flex-grow">
                        {visibleSteps.map((step, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-3 pb-3 border-b border-slate-50 last:border-0"
                            >
                                <div className="flex items-start gap-3">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase w-20 text-center tracking-wider shrink-0 ${
                                        step.type === 'system' ? 'bg-slate-100 text-slate-500' :
                                        step.type === 'bot' ? 'bg-brand-teal/10 text-brand-teal' :
                                        'bg-blue-50 text-blue-600'
                                    }`}>
                                        {step.type === 'bot' ? 'AI_AGENT' : step.type.toUpperCase()}
                                    </span>
                                    <span className="text-slate-600 font-medium text-xs leading-relaxed">{step.text}</span>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-2 h-2 bg-brand-teal rounded-full animate-pulse"></div>
                                <div className="text-[10px] text-brand-teal animate-pulse uppercase tracking-widest font-bold">Analyse en cours...</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
     );
  }

  // MOBILE FRAME (CHAT DEFAULT)
  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-3 h-full shadow-2xl flex flex-col relative border-4 border-slate-800">
       {/* Fake Phone Header */}
       <div className="h-6 w-full flex justify-between items-center px-4 mb-1 text-[10px] text-slate-600 font-bold shrink-0">
          <span>09:41</span>
          <div className="flex gap-1">
             <div className="w-3 h-3 rounded-full bg-slate-800"></div>
          </div>
       </div>

       {/* Screen Content Wrapper */}
       <div className="flex-1 bg-white rounded-2xl overflow-hidden flex flex-col relative border border-slate-100">
            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 px-3 pt-4 no-scrollbar pb-12">
                <div className="flex-grow space-y-3">
                    {visibleSteps.map((step, idx) => (
                        <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex w-full ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {step.type === 'system' ? (
                            <div className="w-full flex justify-center my-2">
                                <span className="text-[9px] bg-slate-50 text-slate-400 px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wide font-bold">
                                    <CheckCircle2 className="w-3 h-3" /> {step.text}
                                </span>
                            </div>
                            ) : (
                            <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-medium shadow-sm leading-relaxed ${
                                step.type === 'user' 
                                    ? 'bg-brand-teal text-white rounded-br-none' 
                                    : 'bg-slate-100 text-slate-700 rounded-bl-none'
                            }`}>
                                {step.text}
                            </div>
                            )}
                        </motion.div>
                    ))}
                    
                    {isTyping && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="bg-slate-50 rounded-full px-3 py-2 flex gap-1">
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce delay-200"></div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

             {/* Input Area Mock */}
            {type === 'chat' && visibleSteps.length !== scenario.length && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm border-t border-slate-100 z-20">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-8 bg-slate-50 rounded-full border border-slate-100"></div>
                        <div className="w-8 h-8 bg-brand-teal rounded-full flex items-center justify-center text-white shadow-sm">
                            <Send className="w-3 h-3" />
                        </div>
                    </div>
                </div>
            )}
       </div>
    </div>
  );
};


export const AiOverlay: React.FC<AiOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const [activeTab, setActiveTab] = useState<'operational' | 'decision'>('operational');

  if (!isOpen) return null;

  const activeCases = activeTab === 'operational' ? OPERATIONAL_CASES : DECISION_CASES;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-white overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">Kinva IA</span>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-500" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mt-8 mb-12">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-100"
            >
               <Sparkles className="w-3 h-3" />
               Nouvelle Génération
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
               Éliminez l'erreur humaine.<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-blue-600">Automatisez le reste.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
               Le temps est votre ressource la plus précieuse. Arrêtez de le gaspiller.
            </p>
        </div>

        {/* --- TAB SELECTOR --- */}
        <div className="flex justify-center mb-16">
            <div className="bg-slate-100 p-1 rounded-full flex items-center shadow-inner">
                <button
                   onClick={() => setActiveTab('operational')}
                   className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'operational' ? 'bg-white text-slate-900 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                >
                   <Zap className="w-4 h-4" />
                   IA Opérationnelle
                </button>
                <button
                   onClick={() => setActiveTab('decision')}
                   className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'decision' ? 'bg-white text-brand-purple shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
                >
                   <TrendingUp className="w-4 h-4" />
                   IA Décisionnelle
                </button>
            </div>
        </div>

        {/* --- GRID DES CARTES --- */}
        <div className="min-h-[600px]">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24"
                >
                    {activeCases.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedCase(item)}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-white border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                            whileHover={{ scale: 1.01 }}
                        >
                            {/* Header Image Area */}
                            <div className={`h-40 overflow-hidden relative shrink-0 ${activeTab === 'decision' ? 'bg-slate-900' : 'bg-slate-900'}`}>
                                <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 scale-105 group-hover:scale-100" 
                                />
                                <div className="absolute top-4 left-4">
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg text-white border border-white/10">
                                    <item.icon className="w-5 h-5" />
                                </div>
                                </div>
                            </div>

                            {/* Content Body */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="mb-3">
                                <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                                <p className="text-sm text-slate-500 leading-snug">{item.subtitle}</p>
                                </div>
                                
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                    {item.device === 'mobile' ? <Smartphone className="w-3 h-3" /> : <Laptop className="w-3 h-3" />}
                                    {item.demoType === 'chat' ? 'Conversation' : 'Analyse'}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors ${activeTab === 'decision' ? 'group-hover:bg-brand-purple' : 'group-hover:bg-brand-teal'}`}>
                                    <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* --- SKY IS THE LIMIT (COMPACT) --- */}
        <div className="bg-slate-950 rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl mt-8">
            
            {/* Content Left */}
            <div className="relative z-10 flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-4 mb-1">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-teal backdrop-blur-sm border border-white/10">
                        <InfinityIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-1">
                            Sky is the limit.
                        </h2>
                        <p className="text-slate-400 font-medium text-xs md:text-sm max-w-md">
                            CRM, Stock, RH, Comptabilité... Tout est possible.
                        </p>
                    </div>
                </div>
            </div>

            {/* Button Right */}
            <div className="relative z-10">
                <Button 
                    onClick={() => { onClose(); onContactClick(); }}
                    className="py-3 px-6 !bg-white !text-slate-900 hover:!bg-slate-100 text-sm md:text-base font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
                >
                    Lancer mon automatisation
                    <ArrowRight className="w-4 h-4" />
                </Button>
            </div>

            {/* Decorative BG */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        </div>

      </div>

      {/* --- MODAL DETAILS (COMPACT & CLEAN) --- */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setSelectedCase(null)}
               className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.98, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.98, y: 10 }}
               transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} // Apple-like ease
               className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-[85vh]"
            >
               {/* Close Button */}
               <button 
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-slate-100/80 hover:bg-slate-200 text-slate-500 rounded-full transition-colors backdrop-blur-sm"
               >
                  <X className="w-5 h-5" />
               </button>

               {/* LEFT COLUMN: CONTENT (SCROLLABLE TEXT + STICKY FOOTER) */}
               <div className="w-full md:w-1/2 flex flex-col h-full bg-white relative">
                   
                   {/* Scrollable Area */}
                   <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar">
                       
                       {/* Header */}
                       <div className="space-y-2">
                          <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${activeTab === 'decision' ? 'text-brand-purple' : 'text-brand-teal'}`}>
                             <selectedCase.icon className="w-4 h-4" />
                             {selectedCase.title}
                          </div>
                          <h3 className="text-3xl font-black text-slate-900 leading-none">{selectedCase.subtitle}</h3>
                       </div>

                       {/* Story Block */}
                       <div className="relative pl-4 border-l-2 border-slate-200">
                          <p className="text-slate-600 text-sm leading-relaxed italic">
                             "{selectedCase.story}"
                          </p>
                       </div>

                       {/* Pain vs Solution */}
                       <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-4">
                           <div>
                              <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase mb-1">
                                 <AlertOctagon className="w-3 h-3" /> Problème
                              </div>
                              <p className="text-slate-700 text-sm font-medium">{selectedCase.pain}</p>
                           </div>
                           <div className="w-full h-px bg-slate-200"></div>
                           <div>
                              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase mb-1">
                                 <Zap className="w-3 h-3" /> Solution Kinva
                              </div>
                              <p className="text-slate-700 text-sm font-medium">{selectedCase.solution}</p>
                           </div>
                       </div>
                   </div>

                   {/* Footer (Sticky) */}
                   <div className="p-6 md:p-8 pt-4 bg-white border-t border-slate-100 flex-shrink-0 z-10">
                       <div className="flex items-center justify-between mb-4">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gain estimé</div>
                          <div className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                             {selectedCase.gain}
                          </div>
                       </div>
                       <Button 
                         onClick={() => { setSelectedCase(null); onClose(); onContactClick(); }}
                         className="w-full bg-slate-900 text-white hover:bg-slate-800 py-3.5 shadow-xl text-sm font-bold flex items-center justify-center gap-2 group rounded-xl"
                       >
                           {activeTab === 'decision' ? "Je veux ça direct" : "Je veux installer ça"}
                           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                       </Button>
                   </div>
               </div>

               {/* RIGHT COLUMN: SIMULATOR (FIXED HEIGHT/WIDTH) */}
               <div className="hidden md:flex w-1/2 bg-slate-50 border-l border-slate-200 items-center justify-center p-8 relative overflow-hidden">
                   {/* Background pattern */}
                   <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,.02)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>
                   
                   <div className="relative z-10 w-full max-w-[320px] h-[550px] shadow-2xl rounded-[2.5rem]">
                       <Simulator 
                          scenario={selectedCase.demoScenario} 
                          type={selectedCase.demoType} 
                          device={selectedCase.device}
                          onAction={() => { setSelectedCase(null); onClose(); onContactClick(); }}
                       />
                   </div>

                   <div className="absolute bottom-6 left-0 right-0 text-center">
                      <span className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-400 border border-slate-100 shadow-sm">
                         Simulation Interactive
                      </span>
                   </div>
               </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};
