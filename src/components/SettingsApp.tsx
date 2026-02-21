import React, { useState } from 'react';
import { Monitor, Image as ImageIcon, Palette, Shield, Info, Bell, Sun, Moon, Apple, Plus } from 'lucide-react';
import { SystemSettings } from '../types';
import { cn } from '../lib/utils';

interface SettingsAppProps {
  settings: SystemSettings;
  setSettings: (s: SystemSettings) => void;
}

const WALLPAPERS = [
  'https://picsum.photos/seed/os1/1920/1080',
  'https://picsum.photos/seed/os2/1920/1080',
  'https://picsum.photos/seed/os3/1920/1080',
  'https://picsum.photos/seed/os4/1920/1080',
  'https://picsum.photos/seed/os5/1920/1080',
  'https://picsum.photos/seed/os6/1920/1080',
];

export const SettingsApp: React.FC<SettingsAppProps> = ({ settings, setSettings }) => {
  const [activeTab, setActiveTab] = useState<'display' | 'wallpaper' | 'appearance' | 'notifications' | 'privacy' | 'about'>('display');

  const renderContent = () => {
    switch (activeTab) {
      case 'display':
        return (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-sm font-semibold opacity-60 mb-4 uppercase tracking-wider">Yorqinlik</h2>
            <div className="bg-white/5 rounded-2xl p-6 flex items-center gap-6">
              <Monitor size={24} className="text-blue-400" />
              <div className="flex-1">
                <input 
                  type="range" 
                  className="w-full accent-blue-500 h-2 rounded-lg appearance-none bg-white/10"
                  value={settings.brightness}
                  onChange={(e) => setSettings({...settings, brightness: parseInt(e.target.value)})}
                />
                <div className="flex justify-between mt-2 text-[10px] opacity-40">
                  <span>Xira</span>
                  <span>Yorqin</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'wallpaper':
        return (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-semibold opacity-60 uppercase tracking-wider">Fon rasmi</h2>
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Plus size={14} /> Kompyuterdan yuklash
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setSettings({ ...settings, wallpaper: url });
                    }
                  }}
                />
              </label>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {WALLPAPERS.map((wp, i) => (
                <button
                  key={i}
                  onClick={() => setSettings({ ...settings, wallpaper: wp })}
                  className={cn(
                    "aspect-video rounded-xl overflow-hidden border-2 transition-all hover:scale-105",
                    settings.wallpaper === wp ? "border-blue-500 ring-4 ring-blue-500/20" : "border-transparent"
                  )}
                >
                  <img src={wp} className="w-full h-full object-cover" alt={`Wallpaper ${i}`} referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </section>
        );
      case 'appearance':
        return (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-sm font-semibold opacity-60 mb-4 uppercase tracking-wider">Tizim Mavzusi</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={cn(
                  "p-4 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all",
                  settings.theme === 'light' ? "bg-white text-black border-blue-500" : "bg-white/5 border-transparent text-white/60"
                )}
              >
                <div className="w-full aspect-video bg-neutral-100 rounded-lg border border-black/10 flex items-center justify-center">
                  <Sun size={32} className="text-yellow-500" />
                </div>
                <span className="font-bold">Yorug' Mavzu</span>
              </button>
              <button 
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={cn(
                  "p-4 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all",
                  settings.theme === 'dark' ? "bg-black text-white border-blue-500" : "bg-white/5 border-transparent text-white/60"
                )}
              >
                <div className="w-full aspect-video bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center">
                  <Moon size={32} className="text-blue-400" />
                </div>
                <span className="font-bold">Tungi Mavzu</span>
              </button>
            </div>
          </section>
        );
      case 'notifications':
        return (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h2 className="text-sm font-semibold opacity-60 mb-4 uppercase tracking-wider">Bildirishnomalar</h2>
            {[
              { label: 'Bildirishnomalarni ko\'rsatish', desc: 'Barcha ilovalar uchun bildirishnomalar' },
              { label: 'Ovozli bildirishnomalar', desc: 'Xabarlar kelganda ovoz chiqarish' },
              { label: 'Bloklangan ekranda ko\'rsatish', desc: 'Ekran yopiq bo\'lganda ham bildirishnomalar' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[10px] opacity-40">{item.desc}</p>
                </div>
                <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </section>
        );
      case 'privacy':
        return (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
            <h2 className="text-sm font-semibold opacity-60 mb-4 uppercase tracking-wider">Maxfiylik va Xavfsizlik</h2>
            {[
              { icon: Shield, label: 'Joylashuvni aniqlash', desc: 'Ilovalar sizning joylashuvingizni bilishi' },
              { icon: Bell, label: 'Kamera ruxsati', desc: 'Ilovalar kameradan foydalanishi' },
              { icon: Info, label: 'Mikrofon ruxsati', desc: 'Ilovalar mikrofondan foydalanishi' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <item.icon size={20} className="text-blue-400" />
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-[10px] opacity-40">{item.desc}</p>
                  </div>
                </div>
                <div className="w-10 h-5 bg-neutral-600 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            ))}
          </section>
        );
      case 'about':
        return (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center text-center py-8">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/10">
              <Apple size={48} className="text-white fill-white" />
            </div>
            <h2 className="text-2xl font-bold mb-1">NaimatOS</h2>
            <p className="text-sm opacity-40 mb-8">Versiya 1.0.0 (Build 2024.02.21)</p>
            
            <div className="w-full max-w-md space-y-2 text-left">
              <div className="bg-white/5 rounded-xl p-3 flex justify-between text-xs">
                <span className="opacity-40">Protsessor</span>
                <span className="font-medium">Virtual 8-Core ARM</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 flex justify-between text-xs">
                <span className="opacity-40">Xotira</span>
                <span className="font-medium">8 GB LPDDR5</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 flex justify-between text-xs">
                <span className="opacity-40">Grafika</span>
                <span className="font-medium">Naimat Graphics v1</span>
              </div>
              <div className="bg-white/5 rounded-xl p-3 flex justify-between text-xs">
                <span className="opacity-40">Seriya raqami</span>
                <span className="font-medium font-mono">NMT-OS-2024-X99</span>
              </div>
            </div>
            
            <p className="mt-12 text-[10px] opacity-20">© 2024 Naimat Technologies. Barcha huquqlar himoyalangan.</p>
          </section>
        );
    }
  };

  return (
    <div className="flex h-full bg-neutral-900/50">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/10 bg-white/5 p-2 space-y-1">
        {[
          { id: 'display', icon: Monitor, label: 'Ekran' },
          { id: 'wallpaper', icon: ImageIcon, label: 'Fon rasmi' },
          { id: 'appearance', icon: Palette, label: 'Ko\'rinish' },
          { id: 'notifications', icon: Bell, label: 'Bildirishnomalar' },
          { id: 'privacy', icon: Shield, label: 'Maxfiylik' },
          { id: 'about', icon: Info, label: 'Haqida' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all",
              activeTab === tab.id ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5 text-white/60"
            )}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto no-scrollbar">
        <h1 className="text-2xl font-bold mb-6">
          {activeTab === 'display' && 'Ekran sozlamalari'}
          {activeTab === 'wallpaper' && 'Fon rasmi'}
          {activeTab === 'appearance' && 'Tizim ko\'rinishi'}
          {activeTab === 'notifications' && 'Bildirishnomalar'}
          {activeTab === 'privacy' && 'Maxfiylik va Xavfsizlik'}
          {activeTab === 'about' && 'Tizim haqida'}
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};
