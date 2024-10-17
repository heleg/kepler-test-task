import { useQuery } from "@tanstack/react-query";
import { Questions } from "@kepler-test-task/shared";
import Question from "~/question/Question.tsx";
import request from "~/request.ts";
import Steps from "~/Steps.tsx";
import s from "./App.module.css";
import { useWizardStore } from "./wizardStore";

const App = () => {
  const currentStep = useWizardStore((state) => state.currentStep);
  const completed = useWizardStore((state) => state.completed);
  const reset = useWizardStore((state) => state.reset);

  const query = useQuery<Questions>({
    queryKey: ["questions"],
    queryFn: () => request.get("/questions"),
  });
  const currentQuestion = query.data?.[currentStep];
  const questionsCount = query.data?.length ?? 0;

  if (completed) {
    return (
      <div className={s.container}>
        <Steps count={questionsCount} current={questionsCount} />
        <div className={s.completed}>
          <h3>Completed</h3>
          <button type="button" onClick={() => reset()}>
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.container}>
      {!currentQuestion ? (
        "Loading..."
      ) : (
        <Steps count={questionsCount} current={currentStep} />
      )}
      <div className={s.question}>
        {!currentQuestion ? (
          "Loading..."
        ) : (
          <Question
            question={currentQuestion}
            hasNext={currentStep < questionsCount - 1}
            hasPrevious={currentStep > 0 && currentStep <= questionsCount}
          />
        )}
      </div>
    </div>
  );
};

export default App;
