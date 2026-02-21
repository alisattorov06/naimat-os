import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const CalendarApp: React.FC = () => {
  const days = ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'];
  const date = new Date();
  const currentMonth = date.toLocaleString('uz-UZ', { month: 'long' });
  const currentYear = date.getFullYear();
  
  // Simple calendar grid simulation
  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="h-full bg-neutral-900 flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold capitalize">{currentMonth}</h2>
          <p className="text-sm opacity-40">{currentYear}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map(day => (
          <div key={day} className="text-center text-[10px] font-bold opacity-30 uppercase tracking-widest py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 flex-1">
        {/* Empty cells for padding */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {calendarDays.map(day => (
          <div 
            key={day} 
            className={cn(
              "aspect-square rounded-2xl flex flex-col items-center justify-center text-sm transition-all cursor-pointer border border-transparent",
              day === date.getDate() 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 border-blue-400/50" 
                : "hover:bg-white/5 hover:border-white/10"
            )}
          >
            <span className="font-medium">{day}</span>
            {day === 15 && <div className="w-1 h-1 bg-orange-500 rounded-full mt-1" />}
            {day === 22 && <div className="w-1 h-1 bg-green-500 rounded-full mt-1" />}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
        <h3 className="text-xs font-bold opacity-40 uppercase tracking-wider mb-3">Bugungi tadbirlar</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-blue-500 rounded-full" />
            <div>
              <p className="text-xs font-medium">NaimatOS Taqdimoti</p>
              <p className="text-[10px] opacity-40">14:00 - 15:30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
