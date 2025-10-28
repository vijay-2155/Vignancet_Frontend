const QuestionPanel = ({ question, onAnswerSelect, selectedAnswer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Question {question.number}
        </h2>
        <p className="text-gray-700 mb-4">{question.text}</p>
        {question.localLanguageText && (
          <p className="text-gray-600 mb-4 italic">{question.localLanguageText}</p>
        )}
      </div>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-start p-4 rounded-lg border-2 cursor-pointer transition-colors
              ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}>
            <input
              type="radio"
              name={`question-${question.number}`}
              value={index}
              checked={selectedAnswer === index}
              onChange={() => onAnswerSelect(index)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionPanel;
