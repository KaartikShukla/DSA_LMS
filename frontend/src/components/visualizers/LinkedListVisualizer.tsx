import React from 'react';
import { VisualState } from '../../types/dsa';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  visualState: VisualState;
}

export const LinkedListVisualizer: React.FC<Props> = ({ visualState }) => {
  const nodes = Array.isArray(visualState.data) ? visualState.data : [];
  const pointers = visualState.pointers || {};
  const highlights = visualState.highlights || {};

  // Group pointers by node ID
  const pointersByNode: Record<string, string[]> = {};
  for (const [name, targetId] of Object.entries(pointers)) {
    if (targetId) {
      if (!pointersByNode[targetId]) pointersByNode[targetId] = [];
      pointersByNode[targetId].push(name);
    }
  }

  const getPointerBadgeColor = (name: string) => {
    switch (name) {
      case 'curr':
        return 'bg-blue-600 text-white';
      case 'prev':
        return 'bg-purple-600 text-white';
      case 'next':
        return 'bg-amber-500 text-black';
      case 'head':
      case 'newHead':
        return 'bg-emerald-600 text-white';
      default:
        return 'bg-indigo-600 text-white';
    }
  };

  const getNodeStyle = (id: string) => {
    const status = highlights[id];
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
    return 'bg-slate-900 border-slate-700 text-slate-200';
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 select-none overflow-x-auto">
      {/* Null pointer for initial prev */}
      <div className="flex items-center gap-3 min-w-max pb-6">
        {pointers.prev === null && (
          <div className="flex flex-col items-center">
            <div className="h-8 flex items-center mb-1">
              <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-purple-600 text-white uppercase shadow-md">
                prev
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-xs font-mono text-slate-500">
              NULL
            </div>
          </div>
        )}

        {nodes.map((node: any, idx: number) => {
          const ptNames = pointersByNode[node.id] || [];
          // Determine if arrow points backwards
          const pointsBackwards =
            node.nextId && parseInt(node.nextId.replace('node_', '')) < idx;

          return (
            <React.Fragment key={node.id}>
              <div className="flex flex-col items-center relative transition-all duration-300">
                {/* Pointer Badges */}
                <div className="h-8 flex items-center justify-center gap-1 mb-1">
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

                {/* Node Box */}
                <div
                  className={`w-20 h-16 rounded-xl border-2 flex items-center shadow-md transition-all duration-300 ${getNodeStyle(
                    node.id
                  )}`}
                >
                  <div className="w-11 h-full flex items-center justify-center border-r border-slate-700/60 font-mono font-bold text-lg">
                    {node.val}
                  </div>
                  <div className="flex-1 h-full flex items-center justify-center text-[11px] font-mono text-slate-400 bg-black/20 rounded-r-xl">
                    next
                  </div>
                </div>

                <span className="mt-1 text-[11px] font-mono text-slate-500">node_{idx}</span>
              </div>

              {/* Arrow Connector */}
              <div className="flex flex-col items-center justify-center px-1 text-slate-400">
                {pointsBackwards ? (
                  <div className="flex items-center text-purple-400 animate-pulse">
                    <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="flex items-center text-cyan-400">
                    <ArrowRight className="w-6 h-6 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}

        {/* Terminal NULL */}
        <div className="flex flex-col items-center">
          <div className="h-8 mb-1"></div>
          <div className="w-14 h-14 rounded-xl border border-dashed border-slate-600 flex items-center justify-center text-xs font-mono text-slate-500">
            NULL
          </div>
        </div>
      </div>

      {/* Visual Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
          <span>curr (Current Node)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span>
          <span>prev (Previous Node)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span>next (Saved Reference)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4 text-purple-400 inline-block" />
          <span>Reversed Pointer</span>
        </div>
      </div>
    </div>
  );
};
