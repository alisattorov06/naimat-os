import React, { useState } from 'react';
import { MessageCircle, Instagram, Youtube, Send, Heart, MessageSquare, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

type SocialPlatform = 'telegram' | 'instagram' | 'youtube';

export const SocialHub: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>('telegram');

  return (
    <div className="flex h-full bg-neutral-900 text-white overflow-hidden">
      {/* Platform Selector */}
      <div className="w-20 border-r border-white/5 bg-black/40 flex flex-col items-center py-6 gap-6">
        <button 
          onClick={() => setActivePlatform('telegram')}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
            activePlatform === 'telegram' ? "bg-blue-500 shadow-lg shadow-blue-500/20" : "bg-white/5 hover:bg-white/10"
          )}
        >
          <Send size={24} />
        </button>
        <button 
          onClick={() => setActivePlatform('instagram')}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
            activePlatform === 'instagram' ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 shadow-lg" : "bg-white/5 hover:bg-white/10"
          )}
        >
          <Instagram size={24} />
        </button>
        <button 
          onClick={() => setActivePlatform('youtube')}
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
            activePlatform === 'youtube' ? "bg-red-600 shadow-lg shadow-red-600/20" : "bg-white/5 hover:bg-white/10"
          )}
        >
          <Youtube size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {activePlatform === 'telegram' && (
          <div className="flex h-full">
            <div className="w-72 border-r border-white/5 bg-white/5 p-4 space-y-4">
              <h2 className="font-bold text-lg px-2">Telegram</h2>
              <div className="space-y-1">
                {['Dasturchilar', 'NaimatOS News', 'Oila', 'Do\'stlar'].map(chat => (
                  <div key={chat} className="p-3 rounded-xl hover:bg-white/5 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-400">
                      {chat[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{chat}</p>
                      <p className="text-[10px] opacity-40 truncate">Yangi xabar bor...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center opacity-20">
              <MessageCircle size={64} />
              <p className="mt-4 text-sm">Suhbatni tanlang</p>
            </div>
          </div>
        )}

        {activePlatform === 'instagram' && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 flex flex-col items-center">
            <div className="w-full max-w-md space-y-8">
              {[1, 2].map(post => (
                <div key={post} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-black border border-black" />
                    </div>
                    <span className="text-xs font-bold">naimatos_official</span>
                  </div>
                  <img src={`https://picsum.photos/seed/insta${post}/600/600`} className="w-full aspect-square object-cover" alt="post" />
                  <div className="p-4">
                    <div className="flex gap-4 mb-4">
                      <Heart size={20} className="hover:text-red-500 cursor-pointer" />
                      <MessageSquare size={20} className="hover:text-blue-400 cursor-pointer" />
                      <Share2 size={20} className="hover:text-green-400 cursor-pointer" />
                    </div>
                    <p className="text-xs font-bold mb-1">1,234 likes</p>
                    <p className="text-xs"><span className="font-bold">naimatos_official</span> Yangi operatsion tizim tayyor! 🚀 #NaimatOS #Future</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePlatform === 'youtube' && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-8">
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(video => (
                <div key={video} className="space-y-3 cursor-pointer group">
                  <div className="aspect-video rounded-2xl overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/yt${video}/400/225`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="thumb" />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold">12:34</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold line-clamp-2">NaimatOS: Kelajak operatsion tizimi qanday yaratildi?</h3>
                    <p className="text-[10px] opacity-40 mt-1">Naimat Tech • 1.2M ko'rishlar • 2 kun oldin</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
