import React from 'react';
import { VisualState } from '../../types/dsa';
import { ArrayVisualizer } from './ArrayVisualizer';
import { LinkedListVisualizer } from './LinkedListVisualizer';
import { TreeVisualizer } from './TreeVisualizer';
import { GraphVisualizer } from './GraphVisualizer';
import { StackQueueVisualizer } from './StackQueueVisualizer';
import { DPTableVisualizer } from './DPTableVisualizer';

interface Props {
  visualState: VisualState;
  title?: string;
}

export const VisualizerCanvas: React.FC<Props> = ({ visualState, title }) => {
  const renderVisualizer = () => {
    switch (visualState?.type) {
      case 'array':
        return <ArrayVisualizer visualState={visualState} />;
      case 'linked_list':
        return <LinkedListVisualizer visualState={visualState} />;
      case 'tree':
        return <TreeVisualizer visualState={visualState} />;
      case 'graph':
        return <GraphVisualizer visualState={visualState} />;
      case 'stack':
      case 'queue':
        return <StackQueueVisualizer visualState={visualState} />;
      case 'dp_table':
        return <DPTableVisualizer visualState={visualState} />;
      default:
        if (Array.isArray(visualState?.data)) {
          return <ArrayVisualizer visualState={visualState} />;
        }
        return (
          <div className="flex flex-col items-center justify-center p-8 text-slate-400">
            <p className="font-mono text-sm">Visual state snapshot active</p>
            {visualState?.pointers && (
              <pre className="mt-4 p-4 bg-slate-900 rounded-xl text-xs font-mono border border-slate-800 text-slate-300">
                {JSON.stringify(visualState.pointers, null, 2)}
              </pre>
            )}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900/40 rounded-2xl border border-slate-800/80 backdrop-blur-sm overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
            {title || 'Interactive Memory & Canvas Visualizer'}
          </h3>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 bg-slate-800/80 rounded-md text-slate-400 border border-slate-700/50">
          Type: {visualState?.type || 'Data Structure'}
        </span>
      </div>

      {/* Visual Canvas Area */}
      <div className="flex-1 flex items-center justify-center min-h-[340px] p-4 bg-gradient-to-b from-slate-950/30 via-slate-900/10 to-slate-950/40 overflow-auto">
        {renderVisualizer()}
      </div>
    </div>
  );
};
