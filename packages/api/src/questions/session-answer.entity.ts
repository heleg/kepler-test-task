import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { QuestionType, Answer } from "@kepler-test-task/shared";
import { Session } from "./session.entity";

@Entity()
export class SessionAnswer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ enum: QuestionType })
  type!: QuestionType;

  @ManyToOne(() => Session, (session) => session.answers)
  sessionId!: number;

  @Column({ type: "json" })
  answer!: Answer;
}
