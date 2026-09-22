import React from 'react';
import { Eye, Layers } from 'lucide-react';

interface Props {
  variables: Record<string, any>;
  callStack: string[];
}

export const VariableWatchPanel: React.FC<Props> = ({ variables, callStack }) => {
  const varEntries = Object.entries(variables || {});

  const renderValue = (val: any) => {
    if (val === null) return <span className="text-rose-400 font-bold">null</span>;
    if (val === undefined) return <span className="text-slate-500 italic">undefined</span>;
    if (typeof val === 'boolean') return <span className="text-amber-400 font-bold">{val ? 'true' : 'false'}</span>;
    if (typeof val === 'number') return <span className="text-emerald-400 font-bold">{val}</span>;
    if (typeof val === 'string') return <span className="text-sky-300 font-bold">"{val}"</span>;
    if (Array.isArray(val)) return <span className="text-purple-300">[{val.slice(0, 8).join(', ')}{val.length > 8 ? '...' : ''}]</span>;
    return <span className="text-slate-300">{JSON.stringify(val)}</span>;
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Scope Variables Watch */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col">
        <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-800 text-xs font-mono font-bold text-slate-300">
          <Eye className="w-3.5 h-3.5 text-blue-400" />
          <span>SCOPE WATCH VARIABLES ({varEntries.length})</span>
        </div>

        <div className="flex-1 overflow-auto max-h-[160px] flex flex-col gap-1.5 font-mono text-xs">
          {varEntries.length === 0 ? (
            <div className="text-slate-500 italic py-2">No variables currently in active scope.</div>
          ) : (
            varEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700"
              >
                <span className="text-slate-400 font-medium">{key}:</span>
                <div>{renderValue(value)}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Call Stack */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col">
        <div className="flex items-center gap-2 pb-2.5 mb-2.5 border-b border-slate-800 text-xs font-mono font-bold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-purple-400" />
          <span>CALL STACK ({callStack.length})</span>
        </div>

        <div className="flex-1 overflow-auto max-h-[160px] flex flex-col-reverse gap-1.5 font-mono text-xs">
          {callStack.length === 0 ? (
            <div className="text-slate-500 italic py-2">Call stack empty.</div>
          ) : (
            callStack.map((frame, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-purple-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                <span className="truncate">{frame}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
