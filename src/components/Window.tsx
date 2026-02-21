import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'motion/react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface WindowProps {
  id: string;
  title: string;
  icon: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  isActive: boolean;
}

export const Window: React.FC<WindowProps> = ({ 
  title, 
  icon, 
  children, 
  onClose, 
  onMinimize, 
  onFocus,
  zIndex,
  isActive
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const constraintsRef = useRef(null);

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        width: isMaximized ? '100%' : '850px',
        height: isMaximized ? 'calc(100% - 32px)' : '580px',
        top: isMaximized ? '32px' : '12%',
        left: isMaximized ? '0' : '18%',
        borderRadius: isMaximized ? '0px' : '18px',
      }}
      exit={{ opacity: 0, scale: 0.5, y: 400, filter: 'blur(10px)' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{ zIndex }}
      className={cn(
        "fixed overflow-hidden flex flex-col shadow-2xl transition-all duration-300 border",
        isActive ? "ring-2 ring-blue-500/30 border-white/20" : "opacity-90 grayscale-[0.2] border-white/10",
        "glass backdrop-blur-3xl"
      )}
    >
      {/* Title Bar */}
      <div 
        className="h-11 bg-white/5 flex items-center justify-between px-4 cursor-default select-none group border-b border-white/5"
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors flex items-center justify-center group-hover:opacity-100"
            >
              <X size={9} className="opacity-0 group-hover:opacity-100 text-black/60" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors flex items-center justify-center group-hover:opacity-100"
            >
              <Minus size={9} className="opacity-0 group-hover:opacity-100 text-black/60" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
              className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors flex items-center justify-center group-hover:opacity-100"
            >
              <Maximize2 size={9} className="opacity-0 group-hover:opacity-100 text-black/60" />
            </button>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xl drop-shadow-sm">{icon}</span>
            <span className="text-[13px] font-semibold opacity-90 tracking-tight">{title}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </motion.div>
  );
};
