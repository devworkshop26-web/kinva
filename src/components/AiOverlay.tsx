
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Facebook, Moon, Coffee, Zap, ArrowRight, TrendingUp, Coins, AlertOctagon, 
  Calendar, FileText, Users, Activity, CheckCircle2, Send, Smartphone, Laptop, 
  ShoppingBag, Home, Quote, Sparkles, Infinity as InfinityIcon, BarChart3, 
  PieChart, Target, Search, AlertTriangle, Scale, Rocket, BrainCircuit, 
  Workflow, Database, Cloud, Lightbulb, MessageSquare, GraduationCap, 
  HeartPulse, Truck, ShieldCheck, Microscope, Volume2, Globe, Link, 
  Share2, Mail, FileJson, Layers, Cpu, MessageCircle, Bell, UserCheck, Bot,
  MousePointerClick, History, Wand2, XCircle, Timer, Skull
} from 'lucide-react';
import { Button } from './Button';

interface AiOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

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

// --- 8 SCÉNARIOS OPÉRATIONNELS ---
const OPERATIONAL_CASES: UseCase[] = [
  {
    id: 'facebook',
    title: "Vente Facebook",
    subtitle: "Vendez pendant que vous dormez.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Facebook,
    story: "Vos clients sur Facebook n'attendent pas. S'ils commentent 'Prix' à 23h et que vous répondez à 8h, ils ont déjà acheté ailleurs. Votre IA répond en 2 secondes, gère la variante (taille/couleur) et envoie le lien MVola.",
    pain: "Perte de 60% des leads nocturnes.",
    solution: "Agent de vente conversationnel 24/7.",
    gain: "Capture immédiate de chaque intention d'achat.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Bjr, prix de la chaussure rouge ?", delay: 500 },
      { type: 'bot', text: "Bonjour ! C'est 145.000 Ar. Dispo en T38, 40 et 42. On vous livre demain ?", delay: 1200 },
      { type: 'user', text: "Oui T40 à Itaosy", delay: 2500 },
      { type: 'bot', text: "Parfait. Livraison : 5.000 Ar. Total : 150.000 Ar. Voici le code de paiement...", delay: 3500 }
    ]
  },
  {
    id: 'facture',
    title: "Relance Client Pro",
    subtitle: "Recouvrement sans friction.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: FileText,
    story: "Relancer un client qui n'a pas payé est gênant pour vos employés. L'IA le fait avec une politesse absolue et une régularité mathématique. Elle détecte les promesses de virement dans les emails et met à jour votre comptabilité seule.",
    pain: "Trésorerie bloquée par oubli ou timidité.",
    solution: "Automatisation du cycle de relance par email/SMS.",
    gain: "Réduction des délais de paiement de 45%.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Scan factures impayées > 30 jours...", delay: 500 },
      { type: 'bot', text: "Relance #2 générée pour 'Client X' (Ton : Ferme mais pro)", delay: 1500 },
      { type: 'system', text: "Email envoyé avec copie du relevé.", delay: 2500 }
    ]
  },
  {
    id: 'school',
    title: "Secrétariat École",
    subtitle: "Zéro queue à l'inscription.",
    image: "data:image/jpeg;base64,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",
    icon: GraduationCap,
    story: "En période d'inscription, votre secrétariat est débordé par 500 parents posant les 10 mêmes questions. L'IA répond sur WhatsApp, vérifie si le dossier est complet et fixe le RDV final pour la signature.",
    pain: "Saturation administrative totale.",
    solution: "Agent d'accueil et pré-inscription scolaire.",
    gain: "Staff libéré pour l'accueil physique qualitatif.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Quels sont les frais pour la classe de 6ème ?", delay: 500 },
      { type: 'bot', text: "Pour la 6ème : Droit 200k Ar, Écolage 85k Ar/mois. Voulez-vous la liste des fournitures ?", delay: 1500 },
      { type: 'user', text: "Oui svp", delay: 2500 },
      { type: 'bot', text: "La voici (PDF). Je peux aussi pré-remplir votre fiche si vous me donnez le nom de l'élève.", delay: 3500 }
    ]
  },
  {
    id: 'ngo',
    title: "Reporting ONG",
    subtitle: "Du terrain au rapport final.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: HeartPulse,
    story: "Vos agents de terrain envoient des notes vocales ou des photos. L'IA compile ces données éparses, les traduit, les met en forme selon les normes des bailleurs internationaux et génère un rapport de 10 pages en 5 minutes.",
    pain: "2 jours de rédaction manuelle par projet.",
    solution: "Synthèse de données terrain multi-sources.",
    gain: "Rapports livrés 10x plus vite, sans erreur.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Réception de 12 notes vocales (Brousse)...", delay: 500 },
      { type: 'system', text: "Transcription Malgache > Français terminée.", delay: 1500 },
      { type: 'bot', text: "Rédaction du chapitre 'Impact Sanitaire' en cours...", delay: 2500 }
    ]
  },
  {
    id: 'logistics',
    title: "Logistique & Stock",
    subtitle: "L'inventaire par la voix.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Truck,
    story: "Fini les mains sales sur les tableurs. Vos magasiniers parlent simplement à leur téléphone : 'J'ai sorti 10 sacs de ciment'. L'IA met à jour le stock, alerte si le seuil critique est atteint et prépare le bon de commande fournisseur.",
    pain: "Écarts de stock fréquents, ressaisie pénible.",
    solution: "Interface vocale intelligente de gestion de flux.",
    gain: "Précision de stock de 99.9% en temps réel.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Sortie de 4 pneus 17 pouces pour le camion 02.", delay: 500 },
      { type: 'bot', text: "Noté. Stock restant : 2. Attention, c'est sous le seuil d'alerte (5). Commander ?", delay: 1500 },
      { type: 'user', text: "Oui, commande 10 chez le fournisseur habituel.", delay: 3000 }
    ]
  },
  {
    id: 'medical',
    title: "Pré-Triage Médical",
    subtitle: "Orientez avant l'arrivée.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Microscope,
    story: "Dans votre clinique, les patients appellent pour tout. L'IA évalue l'urgence sur WhatsApp (Toux ? Fièvre ? Douleur ?), conseille les premiers gestes et prend RDV avec le bon spécialiste.",
    pain: "Ligne téléphonique saturée, urgences noyées.",
    solution: "Agent d'orientation médicale assistée.",
    gain: "Optimisation de l'agenda des médecins de 30%.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Mon fils a 39 de fièvre depuis ce matin.", delay: 500 },
      { type: 'bot', text: "Je note. A-t-il des taches rouges ou du mal à respirer ?", delay: 1500 },
      { type: 'user', text: "Non, juste la fièvre.", delay: 2500 },
      { type: 'bot', text: "Dr. Rabe est libre à 14h. Voulez-vous confirmer ?", delay: 3500 }
    ]
  },
  {
    id: 'hotel-plus',
    title: "Conciergerie Hôtel",
    subtitle: "Un majordome dans chaque poche.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Moon,
    story: "Vos clients veulent une serviette à 22h ou le menu du petit-déjeuner. Au lieu de saturer la réception, ils scannent un QR Code. L'IA gère la demande et alerte directement l'étage concerné.",
    pain: "Réceptionniste débordé par des demandes triviales.",
    solution: "Majordome digital multi-services.",
    gain: "Satisfaction client augmentée, staff plus calme.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Peut-on avoir 2 bouteilles d'eau en chambre 204 ?", delay: 500 },
      { type: 'bot', text: "Bien sûr ! Un agent de chambre arrive dans 5 minutes. Autre chose ?", delay: 1200 },
      { type: 'user', text: "Le code wifi svp ?", delay: 2500 },
      { type: 'bot', text: "Le code est : PARADISE2024. Profitez bien ! ✨", delay: 3500 }
    ]
  },
  {
    id: 'it-support',
    title: "Support Technique",
    subtitle: "Réparez sans technicien.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Zap,
    story: "Vos employés perdent du temps car ils ne savent pas comment connecter l'imprimante ou changer un mot de passe. L'IA interne connaît tous vos manuels et les guide pas à pas avec des captures d'écran.",
    pain: "DSI harcelée pour des problèmes mineurs.",
    solution: "Base de connaissance active et interactive.",
    gain: "Disponibilité des outils IT augmentée de 50%.",
    demoType: 'chat', device: 'mobile',
    demoScenario: [
      { type: 'user', text: "Le scanner ne marche plus.", delay: 500 },
      { type: 'bot', text: "Vérifiez d'abord si le voyant bleu clignote. Est-ce le cas ?", delay: 1500 },
      { type: 'user', text: "Oui, il clignote.", delay: 2500 },
      { type: 'bot', text: "Appuyez sur 'Reset' pendant 3 sec. Ça devrait refonctionner.", delay: 3500 }
    ]
  }
];

// --- 4 SCÉNARIOS DÉCISIONNELS ---
const DECISION_CASES: UseCase[] = [
  {
    id: 'fraud',
    title: "Détection de Fraude",
    subtitle: "Protégez votre Cash.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: ShieldCheck,
    story: "L'IA analyse des milliers de transactions MVola/Orange Money. Elle repère instantanément les comportements suspects (doubles paiements, montants anormaux) et bloque la transaction avant que l'argent ne disparaisse.",
    pain: "Vols internes ou externes difficiles à tracer.",
    solution: "Algorithme de surveillance financière temps réel.",
    gain: "Sécurisation totale de votre trésorerie mobile.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse des flux financiers (Dernières 24h)...", delay: 500 },
      { type: 'system', text: "Alerte : 5 tentatives de retrait identiques sur le point de vente 04.", delay: 2000 },
      { type: 'bot', text: "Action : Blocage préventif du compte agent. Alerte Direction envoyée.", delay: 3500 }
    ]
  },
  {
    id: 'forecast',
    title: "Prévision de Demande",
    subtitle: "Zéro rupture, zéro gaspillage.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: BarChart3,
    story: "Commander 1000 unités quand on va en vendre 2000, c'est un manque à gagner. Faire l'inverse, c'est de l'argent qui dort. L'IA prédit vos besoins en croisant météo, jours fériés et historique.",
    pain: "Stocks morts ou ruptures de stock fréquentes.",
    solution: "Modèle de prédiction de ventes.",
    gain: "Rotation de stock accélérée de 25%.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Calcul tendances saisonnières + Données météo...", delay: 500 },
      { type: 'bot', text: "Pic de demande prévu le 15. Recommandation : +20% sur la boisson X.", delay: 2500 }
    ]
  },
  {
    id: 'reputation',
    title: "Analyse de Réputation",
    subtitle: "Écoutez ce qu'on dit de vous.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: MessageSquare,
    story: "Qu'est-ce qu'on dit de votre hôtel ou marque sur les groupes Facebook ? L'IA scanne le web malgache, résume le sentiment général et vous alerte uniquement s'il y a un 'Bad Buzz' naissant.",
    pain: "Impossibilité de tout lire manuellement.",
    solution: "Monitoring de sentiment social media.",
    gain: "Réactivité de crise en moins de 30 minutes.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Scan mentions 'Marque Kinva' sur Facebook...", delay: 500 },
      { type: 'system', text: "Sentiment détecté : 85% Positif / 15% Neutre.", delay: 1500 },
      { type: 'bot', text: "Rapport hebdo prêt : Les clients adorent le nouveau design.", delay: 3000 }
    ]
  },
  {
    id: 'pricing',
    title: "Optimisation de Prix",
    subtitle: "Maximisez chaque marge.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: TrendingUp,
    story: "Vos prix sont-ils trop bas pour la demande actuelle ? L'IA ajuste dynamiquement vos tarifs (hôtels, services, transport) pour s'assurer que vous ne vendez jamais à perte de potentiel.",
    pain: "Marge sacrifiée par manque de réactivité.",
    solution: "Yield Management assisté par IA.",
    gain: "+12% de chiffre d'affaires à volume égal.",
    demoType: 'process', device: 'desktop',
    demoScenario: [
      { type: 'system', text: "Analyse prix concurrents + Demande locale...", delay: 500 },
      { type: 'bot', text: "Opportunité détectée. Suggestion : Hausse de 5% sur le forfait Pro.", delay: 2500 }
    ]
  }
];

// --- 4 PONTS n8n (Les Liaisons Magiques) ---
const N8N_BRIDGES = [
  {
    title: "La Secrétaire WhatsApp",
    apps: ["WhatsApp", "Excel / CRM"],
    description: "C'est magique : dès qu'un prospect vous parle sur WhatsApp, ses coordonnées se notent toutes seules dans votre fichier client. Vous n'avez plus rien à recopier à la main.",
    benefit: "Fini les oublis de clients. Gain : 5h de saisie par semaine.",
    icon: UserCheck,
    color: "bg-emerald-500"
  },
  {
    title: "L'Alerte Direction Express",
    apps: ["Site Web", "Messenger", "Telegram"],
    description: "Peu importe où le client vous contacte (Site, FB, Insta), vous recevez une seule alerte immédiate sur votre téléphone. Vous répondez en 1 clic.",
    benefit: "Réactivité absolue. Ne perdez plus aucun contrat par lenteur.",
    icon: Bell,
    color: "bg-blue-500"
  },
  {
    title: "Le Classeur de Factures",
    apps: ["Email", "Cloud / Drive"],
    description: "Dès que vous recevez une facture par mail, le système la reconnaît, la renomme proprement et la range toute seule dans le bon dossier compta.",
    benefit: "Zéro papier perdu. Votre comptabilité est toujours carrée.",
    icon: Layers,
    color: "bg-purple-500"
  },
  {
    title: "Le Gardien du Cash",
    apps: ["Facturation", "SMS / MVola"],
    description: "Le système surveille vos retards de paiement. Il envoie un petit rappel SMS poli au client et lui propose le lien de paiement MVola direct.",
    benefit: "Trésorerie protégée. Vous êtes payé 2x plus vite sans appeler.",
    icon: Coins,
    color: "bg-amber-500"
  }
];

// --- LABORATOIRE D'IDÉES (NOUVELLE VERSION INTERACTIVE) ---
const EXAMPLES = [
  { role: "Gérant d'Hôtel", pain: "gérer les check-in tardifs à minuit", wish: "un système donne les clés et scanne les passeports tout seul" },
  { role: "Directrice d'École", pain: "répondre à 500 parents sur les frais de scolarité", wish: "un robot WhatsApp réponde et encaisse les frais par MVola" },
  { role: "Grossiste", pain: "compter le stock manuellement chaque soir", wish: "une caméra compte les cartons et passe commande au fournisseur" },
  { role: "Avocat", pain: "trier 2000 pages de contrats pour trouver une clause", wish: "une IA me résume tout et surligne les risques en rouge" }
];

const IdeaLab: React.FC<{ onContact: () => void }> = ({ onContact }) => {
  const [role, setRole] = useState("");
  const [pain, setPain] = useState("");
  const [wish, setWish] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const fillExample = () => {
    const random = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setRole(random.role);
    setPain(random.pain);
    setWish(random.wish);
    setResult(null);
  };

  const generate = () => {
    if (!role || !pain || !wish) return;
    setIsGenerating(true);
    setResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setResult(`Reçu 5/5. Pour un ${role}, automatiser "${pain}" est notre spécialité. Nous pouvons créer ${wish.replace('un ', 'ce ')} en moins de 2 semaines.`);
    }, 1500);
  };

  return (
    <div className="mt-32 relative">
       <div className="absolute inset-0 bg-gradient-to-b from-brand-teal/5 to-transparent rounded-[4rem] -z-10 blur-3xl"></div>
       <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-teal text-white font-black text-[10px] mb-8 uppercase tracking-[0.3em] shadow-lg shadow-brand-teal/20"
          >
             Laboratoire d'idées
          </motion.div>
          <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Et vous, c'est quoi votre corvée ?</h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Ces tâches répétitives qui vous transforment en robot ? N'ayez pas peur de rêver, on essaiera de résoudre tous vos problèmes.</p>
       </div>

       <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
             <BrainCircuit className="w-32 h-32 text-brand-teal" />
          </div>

          <div className="space-y-8 relative z-10">
             
             {/* Sentence Builder */}
             <div className="text-xl md:text-3xl font-medium text-white leading-relaxed space-y-4 md:space-y-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                   <span className="text-slate-500 shrink-0">Je suis...</span>
                   <input 
                     type="text" 
                     value={role}
                     onChange={(e) => setRole(e.target.value)}
                     placeholder="ex: Gérant d'Hôtel"
                     className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-brand-teal outline-none text-brand-teal placeholder:text-white/10 py-1 transition-colors"
                   />
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                   <span className="text-slate-500 shrink-0">Je veux arrêter de...</span>
                   <input 
                     type="text" 
                     value={pain}
                     onChange={(e) => setPain(e.target.value)}
                     placeholder="ex: répondre aux mêmes questions sur Facebook"
                     className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-brand-teal outline-none text-brand-teal placeholder:text-white/10 py-1 transition-colors"
                   />
                </div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-3">
                   <span className="text-slate-500 shrink-0">J'aimerais que...</span>
                   <input 
                     type="text" 
                     value={wish}
                     onChange={(e) => setWish(e.target.value)}
                     placeholder="ex: l'IA gère les réservations toute seule"
                     className="flex-1 bg-transparent border-b-2 border-white/20 focus:border-brand-teal outline-none text-brand-teal placeholder:text-white/10 py-1 transition-colors"
                   />
                </div>
             </div>

             {/* Actions */}
             <div className="flex flex-col sm:flex-row items-center gap-4 pt-8">
                <Button 
                  onClick={generate} 
                  disabled={isGenerating || !role || !pain}
                  className="w-full sm:w-auto py-4 px-8 text-lg bg-brand-teal text-white hover:bg-brand-teal/90 rounded-2xl shadow-xl shadow-brand-teal/20"
                >
                   {isGenerating ? "Analyse en cours..." : "Concevoir ma solution"}
                   <Sparkles className={`ml-2 w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>

                <button 
                   onClick={fillExample}
                   className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors px-4 py-2 rounded-xl hover:bg-white/5"
                >
                   <Wand2 className="w-4 h-4" />
                   Manque d'inspiration ? Voir un exemple
                </button>
             </div>

             {/* Result Card */}
             <AnimatePresence>
                {result && (
                   <motion.div 
                     initial={{ opacity: 0, y: 20, height: 0 }}
                     animate={{ opacity: 1, y: 0, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="bg-white rounded-2xl p-8 mt-8 border-l-8 border-brand-teal shadow-2xl"
                   >
                      <div className="flex items-start gap-4">
                         <div className="bg-brand-teal/10 p-3 rounded-full text-brand-teal shrink-0">
                            <CheckCircle2 className="w-8 h-8" />
                         </div>
                         <div>
                            <h4 className="text-slate-900 font-bold text-xl mb-2">Faisabilité Confirmée</h4>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                               {result}
                            </p>
                            <Button onClick={onContact} variant="secondary" className="text-sm">
                               Lancer ce projet maintenant
                            </Button>
                         </div>
                      </div>
                   </motion.div>
                )}
             </AnimatePresence>

          </div>
       </div>
    </div>
  );
};

// --- COMPONENT SIMULATEUR ---
const Simulator: React.FC<{ 
  scenario: DemoStep[]; 
  type: DemoType; 
  device: DeviceType;
}> = ({ scenario, type, device }) => {
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

  if (device === 'desktop') {
     return (
        <div className="bg-slate-50 rounded-lg h-full border border-slate-200 shadow-xl overflow-hidden flex flex-col relative">
            <div className="bg-white border-b border-slate-200 h-8 flex items-center px-3 gap-2 shrink-0 z-20">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                </div>
            </div>
            <div className="flex-1 relative overflow-hidden bg-white flex flex-col">
                <div ref={scrollRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto no-scrollbar">
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
                                    {step.type === 'bot' ? 'IA' : step.type.toUpperCase()}
                                </span>
                                <span className="text-slate-600 font-medium text-xs leading-relaxed">{step.text}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
     );
  }

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-3 h-full shadow-2xl flex flex-col relative border-4 border-slate-800">
       <div className="flex-1 bg-white rounded-2xl overflow-hidden flex flex-col relative border border-slate-100">
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 px-3 pt-4 no-scrollbar pb-12">
                {visibleSteps.map((step, idx) => (
                    <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex w-full ${step.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] font-medium shadow-sm leading-relaxed ${
                            step.type === 'user' 
                                ? 'bg-brand-teal text-white rounded-br-none' 
                                : 'bg-slate-100 text-slate-700 rounded-bl-none'
                        }`}>
                            {step.text}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                        <div className="bg-slate-50 rounded-full px-3 py-2 flex gap-1">
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </motion.div>
                )}
            </div>
       </div>
    </div>
  );
};


export const AiOverlay: React.FC<AiOverlayProps> = ({ isOpen, onClose, onContactClick }) => {
  const [selectedCase, setSelectedCase] = useState<UseCase | null>(null);
  const [activeTab, setActiveTab] = useState<'operational' | 'decision' | 'n8n'>('operational');

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] bg-slate-950 overflow-y-auto"
    >
      {/* Background FX */}
      <div className="absolute inset-0 bg-slate-900 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_50%_50%,#14B8A6_0,transparent_50%)]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-teal/10 rounded-full blur-[120px]"></div>
         <div className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="sticky top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-brand-teal p-2 rounded-lg">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight uppercase">Solutions Business</span>
        </div>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <X className="w-6 h-6 text-white/50" />
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-10 pb-24">
        
        {/* NEW "NO BULLSHIT" INTRO */}
        <div className="text-center max-w-5xl mx-auto mt-8 mb-20">
            <motion.div 
               initial={{ y: 20, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }}
               className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 font-black text-[10px] mb-6 uppercase tracking-[0.3em] border border-red-500/30"
            >
               Arrêtez de perdre du temps
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
               Automatisation, IA métier<br/>ou outil interne.
            </h2>
            <p className="text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
               Sans engagement long. Sans bullshit technique. On construit des systèmes qui <span className="text-white font-bold">économisent votre argent</span> et qui font le sale boulot.
            </p>
        </div>

        {/* --- THE HURT SECTION (NEW) --- */}
        <div className="max-w-6xl mx-auto mb-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                {/* The Problem */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl">
                            <Skull className="w-8 h-8 text-red-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-white">Le Problème. <span className="text-slate-500 block text-lg font-medium mt-1">(Soyons honnêtes 2 minutes)</span></h3>
                    </div>
                    
                    <ul className="space-y-6">
                        <li className="flex gap-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-lg">Vous payez des salaires pour du "copier-coller".</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Vos meilleurs employés perdent des heures sur Excel ou à répondre aux mêmes questions sur Facebook.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-lg">"On verra ça demain" tue vos ventes.</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Le client malgache est pressé. S'il n'a pas son prix en 2 minutes, il achète chez le concurrent.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                            <div>
                                <h4 className="text-white font-bold text-lg">Peur de l'usine à gaz.</h4>
                                <p className="text-slate-500 text-sm leading-relaxed">Vous ne voulez pas d'un logiciel compliqué à 50 Millions que personne ne saura utiliser.</p>
                            </div>
                        </li>
                    </ul>
                </motion.div>

                {/* The Solution Card */}
                <motion.div 
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="bg-gradient-to-br from-brand-teal/10 to-slate-900 border border-brand-teal/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10">
                        <div className="inline-block px-3 py-1 bg-brand-teal text-white font-bold text-xs uppercase tracking-widest mb-6 rounded-full shadow-lg shadow-brand-teal/20">La Réponse Kinva</div>
                        <h3 className="text-3xl font-black text-white mb-6">Le POC "Commando".</h3>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            On ne fait pas de slides. On développe un prototype fonctionnel (POC) en 5 à 10 jours. Vous testez, vous voyez le gain d'argent immédiat, et on décide ensuite.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button 
                              onClick={() => { onClose(); onContactClick(); }}
                              className="bg-brand-teal text-white py-4 px-8 text-lg font-bold shadow-xl shadow-brand-teal/20 hover:scale-[1.02] rounded-xl flex-1 justify-center"
                            >
                                Lancer un POC (Test)
                                <Rocket className="ml-2 w-5 h-5" />
                            </Button>
                            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs px-4">
                                <Timer className="w-4 h-4" />
                                Délai moyen : 1 semaine
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Tabs Modernes */}
        <div className="flex justify-center mb-16 overflow-x-auto no-scrollbar pb-4">
            <div className="bg-white/5 p-1.5 rounded-2xl flex items-center shadow-inner border border-white/10 backdrop-blur-md shrink-0">
                <button onClick={() => setActiveTab('operational')} className={`px-6 md:px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'operational' ? 'bg-brand-teal text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>Agents Intelligents</button>
                <button onClick={() => setActiveTab('decision')} className={`px-6 md:px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'decision' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-400 hover:text-white'}`}>Aide à la Décision</button>
                <button onClick={() => setActiveTab('n8n')} className={`px-6 md:px-10 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'n8n' ? 'bg-blue-500 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>Les Ponts (n8n)</button>
            </div>
        </div>

        {/* --- GRID OPÉRATIONNELLE / DÉCISIONNELLE --- */}
        <AnimatePresence mode="wait">
            {(activeTab === 'operational' || activeTab === 'decision') && (
                <motion.div 
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {(activeTab === 'operational' ? OPERATIONAL_CASES : DECISION_CASES).map((item, index) => (
                        <motion.div
                            key={item.id}
                            onClick={() => setSelectedCase(item)}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative rounded-3xl overflow-hidden cursor-pointer bg-slate-800/50 border border-white/5 hover:border-brand-teal/40 shadow-xl hover:shadow-brand-teal/10 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="h-44 overflow-hidden relative">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute top-4 left-4 bg-brand-teal p-2.5 rounded-xl text-white shadow-lg"><item.icon className="w-5 h-5" /></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="font-black text-xl text-white mb-2 leading-tight">{item.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed italic">"{item.subtitle}"</p>
                                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em]">{item.demoType}</span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-brand-teal group-hover:scale-110 transition-all"><ArrowRight className="w-5 h-5" /></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* --- SECTION n8n (Les Ponts) --- */}
            {activeTab === 'n8n' && (
                <motion.div 
                   key="n8n"
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="space-y-12"
                >
                   <div className="bg-blue-600/10 border border-blue-500/20 rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center">
                      <div className="md:w-1/2">
                         <div className="p-3 bg-blue-500 text-white rounded-2xl w-fit mb-6 shadow-xl shadow-blue-500/20">
                            <Workflow className="w-10 h-10" />
                         </div>
                         <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Ne copiez plus rien à la main.</h3>
                         <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            Pourquoi perdre du temps à recopier des noms, des prix ou des factures ? On utilise **n8n**, un outil génial qui crée des "ponts" entre vos applications (WhatsApp, Messenger, MVola, Gmail). Les informations voyagent toutes seules, sans erreur.
                         </p>
                         <Button onClick={() => { onClose(); onContactClick(); }} className="bg-blue-500 text-white hover:bg-blue-400 px-10 py-5 rounded-2xl text-lg shadow-xl shadow-blue-500/20">Créer mon pont automatique</Button>
                      </div>
                      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {N8N_BRIDGES.map((bridge, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:border-blue-500/40 transition-all group relative overflow-hidden">
                               <div className={`w-10 h-10 ${bridge.color} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg`}>
                                  <bridge.icon className="w-5 h-5" />
                               </div>
                               <h4 className="text-white font-bold text-lg mb-3">{bridge.title}</h4>
                               <p className="text-xs text-slate-300 leading-relaxed mb-4">{bridge.description}</p>
                               <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                  <p className="text-[10px] text-brand-teal font-black uppercase leading-tight">{bridge.benefit}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </motion.div>
            )}
        </AnimatePresence>

        <IdeaLab onContact={() => { onClose(); onContactClick(); }} />

      </div>

      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCase(null)} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-white w-full max-w-6xl rounded-[2.5rem] shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-[85vh] border border-slate-200">
               <button onClick={() => setSelectedCase(null)} className="absolute top-6 right-6 z-50 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"><X className="w-5 h-5" /></button>
               <div className="w-full md:w-1/2 flex flex-col h-full bg-white p-10 md:p-14">
                   <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
                      <div className="flex items-center gap-3 font-black text-[10px] uppercase tracking-[0.3em] text-brand-teal">
                        <selectedCase.icon className="w-5 h-5" /> {selectedCase.title}
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 leading-none">{selectedCase.subtitle}</h3>
                      <p className="text-slate-600 text-lg leading-relaxed font-medium">"{selectedCase.story}"</p>
                      <div className="space-y-4">
                           <div className="p-5 bg-red-50 border-l-4 border-red-500 rounded-r-xl">
                              <div className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-1">Le Frein (Travail Manuel)</div>
                              <p className="text-slate-700 text-sm font-bold">{selectedCase.pain}</p>
                           </div>
                           <div className="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                              <div className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">La Solution IA</div>
                              <p className="text-slate-900 text-sm font-black">{selectedCase.solution}</p>
                           </div>
                      </div>
                   </div>
                   <div className="pt-10 border-t border-slate-100">
                       <Button onClick={() => { setSelectedCase(null); onClose(); onContactClick(); }} className="w-full bg-slate-900 text-white py-5 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform text-lg uppercase tracking-widest">Activer cet Agent</Button>
                   </div>
               </div>
               <div className="hidden md:flex w-1/2 bg-slate-50 items-center justify-center p-10 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/5 rounded-full blur-3xl"></div>
                   <div className="relative z-10 w-full max-w-[340px] h-[600px] shadow-2xl rounded-[3rem] border-8 border-slate-900 bg-slate-900">
                       <Simulator scenario={selectedCase.demoScenario} type={selectedCase.demoType} device={selectedCase.device} />
                   </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
