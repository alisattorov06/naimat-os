import React, { useState, useRef, useEffect } from 'react';

export const TerminalApp: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'NaimatOS Terminal v1.0.0',
    'Tizimga xush kelibsiz. Yordam uchun "help" deb yozing.',
    ''
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => string> = {
    help: () => 'Mavjud buyruqlar: help, clear, date, whoami, echo [matn], version, ls, neofetch',
    clear: () => { setHistory([]); return ''; },
    date: () => new Date().toLocaleString(),
    whoami: () => 'naimatos_user',
    version: () => 'NaimatOS 1.0.0 (Build 2024.02.21)',
    ls: () => 'Hujjatlar  Rasmlar  Yuklanmalar  Ilovalar  Tizim',
    neofetch: () => `
   .--.      OS: NaimatOS
  |o_o |     Kernel: WebKit-based
  |:_/ |     Uptime: 12m
 //   \\ \\    Packages: 42 (npm)
(|     | )   Shell: zsh 5.9
/'\\_   _/ \`\\  Resolution: 1920x1080
\\___)=(___/  Memory: 2048MiB / 8192MiB
    `,
  };

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const [base, ...args] = cmd.split(' ');
      
      let output = '';
      if (base === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (base === 'echo') {
        output = args.join(' ');
      } else if (commands[base]) {
        output = commands[base]();
      } else if (cmd !== '') {
        output = `Buyruq topilmadi: ${base}`;
      }

      setHistory(prev => [...prev, `naimatos@user:~$ ${input}`, output].filter(l => l !== ''));
      setInput('');
    }
  };

  return (
    <div 
      ref={scrollRef}
      className="h-full bg-black/90 p-4 font-mono text-sm text-green-500 overflow-y-auto no-scrollbar"
      onClick={() => document.getElementById('terminal-input')?.focus()}
    >
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
      ))}
      <div className="flex gap-2">
        <span className="text-blue-400">naimatos@user:~$</span>
        <input
          id="terminal-input"
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-green-500"
        />
      </div>
    </div>
  );
};
