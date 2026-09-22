import React from 'react';
import { VisualState } from '../../types/dsa';

interface Props {
  visualState: VisualState;
}

export const ArrayVisualizer: React.FC<Props> = ({ visualState }) => {
  const data = Array.isArray(visualState.data) ? visualState.data : [];
  const pointers = visualState.pointers || {};
  const highlights = visualState.highlights || {};

  // Group pointers by index
  const pointersByIndex: Record<number, string[]> = {};
  for (const [name, idx] of Object.entries(pointers)) {
    if (typeof idx === 'number' && idx >= 0 && idx < data.length) {
      if (!pointersByIndex[idx]) pointersByIndex[idx] = [];
      pointersByIndex[idx].push(name);
    }
  }

  const getCardStyle = (idx: number) => {
    const status = highlights[idx];
    if (status === 'found') {
      return 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20 scale-105';
    }
    if (status === 'comparing') {
      return 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/20 scale-105';
    }
    if (status === 'swapped') {
      return 'bg-purple-950/80 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/20 scale-105';
    }
    if (status === 'sorted') {
      return 'bg-teal-950/50 border-teal-500/60 text-teal-300';
    }
    if (status === 'active') {
      return 'bg-blue-950/80 border-blue-500 text-blue-200 shadow-lg shadow-blue-500/20 scale-102';
    }
    return 'bg-slate-900/90 border-slate-700/80 text-slate-200 hover:border-slate-500';
  };

  const getPointerBadgeColor = (name: string) => {
    switch (name) {
      case 'low':
        return 'bg-blue-600 text-white';
      case 'high':
        return 'bg-rose-600 text-white';
      case 'mid':
        return 'bg-amber-500 text-black font-semibold';
      case 'i':
        return 'bg-cyan-600 text-white';
      case 'j':
      case 'j+1':
        return 'bg-purple-600 text-white';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 select-none">
      <div className="flex flex-wrap items-end justify-center gap-3 max-w-full pb-8">
        {data.map((val: any, idx: number) => {
          const ptNames = pointersByIndex[idx] || [];

          return (
            <div key={idx} className="flex flex-col items-center relative transition-all duration-300">
              {/* Pointer Badges on Top */}
              <div className="h-10 flex items-center justify-center gap-1 mb-2">
                {ptNames.map((name) => (
                  <span
                    key={name}
                    className={`px-2 py-0.5 text-xs font-mono rounded-full uppercase shadow-md transition-transform animate-bounce ${getPointerBadgeColor(
                      name
                    )}`}
                  >
                    {name}
                  </span>
                ))}
              </div>

              {/* Element Box */}
              <div
                className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 font-mono font-bold text-xl ${getCardStyle(
                  idx
                )}`}
              >
                <span>{val}</span>
              </div>

              {/* Index label */}
              <span className="mt-2 text-xs font-mono text-slate-400">[{idx}]</span>
            </div>
          );
        })}
      </div>

      {/* Visual Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
          <span>Active Boundary</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span>Comparing / Mid</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
          <span>Swapping</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span>Target / Sorted</span>
        </div>
      </div>
    </div>
  );
};
