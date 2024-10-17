import { Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SessionAnswer } from "./session-answer.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => SessionAnswer, (sessionAnswer) => sessionAnswer.sessionId, {
    cascade: true,
  })
  @JoinTable()
  answers!: SessionAnswer[];
}
