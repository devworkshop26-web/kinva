import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// IMPORTS AJOUTÉS/CORRIGÉS pour le Markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

// Simuler les dépendances manquantes pour que le code soit auto-suffisant
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...props }) => (
  <button className={`flex items-center justify-center rounded-xl font-semibold text-sm transition-all h-10 ${className}`} {...props}>
    {children}
  </button>
);
const useLanguage = () => ({
  content: {
    chatbot: {
      title: "RABE IA",
      welcome: "Bonjour ! Je suis Rabe IA, le chatbot officiel de Kinva. Comment puis-je vous aider ?",
      placeholder: "Écrivez votre message...",
      error: "Une erreur est survenue lors du traitement de votre demande."
    }
  }
});

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

/* ==============================
    CONFIG
================================ */
const BRAND_COLOR = 'teal-600';
// URL de Webhook harmonisée
const N8N_WEBHOOK_URL = 'https://devworkshop.app.n8n.cloud/webhook/chat';

// AJOUTÉ : Pour garantir que Tailwind détecte toutes les classes
const BRAND_CLASSES = {
  bg: `bg-${BRAND_COLOR}`, // Ex: bg-teal-600
  text: `text-${BRAND_COLOR}`, // Ex: text-teal-600
  ring: `focus:ring-2 focus:ring-${BRAND_COLOR}/20 focus:border-${BRAND_COLOR}`,
  userBg: `bg-${BRAND_COLOR} text-white rounded-br-none`,
} as const;


const STORAGE_KEY = 'kinva_chat_messages';
const SESSION_ID_KEY = 'kinva_chat_session';
// Clé pour persister l'état "terminé"
const SESSION_STATUS_KEY = 'kinva_chat_status';

const QUICK_MESSAGES = [
  'Je veux créer un site web',
  'Quels sont vos tarifs ?',
  'J’ai besoin d’un chatbot IA',
  'Je veux un devis',
  'Comment fonctionne Rabe IA ?',
  'Services Kinva'
];

/* ==============================
    COMPONENT
================================ */
export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isResetting, setIsResetting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  // État pour gérer le verrouillage du chat après une conversion
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { content } = useLanguage();
  const { chatbot } = content;

  // Détermine si c'est l'écran d'accueil (uniquement le message de bienvenue)
  const isWelcomeScreen = messages.length === 1 && messages[0].id === 'rabe-welcome';


  /* ==============================
      SESSION ID & INIT
  ================================ */
  const getSessionId = () => {
    let id = localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  };

  useEffect(() => {
    // 1. Charger les messages
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      const loadedMessages = JSON.parse(savedMessages);
      if (loadedMessages.length > 0) {
        setMessages(loadedMessages);
      } else {
        // Si le localStorage est vide, ajouter le message de bienvenue
        setMessages([{ id: 'rabe-welcome', role: 'model', text: chatbot.welcome }]);
      }
    } else if (chatbot?.welcome) {
      setMessages([{ id: 'rabe-welcome', role: 'model', text: chatbot.welcome }]);
    }

    // 2. Charger l'état de la session (si elle était déjà finie)
    const savedStatus = localStorage.getItem(SESSION_STATUS_KEY);
    if (savedStatus === 'finished') {
      setIsSessionExpired(true);
    }
  }, [chatbot?.welcome]);

  useEffect(() => {
    // Sauvegarder les messages (sauf si c'est l'écran de bienvenue seul)
    if (messages.length > 1 || (messages.length === 1 && messages[0].id !== 'rabe-welcome')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } else if (messages.length === 1 && messages[0].id === 'rabe-welcome' && localStorage.getItem(STORAGE_KEY) !== null) {
      // Si on revient à l'état initial, on peut nettoyer le localStorage
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [messages]);

  useEffect(() => {
    // Scroll au dernier message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isResetting, isSessionExpired]);

  /* ==============================
      NEW CHAT LOGIC
  ================================ */
  const handleNewChat = () => {
    setIsResetting(true);

    // Délai pour l'animation de reset
    setTimeout(() => {
      // Tout nettoyer
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SESSION_ID_KEY);
      localStorage.removeItem(SESSION_STATUS_KEY);

      setMessages([
        { id: 'rabe-welcome', role: 'model', text: chatbot.welcome }
      ]);

      setIsSessionExpired(false); // Débloque l'input
      setIsResetting(false);
    }, 800);
  };

  /* ==============================
      SEND MESSAGE
  ================================ */
  const handleSend = async (overrideInput?: string) => {
    if (isLoading || isResetting || isSessionExpired) return;

    const text = typeof overrideInput === 'string' ? overrideInput : input;
    if (!text || !text.trim()) return;

    const sessionId = getSessionId();

    setMessages(prev => [
      ...prev,
      { id: Date.now().toString(), role: 'user', text }
    ]);

    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          chatInput: text
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error('Workflow error');

      // Normalisation de la réponse (peut être un array [0] ou un objet direct)
      const responseData = Array.isArray(data) ? data[0] : data;

      // --- LOGIQUE DE FIN DE CONVERSATION ---
      if (responseData?.conversation_finished === true) {
        setIsSessionExpired(true);
        localStorage.setItem(SESSION_STATUS_KEY, 'finished');
      }
      // ---------------------------------------

      let botText = chatbot.error;
      if (responseData?.output) {
        botText = responseData.output;
      } else if (typeof data === 'string') {
        botText = data;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '_bot',
          role: 'model',
          text: botText
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString() + '_err',
          role: 'model',
          text: chatbot.error
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ==============================
      RENDER
  ================================ */
  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`fixed bottom-6 right-6 z-[100] w-14 h-14 ${BRAND_CLASSES.bg} text-white rounded-full shadow-xl flex items-center justify-center hover:bg-teal-700 transition-colors`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] md:w-[400px] h-[75vh] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-3 px-4 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles className={`${BRAND_CLASSES.text} w-5 h-5`} />
                <h3 className="font-bold text-sm tracking-wide">{chatbot.title}</h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Bouton Reset (visible sauf si c'est l'écran de bienvenue seul) */}
                {messages.length > 1 && !isSessionExpired && (
                  <button
                    onClick={handleNewChat}
                    disabled={isLoading || isResetting}
                    className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700"
                    title="Effacer l'historique"
                  >
                    <RefreshCw size={12} className={isResetting ? "animate-spin" : ""} />
                    <span className="hidden sm:inline">Nouveau chat</span>
                  </button>
                )}

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area : Correction du pb-24 à pb-4 */}
            <div className="flex-1 p-4 pb-4 bg-slate-50 overflow-y-auto space-y-4 relative">

              <AnimatePresence>
                {isResetting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-slate-50/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                  >
                    <Loader2 className={`w-8 h-8 ${BRAND_CLASSES.text} animate-spin`} />
                  </motion.div>
                )}
              </AnimatePresence>

              {!isResetting && (
                <>
                  {/* --- ÉCRAN D'ACCUEIL --- */}
                  {isWelcomeScreen ? (
                    <div className="h-full flex flex-col justify-between items-center text-center">
                      {/* Message de bienvenue (En haut) */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-4 pt-10"
                      >
                        <div className={`w-12 h-12 rounded-full ${BRAND_CLASSES.bg} text-white flex items-center justify-center text-lg font-extrabold shadow-md`}>
                          R
                        </div>
                        <p className="text-lg font-semibold text-slate-800 px-4">
                          {messages[0].text}
                        </p>
                      </motion.div>

                      {/* Suggestions (En bas) */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full px-4"
                      >
                        <p className="text-xs text-slate-500 font-medium mb-3">Questions fréquentes :</p>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                          {QUICK_MESSAGES.map((q, i) => (
                            <motion.button
                              key={i}
                              onClick={() => handleSend(q)}
                              disabled={isLoading}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.1 * i + 0.3 }}
                              className={`w-full px-3 py-2 text-xs font-medium rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-all shadow-sm text-left`}
                            >
                              {q}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <>
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                            } gap-2 group`}
                        >
                          {msg.role === 'model' && (
                            <div className={`w-8 h-8 rounded-full ${BRAND_CLASSES.bg} text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0`}>
                              R
                            </div>
                          )}

                          <div
                            className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-sm leading-relaxed ${msg.role === 'user'
                              ? BRAND_CLASSES.userBg
                              // Pour les messages du modèle
                              : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none prose prose-sm prose-slate max-w-none'
                              }`}
                          >
                            <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                p: ({ node, ...props }) => <p className="m-0" {...props} />,
                                a: ({ node, ...props }) => <a className="underline font-bold" {...props} />,
                                strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                                }}
                            >
                              {msg.text}
                            </ReactMarkdown>
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex gap-2">
                          <div className={`w-8 h-8 rounded-full ${BRAND_CLASSES.bg} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                            R
                          </div>
                          <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-4 flex gap-1.5 items-center shadow-sm">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </>
                  )}
                </>
              )}
            </div>

            {/* Input Area : Le bouton est maintenant dans le flux (pas d'absolute) */}
            <div className="p-3 border-t border-slate-100 bg-white relative">
              
              <AnimatePresence>
                {isSessionExpired ? (
                  // Si la session est expirée, afficher le bouton de nouvelle conversation dans le flux
                  <motion.div
                    key="new-chat-button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex justify-center" // Centrage visuel
                  >
                    <Button
                      onClick={handleNewChat}
                      className="bg-slate-800 hover:bg-slate-700 text-white shadow-lg border border-slate-700 w-full"
                      disabled={isResetting}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Nouvelle conversation
                    </Button>
                  </motion.div>
                ) : (
                  // Sinon, afficher le formulaire d'envoi normal
                  <motion.form
                    key="chat-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onSubmit={e => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      // Styles pour le champ désactivé
                      className={`flex-1 px-4 py-2.5 rounded-xl border bg-slate-50 text-sm transition-all
                        ${isLoading || isResetting || isSessionExpired
                          ? 'border-slate-100 text-slate-400 cursor-not-allowed placeholder:text-slate-300'
                          : `border-slate-200 focus:outline-none ${BRAND_CLASSES.ring} placeholder:text-slate-400`
                        }`}
                      placeholder={chatbot.placeholder}
                      disabled={isLoading || isResetting || isSessionExpired}
                    />
                    <button
                      type="submit"
                      // Le bouton Envoyer est désactivé si input vide, chargement, reset OU session expirée
                      disabled={!input.trim() || isLoading || isResetting || isSessionExpired}
                      className={`p-2.5 rounded-xl transition-colors shadow-sm text-white
                        ${(!input.trim() || isLoading || isResetting || isSessionExpired)
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-slate-900 hover:bg-slate-800'
                        }`}
                    >
                      <Send size={18} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};