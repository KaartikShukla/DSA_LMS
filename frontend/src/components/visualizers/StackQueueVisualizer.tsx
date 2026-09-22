import React from 'react';
import { VisualState } from '../../types/dsa';
import { ArrowDown, ArrowRight } from 'lucide-react';

interface Props {
  visualState: VisualState;
}

export const StackQueueVisualizer: React.FC<Props> = ({ visualState }) => {
  const isStack = visualState.type === 'stack';
  const data = Array.isArray(visualState.data) ? visualState.data : [];
  const pointers = visualState.pointers || {};
  const highlights = visualState.highlights || {};

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 select-none">
      {isStack ? (
        /* STACK VISUALIZER (Vertical Tube LIFO) */
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-slate-400">
            <ArrowDown className="w-4 h-4 text-blue-400 animate-bounce" />
            <span>TOP OF STACK (Push / Pop entry point)</span>
          </div>

          {/* Stack Container */}
          <div className="w-48 min-h-[220px] max-h-[300px] border-x-4 border-b-4 border-slate-700 rounded-b-2xl bg-slate-950/70 p-3 flex flex-col-reverse items-center gap-2 shadow-inner">
            {data.length === 0 ? (
              <div className="m-auto text-xs font-mono text-slate-600 italic">Stack is Empty</div>
            ) : (
              data.map((val: any, idx: number) => {
                const isTop = idx === data.length - 1;
                const status = highlights[idx];

                return (
                  <div
                    key={idx}
                    className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-mono font-bold transition-all duration-300 ${
                      status === 'active'
                        ? 'bg-blue-900/60 border-blue-500 text-blue-100 shadow-md shadow-blue-500/20 scale-105'
                        : status === 'comparing'
                        ? 'bg-amber-900/60 border-amber-500 text-amber-100 shadow-md shadow-amber-500/20 scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{val}</span>
                    {isTop && (
                      <span className="text-[10px] bg-blue-600 px-1.5 py-0.5 rounded text-white uppercase font-sans">
                        TOP
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <span className="mt-2 text-xs font-mono text-slate-500">LIFO: Last In, First Out</span>
        </div>
      ) : (
        /* QUEUE VISUALIZER (Horizontal Conveyor FIFO) */
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full max-w-lg mb-3 px-4 text-xs font-mono">
            <div className="flex items-center gap-1 text-emerald-400">
              <span>DEQUEUE (Front)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-1 text-blue-400">
              <ArrowRight className="w-3.5 h-3.5" />
              <span>ENQUEUE (Rear)</span>
            </div>
          </div>

          {/* Queue Conveyor Tube */}
          <div className="w-full max-w-lg min-h-[90px] border-y-4 border-slate-700 bg-slate-950/70 p-3 flex items-center gap-3 overflow-x-auto shadow-inner rounded-xl">
            {data.length === 0 ? (
              <div className="m-auto text-xs font-mono text-slate-600 italic">Queue is Empty</div>
            ) : (
              data.map((val: any, idx: number) => {
                const isFront = idx === 0;
                const isRear = idx === data.length - 1;
                const status = highlights[idx];

                return (
                  <div
                    key={idx}
                    className={`min-w-[64px] h-14 rounded-xl border flex flex-col items-center justify-center font-mono font-bold transition-all duration-300 ${
                      status === 'active'
                        ? 'bg-blue-900/60 border-blue-500 text-blue-100 shadow-md scale-105'
                        : status === 'comparing'
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-100 shadow-md scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{val}</span>
                    <div className="flex gap-1 mt-0.5">
                      {isFront && (
                        <span className="text-[9px] bg-emerald-700 px-1 rounded text-white uppercase">
                          FRONT
                        </span>
                      )}
                      {isRear && !isFront && (
                        <span className="text-[9px] bg-blue-700 px-1 rounded text-white uppercase">
                          REAR
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <span className="mt-3 text-xs font-mono text-slate-500">FIFO: First In, First Out</span>
        </div>
      )}
    </div>
  );
};
