// App.js
import React from 'react';
import Background from './Components/Background';
import Login from './Components/Login';
import { 
  useSecurity, 
  CustomAlert,
  ViolationCounter, 
  ExamTerminatedScreen, 
  FullscreenPrompt, 
  StartExamPrompt,
  LoadingScreen,
  FullscreenWarningPopup
} from './Components/Security';

function App() {
  const {
    violations,
    isFullscreen,
    examStarted,
    examTerminated,
    alert,
    MAX_VIOLATIONS,
    startExam,
    requestFullscreen,
    showFullscreenWarning
  } = useSecurity();

  // Don't render anything if we're not in the exam window
  if (window.name !== 'examWindow') {
    return <LoadingScreen show={true} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />

      {/* Custom Alert */}
      <CustomAlert alert={alert} />

      {/* Violation Counter */}
      <ViolationCounter 
        violations={violations}
        maxViolations={MAX_VIOLATIONS}
        show={examStarted && !examTerminated}
      />

      {/* Exam Terminated Screen */}
      <ExamTerminatedScreen 
        violations={violations}
        show={examTerminated}
      />

      {/* Fullscreen Prompt - Before exam starts */}
      <FullscreenPrompt 
        onEnterFullscreen={requestFullscreen}
        show={!examStarted && !examTerminated && !isFullscreen}
      />

      {/* Start Exam Prompt - After fullscreen, before exam */}
      <StartExamPrompt 
        onStartExam={startExam}
        maxViolations={MAX_VIOLATIONS}
        show={!examStarted && !examTerminated && isFullscreen}
      />

      {/* Fullscreen Warning Popup - During exam when user exits fullscreen */}
      <FullscreenWarningPopup 
        onReturnFullscreen={requestFullscreen}
        show={showFullscreenWarning}
      />

      <main className="relative z-10">
        <Login />
      </main>
    </div>
  );
}

export default App;