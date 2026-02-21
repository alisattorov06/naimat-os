import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, List, Heart, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

const SONGS: Song[] = [
  { id: '1', title: 'Uzbekistan My Home', artist: 'Naimat Artist', duration: '3:45', cover: 'https://picsum.photos/seed/music1/200/200' },
  { id: '2', title: 'Futuristic Vibes', artist: 'Cyber Synth', duration: '4:20', cover: 'https://picsum.photos/seed/music2/200/200' },
  { id: '3', title: 'Midnight City', artist: 'Neon Dreamer', duration: '2:55', cover: 'https://picsum.photos/seed/music3/200/200' },
  { id: '4', title: 'Silk Road Journey', artist: 'Ethno Beats', duration: '5:10', cover: 'https://picsum.photos/seed/music4/200/200' },
];

export const MusicPlayer: React.FC = () => {
  const [currentSong, setCurrentSong] = useState(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex h-full bg-neutral-900 text-white">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/5 bg-black/20 p-4 flex flex-col gap-6">
        <div className="flex items-center gap-2 text-blue-400">
          <Music size={20} />
          <span className="font-bold text-sm">Musiqa</span>
        </div>
        <nav className="space-y-2">
          <div className="flex items-center gap-3 text-xs font-medium p-2 bg-white/5 rounded-lg cursor-pointer">
            <List size={14} /> Kutubxona
          </div>
          <div className="flex items-center gap-3 text-xs font-medium p-2 hover:bg-white/5 rounded-lg cursor-pointer opacity-60">
            <Heart size={14} /> Sevimlilar
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-2xl mb-8 relative group">
            <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform"
              >
                {isPlaying ? <Pause fill="white" /> : <Play fill="white" className="ml-1" />}
              </button>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{currentSong.title}</h2>
          <p className="text-sm opacity-60 mb-8">{currentSong.artist}</p>

          <div className="w-full max-w-md space-y-4">
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-1/3" />
            </div>
            <div className="flex justify-between text-[10px] opacity-40">
              <span>1:12</span>
              <span>{currentSong.duration}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="h-24 border-t border-white/5 bg-black/40 backdrop-blur-xl flex items-center justify-between px-8">
          <div className="flex items-center gap-4 w-1/3">
            <img src={currentSong.cover} className="w-12 h-12 rounded-lg" alt="mini cover" />
            <div>
              <p className="text-xs font-bold">{currentSong.title}</p>
              <p className="text-[10px] opacity-40">{currentSong.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <SkipBack size={20} className="opacity-60 hover:opacity-100 cursor-pointer" />
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
            </button>
            <SkipForward size={20} className="opacity-60 hover:opacity-100 cursor-pointer" />
          </div>

          <div className="flex items-center gap-3 w-1/3 justify-end">
            <Volume2 size={16} className="opacity-40" />
            <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-white/60 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
