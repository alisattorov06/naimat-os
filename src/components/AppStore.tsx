import React, { useState } from 'react';
import { ShoppingBag, Star, Download, Search, Layout, Gamepad2, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

interface AppItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  icon: string;
  color: string;
}

const APPS_LIST: AppItem[] = [
  { id: '1', name: 'Telegram', category: 'Ijtimoiy tarmoq', rating: 4.8, icon: '📱', color: 'bg-blue-400' },
  { id: '2', name: 'Instagram', category: 'Foto va Video', rating: 4.7, icon: '📸', color: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600' },
  { id: '3', name: 'YouTube', category: 'Video', rating: 4.9, icon: '📺', color: 'bg-red-600' },
  { id: '4', name: 'Spotify', category: 'Musiqa', rating: 4.6, icon: '🎵', color: 'bg-green-500' },
  { id: '5', name: 'VS Code', category: 'Dasturlash', rating: 4.9, icon: '💻', color: 'bg-blue-600' },
  { id: '6', name: 'Figma', category: 'Dizayn', rating: 4.8, icon: '🎨', color: 'bg-purple-500' },
];

interface AppStoreProps {
  onInstall: (app: AppItem) => void;
  installedAppIds: string[];
}

export const AppStore: React.FC<AppStoreProps> = ({ onInstall, installedAppIds }) => {
  const [activeCategory, setActiveCategory] = useState('Hammasi');
  const [installingId, setInstallingId] = useState<string | null>(null);

  const handleInstall = (app: AppItem) => {
    if (installedAppIds.includes(app.id)) return;
    
    setInstallingId(app.id);
    // Simulate download/install time
    setTimeout(() => {
      onInstall(app);
      setInstallingId(null);
    }, 2000);
  };

  return (
    <div className="flex h-full bg-neutral-950 text-white">
      {/* Sidebar */}
      <div className="w-56 border-r border-white/5 bg-neutral-900/50 p-4 space-y-6">
        <div className="flex items-center gap-3 text-blue-500 mb-8">
          <ShoppingBag size={24} />
          <span className="font-bold text-lg">App Store</span>
        </div>
        
        <nav className="space-y-1">
          {['Hammasi', 'O\'yinlar', 'Ilovalar', 'Dasturlash', 'Dizayn'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all",
                activeCategory === cat ? "bg-blue-600 text-white" : "hover:bg-white/5 text-white/60"
              )}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Kashf qiling</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Qidiruv..." 
              className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:ring-2 focus:ring-blue-500/50 transition-all w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {APPS_LIST.map(app => {
            const isInstalled = installedAppIds.includes(app.id);
            const isInstalling = installingId === app.id;

            return (
              <div key={app.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6 hover:bg-white/10 transition-all cursor-pointer group">
                <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-2xl", app.color)}>
                  {app.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{app.name}</h3>
                  <p className="text-xs opacity-40 mb-3">{app.category}</p>
                  <div className="flex items-center gap-1 text-yellow-500 mb-4">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] font-bold">{app.rating}</span>
                  </div>
                  <button 
                    onClick={() => handleInstall(app)}
                    disabled={isInstalled || isInstalling}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] font-bold transition-all flex items-center gap-2",
                      isInstalled 
                        ? "bg-green-600/20 text-green-400 border border-green-500/30" 
                        : isInstalling 
                          ? "bg-blue-600/50 cursor-wait" 
                          : "bg-white/10 hover:bg-blue-600"
                    )}
                  >
                    {isInstalling ? (
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : isInstalled ? (
                      "O'rnatilgan"
                    ) : (
                      <><Download size={12} /> O'rnatish</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
