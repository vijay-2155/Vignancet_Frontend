const QuestionStatus = {
  NOT_VISITED: 'not-visited',
  NOT_ANSWERED: 'not-answered', // visited but not answered
  ANSWERED: 'answered',
  MARKED_FOR_REVIEW: 'marked-for-review',
  MARKED_FOR_REVIEW_ANSWERED: 'marked-for-review-answered' // marked and answered
};

const getStatusColor = (status) => {
  switch (status) {
    case QuestionStatus.ANSWERED:
      return 'bg-green-500 hover:bg-green-600';
    case QuestionStatus.NOT_ANSWERED:
      return 'bg-red-500 hover:bg-red-600';
    case QuestionStatus.MARKED_FOR_REVIEW:
    case QuestionStatus.MARKED_FOR_REVIEW_ANSWERED:
      return 'bg-purple-500 hover:bg-purple-600';
    default:
      return 'bg-gray-300 hover:bg-gray-400';
  }
};

const Sidebar = ({ questions, currentQuestion, onQuestionClick }) => {
  const counts = {
    answered: questions.filter(q => q.status === QuestionStatus.ANSWERED || q.status === QuestionStatus.MARKED_FOR_REVIEW_ANSWERED).length,
    notAnswered: questions.filter(q => q.status === QuestionStatus.NOT_ANSWERED).length,
    marked: questions.filter(q => q.status === QuestionStatus.MARKED_FOR_REVIEW || q.status === QuestionStatus.MARKED_FOR_REVIEW_ANSWERED).length,
    notVisited: questions.filter(q => q.status === QuestionStatus.NOT_VISITED).length
  };

  return (
    <div className="w-80 bg-white shadow-lg p-4 flex flex-col h-full">
      <div className="mb-6 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Navigator</h3>
        {/* make the grid scrollable when many questions exist; counts stay fixed at bottom */}
        <div className="mt-2 overflow-auto max-h-[21.5rem]">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => (
              <button
                key={index}
                onClick={() => onQuestionClick(index)}
                className={`relative w-10 h-10 text-white font-medium rounded-lg flex items-center justify-center
                  ${getStatusColor(question.status)}
                  ${currentQuestion === index ? 'ring-2 ring-blue-500' : ''}
                `}
                aria-label={`Go to question ${index + 1}`}
              >
                {index + 1}
                {/* If question is marked-for-review-and-answered, show a small green dot in top-right */}
                {(question.status === QuestionStatus.MARKED_FOR_REVIEW_ANSWERED) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 ring-1 ring-white" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Answered</span>
            <span className="font-semibold text-green-600">{counts.answered}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Not Answered</span>
            <span className="font-semibold text-red-600">{counts.notAnswered}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Marked for Review</span>
            <span className="font-semibold text-purple-600">{counts.marked}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Not Visited</span>
            <span className="font-semibold text-gray-600">{counts.notVisited}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
export { QuestionStatus };
