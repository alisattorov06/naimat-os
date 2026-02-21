import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { generateGeminiResponse } from '../services/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GeminiApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Salom! Men NaimatOS dagi Gemini yordamchisiman. Sizga qanday yordam bera olaman?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await generateGeminiResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "Kechirasiz, xatolik yuz berdi." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Xatolik: Gemini API kaliti noto'g'ri yoki o'rnatilmagan." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900/50">
      <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
        <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold">Gemini AI</h2>
          <p className="text-[10px] opacity-60">Sizning aqlli yordamchingiz</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={cn(
            "flex gap-3 max-w-[85%]",
            msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              msg.role === 'user' ? "bg-blue-600" : "bg-neutral-800 border border-white/10"
            )}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={cn(
              "p-3 rounded-2xl text-sm leading-relaxed",
              msg.role === 'user' ? "bg-blue-600 text-white" : "bg-neutral-800/80 border border-white/10 text-neutral-200"
            )}>
              <div className="markdown-body prose prose-invert prose-sm max-w-none">
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 mr-auto">
            <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center">
              <Loader2 size={16} className="animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-neutral-800/80 border border-white/10">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Gemini bilan suhbatlashing..."
            className="w-full bg-neutral-800/80 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
