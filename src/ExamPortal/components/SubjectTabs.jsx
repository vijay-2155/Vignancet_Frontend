const SubjectTabs = ({ subjects, activeSubject, onSubjectChange }) => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="flex space-x-2">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => onSubjectChange(subject)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors
              ${
                activeSubject === subject
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectTabs;
