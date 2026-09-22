import React, { useState } from 'react';
import {
  Tv,
  X,
  Maximize2,
  Minimize2,
  Highlighter,
  MessageSquare,
} from 'lucide-react';

interface Props {
  isActive: boolean;
  onClose: () => void;
}

export const PresentationToolbar: React.FC<Props> = ({ isActive, onClose }) => {
  const [laserActive, setLaserActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [teacherNote, setTeacherNote] = useState<string>(
    'Tip for Students: Pay close attention to how mid is recalculated on each step!'
  );
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!isActive) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="w-full bg-amber-950/80 border-b border-amber-600/50 px-6 py-2 flex flex-wrap items-center justify-between gap-4 text-amber-200 text-xs font-mono backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
        <Tv className="w-4 h-4 text-amber-400" />
        <span className="font-bold uppercase tracking-wider text-amber-100">
          CLASSROOM PRESENTATION MODE ACTIVE
        </span>
      </div>

      {/* Classroom Banner Note */}
      <div className="flex-1 max-w-xl mx-2 bg-amber-900/40 border border-amber-500/40 px-3 py-1 rounded-lg text-amber-100 truncate">
        {teacherNote}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowNoteInput(!showNoteInput)}
          className="p-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40 flex items-center gap-1 cursor-pointer"
          title="Edit Teacher Chalkboard Note"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Note</span>
        </button>

        <button
          onClick={() => setLaserActive(!laserActive)}
          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 cursor-pointer ${
            laserActive
              ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/40'
              : 'bg-amber-900/60 hover:bg-amber-800 text-amber-200 border-amber-600/40'
          }`}
          title="Toggle Red Laser Pointer Highlight"
        >
          <Highlighter className="w-3.5 h-3.5" />
          <span>{laserActive ? 'Laser ON' : 'Laser'}</span>
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40 cursor-pointer"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-amber-900/60 hover:bg-amber-800 text-amber-200 border border-amber-600/40 cursor-pointer"
          title="Exit Teaching Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {showNoteInput && (
        <div className="w-full mt-1 flex items-center gap-2">
          <input
            type="text"
            value={teacherNote}
            onChange={(e) => setTeacherNote(e.target.value)}
            placeholder="Type teacher chalkboard notice for the class..."
            className="flex-1 bg-black/40 border border-amber-500/50 rounded-lg px-3 py-1 text-xs text-amber-100 focus:outline-none"
          />
          <button
            onClick={() => setShowNoteInput(false)}
            className="px-2 py-1 bg-amber-600 text-white rounded-lg text-xs"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};
