import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Bluetooth, 
  Battery, 
  Search, 
  LayoutGrid, 
  Settings, 
  Volume2, 
  Sun,
  Moon,
  Airplay,
  ToggleLeft as Toggle,
  ToggleRight as ToggleActive
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SystemSettings } from '../types';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SystemSettings;
  setSettings: (s: SystemSettings) => void;
  onOpenSettings: () => void;
}

export const ControlCenter: React.FC<ControlCenterProps> = ({ isOpen, onClose, settings, setSettings, onOpenSettings }) => {
  const toggleWifi = () => setSettings({ ...settings, wifi: !settings.wifi });
  const toggleBluetooth = () => setSettings({ ...settings, bluetooth: !settings.bluetooth });
  const toggleAirdrop = () => setSettings({ ...settings, airdrop: !settings.airdrop });
  const toggleFocus = () => setSettings({ ...settings, focusMode: !settings.focusMode });
  const toggleStage = () => setSettings({ ...settings, stageManager: !settings.stageManager });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={cn(
              "fixed top-12 right-4 w-80 rounded-3xl p-4 z-50 overflow-hidden shadow-2xl border transition-colors duration-500",
              settings.theme === 'light' ? "bg-white/90 backdrop-blur-2xl border-black/10 text-black" : "glass-dark border-white/10 text-white"
            )}
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={cn(
                "rounded-2xl p-3 flex flex-col gap-2",
                settings.theme === 'light' ? "bg-black/5" : "bg-white/10"
              )}>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={toggleWifi}>
                  <div className={cn("p-2 rounded-full transition-all", settings.wifi ? "bg-blue-500 text-white" : "bg-neutral-500/20")}>
                    <Wifi size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Wi-Fi</span>
                    <span className="text-[10px] opacity-60">{settings.wifi ? 'Home_5G' : 'O\'chirilgan'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={toggleBluetooth}>
                  <div className={cn("p-2 rounded-full transition-all", settings.bluetooth ? "bg-blue-500 text-white" : "bg-neutral-500/20")}>
                    <Bluetooth size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">Bluetooth</span>
                    <span className="text-[10px] opacity-60">{settings.bluetooth ? 'Yoqilgan' : 'O\'chirilgan'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 cursor-pointer group" onClick={toggleAirdrop}>
                  <div className={cn("p-2 rounded-full transition-all", settings.airdrop ? "bg-blue-500 text-white" : "bg-neutral-500/20")}>
                    <Airplay size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">AirDrop</span>
                    <span className="text-[10px] opacity-60">{settings.airdrop ? 'Hamma uchun' : 'O\'chirilgan'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-rows-2 gap-3">
                <div 
                  onClick={toggleFocus}
                  className={cn(
                    "rounded-2xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors",
                    settings.focusMode ? "bg-purple-600 text-white" : (settings.theme === 'light' ? "bg-black/5" : "bg-white/10")
                  )}
                >
                  <Moon size={18} className={settings.focusMode ? "text-white" : "text-purple-400"} />
                  <span className="text-xs font-semibold">Diqqat</span>
                </div>
                <div 
                  onClick={toggleStage}
                  className={cn(
                    "rounded-2xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors",
                    settings.stageManager ? "bg-orange-600 text-white" : (settings.theme === 'light' ? "bg-black/5" : "bg-white/10")
                  )}
                >
                  <LayoutGrid size={18} className={settings.stageManager ? "text-white" : "text-orange-400"} />
                  <span className="text-xs font-semibold">Sahnada</span>
                </div>
              </div>
            </div>

            <div className={cn(
              "rounded-2xl p-4 mb-3",
              settings.theme === 'light' ? "bg-black/5" : "bg-white/10"
            )}>
              <div className="flex items-center gap-3 mb-2">
                <Sun size={16} className="opacity-60" />
                <input 
                  type="range" 
                  className="w-full accent-blue-500 h-1 rounded-lg appearance-none bg-neutral-500/20"
                  value={settings.brightness}
                  onChange={(e) => setSettings({...settings, brightness: parseInt(e.target.value)})}
                />
              </div>
              <div className="flex items-center gap-3">
                <Volume2 size={16} className="opacity-60" />
                <input 
                  type="range" 
                  className="w-full accent-blue-500 h-1 rounded-lg appearance-none bg-neutral-500/20"
                  value={settings.volume}
                  onChange={(e) => setSettings({...settings, volume: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <div className="flex gap-3 h-20">
              <div className={cn(
                "flex-1 rounded-2xl p-3 flex flex-col items-center justify-center gap-1",
                settings.theme === 'light' ? "bg-black/5" : "bg-white/10"
              )}>
                <Battery size={20} className="text-green-400" />
                <span className="text-[10px] font-semibold">100%</span>
              </div>
              <div 
                onClick={() => { onOpenSettings(); onClose(); }}
                className={cn(
                  "flex-1 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors",
                  settings.theme === 'light' ? "bg-black/5 hover:bg-black/10" : "bg-white/10 hover:bg-white/20"
                )}
              >
                <Settings size={20} className="opacity-60" />
                <span className="text-[10px] font-semibold">Sozlamalar</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
