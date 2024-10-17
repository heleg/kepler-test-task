import clsx from "clsx";
import s from "./Step.module.css";

export enum StepStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  INACTIVE = "INACTIVE",
}

interface StepProps {
  step: number;
  status: StepStatus;
}

const Step = ({ step, status }: StepProps) => (
  <div className={clsx(s.container, s[status.toLowerCase()])}>{step}</div>
);

export default Step;
