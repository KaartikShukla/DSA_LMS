import React, { useState, useEffect, useRef } from 'react';
import { Lesson, ExecutionStep } from '../types/dsa';
import { getExecutionSteps } from '../engine';
import { VisualizerCanvas } from '../components/visualizers/VisualizerCanvas';
import { CodeViewerEditor } from '../components/CodeViewerEditor';
import { ExecutionControls } from '../components/ExecutionControls';
import { LineExplanationPanel } from '../components/LineExplanationPanel';
import { VariableWatchPanel } from '../components/VariableWatchPanel';
import { LessonTheoryPanel } from '../components/LessonTheoryPanel';

interface Props {
  lesson: Lesson;
  isTeachingMode: boolean;
  isCompleted: boolean;
  onToggleComplete: () => void;
  customCodeOverride?: string | null;
  customInputOverride?: any;
}

export const VisualizerPage: React.FC<Props> = ({
  lesson,
  isTeachingMode,
  isCompleted,
  onToggleComplete,
  customCodeOverride,
  customInputOverride,
}) => {
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [loadingSteps, setLoadingSteps] = useState<boolean>(true);

  // Editable code state
  const [editorCode, setEditorCode] = useState<string>(lesson.codeSnippet);

  // Playback timer ref
  const timerRef = useRef<any>(null);

  // Load execution steps whenever lesson or custom code changes
  useEffect(() => {
    let isMounted = true;
    setLoadingSteps(true);
    setIsPlaying(false);
    clearInterval(timerRef.current);

    const codeToRun = customCodeOverride || lesson.codeSnippet;
    setEditorCode(codeToRun);

    const inputData = customInputOverride || lesson.defaultInput;

    getExecutionSteps(
      customCodeOverride ? 'custom' : lesson.algorithmKey,
      inputData,
      codeToRun
    ).then((generatedSteps) => {
      if (isMounted) {
        setSteps(generatedSteps);
        setCurrentStepIndex(0);
        setLoadingSteps(false);
      }
    });

    return () => {
      isMounted = false;
      clearInterval(timerRef.current);
    };
  }, [lesson, customCodeOverride, customInputOverride]);

  // Handle Play / Pause timer
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(200, 1400 / speed);
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, steps.length]);

  const currentStep = steps[currentStepIndex] || null;

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleSeek = (index: number) => {
    setIsPlaying(false);
    setCurrentStepIndex(Math.max(0, Math.min(index, steps.length - 1)));
  };

  return (
    <div
      className={`w-full flex-1 flex flex-col p-4 sm:p-6 gap-6 max-w-7xl mx-auto transition-all ${
        isTeachingMode ? 'text-base scale-[1.01]' : 'text-sm'
      }`}
    >
      {/* Top 2-Column Split: Visualizer Canvas (Left/Top) & Code Editor (Right/Top) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Interactive Memory / Canvas Visualizer */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <VisualizerCanvas
            visualState={
              currentStep?.visualState || {
                type: 'array',
                data: [],
              }
            }
            title={`${lesson.title} — Memory Canvas`}
          />

          {/* Execution Controls directly under Visualizer */}
          <ExecutionControls
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            speed={speed}
            onPlayPause={handlePlayPause}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            onSpeedChange={setSpeed}
            onSeek={handleSeek}
          />
        </div>

        {/* Right Column: Code Editor with Active Line Highlight */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex-1 min-h-[380px] lg:min-h-[460px]">
            <CodeViewerEditor
              code={editorCode}
              activeLineNumber={currentStep?.lineNumber || 0}
              isEditable={false}
            />
          </div>
        </div>
      </div>

      {/* Line-by-Line Plain-English Explanation Banner */}
      <LineExplanationPanel
        currentStep={currentStep}
        totalSteps={steps.length}
      />

      {/* Scope Variables Watcher & Call Stack */}
      <VariableWatchPanel
        variables={currentStep?.variables || {}}
        callStack={currentStep?.callStack || []}
      />

      {/* Lesson Theory, Complexities, Analogies, and Quiz */}
      <LessonTheoryPanel
        lesson={lesson}
        isCompleted={isCompleted}
        onToggleComplete={onToggleComplete}
      />
    </div>
  );
};
