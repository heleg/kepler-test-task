import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  Answers,
  Questions,
  questionsSchema,
  QuestionType,
} from "@kepler-test-task/shared";
import * as questions from "./questions.json";
import { SessionAnswer } from "./session-answer.entity";
import { Session } from "./session.entity";

@Injectable()
export class QuestionsService {
  readonly #questions: Questions;

  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(SessionAnswer)
    private sessionAnswerRepository: Repository<SessionAnswer>,
  ) {
    this.#questions = questionsSchema.parse(questions);
  }

  getQuestions() {
    return this.#questions;
  }

  validateAnswers(answers: Answers) {
    return this.#questions.every((value, index) => {
      const answer = answers[index];

      switch (value.type) {
        case QuestionType.INPUT:
        case QuestionType.SINGLE_CHOICE:
          return typeof answer === "string";

        case QuestionType.MULTI_CHOICE:
          return Array.isArray(answer);

        case QuestionType.NUMERIC:
          return typeof answer === "number";

        default:
          throw new Error("Invalid question type");
      }
    });
  }

  async saveAnswers(answers: Answers) {
    const session = this.sessionRepository.create();
    session.answers = answers.map((answer, i) => {
      const question = this.#questions[i];

      if (!question) {
        throw new Error("Something went wrong");
      }

      return this.sessionAnswerRepository.create({
        type: question.type,
        answer,
      });
    });
    await this.sessionRepository.save(session);
  }
}
