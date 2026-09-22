import React from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  FastForward,
} from 'lucide-react';

interface Props {
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onSeek: (stepIndex: number) => void;
}

export const ExecutionControls: React.FC<Props> = ({
  currentStepIndex,
  totalSteps,
  isPlaying,
  speed,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
  onSeek,
}) => {
  const speeds = [0.25, 0.5, 1, 1.5, 2];

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800/90 rounded-2xl p-4 shadow-xl backdrop-blur-md flex flex-col gap-3">
      {/* Scrubber Progress Bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-slate-400 min-w-[55px]">
          Step {Math.min(currentStepIndex + 1, totalSteps)}/{totalSteps}
        </span>
        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStepIndex}
          onChange={(e) => onSeek(parseInt(e.target.value, 10))}
          className="flex-1 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 transition-all hover:bg-slate-700"
        />
        <span className="text-xs font-mono text-blue-400 font-bold min-w-[42px] text-right">
          {totalSteps > 0 ? Math.round(((currentStepIndex + 1) / totalSteps) * 100) : 0}%
        </span>
      </div>

      {/* Buttons and Speed Select */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            title="Reset to beginning"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onStepBackward}
            disabled={currentStepIndex <= 0}
            title="Previous Step"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:hover:scale-100 text-slate-300 border border-slate-700/60 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onPlayPause}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Play Auto</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            title="Next Step (Step Line-by-Line)"
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 disabled:opacity-40 disabled:hover:scale-100 text-slate-300 border border-slate-700/60 transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80 text-xs font-mono">
          <FastForward className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-1" />
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${
                speed === s
                  ? 'bg-blue-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
