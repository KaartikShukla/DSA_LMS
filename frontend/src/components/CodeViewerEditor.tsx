import React, { useEffect, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface Props {
  code: string;
  activeLineNumber: number;
  language?: string;
  isEditable?: boolean;
  onChange?: (val: string | undefined) => void;
  onRunCustomCode?: () => void;
}

export const CodeViewerEditor: React.FC<Props> = ({
  code,
  activeLineNumber,
  language = 'javascript',
  isEditable = false,
  onChange,
  onRunCustomCode,
}) => {
  const editorRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Initial decoration if activeLineNumber is set
    updateHighlight(editor, monaco, activeLineNumber);
  };

  const updateHighlight = (editor: any, monaco: any, line: number) => {
    if (!editor || !line || line < 1) return;

    decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
      {
        range: new monaco.Range(line, 1, line, 1),
        options: {
          isWholeLine: true,
          className: 'monaco-active-line-highlight',
          glyphMarginClassName: 'monaco-active-glyph',
          overviewRuler: {
            color: '#3b82f6',
            position: monaco.editor.OverviewRulerLane.Full,
          },
        },
      },
    ]);

    editor.revealLineInCenterIfOutsideViewport(line, monaco.editor.ScrollType.Smooth);
  };

  useEffect(() => {
    if (editorRef.current) {
      // Monaco is attached to window in this context
      const monaco = (window as any).monaco;
      if (monaco) {
        updateHighlight(editorRef.current, monaco, activeLineNumber);
      }
    }
  }, [activeLineNumber]);

  return (
    <div className="w-full h-full flex flex-col bg-[#1e1e1e] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Editor Tab Bar */}
      <div className="px-4 py-2.5 bg-[#181818] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-slate-300 font-medium">algorithm.js</span>
          {activeLineNumber > 0 && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50">
              Line {activeLineNumber}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditable && onRunCustomCode && (
            <button
              onClick={onRunCustomCode}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold font-mono flex items-center gap-1 shadow transition-all cursor-pointer"
            >
              ▶ Run & Trace
            </button>
          )}
          <span className="text-xs text-slate-400 font-mono">
            {isEditable ? 'Editable Sandbox' : 'Locked for Step Execution'}
          </span>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 w-full min-h-[300px]">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          options={{
            readOnly: !isEditable,
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 22,
            fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
            scrollBeyondLastLine: false,
            renderLineHighlight: 'none',
            glyphMargin: true,
            lineNumbers: 'on',
            folding: false,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
};
