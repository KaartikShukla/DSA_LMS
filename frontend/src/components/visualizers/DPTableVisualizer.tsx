import React from 'react';
import { VisualState } from '../../types/dsa';

interface Props {
  visualState: VisualState;
}

export const DPTableVisualizer: React.FC<Props> = ({ visualState }) => {
  const data = Array.isArray(visualState.data) ? visualState.data : [];
  const pointers = visualState.pointers || {};
  const highlights = visualState.highlights || {};

  const getCellStyle = (idx: number) => {
    const status = highlights[idx];
    if (status === 'found') {
      return 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/20 scale-105';
    }
    if (status === 'swapped') {
      return 'bg-purple-950 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/20 scale-105';
    }
    if (status === 'comparing') {
      return 'bg-amber-950 border-amber-500 text-amber-200';
    }
    if (status === 'sorted') {
      return 'bg-teal-950/70 border-teal-600 text-teal-300';
    }
    if (status === 'active') {
      return 'bg-blue-950 border-blue-500 text-blue-200 scale-102';
    }
    return 'bg-slate-900 border-slate-700 text-slate-400';
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 select-none">
      <div className="mb-4 text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800">
        Recurrence Relation: <span className="text-purple-400 font-bold">dp[i] = dp[i-1] + dp[i-2]</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 max-w-full pb-6">
        {data.map((val: any, idx: number) => {
          const isCurrent = pointers.current === idx;
          const isDependency1 = pointers['i-1'] === idx;
          const isDependency2 = pointers['i-2'] === idx;

          return (
            <div key={idx} className="flex flex-col items-center transition-all duration-300">
              {/* Pointer Badge */}
              <div className="h-7 flex items-center justify-center mb-1">
                {isCurrent && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-purple-600 text-white font-bold animate-bounce">
                    dp[{idx}]
                  </span>
                )}
                {isDependency1 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-amber-600 text-white">
                    i-1
                  </span>
                )}
                {isDependency2 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-amber-700 text-white">
                    i-2
                  </span>
                )}
              </div>

              {/* Cell */}
              <div
                className={`w-14 h-16 sm:w-16 sm:h-18 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-lg transition-all duration-300 ${getCellStyle(
                  idx
                )}`}
              >
                <span>{val !== null ? val : '—'}</span>
              </div>

              {/* Index */}
              <span className="mt-1 text-xs font-mono text-slate-500">i = {idx}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-teal-500 inline-block"></span>
          <span>Base Cases (i=0, 1)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span>Subproblem Dependencies (i-1, i-2)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
          <span>Active Cell Computing</span>
        </div>
      </div>
    </div>
  );
};
