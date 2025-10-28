import { useSecurity, CustomAlert, ViolationCounter, ExamTerminatedScreen, FullscreenPrompt, StartExamPrompt, LoadingScreen, FullscreenWarningPopup } from './Security';

export default function SecurityRoute({ children }) {
  const sec = useSecurity();

  const isExamWindow = typeof window !== 'undefined' && window.name === 'examWindow';

  return (
    <>
      <CustomAlert alert={sec.alert} />
      <ViolationCounter violations={sec.violations} maxViolations={sec.MAX_VIOLATIONS} show={!sec.examTerminated} />
      <ExamTerminatedScreen violations={sec.violations} show={sec.examTerminated} />
      <FullscreenWarningPopup onReturnFullscreen={sec.requestFullscreen} show={sec.showFullscreenWarning} />
      <StartExamPrompt onStartExam={sec.startExam} maxViolations={sec.MAX_VIOLATIONS} show={!sec.examStarted && !sec.examTerminated} />
      <LoadingScreen show={!isExamWindow && sec.examStarted && !sec.examTerminated} />
      {isExamWindow && !sec.examTerminated ? children : null}
    </>
  );
}
