import React from 'react';
import { Lesson } from '../types/dsa';
import {
  BookOpen,
  Clock,
  HardDrive,
  CheckCircle2,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';

interface Props {
  lesson: Lesson;
  isCompleted: boolean;
  onToggleComplete: () => void;
}

export const LessonTheoryPanel: React.FC<Props> = ({
  lesson,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6 backdrop-blur-sm">
      {/* Title and Badges */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-900/50 text-blue-300 border border-blue-700/50 uppercase tracking-wide">
              {lesson.category.replace('_', ' ')}
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border ${
                lesson.difficulty === 'Beginner'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50'
                  : lesson.difficulty === 'Intermediate'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-700/50'
                  : 'bg-rose-950/60 text-rose-300 border-rose-700/50'
              }`}
            >
              {lesson.difficulty}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{lesson.title}</h2>
          <p className="mt-1 text-sm text-slate-400">{lesson.summary}</p>
        </div>

        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md ${
            isCompleted
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Completed' : 'Mark as Learned'}</span>
        </button>
      </div>

      {/* Complexity Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Best Time</span>
          </div>
          <span className="font-mono font-bold text-lg text-emerald-300">
            {lesson.timeComplexity.best}
          </span>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Average Time</span>
          </div>
          <span className="font-mono font-bold text-lg text-amber-300">
            {lesson.timeComplexity.average}
          </span>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Worst Time</span>
          </div>
          <span className="font-mono font-bold text-lg text-rose-300">
            {lesson.timeComplexity.worst}
          </span>
        </div>

        <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3 flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-1">
            <HardDrive className="w-3.5 h-3.5 text-sky-400" />
            <span>Space Complexity</span>
          </div>
          <span className="font-mono font-bold text-lg text-sky-300">
            {lesson.spaceComplexity}
          </span>
        </div>
      </div>

      {/* Teaching Points for Instructors */}
      {lesson.teachingPoints && lesson.teachingPoints.length > 0 && (
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs font-mono mb-2 uppercase">
            <GraduationCap className="w-4 h-4" />
            <span>Instructor Teaching Highlights</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
            {lesson.teachingPoints.map((point, idx) => (
              <li key={idx} className="leading-relaxed">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Theory Markdown / Explanation Content */}
      <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-5 text-sm text-slate-300 leading-relaxed space-y-4">
        <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs font-mono uppercase pb-2 border-b border-slate-800">
          <BookOpen className="w-4 h-4" />
          <span>Core Concepts & Mechanics</span>
        </div>
        <div className="whitespace-pre-line font-sans text-slate-300">
          {lesson.theory}
        </div>
      </div>

      {/* Interactive Quick Quiz */}
      {lesson.quizQuestions && lesson.quizQuestions.length > 0 && (
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs font-mono uppercase mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Check Your Understanding</span>
          </div>
          {lesson.quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-3">
              <p className="text-sm font-medium text-slate-200">{q.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (optIdx === q.correctAnswer) {
                        alert('Correct! ' + q.explanation);
                      } else {
                        alert('Not quite! Try reviewing the step execution.');
                      }
                    }}
                    className="text-left px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
