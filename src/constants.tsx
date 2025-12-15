



import { 
  Network, Globe, Bot, GraduationCap, ShieldCheck, Wifi, Server, Layout, ShoppingCart, 
  MessageSquare, Zap, Users, MapPin, Banknote, Lightbulb, Clock, Cable, Cpu, Lock, 
  Activity, Router, HardDrive, Rocket, CreditCard, Workflow, BrainCircuit, Headphones, 
  ListTodo, FileCheck, Coins, Stethoscope, Map, Infinity, Layers, Award,
  CheckCircle2, Smartphone, PenTool, Languages, Sparkles, MousePointerClick, Briefcase,
  LayoutTemplate, Database, FileText, Briefcase as BriefcaseIcon, Laptop, HelpCircle, Cloud,
  BarChart3, LifeBuoy, CalendarCheck, Trello, Star, Smile, Coffee, Pizza, AlertTriangle, Ghost
} from "lucide-react";
import { TranslationDictionary } from "./types";

// --- SHARED DATA (Images, Icons, Contacts) ---
export const CONTACT_INFO = {
  phone: "+261 34 05 308 50",
  email: "contact@kinva.mg",
  address: "Antananarivo, Madagascar",
  hours: "Du lundi au vendredi, 9h – 17h"
};

// --- CONSTANTS DATA ---

export const AUDIT_CHECKPOINTS = [
  {
    category: "Câblage & Physique",
    icon: Cable,
    points: [
      "Fini les câbles 'spaghetti'",
      "Étiquetage (on s'y retrouve enfin)",
      "Tests de vitesse réels",
      "Prises qui marchent vraiment"
    ]
  },
  {
    category: "Wi-Fi & Réseau",
    icon: Router,
    points: [
      "Wi-Fi partout (même aux WC)",
      "Vitesse stable pour YouTube/Zoom",
      "Séparation Invité / Staff",
      "Internet de secours (4G/Starlink)"
    ]
  },
  {
    category: "Sécurité & Élec",
    icon: ShieldCheck,
    points: [
      "Onduleurs (Adieu Jirama)",
      "Pare-feu (Stop aux virus)",
      "Accès VPN pour le télétravail",
      "Sauvegardes automatiques"
    ]
  },
  {
    category: "Postes de travail",
    icon: Cpu,
    points: [
      "PC qui démarre en 10s",
      "Nettoyage virus & lenteurs",
      "Licences légales (fin du piratage)",
      "Données sécurisées"
    ]
  }
];

export const INSTALLATION_SERVICES = [
  {
    title: "Câblage Propre",
    description: "On range le désordre. Installation RJ45 et fibre optique nickel chrome.",
    icon: Cable,
    tags: ["Anti-Spaghetti", "Certifié", "Propre"]
  },
  {
    title: "Salles Serveurs",
    description: "Le cœur de votre entreprise, au frais et sécurisé. Fini la tour qui chauffe sous le bureau.",
    icon: Server,
    tags: ["Climatisé", "Sécurisé", "Pro"]
  },
  {
    title: "Wi-Fi qui capte",
    description: "Des bornes puissantes pour capter partout. Zéro coupure en réunion Zoom.",
    icon: Wifi,
    tags: ["Longue Portée", "Stable", "Rapide"]
  },
  {
    title: "Kinva Cloud",
    description: "Vos fichiers accessibles partout, tout le temps. Même si votre PC brûle.",
    icon: Cloud,
    tags: ["Sauvegarde", "Partage", "Sûr"]
  }
];

// Re-wording for Business Owners (Entrepreneur language)
export const WEB_SOLUTIONS = [
  {
    title: "Crédibilité Immédiate",
    description: "Un site moche fait fuir 80% des clients. On vous rend sexy et pro.",
    icon: Layout,
    tags: ["Image", "Confiance"]
  },
  {
    title: "Cash Machine",
    description: "Encaissez par MVola/Airtel pendant que vous dormez. Le commerce sans horaires.",
    icon: ShoppingCart,
    tags: ["E-commerce", "Mobile Money"]
  },
  {
    title: "Automatisation",
    description: "Arrêtez de faire le robot. Laissez le site gérer les RDV et devis.",
    icon: Workflow,
    tags: ["Gain de temps", "Zéro Erreur"]
  },
  {
    title: "Vitesse Google",
    description: "Si ça charge pas en 2s, le client part. Nos sites sont des fusées.",
    icon: Rocket,
    tags: ["SEO", "Performance"]
  }
];

export const WEB_FEATURES = [
  {
    title: "Cerveau Reptilien",
    description: "Design pensé pour appuyer sur 'Acheter'.",
    icon: BrainCircuit
  },
  {
    title: "Connexion Lente ?",
    description: "Ça charge vite, même en 3G au fin fond de la brousse.",
    icon: Wifi
  },
  {
    title: "Paiement Facile",
    description: "Le client sort son téléphone, bip, vous êtes payé.",
    icon: Smartphone
  },
  {
    title: "Liberté Totale",
    description: "Le site est à vous. On vous donne les clés.",
    icon: Lock
  }
];

// --- WEB PRICING DATA (UPDATED STRATEGY - ENTREPRENEUR) ---
export const WEB_PRICING_PLANS = [
  {
    name: "Vitrine",
    price: "59 000", 
    color: "bg-slate-50",
    textColor: "text-slate-600",
    borderColor: "border-slate-200"
  },
  {
    name: "Commercial",
    price: "139 000",
    color: "bg-brand-purple/10", // More visible background
    textColor: "text-brand-purple",
    borderColor: "border-brand-purple",
    popular: true
  },
  {
    name: "Entreprise", // Renamed from Premium
    price: "249 000",
    color: "bg-slate-900",
    textColor: "text-white",
    borderColor: "border-slate-900"
  }
];

export const WEB_PRICING_ROWS = [
  { label: "Notre Recommandation", vitrine: false, commercial: "star", entreprise: false }, // IKEA Effect
  { label: "Frais de mise en service (Setup)", vitrine: "100 000 Ar", commercial: "150 000 Ar", entreprise: "150 000 Ar" },
  { label: "Design & Look", vitrine: "Propre & Standard", commercial: "Personnalisé (Charte)", entreprise: "Sur Mesure (Unique)" },
  { label: "Nom de domaine (.mg/.com)", vitrine: "Inclus (Si Annuel)", commercial: "Inclus", entreprise: "Inclus + Gestion DNS" },
  { label: "Hébergement (Vitesse)", vitrine: "Standard", commercial: "Rapide", entreprise: "Serveur Dédié" },
  { label: "Emails Pros (Crédibilité)", vitrine: "1 compte", commercial: "5 comptes", entreprise: "20 comptes" },
  { label: "Modifications du site", vitrine: "Par nos soins", commercial: "Accès Admin", entreprise: "Accès Admin Total" },
  { label: "Blog / Actualités", vitrine: false, commercial: true, entreprise: true },
  { label: "Prise de RDV Automatique", vitrine: false, commercial: true, entreprise: true },
  { label: "Statistiques (Qui vient ?)", vitrine: "Basique", commercial: "Avancé", entreprise: "Expert + Rapport" },
  { label: "CRM (Base Clients)", vitrine: false, commercial: false, entreprise: "Inclus" },
  { label: "Automatisations (Gain temps)", vitrine: false, commercial: false, entreprise: "Inclus" },
  { label: "Sécurité & Backup", vitrine: "Standard", commercial: "Renforcée", entreprise: "Blindée + Quotidien" },
  { label: "Support (En cas de pépin)", vitrine: "Email (48h)", commercial: "Email (24h)", entreprise: "WhatsApp / Tel (VIP)" },
];

export const WEB_MODULES = [
  { name: "Chatbot IA 24/7", price: "Dès 50 000 Ar", desc: "Votre meilleur vendeur. Il bosse le dimanche et ne demande pas de prime.", highlight: true, bubble: true },
  { name: "Tableau de Bord", price: "+ 15 000 Ar", desc: "Vos chiffres clés en un coup d'œil. Pilotez, ne subissez pas." },
  { name: "Paiement Mobile", price: "+ 20 000 Ar", desc: "MVola & Orange Money. Encaissez pendant votre sommeil.", highlight: true },
  { name: "Email Pro Supp.", price: "+ 5 000 Ar", desc: "Fini les adresses @gmail.com qui font amateur. Soyez Pro." },
  { name: "Réservations / RDV", price: "+ 30 000 Ar", desc: "Fini le téléphone qui sonne tout le temps. L'agenda se remplit seul." },
  { name: "Rédaction Vendeuse", price: "+ 15 Ar / mot", desc: "On écrit des textes qui donnent envie d'acheter, pas de la poésie." },
  { name: "E-commerce Complet", price: "Sur devis", desc: "10 ou 10 000 produits. Gérez votre empire sans maux de tête.", highlight: false },
  { name: "Gestion de Stock", price: "Sur devis", desc: "Sachez exactement ce que vous avez. Fini les vols et les pertes.", highlight: false },
  { name: "Facturation Auto", price: "Sur devis", desc: "Le PDF part, l'argent rentre. Automatique.", highlight: false },
  { name: "Suivi RH / Paie", price: "Sur devis", desc: "Gérez vos équipes sans noyer sous la paperasse.", highlight: false },
  { name: "Tableaux de bord sur mesure", price: "Sur devis", desc: "La vue divine sur votre business.", highlight: false },
];

export const WEB_PORTFOLIO_EXAMPLES = [
  {
    title: "Marketplace Agricole",
    category: "Plateforme Web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Mise en relation directe. Ils ont doublé leurs ventes en 3 mois."
  },
  {
    title: "Hôtel de Luxe Nosy Be",
    category: "Site Vitrine",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Réservations directes sans commission Booking.com. ROI immédiat."
  },
  {
    title: "Gestion Immobilière",
    category: "Logiciel SaaS",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Fini les fichiers Excel perdus. Tout est géré automatiquement."
  }
];

export const AI_SOLUTIONS = [
  {
    title: "Service Client 24/7",
    description: "Répondez à 3h du matin. Vos clients n'attendent pas.",
    icon: MessageSquare,
    tags: ["WhatsApp", "Facebook", "Immédiat"]
  },
  {
    title: "Business Intelligence",
    description: "Transformez vos fichiers Excel illisibles en décisions claires.",
    icon: Activity,
    tags: ["Prévision", "Analyse", "Cash"]
  },
  {
    title: "Zéro Saisie Manuelle",
    description: "L'IA copie-colle mieux que vous. Et elle ne râle pas.",
    icon: Workflow,
    tags: ["Productivité", "Erreur Zéro"]
  },
  {
    title: "Rédaction Magique",
    description: "Emails, rapports, posts Facebook... Écrits en 3 secondes.",
    icon: Sparkles,
    tags: ["Marketing", "Communication"]
  },
];

export const AI_FEATURES = [
  {
    title: "Parle Gasy & Français",
    description: "Notre IA comprend le marché local et les nuances.",
    icon: Languages
  },
  {
    title: "Connecté à tout",
    description: "Elle parle à votre CRM, votre Excel et vos emails.",
    icon: Database
  },
  {
    title: "Secret Défense",
    description: "Vos données restent chez vous. Pas chez la concurrence.",
    icon: ShieldCheck
  },
  {
    title: "ROI Immédiat",
    description: "Ça coûte moins cher qu'un stagiaire et ça rapporte plus.",
    icon: Banknote
  }
];

export const AI_PORTFOLIO_EXAMPLES = [
  {
    title: "Assistant Assurance",
    category: "Relation Client",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Gère 500 dossiers sinistres par jour sur WhatsApp."
  },
  {
    title: "Comptabilité Auto",
    category: "Automatisation",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Scan des factures et saisie automatique. 0 erreur."
  },
  {
    title: "Générateur E-commerce",
    category: "Contenu",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Rédaction de 1000 fiches produits en une nuit."
  }
];

export const TRAINING_SOLUTIONS = [
  {
    title: "Productivité Ninja",
    description: "Excel, Word, PowerPoint. Arrêtez de cliquer partout.",
    icon: FileText,
    tags: ["Office 365", "Vitesse"]
  },
  {
    title: "Organisation",
    description: "Trello, Notion, Slack. Pour que tout le monde sache quoi faire.",
    icon: LayoutTemplate,
    tags: ["Gestion Projet", "Clarté"]
  },
  {
    title: "Cybersécurité",
    description: "Apprenez à ne pas cliquer sur les virus. C'est vital.",
    icon: ShieldCheck,
    tags: ["Sécurité", "Hygiène"]
  },
  {
    title: "IA pour le Business",
    description: "Utilisez ChatGPT pour travailler 2x moins et gagner autant.",
    icon: BrainCircuit,
    tags: ["Futur", "Efficacité"]
  }
];

export const TRAINING_FEATURES = [
  {
    title: "Sur Mesure",
    description: "On s'adapte à vos vrais problèmes, pas à la théorie.",
    icon: PenTool
  },
  {
    title: "100% Pratique",
    description: "Pas de blabla. On ouvre l'ordi et on bosse.",
    icon: MousePointerClick
  },
  {
    title: "Payé par le FMFP",
    description: "C'est gratuit (ou presque). On gère la paperasse.",
    icon: Coins
  },
  {
    title: "Suivi Réel",
    description: "On vérifie que vos équipes utilisent vraiment les outils.",
    icon: Clock
  }
];

export const TRAINING_PORTFOLIO_EXAMPLES = [
  {
    title: "Migration Cloud",
    category: "Formation Outils",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "50 employés formés. Fini les fichiers perdus."
  },
  {
    title: "Séminaire Dirigeants",
    category: "Stratégie",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Comment l'IA va changer leur business model."
  },
  {
    title: "Atelier Anti-Hack",
    category: "Sensibilisation",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Simulations d'attaques. Ils sont prêts."
  }
];

export const FMFP_INFO = {
  title: "Financement FMFP (Gratuit ?)",
  description: "Vous cotisez déjà. Autant l'utiliser. Le FMFP peut payer votre formation. La paperasse administrative ? C'est l'enfer, donc on le fait pour vous.",
  benefits: [
    "On gère le dossier",
    "Certification Qualiopi",
    "Budget optimisé"
  ]
};

// --- FAQ Data ---
export const FAQ_DATA_FR = [
  {
    question: "Intervenez-vous partout à Mada ?",
    answer: "Pour le Web et l'IA, on fait tout à distance (c'est la magie d'internet). Pour les câbles et le matériel (Systems), on se déplace à Tana, Tamatave, Nosy Be, Majunga... Partout où il y a une route (et même sans)."
  },
  {
    question: "Starlink, vous l'installez ?",
    answer: "Oui. On le pose, on le sécurise, et on distribue le signal dans toute la maison/bureau. Fini la fibre coupée."
  },
  {
    question: "Pourquoi payer un site alors que Facebook est gratuit ?",
    answer: "Facebook ne vous appartient pas. Un jour, ils bloquent votre page, vous perdez tout. Un site Web, c'est votre maison. Et ça fait beaucoup plus sérieux pour signer des gros contrats."
  },
  {
    question: "Le FMFP, c'est compliqué ?",
    answer: "Oui, c'est l'administration. C'est pour ça qu'on s'en occupe à votre place. Vous signez, on gère."
  },
  {
    question: "L'IA va-t-elle remplacer mes employés ?",
    answer: "Non, elle va remplacer les tâches ennuyeuses qu'ils détestent. Ils pourront enfin faire du vrai travail (vendre, créer, gérer)."
  }
];

export const FAQ_DATA_EN = [
  {
    question: "Do you operate everywhere in Mada?",
    answer: "For Web and AI, we do everything remotely (that's the magic of the internet). For cables and hardware (Systems), we travel to Tana, Tamatave, Nosy Be, Majunga... Wherever there is a road (and even without)."
  },
  {
    question: "Do you install Starlink?",
    answer: "Yes. We set it up, secure it, and distribute the signal throughout the house/office. No more cut fiber cables."
  },
  {
    question: "Why pay for a site when Facebook is free?",
    answer: "You don't own Facebook. One day they block your page, you lose everything. A website is your house. And it looks much more serious for signing big contracts."
  },
  {
    question: "Is FMFP complicated?",
    answer: "Yes, it's administration. That's why we handle it for you. You sign, we manage."
  },
  {
    question: "Will AI replace my employees?",
    answer: "No, it will replace the boring tasks they hate. They will finally be able to do real work (sell, create, manage)."
  }
];

export const WHY_US_POINTS_FR = [
  {
    title: "Tout au même endroit",
    description: "Internet, Site Web, IA. Un seul numéro à appeler quand vous avez un problème.",
    icon: Layers
  },
  {
    title: "Pas de Bricolage",
    description: "On ne fait pas du 'gasy gasy'. On utilise des standards internationaux.",
    icon: ShieldCheck
  },
  {
    title: "On parle Business",
    description: "On ne vous parle pas de 'bits' et 'octets', mais de Cash et de Croissance.",
    icon: Lightbulb
  },
  {
    title: "Vision Long Terme",
    description: "On ne veut pas juste vendre un truc. On veut que votre boite grandisse.",
    icon: Clock
  }
];

export const WHY_US_POINTS_EN = [
  {
    title: "All in One Place",
    description: "Internet, Website, AI. Only one number to call when you have a problem.",
    icon: Layers
  },
  {
    title: "No DIY Fixes",
    description: "We don't do quick & dirty fixes. We use international standards.",
    icon: ShieldCheck
  },
  {
    title: "We Speak Business",
    description: "We don't talk 'bits' and 'bytes', we talk Cash and Growth.",
    icon: Lightbulb
  },
  {
    title: "Long Term Vision",
    description: "We don't just want to sell a thing. We want your business to grow.",
    icon: Clock
  }
];


// --- TRANSLATIONS ---

const FR: TranslationDictionary = {
  nav: {
    links: [
      { name: "Web", href: "#web" },
      { name: "IA", href: "#ai" },
      { name: "Systèmes", href: "#network" },
      { name: "Académie", href: "#training" },
      { name: "À Propos", href: "#about" },
    ],
    cta: "Réserver mon Audit"
  },
  hero: {
    slides: [
      {
        id: 'web',
        title: 'Kinva Web',
        subtitle: 'Votre Business. En mieux. <span class="text-brand-purple font-bold">On transforme les visiteurs en clients.</span>',
        img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      },
      {
        id: 'ai',
        title: 'Kinva AI',
        subtitle: 'Votre meilleur employé est un robot. <span class="text-brand-coral font-bold">Il bosse 24/7 et ne râle jamais.</span>',
        img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      },
      {
        id: 'network',
        title: 'Kinva Systems',
        subtitle: 'Internet qui rame = Argent qui brûle. <span class="text-brand-teal font-bold">Arrêtez le bricolage.</span>',
        img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      },
      {
        id: 'training',
        title: 'Kinva Academy',
        subtitle: 'Excel c\'est bien. <span class="text-brand-coral font-bold">Mais devenez Super-Productif avec le reste.</span>',
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      }
    ],
    location: "Madagascar",
    cta_primary: "Parler à notre expert",
    cta_secondary: "Nos Solutions"
  },
  services_overview: {
    title: "Architecture Kinva",
    subtitle: "On ne vend pas de la tech. On vend de la tranquillité d'esprit et de la croissance.",
    cta: "Discuter de votre projet",
    poles: [
      {
        id: "web",
        title: "Kinva Web",
        shortDescription: "Sites qui vendent & Apps qui gèrent.",
        icon: Globe
      },
      {
        id: "ai",
        title: "Kinva AI",
        shortDescription: "Robots intelligents & Gain de temps.",
        icon: Bot
      },
      {
        id: "network",
        title: "Kinva Systems",
        shortDescription: "Câblage propre & Wi-Fi rapide.",
        icon: Network
      },
      {
        id: "training",
        title: "Kinva Academy",
        shortDescription: "Formation & Montée en niveau.",
        icon: GraduationCap
      }
    ]
  },
  approach: {
    badge: "Méthode",
    title: "Comment on bosse",
    subtitle: "Pas de surprises, pas de coûts cachés. Juste du résultat.",
    steps: [
      {
        number: 1,
        title: "On Écoute (Audit)",
        description: "On regarde ce qui ne va pas. On ne devine pas, on vérifie.",
        icon: Stethoscope,
        color: "text-teal-400"
      },
      {
        number: 2,
        title: "On Dessine (Design)",
        description: "On fait un plan clair. Vous savez exactement ce que vous payez.",
        icon: Map,
        color: "text-purple-400"
      },
      {
        number: 3,
        title: "On Installe (Action)",
        description: "On pose le matériel ou le code. Proprement. Dans les délais.",
        icon: Rocket,
        color: "text-coral-400"
      },
      {
        number: 4,
        title: "On Sécurise (Support)",
        description: "Si ça casse, on répare. On ne vous laisse pas tomber.",
        icon: Infinity,
        color: "text-blue-400"
      }
    ]
  },
  about: {
    badge: "Notre ADN",
    title: "Kinva : L'ingénierie sans le mal de tête.",
    description: "Kinva, c'est la fin du bricolage informatique à Madagascar. Nous aidons les entreprises à grandir en leur donnant des outils qui marchent. Pas de jargon, pas de 'peut-être demain'. Juste de l'efficacité.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "Pro", label: "Certifié" },
      { value: "Normes", label: "Mondiales" },
      { value: "Gasy", label: "Local" },
      { value: "24/7", label: "Support" }
    ],
    whyUsTitle: "Pourquoi Kinva ?",
    whyUsSubtitle: "Parce que vous avez mieux à faire que de gérer des bugs.",
    whyUsPoints: WHY_US_POINTS_FR,
    faqTitle: "Questions Fréquentes",
    faqSubtitle: "On répond avant que vous ne demandiez.",
    faqQuestions: FAQ_DATA_FR,
    faqCta: "J'ai une autre question",
    faqCtaSub: "Demander à Rabe IA"
  },
  contact: {
    badge: "Contact",
    title: "On commence quand ?",
    description: "Vous avez un problème technique ou une ambition de croissance ? Parlons-en.",
    phone_label: "Téléphone",
    email_label: "Email",
    office_label: "Bureaux",
    form: {
      title: "Envoyez-nous un message",
      name: "Nom complet",
      email: "Email professionnel",
      subject: "De quoi on parle ?",
      subjects: [
        { value: "rdv", label: "Je veux un audit (RDV)" },
        { value: "web", label: "Je veux un site Web" },
        { value: "ai", label: "Je veux de l'IA" },
        { value: "audit", label: "Problème Réseau / Systems" },
        { value: "formation", label: "Formation Équipe" },
        { value: "other", label: "Autre chose" }
      ],
      message: "Dites-nous tout...",
      cta: "Envoyer le message",
      disclaimer: "Promis, on ne vend pas votre email.",
      appointment: {
        label: "On se voit quand ? (Optionnel)",
        date_label: "Date idéale",
        time_label: "Créneau",
        time_options: [
           { value: "morning", label: "Matin (9h - 12h)" },
           { value: "afternoon", label: "Après-midi (14h - 17h)" }
        ]
      }
    }
  },
  footer: {
    summary: "Technologie élégante pour entreprises modernes. Kinva intègre Systems, Web et IA.",
    services_title: "Solutions",
    company_title: "Kinva",
    newsletter_title: "Veille Tech",
    newsletter_desc: "Recevez nos astuces pour digitaliser votre boite.",
    newsletter_placeholder: "Email pro",
    newsletter_cta: "Je m'inscris",
    rights: "Kinva Madagascar. Tous droits réservés.",
    links: ["Mentions Légales", "Confidentialité"],
    back_to_top: "Haut de page"
  },
  chatbot: {
    title: "Rabe IA",
    welcome: "Bonjour. Je suis Rabe, l'assistant de Kinva. Je suis là pour vous aider à trouver la solution tech idéale. On commence ?",
    placeholder: "Posez votre question...",
    send: "Envoyer",
    sources: "Sources :",
    disclaimer: "Rabe IA est une IA. Vérifiez les infos importantes.",
    close: "Fermer",
    open: "Discuter avec Rabe IA",
    thinking: "Je réfléchis...",
    error: "Oups, petit bug.",
    form_title: "Bienvenue chez Kinva",
    form_desc: "Dites-nous qui vous êtes pour mieux vous aider.",
    form_name_label: "Nom",
    form_email_label: "Email",
    form_phone_label: "WhatsApp / Tel",
    form_message_label: "Besoin (Optionnel)",
    form_submit: "C'est parti",
    form_privacy: "Vos données restent confidentielles."
  },
  overlays: {
    services: [
      {
        id: "web",
        title: "Kinva Web",
        subtitle: "Sites Web & Apps. <span class=\"text-brand-purple font-bold\">Adaptés à votre budget.</span>",
        description: "Nous créons des outils digitaux qui servent à quelque chose. Pour <strong>vendre plus</strong> (E-commerce), pour <strong>rassurer</strong> vos partenaires (Site Vitrine) ou pour <strong>mieux gérer</strong> (Logiciels). Une qualité professionnelle, pensée pour Madagascar. Un site web qui ne rapporte pas d'argent est inutile. C'est juste une dépense. Nous, on crée des investissements.",
        features: [
          "Sites Vitrines qui inspirent confiance",
          "Ventes en ligne & Mobile Money",
          "Logiciels de Gestion sur-mesure",
          "Apps Mobiles qui marchent",
          "Automatisation (Bye bye Excel)",
          "Maintenance incluse (On gère les bugs)"
        ],
        ctaText: "Estimer mon projet",
        icon: Layout,
        themeColor: "bg-white",
        gallery: [
          { title: "E-commerce & Paiement", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Tableaux de Bord Business", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Design Minimaliste", image: "https://images.unsplash.com/photo-1481487484168-9b9301521966?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      },
      {
        id: "ai",
        title: "Kinva AI",
        subtitle: "L'intelligence <span class=\"text-brand-teal\">qui rapporte gros.</span>",
        description: "Pendant que vous dormez, votre concurrent répond aux clients sur Facebook. Pas vous ? Changeons ça. Nos robots gèrent le SAV, qualifient les prospects et font le café (bon, pas encore le café). Automatisez les tâches ingrates et gardez votre énergie pour signer des chèques.",
        features: [
          "Chatbots WhatsApp & Facebook 24/7",
          "Réponses automatiques aux clients",
          "Automatisation des tâches manuelles",
          "Analyse de vos données",
          "Gain de temps immédiat",
          "Support bilingue FR/MG"
        ],
        ctaText: "Explorer IA",
        icon: Zap,
        themeColor: "bg-cyan-50",
        gallery: [
          { title: "Agents Conversationnels", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Analyse Prédictive", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Automatisation", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      },
      {
        id: "network",
        title: "Kinva Systems",
        subtitle: "Internet coupé = <span class=\"text-brand-teal font-bold\">Argent perdu.</span>",
        description: "Internet qui ne marche pas, virus en cours, données volatilisées : <strong>n'attendez pas d'être victime avant de réagir</strong>. Vos employés attendent que 'ça revienne' ? On installe du vrai matériel, on range les câbles qui traînent (fini les spaghettis) et on sécurise vos données.",
        features: [
          "Wi-Fi Maison & Bureau (Mesh)",
          "Câblage Propre (Fini les spaghettis)",
          "Caméras & Sécurité",
          "Installation Starlink",
          "Serveurs de Fichiers",
          "Maintenance & Dépannage",
          "Protection Antivirus"
        ],
        benefit: "Une connexion stable. Une sécurité totale.",
        ctaText: "Réserver un Audit",
        icon: Server,
        themeColor: "bg-slate-50",
        gallery: [
          { title: "Câblage Structuré", image: "https://images.unsplash.com/photo-1544197150-b99a580bbc7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Salle Serveur", image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Architecture Cloud", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      },
      {
        id: "training",
        title: "Kinva Academy",
        subtitle: "Devenez des <span class=\"text-brand-coral font-bold\">Brutes de Productivité.</span>",
        description: "Excel c'est bien, mais <strong>les outils du futur sont déjà ici</strong>. On vous forme, ne vous souciez pas. Utiliser Excel comme une machine à écrire est criminel. On forme vos équipes pour qu'elles arrêtent de bricoler et commencent à performer.",
        features: [
          "Maîtriser Office 365 (Word, Excel)",
          "Gérer des Projets (Trello, Notion)",
          "Mieux Communiquer (Slack, Teams)",
          "Bases de l'IA pour tous",
          "Accompagnement FMFP"
        ],
        ctaText: "Voir le Catalogue",
        icon: Users,
        themeColor: "bg-white",
        gallery: [
          { title: "Séminaires Direction", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Ateliers Pratiques", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Formation IA", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      }
    ],
    audit: {
      title: "Kinva Advisory",
      subtitle: "Fini les câbles en désordre.",
      description: "On remet votre infrastructure d'équerre. Pour que ça marche, tout le temps.",
      checkpoints: AUDIT_CHECKPOINTS,
      services: INSTALLATION_SERVICES
    },
    web: {
      title: "Kinva Web",
      subtitle: "Smart Design & Business Apps.",
      solutions: WEB_SOLUTIONS,
      features: WEB_FEATURES,
      portfolio: WEB_PORTFOLIO_EXAMPLES
    },
    ai: {
      title: "Kinva AI",
      subtitle: "Intelligence & Automation.",
      solutions: AI_SOLUTIONS,
      features: AI_FEATURES,
      portfolio: AI_PORTFOLIO_EXAMPLES
    },
    training: {
      title: "Kinva Academy",
      subtitle: "Skills & Future.",
      solutions: TRAINING_SOLUTIONS,
      features: TRAINING_FEATURES,
      portfolio: TRAINING_PORTFOLIO_EXAMPLES,
      fmfp: FMFP_INFO
    }
  }
};

const EN: TranslationDictionary = {
  nav: {
    links: [
      { name: "Web", href: "#web" },
      { name: "AI", href: "#ai" },
      { name: "Systems", href: "#network" },
      { name: "Academy", href: "#training" },
      { name: "About", href: "#about" },
    ],
    cta: "Book My Audit"
  },
  hero: {
    slides: [
      {
        id: 'web',
        title: 'Kinva Web',
        subtitle: 'Your Business, Turbocharged. <span class="text-brand-purple font-bold">We turn tech into cash.</span>',
        img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      },
      {
        id: 'ai',
        title: 'Kinva AI',
        subtitle: 'The employee who never sleeps. <span class="text-brand-coral font-bold">Automate everything, miss no one.</span>',
        img: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      },
      {
        id: 'network',
        title: 'Kinva Systems',
        subtitle: 'Internet that actually works. <span class="text-brand-teal font-bold">No more lag when it rains.</span>',
        img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      },
      {
        id: 'training',
        title: 'Kinva Academy',
        subtitle: 'Stop using Excel like a typewriter. <span class="text-brand-coral font-bold">Train your team.</span>',
        img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      }
    ],
    location: "Madagascar",
    cta_primary: "Talk to a Human",
    cta_secondary: "Our Solutions"
  },
  services_overview: {
    title: "Kinva Architecture",
    subtitle: "We don't sell tech. We sell peace of mind and growth.",
    cta: "Discuss your project",
    poles: [
      {
        id: "web",
        title: "Kinva Web",
        shortDescription: "Sites that sell & Apps that manage.",
        icon: Globe
      },
      {
        id: "ai",
        title: "Kinva AI",
        shortDescription: "Smart robots & Time saving.",
        icon: Bot
      },
      {
        id: "network",
        title: "Kinva Systems",
        shortDescription: "Clean cabling & Fast Wi-Fi.",
        icon: Network
      },
      {
        id: "training",
        title: "Kinva Academy",
        shortDescription: "Training & Leveling up.",
        icon: GraduationCap
      }
    ]
  },
  approach: {
    badge: "Method",
    title: "How we work",
    subtitle: "No surprises, no hidden costs. Just results.",
    steps: [
      {
        number: 1,
        title: "We Listen (Audit)",
        description: "We check what's wrong. We don't guess, we verify.",
        icon: Stethoscope,
        color: "text-teal-400"
      },
      {
        number: 2,
        title: "We Draw (Design)",
        description: "We make a clear plan. You know exactly what you pay for.",
        icon: Map,
        color: "text-purple-400"
      },
      {
        number: 3,
        title: "We Install (Action)",
        description: "We deploy the gear or code. Cleanly. On time.",
        icon: Rocket,
        color: "text-coral-400"
      },
      {
        number: 4,
        title: "We Secure (Support)",
        description: "If it breaks, we fix it. We don't leave you hanging.",
        icon: Infinity,
        color: "text-blue-400"
      }
    ]
  },
  about: {
    badge: "Our DNA",
    title: "Kinva: Engineering without the headache.",
    description: "Kinva is the end of IT DIY in Madagascar. We help companies grow by giving them tools that work. No jargon, no 'maybe tomorrow'. Just efficiency.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    stats: [
      { value: "Pro", label: "Certified" },
      { value: "Norms", label: "Global" },
      { value: "Gasy", label: "Local" },
      { value: "24/7", label: "Support" }
    ],
    whyUsTitle: "Why Kinva?",
    whyUsSubtitle: "Because you have better things to do than manage bugs.",
    whyUsPoints: WHY_US_POINTS_EN,
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "We answer before you ask.",
    faqQuestions: FAQ_DATA_EN,
    faqCta: "I have another question",
    faqCtaSub: "Ask Rabe AI"
  },
  contact: {
    badge: "Contact",
    title: "When do we start?",
    description: "Got a tech problem or a growth ambition? Let's talk.",
    phone_label: "Phone",
    email_label: "Email",
    office_label: "Offices",
    form: {
      title: "Send us a message",
      name: "Full Name",
      email: "Professional Email",
      subject: "What's up?",
      subjects: [
        { value: "rdv", label: "I want an audit (Meeting)" },
        { value: "web", label: "I want a Website" },
        { value: "ai", label: "I want AI" },
        { value: "audit", label: "Network / Systems Issue" },
        { value: "formation", label: "Team Training" },
        { value: "other", label: "Something else" }
      ],
      message: "Tell us everything...",
      cta: "Send Message",
      disclaimer: "Promised, we won't sell your email.",
      appointment: {
        label: "When do we meet? (Optional)",
        date_label: "Ideal Date",
        time_label: "Time Slot",
        time_options: [
           { value: "morning", label: "Morning (9am - 12pm)" },
           { value: "afternoon", label: "Afternoon (2pm - 5pm)" }
        ]
      }
    }
  },
  footer: {
    summary: "Elegant technology for modern enterprises. Kinva integrates Systems, Web, and AI.",
    services_title: "Architecture",
    company_title: "Company",
    newsletter_title: "Tech Watch",
    newsletter_desc: "Get tips to digitize your business.",
    newsletter_placeholder: "Pro Email",
    newsletter_cta: "Subscribe",
    rights: "Kinva Madagascar. All rights reserved.",
    links: ["Legal Mentions", "Privacy"],
    back_to_top: "Back to top"
  },
  chatbot: {
    title: "Rabe AI",
    welcome: "Hello. I am Rabe, Kinva's assistant. I'm here to help you find the ideal tech solution. Shall we start?",
    placeholder: "Ask your question...",
    send: "Send",
    sources: "Sources:",
    disclaimer: "Rabe AI is an AI. Verify critical information.",
    close: "Close",
    open: "Chat with Rabe AI",
    thinking: "Thinking...",
    error: "Oops, small bug.",
    form_title: "Welcome to Kinva",
    form_desc: "Tell us who you are to help you better.",
    form_name_label: "Name",
    form_email_label: "Email",
    form_phone_label: "WhatsApp / Phone",
    form_message_label: "Need (Optional)",
    form_submit: "Let's go",
    form_privacy: "Your data remains confidential."
  },
  overlays: {
    services: [
      {
        id: "web",
        title: "Kinva Web",
        subtitle: "Websites & Apps. <span class=\"text-brand-purple font-bold\">Adapted to your budget.</span>",
        description: "We create digital tools that actually serve a purpose. To <strong>sell more</strong> (E-commerce), to <strong>reassure</strong> your partners (Showcase Site) or to <strong>manage better</strong> (Software). Professional quality, built for Madagascar.",
        features: [
          "Showcase Sites that Pop",
          "Online Sales & Mobile Money",
          "Custom Management Software",
          "Mobile Apps",
          "Automation (No more data entry)",
          "Maintenance Included"
        ],
        ctaText: "Estimate my project",
        icon: Layout,
        themeColor: "bg-white",
        gallery: [
          { title: "E-commerce & Payment", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Business Dashboards", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Minimalist Design", image: "https://images.unsplash.com/photo-1481487484168-9b9301521966?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      },
      {
        id: "ai",
        title: "Kinva AI",
        subtitle: "24/7 Chatbots. <span class=\"text-brand-teal\">Never miss a client.</span>",
        description: "Even when you sleep, Kinva AI sells for you. We install chatbots on WhatsApp and Facebook and automate your repetitive tasks for uninterrupted customer service.",
        features: [
          "24/7 WhatsApp & Facebook Chatbots",
          "Automatic responses to clients",
          "Manual task automation",
          "Data Analysis",
          "Immediate time savings",
          "Bilingual Support FR/MG"
        ],
        ctaText: "Explore AI",
        icon: Zap,
        themeColor: "bg-cyan-50",
        gallery: [
          { title: "Conversational Agents", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Predictive Analysis", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Automation", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      },
      {
        id: "network",
        title: "Kinva Systems",
        subtitle: "From home to enterprise. <span class=\"text-brand-teal\">Internet & Security everywhere.</span>",
        description: "Don't let outages slow you down anymore. From your home to your offices, we install secure, fast, and reliable networks.",
        features: [
          "Wi-Fi Home & Office (Mesh)",
          "Clean Cabling (No more spaghetti)",
          "Cameras & Security",
          "Starlink Installation",
          "File Servers",
          "Maintenance & Troubleshooting",
          "Anti-virus Protection"
        ],
        benefit: "A stable connection. Total security.",
        ctaText: "Book an Audit",
        icon: Server,
        themeColor: "bg-slate-50",
        gallery: [
          { title: "Structured Cabling", image: "https://images.unsplash.com/photo-1544197150-b99a580bbc7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Server Room", image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Cloud Architecture", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      },
      {
        id: "training",
        title: "Kinva Academy",
        subtitle: "Office 365, Trello, AI. <span class=\"text-brand-coral\">Tools of tomorrow.</span>",
        description: "Train your teams so they truly master their tools. Office 365, Trello, Slack, and Artificial Intelligence: we give them the keys to excel.",
        features: [
          "Master Office 365 (Word, Excel)",
          "Manage Projects (Trello, Notion)",
          "Communicate Better (Slack, Teams)",
          "AI Basics for All",
          "FMFP Support"
        ],
        ctaText: "View Catalog",
        icon: Users,
        themeColor: "bg-white",
        gallery: [
          { title: "Executive Seminars", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "Practical Workshops", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" },
          { title: "AI Training", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" }
        ]
      }
    ],
    audit: {
      title: "Kinva Advisory",
      subtitle: "No more messy cables.",
      description: "We straighten out your infrastructure. So it works, all the time.",
      checkpoints: AUDIT_CHECKPOINTS,
      services: INSTALLATION_SERVICES
    },
    web: {
      title: "Kinva Web",
      subtitle: "Smart Design & Business Apps.",
      solutions: WEB_SOLUTIONS,
      features: WEB_FEATURES,
      portfolio: WEB_PORTFOLIO_EXAMPLES
    },
    ai: {
      title: "Kinva AI",
      subtitle: "Intelligence & Automation.",
      solutions: AI_SOLUTIONS,
      features: AI_FEATURES,
      portfolio: AI_PORTFOLIO_EXAMPLES
    },
    training: {
      title: "Kinva Academy",
      subtitle: "Skills & Future.",
      solutions: TRAINING_SOLUTIONS,
      features: TRAINING_FEATURES,
      portfolio: TRAINING_PORTFOLIO_EXAMPLES,
      fmfp: FMFP_INFO
    }
  }
};

export const DICTIONARIES = {
  fr: FR,
  en: EN
};
