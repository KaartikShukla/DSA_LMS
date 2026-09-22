import React from 'react';
import { VisualState } from '../../types/dsa';

interface Props {
  visualState: VisualState;
}

export const GraphVisualizer: React.FC<Props> = ({ visualState }) => {
  const graphData = visualState.data || { nodes: [], edges: [] };
  const highlights = visualState.highlights || {};
  const pointers = visualState.pointers || {};
  const auxiliary = visualState.auxiliary || { queue: [], visited: [], order: [] };

  const getNodeFill = (id: string) => {
    const status = highlights[id];
    if (status === 'found') return { circle: '#065f46', border: '#10b981', text: '#d1fae5' };
    if (status === 'comparing') return { circle: '#78350f', border: '#f59e0b', text: '#fef3c7' };
    if (status === 'visited') return { circle: '#1e293b', border: '#64748b', text: '#94a3b8' };
    if (status === 'active') return { circle: '#1e3a8a', border: '#3b82f6', text: '#dbeafe' };
    return { circle: '#0f172a', border: '#334155', text: '#e2e8f0' };
  };

  const nodeMap = Object.fromEntries((graphData.nodes || []).map((n: any) => [n.id, n]));

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 select-none">
      {/* Auxiliary State Badges: Queue & Visited */}
      <div className="w-full max-w-xl flex flex-wrap items-center justify-between gap-4 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow">
          <span className="text-slate-400 font-bold uppercase">Frontier Queue:</span>
          <div className="flex items-center gap-1">
            {(auxiliary.queue || []).length === 0 ? (
              <span className="text-slate-500 italic">Empty</span>
            ) : (
              (auxiliary.queue || []).map((item: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-blue-600/30 border border-blue-500/50 text-blue-300 rounded-md font-bold"
                >
                  {item}
                </span>
              ))
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow">
          <span className="text-slate-400 font-bold uppercase">Visited Set:</span>
          <div className="flex items-center gap-1">
            {(auxiliary.visited || []).map((item: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-md"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full max-w-xl bg-slate-950/60 rounded-2xl p-4 border border-slate-800 shadow-inner flex justify-center">
        <svg viewBox="0 0 500 280" className="w-full h-auto max-h-[340px]">
          {/* Edges */}
          {(graphData.edges || []).map(([src, dst]: [string, string], idx: number) => {
            const srcNode = nodeMap[src];
            const dstNode = nodeMap[dst];
            if (!srcNode || !dstNode) return null;

            return (
              <line
                key={`edge-${idx}`}
                x1={srcNode.x}
                y1={srcNode.y}
                x2={dstNode.x}
                y2={dstNode.y}
                stroke="#334155"
                strokeWidth="2.5"
              />
            );
          })}

          {/* Nodes */}
          {(graphData.nodes || []).map((node: any) => {
            const colors = getNodeFill(node.id);
            const isCurrent = pointers.current === node.id;

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                {isCurrent && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="26"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="animate-ping opacity-60"
                  />
                )}

                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={colors.circle}
                  stroke={colors.border}
                  strokeWidth="3"
                />

                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize="15"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>

                {isCurrent && (
                  <g>
                    <rect
                      x={node.x - 22}
                      y={node.y - 38}
                      width="44"
                      height="16"
                      rx="8"
                      fill="#2563eb"
                    />
                    <text
                      x={node.x}
                      y={node.y - 26}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      ACTIVE
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Order Bar */}
      {auxiliary.order && auxiliary.order.length > 0 && (
        <div className="mt-4 flex items-center gap-2 text-xs font-mono bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800">
          <span className="text-slate-400 font-bold uppercase">Order:</span>
          <span className="text-emerald-400 font-bold">{auxiliary.order.join('  ->  ')}</span>
        </div>
      )}
    </div>
  );
};
