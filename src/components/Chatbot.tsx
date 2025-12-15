
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Link, ExternalLink, ArrowRight, User, Mail, Phone, FileText, Clock, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';
import { Button } from './Button';
import { LeadData, ChatLog } from '../types';
import { supabase } from '../supabaseClient';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: { title: string; uri: string }[];
}

// DATA COLLECTION FUNCTION (Now saves to Supabase)
const collectCustomerData = async (type: 'lead' | 'chat', data: any) => {
  if (type === 'lead') {
    await supabase.from('leads').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        description: data.description,
        source: 'chatbot',
        status: 'new'
    }]);
  } 
  else if (type === 'chat') {
    await supabase.from('chats').insert([{
        user_name: data.user,
        query: data.query,
        response: data.response
    }]);
  }
};

const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Lead Capture State
  const [hasJoined, setHasJoined] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userDesc, setUserDesc] = useState('');

  // Chat State
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inactivityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const { content, language } = useLanguage();
  const { chatbot } = content;

  // Listen for custom event to open chatbot
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-chatbot', handleOpenChatbot);
    return () => window.removeEventListener('open-chatbot', handleOpenChatbot);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, hasJoined]);

  // Session Timeout Logic
  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (hasJoined && !isSessionExpired) {
      inactivityTimer.current = setTimeout(() => {
        setIsSessionExpired(true);
      }, SESSION_TIMEOUT_MS);
    }
  };

  useEffect(() => {
    if (isOpen && hasJoined && !isSessionExpired) {
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [isOpen, hasJoined, isSessionExpired]);


  // Initialize chat with welcome message once joined
  useEffect(() => {
    if (hasJoined && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        role: 'model',
        text: chatbot.welcome
      }]);
    }
  }, [hasJoined, chatbot.welcome, messages.length]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !userPhone.trim()) return;

    setHasJoined(true);
    resetInactivityTimer();
    collectCustomerData('lead', { name: userName, email: userEmail, phone: userPhone, description: userDesc });
  };

  const handleRestart = () => {
    setMessages([{
      id: 'welcome',
      role: 'model',
      text: chatbot.welcome
    }]);
    setIsSessionExpired(false);
    resetInactivityTimer();
  };

  const handleSend = async (overrideInput?: string) => {
    if (isSessionExpired) return;
    
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    resetInactivityTimer(); // Reset timer on user action

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideInput) setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Build conversation history for context
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      // Add user context from form if available
      let systemContext = `You are Rabe IA, Kinva's intelligent assistant.
          User: "${userName}" (Phone: "${userPhone}").
          
          CORE DIRECTIVE: You are a strict Business & IT Consultant.
          
          STRICT CONCISENESS RULES:
          1. KEEP RESPONSES SHORT. Max 2-3 sentences per paragraph.
          2. Max total length: 50 words.
          3. Use bullet points for lists.
          4. No fluffy introductions. Get straight to the point.
          5. If the user asks for a price, give the price immediately.

          STRICT TOPIC RESTRICTIONS:
          - ALLOWED: IT, Web, AI, Business, Kinva Services.
          - FORBIDDEN: Cooking, Sports, General Trivia, Personal Advice.
          - IF FORBIDDEN: Pivot immediately to business. "Je ne cuisine pas, mais je peux automatiser votre restaurant."

          Services:
          1. Kinva Systems (Network, Security, Starlink)
          2. Kinva Web (Sites, Apps, 59k/139k/249k Ar)
          3. Kinva AI (Chatbots 24/7, Automation)
          4. Kinva Academy (Training)
          
          Language: Answer in ${language === 'fr' ? 'French' : 'English'}.
          Use Google Search for real-time Mada tech news only.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            ...history,
            { role: 'user', parts: [{ text: userMessage.text }] }
        ],
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: systemContext,
        },
      });

      const responseText = response.text || "";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      
      const sources = groundingChunks
        ?.map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title)
        .map((web: any) => ({ title: web.title, uri: web.uri }));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        sources: sources
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Simulate data collection for FAQ building
      collectCustomerData('chat', { user: userName, query: userMessage.text, response: responseText });

    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: chatbot.error
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-brand-teal text-white rounded-full shadow-xl hover:bg-brand-teal/90 transition-colors flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? chatbot.close : chatbot.open}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] md:w-[400px] max-h-[600px] h-[75vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md shrink-0">
              <div className="flex items-center gap-3">
                 <div className="bg-white/10 p-2 rounded-lg">
                    <Sparkles className="w-5 h-5 text-brand-teal" />
                 </div>
                 <div>
                   <h3 className="font-bold text-sm md:text-base">{chatbot.title}</h3>
                   <span className="text-[10px] text-slate-300 flex items-center gap-1">
                     <span className={`w-1.5 h-1.5 rounded-full ${isSessionExpired ? 'bg-red-500' : 'bg-green-400 animate-pulse'}`}></span>
                     {isSessionExpired ? 'Offline' : 'Online · Gemini 2.5'}
                   </span>
                 </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT AREA: Form OR Chat */}
            {!hasJoined ? (
              // LEAD CAPTURE FORM
              <div className="flex-1 flex flex-col p-6 bg-slate-50 overflow-y-auto">
                 <div className="text-center mb-6 mt-2">
                    <div className="w-14 h-14 bg-white rounded-full mx-auto flex items-center justify-center shadow-md mb-3 border border-slate-100">
                       <MessageCircle className="w-7 h-7 text-brand-teal" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{chatbot.form_title}</h3>
                    <p className="text-xs text-slate-500">{chatbot.form_desc}</p>
                 </div>

                 <form onSubmit={handleJoin} className="space-y-3">
                    <div>
                       <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 ml-1">
                          {chatbot.form_name_label} <span className="text-red-500">*</span>
                       </label>
                       <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                            placeholder="John Doe"
                          />
                       </div>
                    </div>

                    <div>
                       <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 ml-1">
                          {chatbot.form_email_label} <span className="text-red-500">*</span>
                       </label>
                       <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="email" 
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                            placeholder="john@company.com"
                          />
                       </div>
                    </div>

                     <div>
                       <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 ml-1">
                          {chatbot.form_phone_label} <span className="text-red-500">*</span>
                       </label>
                       <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="tel" 
                            required
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all"
                            placeholder="+261 34..."
                          />
                       </div>
                    </div>

                     <div>
                       <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1 ml-1">
                          {chatbot.form_message_label}
                       </label>
                       <div className="relative">
                          <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                          <textarea 
                            rows={2}
                            value={userDesc}
                            onChange={(e) => setUserDesc(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition-all resize-none"
                            placeholder="..."
                          />
                       </div>
                    </div>

                    <Button type="submit" className="w-full mt-4 py-3 bg-brand-teal text-white shadow-lg shadow-brand-teal/20">
                       {chatbot.form_submit}
                    </Button>
                    
                    <p className="text-center text-[10px] text-slate-400 mt-2">
                       {chatbot.form_privacy}
                    </p>
                 </form>
              </div>
            ) : (
              // CHAT INTERFACE
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-brand-teal text-white rounded-tr-none shadow-md'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none shadow-sm'
                        }`}
                      >
                        <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
                        
                        {/* Sources */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs">
                             <div className="font-bold text-slate-500 mb-1 flex items-center gap-1">
                               <Link className="w-3 h-3" /> {chatbot.sources}
                             </div>
                             <div className="flex flex-col gap-1">
                               {msg.sources.map((source, idx) => (
                                 <a 
                                   key={idx} 
                                   href={source.uri} 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   className="text-brand-teal hover:underline truncate flex items-center gap-1"
                                 >
                                   <ExternalLink className="w-3 h-3" /> {source.title}
                                 </a>
                               ))}
                             </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-2">
                         <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                         </div>
                         <span className="text-xs text-slate-400 font-medium">{chatbot.thinking}</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                  {isSessionExpired ? (
                     <div className="text-center">
                        <div className="flex items-center justify-center gap-2 text-amber-500 font-bold mb-3 text-sm">
                           <Clock className="w-4 h-4" /> Session expirée (15 min)
                        </div>
                        <Button onClick={handleRestart} className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm">
                           <RefreshCw className="w-4 h-4 mr-2" /> Nouvelle Conversation
                        </Button>
                     </div>
                  ) : (
                    <>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSend();
                        }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder={chatbot.placeholder}
                          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal/20 focus:border-brand-teal text-sm text-slate-900 placeholder:text-slate-400 transition-all"
                          disabled={isLoading}
                        />
                        <button
                          type="submit"
                          disabled={isLoading || !input.trim()}
                          className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </form>
                      <p className="text-[9px] text-center text-slate-400 mt-2">
                        {chatbot.disclaimer}
                      </p>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
