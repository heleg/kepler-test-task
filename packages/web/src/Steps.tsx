import Step, { StepStatus } from "~/Step.tsx";
import s from "./Steps.module.css";

const getStatus = ({ current, index }: { current: number; index: number }) => {
  if (index === current) {
    return StepStatus.ACTIVE;
  }
  return index < current ? StepStatus.COMPLETED : StepStatus.INACTIVE;
};

interface StepsProps {
  count: number;
  current: number;
}

const Steps = ({ count, current }: StepsProps) => (
  <div className={s.container}>
    <div className={s.counter}>
      {current + 1} / {count}
    </div>
    <div className={s.steps}>
      {Array.from({ length: count }, (_, i) => (
        <Step key={i} step={i} status={getStatus({ current, index: i })} />
      ))}
    </div>
  </div>
);

export default Steps;
