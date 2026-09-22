import { useState, useEffect } from 'react';
import { Module, Lesson, User } from './types/dsa';
import { Navbar } from './components/Navbar';
import { PresentationToolbar } from './components/PresentationToolbar';
import { CustomCodeModal } from './components/CustomCodeModal';
import { VisualizerPage } from './pages/VisualizerPage';
import { DashboardPage } from './pages/DashboardPage';

export function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [currentView, setCurrentView] = useState<'visualizer' | 'dashboard'>('visualizer');
  const [isTeachingMode, setIsTeachingMode] = useState<boolean>(false);
  const [isSandboxOpen, setIsSandboxOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [customCode, setCustomCode] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState<any>(null);

  // Fetch modules from Backend API
  useEffect(() => {
    fetch('/api/modules')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setModules(data);
          // Auto-select first lesson of first module or Binary Search
          const firstMod = data[0];
          const firstLesson = (firstMod.lessons && firstMod.lessons[0]) || null;
          if (firstLesson) {
            // Fetch full lesson details
            fetch(`/api/lessons/${firstLesson.slug}`)
              .then((r) => r.json())
              .then((detailed) => {
                if (detailed && !detailed.error) {
                  setSelectedLesson(detailed);
                }
              });
          }
        }
      })
      .catch((err) => {
        console.error('Failed to fetch modules:', err);
      });
  }, []);

  const handleSelectLesson = (lessonSummary: any) => {
    setCustomCode(null);
    setCustomInput(null);
    setCurrentView('visualizer');

    fetch(`/api/lessons/${lessonSummary.slug}`)
      .then((res) => res.json())
      .then((detailed) => {
        if (detailed && !detailed.error) {
          setSelectedLesson(detailed);
        } else {
          setSelectedLesson(lessonSummary);
        }
      })
      .catch(() => setSelectedLesson(lessonSummary));
  };

  const handleDemoLogin = async (role: 'student' | 'instructor') => {
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
        setCompletedLessons(data.user.completedLessons || []);
      }
    } catch (e) {
      console.error('Demo login failed:', e);
    }
  };

  const handleToggleComplete = async () => {
    if (!selectedLesson) return;
    const lessonId = selectedLesson._id || selectedLesson.id || selectedLesson.slug;

    // Optimistic toggle
    const isAlready = completedLessons.includes(lessonId);
    const updated = isAlready
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];
    setCompletedLessons(updated);

    // Call backend API if user is logged in
    if (currentUser) {
      try {
        await fetch('/api/progress/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer demo_token`,
          },
          body: JSON.stringify({ lessonId }),
        });
      } catch (err) {
        console.error('Failed to sync progress:', err);
      }
    }
  };

  const handleLoadCustomTrace = (code: string, inputData: any) => {
    setCustomCode(code);
    setCustomInput(inputData);
    setCurrentView('visualizer');
  };

  const allLessons = modules.flatMap((m) => m.lessons || []);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col font-sans">
      {/* Classroom Teaching Toolbar */}
      <PresentationToolbar
        isActive={isTeachingMode}
        onClose={() => setIsTeachingMode(false)}
      />

      {/* Main Navbar */}
      <Navbar
        modules={modules}
        selectedLesson={selectedLesson}
        onSelectLesson={handleSelectLesson}
        isTeachingMode={isTeachingMode}
        onToggleTeachingMode={() => setIsTeachingMode(!isTeachingMode)}
        onOpenSandbox={() => setIsSandboxOpen(true)}
        currentUser={currentUser}
        onDemoLogin={handleDemoLogin}
        completedCount={completedLessons.length}
        totalLessons={allLessons.length}
      />

      {/* View Switcher Tabs */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setCurrentView('visualizer')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentView === 'visualizer'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Line-by-Line Visualizer
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-blue-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DSA Curriculum Roadmap
          </button>
        </div>

        {customCode && currentView === 'visualizer' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/60">
              Custom Code Active
            </span>
            <button
              onClick={() => {
                setCustomCode(null);
                setCustomInput(null);
              }}
              className="text-xs font-mono text-slate-400 hover:text-white underline cursor-pointer"
            >
              Reset to Lesson
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {currentView === 'visualizer' && selectedLesson ? (
          <VisualizerPage
            lesson={selectedLesson}
            isTeachingMode={isTeachingMode}
            isCompleted={completedLessons.includes(
              selectedLesson._id || selectedLesson.id || selectedLesson.slug
            )}
            onToggleComplete={handleToggleComplete}
            customCodeOverride={customCode}
            customInputOverride={customInput}
          />
        ) : (
          <DashboardPage
            modules={modules}
            onSelectLesson={handleSelectLesson}
            completedLessons={completedLessons}
          />
        )}
      </main>

      {/* Custom Code Sandbox Modal */}
      <CustomCodeModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
        onLoadTrace={handleLoadCustomTrace}
      />
    </div>
  );
}

export default App;
