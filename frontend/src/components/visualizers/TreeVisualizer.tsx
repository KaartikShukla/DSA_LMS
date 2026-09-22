import React from 'react';
import { VisualState } from '../../types/dsa';

interface Props {
  visualState: VisualState;
}

export const TreeVisualizer: React.FC<Props> = ({ visualState }) => {
  const treeNodes = visualState.data || {};
  const highlights = visualState.highlights || {};
  const pointers = visualState.pointers || {};

  const nodesList = Object.values(treeNodes) as any[];

  const getNodeFill = (id: string) => {
    const status = highlights[id];
    if (status === 'found') return { circle: '#065f46', border: '#10b981', text: '#d1fae5' };
    if (status === 'comparing') return { circle: '#78350f', border: '#f59e0b', text: '#fef3c7' };
    if (status === 'visited') return { circle: '#1e293b', border: '#64748b', text: '#94a3b8' };
    if (status === 'active') return { circle: '#1e3a8a', border: '#3b82f6', text: '#dbeafe' };
    return { circle: '#0f172a', border: '#334155', text: '#e2e8f0' };
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-xl bg-slate-950/60 rounded-2xl p-4 border border-slate-800 shadow-inner flex justify-center">
        <svg viewBox="0 0 500 280" className="w-full h-auto max-h-[360px]">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Edges */}
          {nodesList.map((node) => {
            const leftChild = node.leftId ? treeNodes[node.leftId] : null;
            const rightChild = node.rightId ? treeNodes[node.rightId] : null;

            return (
              <g key={`edges-${node.id}`}>
                {leftChild && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={leftChild.x}
                    y2={leftChild.y}
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="none"
                  />
                )}
                {rightChild && (
                  <line
                    x1={node.x}
                    y1={node.y}
                    x2={rightChild.x}
                    y2={rightChild.y}
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeDasharray="none"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodesList.map((node) => {
            const colors = getNodeFill(node.id);
            const isCurr = pointers.curr === node.id;

            return (
              <g key={`node-${node.id}`} className="transition-all duration-300">
                {/* Active Glow Ring */}
                {isCurr && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="28"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="animate-ping opacity-50"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="22"
                  fill={colors.circle}
                  stroke={colors.border}
                  strokeWidth="3"
                  filter={isCurr ? 'url(#glow)' : undefined}
                />

                {/* Node Value */}
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.val}
                </text>

                {/* Pointer Tag */}
                {isCurr && (
                  <g>
                    <rect
                      x={node.x - 22}
                      y={node.y - 42}
                      width="44"
                      height="18"
                      rx="9"
                      fill="#2563eb"
                    />
                    <text
                      x={node.x}
                      y={node.y - 29}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      CURR
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Visual Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
          <span>Current Active Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span>Comparing Target</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-slate-600 inline-block"></span>
          <span>Visited Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span>Target Found</span>
        </div>
      </div>
    </div>
  );
};
