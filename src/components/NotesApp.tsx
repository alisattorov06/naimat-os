import React, { useState } from 'react';
import { Save, Trash2, FileText, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export const NotesApp: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'NaimatOS Rejalari', content: '1. Dizaynni yaxshilash\n2. Yangi ilovalar qo\'shish\n3. Animatsiyalarni optimallashtirish', date: '2024-02-21' }
  ]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0].id);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const addNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Yangi qayd',
      content: '',
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (content: string) => {
    if (!activeNoteId) return;
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, content, title: content.split('\n')[0] || 'Sarlavhasiz' } : n));
  };

  const deleteNote = (id: string) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    if (activeNoteId === id) setActiveNoteId(newNotes[0]?.id || null);
  };

  return (
    <div className="flex h-full bg-neutral-900/50">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-white/5 flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h2 className="text-sm font-bold">Qaydlar</h2>
          <button onClick={addNote} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
          {notes.map(note => (
            <div
              key={note.id}
              onClick={() => setActiveNoteId(note.id)}
              className={cn(
                "p-3 rounded-xl cursor-pointer transition-all group",
                activeNoteId === note.id ? "bg-blue-600/20 border border-blue-500/30" : "hover:bg-white/5 border border-transparent"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={cn("text-xs font-semibold truncate pr-4", activeNoteId === note.id ? "text-blue-400" : "text-white/80")}>
                  {note.title}
                </h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <p className="text-[10px] opacity-40 truncate">{note.content || 'Matn yo\'q'}</p>
              <p className="text-[9px] opacity-30 mt-2">{note.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col">
        {activeNote ? (
          <textarea
            value={activeNote.content}
            onChange={(e) => updateNote(e.target.value)}
            placeholder="Bu yerga yozing..."
            className="flex-1 bg-transparent p-8 outline-none resize-none font-sans text-sm leading-relaxed text-white/90 placeholder:text-white/20"
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20 gap-4">
            <FileText size={48} />
            <p className="text-sm">Qayd tanlanmagan</p>
          </div>
        )}
      </div>
    </div>
  );
};
