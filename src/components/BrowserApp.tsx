import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Search, Globe, ShieldCheck, Lock } from 'lucide-react';

export const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://www.bing.com');
  const [inputUrl, setInputUrl] = useState('https://www.bing.com');

  const handleGo = (e: React.FormEvent) => {
    e.preventDefault();
    let target = inputUrl;
    if (!target.startsWith('http')) target = 'https://' + target;
    setUrl(target);
    setInputUrl(target);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Toolbar */}
      <div className="h-12 bg-neutral-100 border-b flex items-center px-4 gap-4 shrink-0">
        <div className="flex gap-3 text-neutral-500">
          <ChevronLeft size={18} className="cursor-pointer hover:text-black transition-colors" />
          <ChevronRight size={18} className="cursor-pointer hover:text-black transition-colors" />
          <RotateCw size={16} className="cursor-pointer hover:text-black transition-colors" />
        </div>
        
        <form onSubmit={handleGo} className="flex-1 flex items-center bg-white border border-neutral-300 rounded-full h-8 px-4 gap-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Lock size={12} className="text-green-600" />
          <input 
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="flex-1 bg-transparent outline-none text-[13px]"
          />
          <Search size={14} className="text-neutral-400" />
        </form>

        <div className="flex items-center gap-3 text-neutral-500">
          <ShieldCheck size={18} className="text-blue-500" />
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
            U
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white relative overflow-hidden">
        <iframe 
          src={url} 
          className="w-full h-full border-none" 
          title="Browser Content"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
        
        {/* Fallback Overlay if iframe is blocked (common for many sites) */}
        <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity bg-black/5 flex items-center justify-center">
          <p className="text-[10px] text-neutral-400">Ba'zi saytlar xavfsizlik sababli iframe-da ochilmasligi mumkin.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="h-8 bg-neutral-100 border-t flex items-center px-4 justify-between text-[10px] text-neutral-500 shrink-0">
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Naimat Browser v1.0</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Xavfsiz qidiruv</span>
        </div>
      </div>
    </div>
  );
};
