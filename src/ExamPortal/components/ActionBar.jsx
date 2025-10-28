const ActionBar = ({ onMarkForReview, onClearResponse, onSaveNext, onSubmit }) => {
  return (
    <div className="bg-white shadow-lg py-4 px-6 flex justify-between items-center">
      <div className="flex space-x-4">
        <button
          onClick={onMarkForReview}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Mark for Review & Next
        </button>
        <button
          onClick={onClearResponse}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Clear Response
        </button>
        <button
          onClick={onSaveNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save & Next
        </button>
      </div>
      <button
        onClick={onSubmit}
        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        Submit
      </button>
    </div>
  );
};

export default ActionBar;
