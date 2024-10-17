import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Answer, Question } from "@kepler-test-task/shared";
import request from "~/request.ts";
import { useWizardStore } from "~/wizardStore.ts";
import s from "./Question.module.css";
import QuestionForm from "./QuestionForm.tsx";

interface FormData {
  answer: Answer;
}

interface QuestionProps {
  question: Question;
  hasNext: boolean;
  hasPrevious: boolean;
}

const Question = ({ question, hasNext, hasPrevious }: QuestionProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormData>();

  const setAnswers = useWizardStore((state) => state.setAnswers);
  const setCurrentStep = useWizardStore((state) => state.setCurrentStep);
  const currentStep = useWizardStore((state) => state.currentStep);
  const setCompleted = useWizardStore((state) => state.setCompleted);

  const setAnswer = (answer: Answer) =>
    setAnswers(({ currentStep, answers }) => {
      const newAnswers = [...answers];
      newAnswers[currentStep] = answer;
      return newAnswers;
    });

  useEffect(() => {
    reset({ answer: useWizardStore.getState().answers[currentStep] });
  }, [currentStep]);

  const mutation = useMutation<void, unknown, { answers: Array<Answer> }>({
    mutationKey: ["answers"],
    mutationFn: (data) => request.post("/answers", data),
    onSuccess: () => setCompleted(),
  });

  return (
    <div className={s.container}>
      <div className={s.question}>{question.question}</div>
      <div className={s.form}>
        <QuestionForm question={question} register={register} />
      </div>
      <div className="grid">
        {hasPrevious ? (
          <button
            type="button"
            onClick={() => setCurrentStep(({ currentStep }) => currentStep - 1)}
          >
            🡄 Previous
          </button>
        ) : (
          <div />
        )}

        {hasNext ? (
          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmit((data) => {
              setAnswer(data.answer);
              setCurrentStep(({ currentStep }) => currentStep + 1);
            })}
          >
            Next 🡆
          </button>
        ) : (
          <button
            type="button"
            disabled={!isValid}
            onClick={handleSubmit((data) => {
              setAnswer(data.answer);
              const { answers } = useWizardStore.getState();
              mutation.mutate({ answers });
            })}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
