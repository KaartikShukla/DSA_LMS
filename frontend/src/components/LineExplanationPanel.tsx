import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, Lightbulb, Code2 } from 'lucide-react';
import { ExecutionStep } from '../types/dsa';

interface Props {
  currentStep: ExecutionStep | null;
  totalSteps: number;
}

export const LineExplanationPanel: React.FC<Props> = ({ currentStep, totalSteps }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!currentStep) {
    return (
      <div className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-5 text-center text-slate-500 font-mono text-sm">
        Start playback or step forward to inspect line explanations.
      </div>
    );
  }

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `Line ${currentStep.lineNumber}. ${currentStep.explanation}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/30 border border-slate-700/80 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
      {/* Glow highlight */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-mono">
              Line {currentStep.lineNumber} Explanation
              <span className="text-xs font-normal text-slate-400 font-sans">
                (Step {currentStep.stepIndex + 1} of {totalSteps})
              </span>
            </h4>
          </div>
        </div>

        <button
          onClick={handleSpeak}
          title={isSpeaking ? 'Mute teacher voice' : 'Listen to teacher explanation'}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
            isSpeaking
              ? 'bg-blue-600 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
        >
          {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          <span>{isSpeaking ? 'Speaking...' : 'Listen'}</span>
        </button>
      </div>

      {/* Active Code Snippet Banner */}
      <div className="mb-3 bg-slate-950/80 rounded-xl px-3.5 py-2.5 border border-slate-800/90 flex items-center gap-3 font-mono text-xs text-blue-300">
        <Code2 className="w-4 h-4 text-slate-500 shrink-0" />
        <span className="text-slate-500">L{currentStep.lineNumber}:</span>
        <code className="font-semibold text-sky-200 truncate">{currentStep.codeSnippet}</code>
      </div>

      {/* Deep Educational Explanation */}
      <div className="flex items-start gap-3 mt-2">
        <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <p className="text-sm leading-relaxed text-slate-200 font-normal">
          {currentStep.explanation}
        </p>
      </div>
    </div>
  );
};
