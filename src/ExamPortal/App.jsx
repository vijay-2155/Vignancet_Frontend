import { useState, useEffect } from 'react';
import Header from './components/Header';
import SubjectTabs from './components/SubjectTabs';
import QuestionPanel from './components/QuestionPanel';
import Sidebar from './components/Sidebar';
import ActionBar from './components/ActionBar';
import mockQuestions, { mockUser } from './data/mockData';
import { QuestionStatus } from './components/Sidebar';

function ExamPortalApp() {
  const subjects = Object.keys(mockQuestions);
  const [activeSubject, setActiveSubject] = useState(subjects[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [questionStatus, setQuestionStatus] = useState(
    subjects.reduce((acc, subject) => ({
      ...acc,
      [subject]: Array(mockQuestions[subject].length).fill(QuestionStatus.NOT_VISITED)
    }), {})
  );

  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [activeSubject]: {
        ...prev[activeSubject],
        [currentQuestionIndex]: optionIndex
      }
    }));
    updateQuestionStatus(QuestionStatus.ANSWERED);
  };

  const updateQuestionStatus = (status) => {
    setQuestionStatus(prev => ({
      ...prev,
      [activeSubject]: prev[activeSubject].map((s, i) => 
        i === currentQuestionIndex ? status : s
      )
    }));
  };

  const handleMarkForReview = () => {
    // If already answered, mark as marked+answered
    const isAnswered = answers[activeSubject]?.[currentQuestionIndex] !== undefined;
    updateQuestionStatus(isAnswered ? QuestionStatus.MARKED_FOR_REVIEW_ANSWERED : QuestionStatus.MARKED_FOR_REVIEW);
    goToNextQuestion();
  };

  const handleClearResponse = () => {
    setAnswers(prev => {
      const subjectAnswers = { ...prev[activeSubject] };
      delete subjectAnswers[currentQuestionIndex];
      return { ...prev, [activeSubject]: subjectAnswers };
    });
    updateQuestionStatus(QuestionStatus.NOT_ANSWERED);
  };

  const handleSaveNext = () => {
    if (answers[activeSubject]?.[currentQuestionIndex] !== undefined) {
      updateQuestionStatus(QuestionStatus.ANSWERED);
    } else {
      updateQuestionStatus(QuestionStatus.NOT_ANSWERED);
    }
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions[activeSubject].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (subjects.indexOf(activeSubject) < subjects.length - 1) {
      setActiveSubject(subjects[subjects.indexOf(activeSubject) + 1]);
      setCurrentQuestionIndex(0);
    }
  };

  const handleSubmit = () => {
    // Implement submission logic
    alert('Are you sure you want to submit the exam?');
  };

  const currentQuestion = mockQuestions[activeSubject][currentQuestionIndex];
  const selectedAnswer = answers[activeSubject]?.[currentQuestionIndex];

  const questions = mockQuestions[activeSubject].map((q, index) => ({
    number: index + 1,
    status: questionStatus[activeSubject][index]
  }));

  // Mark a question as visited (NOT_ANSWERED) when the user views it if it was NOT_VISITED
  useEffect(() => {
    const status = questionStatus[activeSubject][currentQuestionIndex];
    if (status === QuestionStatus.NOT_VISITED) {
      updateQuestionStatus(QuestionStatus.NOT_ANSWERED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubject, currentQuestionIndex]);

  // Ensure selecting an answer updates statuses correctly (handle answered + marked combos)
  useEffect(() => {
    const isAnswered = selectedAnswer !== undefined;
    const status = questionStatus[activeSubject][currentQuestionIndex];
    if (isAnswered) {
      // If currently marked-for-review, convert to marked+answered
      if (status === QuestionStatus.MARKED_FOR_REVIEW) {
        updateQuestionStatus(QuestionStatus.MARKED_FOR_REVIEW_ANSWERED);
      } else {
        updateQuestionStatus(QuestionStatus.ANSWERED);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswer]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        examTitle={mockUser.examTitle}
        userName={mockUser.name}
        timeInMinutes={mockUser.timeInMinutes}
      />
      
      <SubjectTabs
        subjects={subjects}
        activeSubject={activeSubject}
        onSubjectChange={setActiveSubject}
      />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-grow">
            <QuestionPanel
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
          </div>
          
          <Sidebar
            questions={questions}
            currentQuestion={currentQuestionIndex}
            onQuestionClick={setCurrentQuestionIndex}
          />
        </div>
      </div>
      
      <ActionBar
        onMarkForReview={handleMarkForReview}
        onClearResponse={handleClearResponse}
        onSaveNext={handleSaveNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default ExamPortalApp;
