import React from 'react';
import { Module, Lesson } from '../types/dsa';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';

interface Props {
  modules: Module[];
  onSelectLesson: (lesson: Lesson) => void;
  completedLessons: string[];
}

export const DashboardPage: React.FC<Props> = ({
  modules,
  onSelectLesson,
  completedLessons,
}) => {
  const allLessons = modules.flatMap((m) => m.lessons || []);
  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="w-full flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto gap-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Data Structures & Algorithms Platform</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Visualize code execution <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              line by line.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            Stop imagining pointers and memory allocations. Watch algorithms run step-by-step
            with plain-English explanations for every single line of code.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {allLessons[0] && (
              <button
                onClick={() => onSelectLesson(allLessons[0])}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Start Learning: {allLessons[0].title}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Curriculum Mastery</h3>
            <p className="text-xs text-slate-400">
              {completedCount} of {totalLessons} Algorithms & Data Structures Mastered
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 min-w-[200px] flex-1 sm:flex-initial">
          <div className="flex-1 sm:w-48 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
          <span className="font-mono font-bold text-sm text-blue-400">{progressPct}%</span>
        </div>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-100 font-mono flex items-center gap-2">
          <span>Curriculum Modules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod._id || mod.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                    Module {mod.order || 1}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {(mod.lessons || []).length} lessons
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                  {mod.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
                {(mod.lessons || []).map((l: any) => {
                  const isDone = completedLessons.includes(l.id || l.slug || l._id);

                  return (
                    <button
                      key={l.id || l.slug}
                      onClick={() => onSelectLesson(l)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/70 text-left text-xs flex items-center justify-between transition-all cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        )}
                        <span className="text-slate-200 group-hover/item:text-white truncate">
                          {l.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-blue-400 transition-colors shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
