import React, { useState } from 'react';
import { cn } from '../lib/utils';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="h-full bg-neutral-900 flex flex-col p-4">
      <div className="flex-1 flex flex-col justify-end items-end p-4 mb-4 bg-black/20 rounded-2xl border border-white/5">
        <div className="text-xs opacity-40 h-4">{equation}</div>
        <div className="text-4xl font-light tracking-tight truncate w-full text-right">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <button onClick={clear} className="aspect-square rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition-colors text-orange-400 font-bold">C</button>
        <button className="aspect-square rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition-colors text-blue-400 font-bold">+/-</button>
        <button className="aspect-square rounded-2xl bg-neutral-800 hover:bg-neutral-700 transition-colors text-blue-400 font-bold">%</button>
        <button onClick={() => handleOperator('/')} className="aspect-square rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors font-bold">÷</button>
        
        {[7, 8, 9].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-medium">{n}</button>
        ))}
        <button onClick={() => handleOperator('*')} className="aspect-square rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors font-bold">×</button>
        
        {[4, 5, 6].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-medium">{n}</button>
        ))}
        <button onClick={() => handleOperator('-')} className="aspect-square rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors font-bold">-</button>
        
        {[1, 2, 3].map(n => (
          <button key={n} onClick={() => handleNumber(String(n))} className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-medium">{n}</button>
        ))}
        <button onClick={() => handleOperator('+')} className="aspect-square rounded-2xl bg-blue-600 hover:bg-blue-500 transition-colors font-bold">+</button>
        
        <button onClick={() => handleNumber('0')} className="col-span-2 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-medium">0</button>
        <button onClick={() => handleNumber('.')} className="aspect-square rounded-2xl bg-white/5 hover:bg-white/10 transition-colors font-medium">.</button>
        <button onClick={calculate} className="aspect-square rounded-2xl bg-orange-600 hover:bg-orange-500 transition-colors font-bold">=</button>
      </div>
    </div>
  );
};
