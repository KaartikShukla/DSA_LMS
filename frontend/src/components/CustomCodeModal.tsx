import React, { useState } from 'react';
import { X, Play, Code2, AlertCircle } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoadTrace: (customCode: string, inputData: any) => void;
}

export const CustomCodeModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onLoadTrace,
}) => {
  const [code, setCode] = useState<string>(`// Write any JavaScript algorithm to trace line-by-line!
let arr = [15, 3, 29, 8, 42];
let target = 29;
let found = -1;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === target) {
    found = i;
    break;
  }
}
`);

  const [inputJson, setInputJson] = useState<string>(
    JSON.stringify({ target: 29 }, null, 2)
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleRun = async () => {
    setError(null);
    setLoading(true);
    try {
      let parsedInput = {};
      try {
        parsedInput = JSON.parse(inputJson);
      } catch (e) {
        throw new Error('Invalid JSON in Input Data field.');
      }

      onLoadTrace(code, parsedInput);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error tracing custom code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                Custom Code Sandbox & Line Tracer
              </h3>
              <p className="text-xs text-slate-400">
                Write custom code — our AST tracer will break it down into line-by-line steps.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-700 rounded-xl text-xs text-rose-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">
              JavaScript Algorithm Code
            </label>
            <div className="h-60 rounded-xl border border-slate-800 overflow-hidden">
              <Editor
                height="100%"
                language="javascript"
                theme="vs-dark"
                value={code}
                onChange={(v) => setCode(v || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-semibold text-slate-300 uppercase mb-2">
              Initial Input Payload (JSON)
            </label>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleRun}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{loading ? 'Analyzing AST...' : 'Trace & Execute'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
