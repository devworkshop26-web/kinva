import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// NOTE : J'ai mis des types/interfaces de base pour Button et useLanguage/ReactMarkdown.
// Assurez-vous d'utiliser vos implémentations réelles.

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
const ReactMarkdown: React.FC<{ children: string; components?: any }> = ({ children }) => <>{children}</>;


interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

/* ==============================
   CONFIG
================================ */
const N8N_WEBHOOK_URL =
  'https://devworkshop.app.n8n.cloud/webhook-test/chat';

const STORAGE_KEY = 'kinva_chat_messages';
const SESSION_ID_KEY = 'kinva_chat_session';
// Clé pour persister l'état "terminé"
const SESSION_STATUS_KEY = 'kinva_chat_status'; 

const QUICK_MESSAGES = [
  'Je veux créer un site web',
  'Quels sont vos tarifs ?',
  'J’ai besoin d’un chatbot IA',
  'Je veux un devis'
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
      setMessages(JSON.parse(savedMessages));
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
    // Sauvegarder les messages
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
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
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-brand-teal text-white rounded-full shadow-xl flex items-center justify-center hover:bg-teal-600 transition-colors"
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
                <Sparkles className="text-brand-teal w-5 h-5" />
                <h3 className="font-bold text-sm tracking-wide">{chatbot.title}</h3>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Petit bouton Reset discret (caché si la session est déjà expirée pour éviter doublon) */}
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

            {/* Messages Area */}
            <div className="flex-1 p-4 bg-slate-50 overflow-y-auto space-y-4 relative">
              
              <AnimatePresence>
                {isResetting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 bg-slate-50/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
                  >
                    <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
                    <p className="text-sm text-slate-500 font-medium">Nettoyage de la conversation...</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isResetting && (
                <>
                  {/* Affichage des messages rapides uniquement au début */}
                  {messages.length === 1 && messages[0].role === 'model' && (
                    <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {QUICK_MESSAGES.map((q, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(q)}
                          disabled={isLoading}
                          className="px-3 py-1.5 text-xs font-medium rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-brand-teal hover:text-white hover:border-brand-teal transition-all shadow-sm"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      } gap-2 group`}
                    >
                      {msg.role === 'model' && (
                        <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">
                          R
                        </div>
                      )}

                      <div
                        className={`p-3 rounded-2xl text-sm max-w-[85%] shadow-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-brand-teal text-white rounded-br-none'
                            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none prose prose-sm prose-slate max-w-none'
                        }`}
                      >
                        <ReactMarkdown components={{
                           p: ({node, ...props}) => <p className="m-0" {...props} />,
                           a: ({node, ...props}) => <a className="underline font-bold" {...props} />
                        }}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-teal text-white flex items-center justify-center text-xs font-bold shrink-0">
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
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-slate-100 bg-white relative">
              
              {/* Le bouton "Nouvelle conversation" qui apparaît lorsque la session est terminée */}
              <AnimatePresence>
                {isSessionExpired && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }} // Ajout d'une animation de sortie
                    className="absolute bottom-[calc(100%+10px)] left-0 right-0 px-4 flex justify-center z-10"
                  >
                    <Button 
                      onClick={handleNewChat} 
                      className="bg-slate-800 hover:bg-slate-700 text-white shadow-lg border border-slate-700 w-full"
                      disabled={isResetting}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Commencer une nouvelle conversation
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
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
                    ${isSessionExpired 
                      ? 'border-slate-100 text-slate-400 cursor-not-allowed placeholder:text-slate-300' 
                      : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal placeholder:text-slate-400'
                    }`}
                  placeholder={isSessionExpired ? "Conversation terminée" : chatbot.placeholder}
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
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};