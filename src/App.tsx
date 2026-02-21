import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Bluetooth, 
  Battery, 
  Search, 
  LayoutGrid, 
  Settings as SettingsIcon, 
  Volume2, 
  Sun,
  Moon,
  Airplay,
  Command,
  Clock,
  Apple,
  MessageSquare,
  Globe,
  Folder,
  Terminal,
  Play,
  Music,
  Camera,
  Sparkles,
  FileText,
  Calendar,
  Calculator,
  Trash2,
  ShoppingBag,
  ChevronLeft,
  Activity
} from 'lucide-react';
import { cn } from './lib/utils';
import { Window } from './components/Window';
import { ControlCenter } from './components/ControlCenter';
import { GeminiApp } from './components/GeminiApp';
import { SettingsApp } from './components/SettingsApp';
import { NotesApp } from './components/NotesApp';
import { TerminalApp } from './components/TerminalApp';
import { BrowserApp } from './components/BrowserApp';
import { CalculatorApp } from './components/CalculatorApp';
import { CalendarApp } from './components/CalendarApp';
import { MusicPlayer } from './components/MusicPlayer';
import { AppStore } from './components/AppStore';
import { SocialHub } from './components/SocialHub';
import { ContextMenu } from './components/ContextMenu';
import { SystemSettings, WindowState, AppConfig } from './types';

const INITIAL_SETTINGS: SystemSettings = {
  brightness: 80,
  volume: 60,
  wifi: true,
  bluetooth: true,
  airdrop: true,
  wallpaper: 'https://picsum.photos/seed/naimatos/1920/1080',
  theme: 'dark',
  focusMode: false,
  stageManager: false
};

const CORE_APPS: AppConfig[] = [
  { id: 'gemini', name: 'Gemini AI', icon: 'Sparkles', color: 'bg-gradient-to-br from-blue-500 to-purple-600', component: GeminiApp },
  { id: 'settings', name: 'Sozlamalar', icon: 'SettingsIcon', color: 'bg-neutral-700', component: SettingsApp },
  { id: 'notes', name: 'Qaydlar', icon: 'FileText', color: 'bg-orange-500', component: NotesApp },
  { id: 'calendar', name: 'Taqvim', icon: 'Calendar', color: 'bg-white text-red-500', component: CalendarApp },
  { id: 'calculator', name: 'Kalkulyator', icon: 'Calculator', color: 'bg-orange-600', component: CalculatorApp },
  { id: 'music', name: 'Musiqa', icon: 'Music', color: 'bg-pink-600', component: MusicPlayer },
  { id: 'appstore', name: 'App Store', icon: 'ShoppingBag', color: 'bg-blue-500', component: AppStore },
  { id: 'social', name: 'Ijtimoiy', icon: 'MessageSquare', color: 'bg-indigo-500', component: SocialHub },
  { id: 'files', name: 'Fayllar', icon: 'Folder', color: 'bg-blue-600', component: () => {
    const [currentPath, setCurrentPath] = useState(['Fayllar']);
    const folders = ['Hujjatlar', 'Rasmlar', 'Yuklanmalar', 'Ilovalar', 'Tizim', 'Loyihalar'];
    const files = [
      { name: 'reja.txt', type: 'text' },
      { name: 'foto.jpg', type: 'image' },
      { name: 'hisobot.pdf', type: 'pdf' }
    ];

    const navigateTo = (folder: string) => {
      setCurrentPath([...currentPath, folder]);
    };

    const goBack = () => {
      if (currentPath.length > 1) {
        setCurrentPath(currentPath.slice(0, -1));
      }
    };

    return (
      <div className="flex h-full bg-neutral-900">
        <div className="w-48 border-r border-white/5 bg-black/20 p-4 space-y-2">
          <button 
            onClick={goBack}
            disabled={currentPath.length === 1}
            className="w-full flex items-center gap-2 text-xs p-2 hover:bg-white/5 rounded-lg cursor-pointer opacity-60 disabled:opacity-20 transition-all mb-4"
          >
            <ChevronLeft size={14} /> Orqaga
          </button>
          {folders.map(f => (
            <div 
              key={f} 
              onClick={() => navigateTo(f)}
              className="flex items-center gap-2 text-xs p-2 hover:bg-white/5 rounded-lg cursor-pointer opacity-60 transition-all"
            >
              <Folder size={14} className="text-blue-400" /> {f}
            </div>
          ))}
        </div>
        <div className="flex-1 p-8">
          <div className="flex items-center gap-2 text-xs opacity-40 mb-8 font-mono">
            {currentPath.join(' / ')}
          </div>
          <div className="grid grid-cols-4 gap-8">
            {folders.map(folder => (
              <div 
                key={folder} 
                onClick={() => navigateTo(folder)}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/30 transition-all transform group-active:scale-95">
                  <Folder size={32} className="text-blue-400" />
                </div>
                <span className="text-[11px] font-medium opacity-80">{folder}</span>
              </div>
            ))}
            {files.map(file => (
              <div key={file.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white/10 transition-all transform group-active:scale-95">
                  <FileText size={32} className="text-neutral-400" />
                </div>
                <span className="text-[11px] font-medium opacity-80">{file.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }},
  { id: 'browser', name: 'Brauzer', icon: 'Globe', color: 'bg-white text-blue-600', component: BrowserApp },
  { id: 'terminal', name: 'Terminal', icon: 'Terminal', color: 'bg-black', component: TerminalApp },
];

export default function App() {
  const [time, setTime] = useState(new Date());
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isBooted, setIsBooted] = useState(false);
  const [installedApps, setInstalledApps] = useState<AppConfig[]>([]);
  
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    isOpen: boolean;
    appId: string | null;
  }>({ x: 0, y: 0, isOpen: false, appId: null });

  const allApps = [...CORE_APPS, ...installedApps];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const bootTimer = setTimeout(() => setIsBooted(true), 2000);
    return () => {
      clearInterval(timer);
      clearTimeout(bootTimer);
    };
  }, []);

  const openApp = (appId: string) => {
    const existing = openWindows.find(w => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        setOpenWindows(openWindows.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
      setActiveWindowId(existing.id);
      focusWindow(existing.id);
      return;
    }

    const newWindow: WindowState = {
      id: Math.random().toString(36).substr(2, 9),
      appId,
      zIndex: openWindows.length + 10,
      isMinimized: false,
      isMaximized: false
    };

    setOpenWindows([...openWindows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveWindowId(null);
  };

  const focusWindow = (id: string) => {
    setActiveWindowId(id);
    setOpenWindows(openWindows.map(w => ({
      ...w,
      zIndex: w.id === id ? Math.max(...openWindows.map(win => win.zIndex), 10) + 1 : w.zIndex
    })));
  };

  const handleInstallApp = (app: any) => {
    const newApp: AppConfig = {
      id: `installed-${app.id}`,
      name: app.name,
      icon: 'LayoutGrid', // Default icon for installed apps
      color: app.color,
      component: () => (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-neutral-900 h-full">
          <div className={cn("w-32 h-32 rounded-[40px] flex items-center justify-center text-6xl shadow-2xl mb-8", app.color)}>
            {app.icon}
          </div>
          <h2 className="text-3xl font-bold mb-4">{app.name}</h2>
          <p className="text-lg opacity-40 max-w-md">Ushbu ilova muvaffaqiyatli o'rnatildi va foydalanishga tayyor.</p>
        </div>
      )
    };
    setInstalledApps([...installedApps, newApp]);
  };

  const handleUninstallApp = (appId: string) => {
    setInstalledApps(installedApps.filter(a => a.id !== appId));
    setOpenWindows(openWindows.filter(w => w.appId !== appId));
  };

  const handleContextMenu = (e: React.MouseEvent, appId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY - 100, // Offset to show above dock
      isOpen: true,
      appId
    });
  };

  const getAppIcon = (iconName: string, size = 24) => {
    switch(iconName) {
      case 'Sparkles': return <Sparkles size={size} />;
      case 'SettingsIcon': return <SettingsIcon size={size} />;
      case 'FileText': return <FileText size={size} />;
      case 'Calendar': return <Calendar size={size} />;
      case 'Calculator': return <Calculator size={size} />;
      case 'Folder': return <Folder size={size} />;
      case 'Globe': return <Globe size={size} />;
      case 'Terminal': return <Terminal size={size} />;
      case 'Music': return <Music size={size} />;
      case 'ShoppingBag': return <ShoppingBag size={size} />;
      case 'MessageSquare': return <MessageSquare size={size} />;
      default: return <LayoutGrid size={size} />;
    }
  };

  if (!isBooted) {
    return (
      <div className="h-screen w-screen bg-neutral-950 flex flex-col items-center justify-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="absolute inset-0 blur-2xl bg-blue-500/20 rounded-full" />
          <div className="relative glass p-6 rounded-[40px] border-white/5">
            <LayoutGrid size={80} className="text-blue-500" />
          </div>
        </motion.div>
        <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
        </div>
        <p className="text-white/40 text-xs font-medium tracking-widest uppercase">NaimatOS yuklanmoqda</p>
      </div>
    );
  }

  const contextApp = allApps.find(a => a.id === contextMenu.appId);

  return (
    <div 
      className={cn(
        "h-screen w-screen overflow-hidden relative select-none font-sans transition-colors duration-700",
        settings.theme === 'light' ? "text-black" : "text-white"
      )}
      style={{ 
        backgroundImage: `url(${settings.wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Desktop Overlay for Brightness */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ backgroundColor: 'black', opacity: (100 - settings.brightness) / 100 * 0.7 }}
      />

      {/* Widgets Layer */}
      <div className="absolute top-20 left-10 flex flex-col gap-6 pointer-events-none w-80">
        {/* Clock & Date Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark p-8 rounded-[40px] pointer-events-auto border-white/5 shadow-2xl backdrop-blur-3xl"
        >
          <h2 className="text-6xl font-light tracking-tighter mb-2">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
          </h2>
          <p className="text-sm font-medium opacity-60 uppercase tracking-[0.2em]">
            {time.toLocaleDateString('uz-UZ', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {/* Weather Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-dark p-5 rounded-[32px] pointer-events-auto border-white/5 shadow-xl flex flex-col justify-between aspect-square"
          >
            <div className="flex justify-between items-start">
              <Sun className="text-yellow-400" size={24} />
              <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Havo</span>
            </div>
            <div>
              <h3 className="text-3xl font-light">24°</h3>
              <p className="text-[10px] font-medium opacity-60">Toshkent</p>
            </div>
          </motion.div>

          {/* Battery/System Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-dark p-5 rounded-[32px] pointer-events-auto border-white/5 shadow-xl flex flex-col justify-between aspect-square"
          >
            <div className="flex justify-between items-start">
              <Battery className="text-green-400" size={24} />
              <span className="text-[10px] font-bold opacity-40 uppercase tracking-wider">Quvvat</span>
            </div>
            <div>
              <h3 className="text-3xl font-light">100%</h3>
              <p className="text-[10px] font-medium opacity-60">To'liq quvvatlangan</p>
            </div>
          </motion.div>
        </div>

        {/* System Performance Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-dark p-6 rounded-[32px] pointer-events-auto border-white/5 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Tizim unumdorligi</p>
            <Activity size={14} className="text-blue-400" />
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-medium">
                <span className="opacity-60">Protsessor (CPU)</span>
                <span className="text-blue-400">12%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '12%' }}
                  className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-medium">
                <span className="opacity-60">Xotira (RAM)</span>
                <span className="text-purple-400">40%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '40%' }}
                  className="h-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" 
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Bar - ChromeOS / Modern Style */}
      <div className={cn(
        "h-12 w-full flex items-center justify-between px-6 fixed top-0 z-[100] transition-all",
        settings.theme === 'light' ? "bg-white/80 backdrop-blur-xl text-black border-b border-black/5" : "bg-black/20 backdrop-blur-2xl text-white"
      )}>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <LayoutGrid size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">NaimatOS</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-2" />
          <div className="flex items-center gap-4 text-sm font-medium opacity-60">
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Ilovalar</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Fayllar</span>
            <span className="hover:opacity-100 cursor-pointer transition-opacity">Yordam</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div 
            onClick={() => setIsControlCenterOpen(!isControlCenterOpen)}
            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/5 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Wifi size={14} className={cn(settings.wifi ? "text-blue-400" : "opacity-30")} />
              <Battery size={14} className="text-green-400" />
            </div>
            <div className="h-3 w-[1px] bg-white/20" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Center */}
      <ControlCenter 
        isOpen={isControlCenterOpen} 
        onClose={() => setIsControlCenterOpen(false)}
        settings={settings}
        setSettings={setSettings}
        onOpenSettings={() => openApp('settings')}
      />

      {/* Windows Layer */}
      <div className="absolute inset-0 pt-12 pb-24">
        <AnimatePresence>
          {openWindows.filter(w => !w.isMinimized).map(win => {
            const app = allApps.find(a => a.id === win.appId)!;
            const AppComponent = app.component;
            return (
              <Window
                key={win.id}
                id={win.id}
                title={app.name}
                icon={getAppIcon(app.icon, 20) as any}
                zIndex={win.zIndex}
                isActive={activeWindowId === win.id}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                onFocus={() => focusWindow(win.id)}
              >
                {app.id === 'settings' ? (
                  <SettingsApp settings={settings} setSettings={setSettings} />
                ) : app.id === 'appstore' ? (
                  <AppStore onInstall={handleInstallApp} installedAppIds={installedApps.map(a => a.id.replace('installed-', ''))} />
                ) : (
                  <AppComponent />
                )}
              </Window>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
        <motion.div 
          layout
          className="glass-dark px-4 py-3 rounded-[32px] flex items-end gap-3 border border-white/10 shadow-2xl backdrop-blur-3xl"
        >
          {allApps.map((app) => (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.15, y: -12 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => openApp(app.id)}
              onContextMenu={(e) => handleContextMenu(e, app.id)}
              className="relative group flex flex-col items-center"
            >
              <div className={cn(
                "w-14 h-14 rounded-[20px] flex items-center justify-center shadow-xl transition-all duration-300 border border-white/10",
                app.color,
                "group-hover:shadow-blue-500/30 group-hover:border-white/20"
              )}>
                {getAppIcon(app.icon, 28)}
              </div>
              
              {/* App indicator */}
              {openWindows.some(w => w.appId === app.id) && (
                <div className="absolute -bottom-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              )}

              {/* Tooltip */}
              <div className="absolute -top-12 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap border border-white/10 shadow-xl translate-y-2 group-hover:translate-y-0">
                {app.name}
              </div>
            </motion.button>
          ))}
          
          <div className="w-[1px] h-10 bg-white/10 mx-1 self-center" />
          
          <motion.button
            whileHover={{ scale: 1.15, y: -12 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 rounded-[20px] bg-white/5 flex items-center justify-center shadow-xl hover:bg-white/10 transition-all border border-white/10"
          >
            <Trash2 size={24} className="text-white/60" />
          </motion.button>
        </motion.div>
      </div>

      {/* Context Menu */}
      <ContextMenu 
        {...contextMenu}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        onUninstall={() => contextMenu.appId && handleUninstallApp(contextMenu.appId)}
        appName={contextApp?.name || ''}
        isRemovable={!!contextMenu.appId?.startsWith('installed-')}
      />
    </div>
  );
}
