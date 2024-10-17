import { Question, QuestionType } from "@kepler-test-task/shared";

interface QuestionFormProps {
  question: Question;
  register: any;
}

const QuestionForm = ({ question, register }: QuestionFormProps) => {
  switch (question.type) {
    case QuestionType.INPUT:
      return (
        <input
          type="text"
          {...register("answer", { required: true })}
          autoComplete="off"
        />
      );
    case QuestionType.MULTI_CHOICE:
      return question.options.map(({ value, label }) => (
        <label key={value}>
          <input
            type="checkbox"
            value={value}
            {...register("answer", { required: true })}
          />
          {label}
        </label>
      ));
    case QuestionType.SINGLE_CHOICE:
      return question.options.map(({ value, label }) => (
        <label key={value}>
          <input
            type="radio"
            value={value}
            {...register("answer", { required: true })}
          />
          {label}
        </label>
      ));
    case QuestionType.NUMERIC:
      return (
        <input
          type="number"
          {...register("answer", {
            required: true,
            valueAsNumber: true,
          })}
          autoComplete="off"
        />
      );
    default:
      throw new Error("Invalid question type");
  }
};

export default QuestionForm;
