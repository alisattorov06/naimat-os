import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ExternalLink, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface ContextMenuProps {
  x: number;
  y: number;
  isOpen: boolean;
  onClose: () => void;
  onUninstall?: () => void;
  appName: string;
  isRemovable: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ 
  x, y, isOpen, onClose, onUninstall, appName, isRemovable 
}) => {
  useEffect(() => {
    const handleClick = () => onClose();
    if (isOpen) window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          style={{ top: y, left: x }}
          className="fixed z-[1000] w-48 glass-dark border border-white/10 rounded-2xl p-1.5 shadow-2xl backdrop-blur-3xl overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-white/5 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{appName}</p>
          </div>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-xs transition-colors">
            <ExternalLink size={14} className="opacity-60" /> Ochish
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-xs transition-colors">
            <Info size={14} className="opacity-60" /> Ma'lumot
          </button>

          {isRemovable && (
            <>
              <div className="h-[1px] bg-white/5 my-1" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onUninstall?.();
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/20 text-red-400 text-xs transition-colors"
              >
                <Trash2 size={14} /> O'chirish
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
