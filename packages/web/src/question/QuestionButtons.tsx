interface QuestionButtonsProps {
  isValid: boolean;
  handleSubmit: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const QuestionButtons = () => (
  <div>
    <button type="button" disabled={!isValid} onClick={handleSubmit(() => {})}>
      Next ➜
    </button>
  </div>
);

export default QuestionButtons;
