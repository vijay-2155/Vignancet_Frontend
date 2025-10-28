// Security.jsx
import { useEffect, useState } from 'react';

export const useSecurity = () => {
  const [violations, setViolations] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examTerminated, setExamTerminated] = useState(false);
  const [alert, setAlert] = useState(null);
  
  const MAX_VIOLATIONS = 5;

  // Show custom alert
  const showAlert = (message, type = 'warning') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // Open in new window and request fullscreen
  useEffect(() => {
    const isExamWindow = window.name === 'examWindow';
    
    if (!isExamWindow) {
      const examWindow = window.open(
        window.location.href,
        'examWindow',
        'width=' + screen.width + ',height=' + screen.height + ',fullscreen=yes'
      );
      
      if (examWindow) {
        window.close();
      } else {
        showAlert('Please allow popups for this site to start the exam.', 'error');
      }
    } else {
      setTimeout(() => {
        requestFullscreen();
      }, 500);
    }
  }, []);

  // Fullscreen request function
  const requestFullscreen = () => {
    const elem = document.documentElement;
    
    const fullscreenPromise = elem.requestFullscreen?.() ||
      elem.mozRequestFullScreen?.() ||
      elem.webkitRequestFullscreen?.() ||
      elem.msRequestFullscreen?.();

    if (fullscreenPromise) {
      fullscreenPromise
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error('Fullscreen error:', err);
        });
    }
  };

  // Function to start the exam
  const startExam = () => {
    if (!isFullscreen) {
      showAlert('Please enter fullscreen mode first!', 'error');
      requestFullscreen();
      return;
    }
    setExamStarted(true);
  };

  // Function to add violation
  const addViolation = (message) => {
    if (!examStarted || examTerminated) return;
    
    setViolations(prev => {
      const newCount = prev + 1;
      
      if (newCount >= MAX_VIOLATIONS) {
        setExamTerminated(true);
        showAlert(`EXAM TERMINATED: Maximum violations (${MAX_VIOLATIONS}) reached.`, 'error');
      } else {
        showAlert(`WARNING ${newCount}/${MAX_VIOLATIONS}: ${message}`, 'warning');
      }
      
      return newCount;
    });
  };

  useEffect(() => {
    if (!examStarted || examTerminated || !isFullscreen) return;

    // Monitor fullscreen changes
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );

      setIsFullscreen(isCurrentlyFullscreen);

      if (!isCurrentlyFullscreen) {
        addViolation('You exited fullscreen mode! Returning...');
        // Immediately try to return to fullscreen
        setTimeout(() => {
          if (!examTerminated) {
            requestFullscreen();
          }
        }, 100);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    // Comprehensive Keyboard Blocking
    const blockKeys = (e) => {
      // Block ESC key (key code 27)
      if (e.key === 'Escape' || e.keyCode === 27) {
        e.preventDefault();
        e.stopPropagation();
        addViolation('ESC key is disabled during exam!');
        return false;
      }

      // Developer tools - F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        addViolation('Attempted to open developer tools!');
        return false;
      }

      // All F-keys (F1-F12)
      if (e.keyCode >= 112 && e.keyCode <= 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl/Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ['u', 's', 'r', 'i', 'j', 'c', 'k', 'p', 'f', 'g', 'h', 'w', 't', 'n', 'a'];
        if (blockedKeys.includes(e.key.toLowerCase())) {
          e.preventDefault();
          e.stopPropagation();
          addViolation('Keyboard shortcut blocked!');
          return false;
        }
      }

      // Ctrl+Shift combinations
      if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        addViolation('Keyboard shortcut blocked!');
        return false;
      }

      // Alt combinations
      if (e.altKey) {
        if (['Tab', 'F4', 'Enter'].includes(e.key) || e.keyCode === 18) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }

      // Windows/Command key
      if (e.keyCode === 91 || e.keyCode === 92 || e.keyCode === 93 || e.metaKey) {
        if (!['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    const blockContextMenu = (e) => {
      e.preventDefault();
      addViolation('Right-click is disabled!');
      return false;
    };

    const handleBlur = () => {
      addViolation('You switched tabs or minimized the window!');
    };

    const handleFocus = () => {
      if (!isFullscreen) {
        requestFullscreen();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        addViolation('Tab is hidden! Stay on the exam page.');
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your exam progress will be lost.';
      return e.returnValue;
    };

    const disableSelection = (e) => {
      if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    };

    const disableCopy = (e) => {
      e.preventDefault();
      addViolation('Copying is disabled!');
      return false;
    };

    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        addViolation('Developer tools detected!');
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 2000);

    // Add event listeners with capture phase to catch events early
    document.addEventListener('contextmenu', blockContextMenu, true);
    document.addEventListener('keydown', blockKeys, { capture: true, passive: false });
    document.addEventListener('keyup', blockKeys, { capture: true, passive: false });
    document.addEventListener('keypress', blockKeys, { capture: true, passive: false });
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('copy', disableCopy);
    document.addEventListener('cut', disableCopy);

    return () => {
      document.removeEventListener('contextmenu', blockContextMenu, true);
      document.removeEventListener('keydown', blockKeys, true);
      document.removeEventListener('keyup', blockKeys, true);
      document.removeEventListener('keypress', blockKeys, true);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('cut', disableCopy);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
      clearInterval(devToolsInterval);
    };
  }, [examStarted, examTerminated, isFullscreen]);

  return {
    violations,
    isFullscreen,
    examStarted,
    examTerminated,
    alert,
    MAX_VIOLATIONS,
    startExam,
    requestFullscreen,
    showFullscreenWarning: examStarted && !examTerminated && !isFullscreen
  };
};

// Custom Alert Component
export const CustomAlert = ({ alert }) => {
  if (!alert) return null;

  const typeStyles = {
    warning: 'bg-yellow-500 border-yellow-600',
    error: 'bg-red-600 border-red-700',
    info: 'bg-blue-600 border-blue-700'
  };

  const icons = {
    warning: '⚠️',
    error: '🚨',
    info: 'ℹ️'
  };

  return (
    <div className="fixed top-20 right-4 z-[100] animate-slide-in-right">
      <div className={`${typeStyles[alert.type]} text-white px-6 py-4 rounded-lg shadow-2xl border-2 max-w-sm`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icons[alert.type]}</span>
          <p className="font-semibold text-sm">{alert.message}</p>
        </div>
      </div>
    </div>
  );
};

// Security UI Components
export const ViolationCounter = ({ violations, maxViolations, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg">
      <p className="text-sm font-semibold">Violations: {violations}/{maxViolations}</p>
    </div>
  );
};

export const ExamTerminatedScreen = ({ violations, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-red-600 z-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg max-w-lg text-center shadow-2xl">
        <div className="text-6xl mb-6">🚨</div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">EXAM TERMINATED</h1>
        <p className="text-gray-700 text-lg mb-4">
          You have reached the maximum number of violations.
        </p>
        <p className="text-gray-600 mb-6">
          Your proctor has been notified of the following:
        </p>
        <ul className="text-left text-sm text-gray-700 bg-gray-100 p-4 rounded mb-6">
          <li>• Total Violations: {violations}</li>
          <li>• Exam Session ID: {Date.now()}</li>
          <li>• Timestamp: {new Date().toLocaleString()}</li>
        </ul>
        <p className="text-gray-500 text-sm">
          Please contact your exam administrator for further instructions.
        </p>
      </div>
    </div>
  );
};

export const FullscreenPrompt = ({ onEnterFullscreen, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-40 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Fullscreen Required</h2>
        <p className="text-gray-700 mb-6">
          This exam must be taken in fullscreen mode for security purposes.
        </p>
        <button
          onClick={onEnterFullscreen}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Enter Fullscreen
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Fullscreen will activate automatically
        </p>
      </div>
    </div>
  );
};

export const StartExamPrompt = ({ onStartExam, maxViolations, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 z-40 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg max-w-lg text-center shadow-2xl">
        <div className="text-5xl mb-6">📝</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start?</h1>
        <p className="text-gray-600 mb-2">
          Once you click "Start Exam", the following security measures will be active:
        </p>
        <ul className="text-left text-sm text-gray-700 bg-gray-50 p-4 rounded mb-6 space-y-1">
          <li>✓ Fullscreen mode locked</li>
          <li>✓ Tab switching monitored</li>
          <li>✓ Copy/paste disabled</li>
          <li>✓ Developer tools blocked</li>
          <li>✓ Maximum {maxViolations} violations allowed</li>
        </ul>
        <button
          onClick={onStartExam}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
        >
          Start Exam Now
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Make sure you're ready before starting
        </p>
      </div>
    </div>
  );
};

export const LoadingScreen = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-gray-700">Opening exam window...</p>
        <p className="text-sm text-gray-500 mt-2">If nothing happens, please allow popups.</p>
      </div>
    </div>
  );
};

// Fullscreen Warning Popup (when user exits fullscreen during exam)
export const FullscreenWarningPopup = ({ onReturnFullscreen, show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-[200] flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white p-10 rounded-xl max-w-md text-center shadow-2xl border-4 border-red-600 animate-pulse">
        <div className="text-6xl mb-6 animate-bounce">⚠️</div>
        <h1 className="text-3xl font-bold text-red-600 mb-4">RETURN TO FULLSCREEN</h1>
        <p className="text-gray-700 text-lg mb-6">
          You have exited fullscreen mode! You must return to fullscreen to continue the exam.
        </p>
        <button
          onClick={onReturnFullscreen}
          className="w-full bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 transition font-bold text-lg shadow-lg"
        >
          Return to Fullscreen Now
        </button>
        <p className="text-red-600 font-semibold text-sm mt-4">
          🚨 Click the button above immediately!
        </p>
      </div>
    </div>
  );
};