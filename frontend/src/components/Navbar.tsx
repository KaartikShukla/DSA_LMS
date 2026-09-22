import React from 'react';
import {
  Code,
  Tv,
  Terminal,
  UserCheck,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { Lesson, Module, User } from '../types/dsa';

interface Props {
  modules: Module[];
  selectedLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
  isTeachingMode: boolean;
  onToggleTeachingMode: () => void;
  onOpenSandbox: () => void;
  currentUser: User | null;
  onDemoLogin: (role: 'student' | 'instructor') => void;
  completedCount: number;
  totalLessons: number;
}

export const Navbar: React.FC<Props> = ({
  modules,
  selectedLesson,
  onSelectLesson,
  isTeachingMode,
  onToggleTeachingMode,
  onOpenSandbox,
  currentUser,
  onDemoLogin,
  completedCount,
  totalLessons,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <nav className="w-full bg-slate-950/80 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg text-slate-100 font-mono tracking-tight flex items-center gap-1.5">
              Algo<span className="text-blue-500">Pulse</span>
              <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/50">
                DSA LMS
              </span>
            </span>
          </div>
        </div>

        {/* Topic Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs sm:text-sm font-medium text-slate-200 transition-all cursor-pointer"
          >
            <span className="max-w-[140px] sm:max-w-[220px] truncate">
              {selectedLesson ? selectedLesson.title : 'Select Algorithm'}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 sm:w-80 max-h-[460px] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50">
              {modules.map((mod) => (
                <div key={mod._id || mod.id} className="mb-2">
                  <div className="px-3 py-1.5 text-[11px] font-mono font-bold uppercase text-slate-400 bg-slate-950/60 rounded-lg">
                    {mod.title}
                  </div>
                  <div className="mt-1 space-y-0.5">
                    {(mod.lessons || []).map((l: any) => {
                      const isSelected = selectedLesson?.slug === l.slug;
                      return (
                        <button
                          key={l.id || l.slug}
                          onClick={() => {
                            onSelectLesson(l);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-600 text-white font-semibold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{l.title}</span>
                          <span className="text-[10px] opacity-75 uppercase font-mono">
                            {l.difficulty}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Progress Tracker */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {completedCount}/{totalLessons} Learned
            </span>
          </div>

          {/* Sandbox / Custom Code button */}
          <button
            onClick={onOpenSandbox}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Open Custom Code Sandbox"
          >
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Custom Code</span>
          </button>

          {/* Teaching Mode Toggle */}
          <button
            onClick={onToggleTeachingMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
              isTeachingMode
                ? 'bg-amber-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-200'
            }`}
            title="Presentation / Classroom Mode"
          >
            <Tv className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Teaching Mode</span>
          </button>

          {/* User / Demo Role Switcher */}
          <div className="flex items-center gap-1">
            {currentUser ? (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs font-mono text-blue-300">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">{currentUser.name}</span>
                <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-sans uppercase">
                  {currentUser.role}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onDemoLogin('instructor')}
                  className="px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 border border-indigo-700/50 text-xs font-mono cursor-pointer"
                  title="Log in as Teacher"
                >
                  Demo Teacher
                </button>
                <button
                  onClick={() => onDemoLogin('student')}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-mono cursor-pointer"
                  title="Log in as Student"
                >
                  Student
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
