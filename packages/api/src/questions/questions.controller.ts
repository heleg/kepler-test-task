import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from "@nestjs/common";
import { AnswersDto } from "./answers.dto";
import { QuestionsService } from "./questions.service";

@Controller()
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get("questions")
  getQuestions() {
    return this.questionsService.getQuestions();
  }

  @Post("answers")
  async saveAnswers(@Body() { answers }: AnswersDto) {
    const isValid = this.questionsService.validateAnswers(answers);
    if (!isValid) {
      throw new BadRequestException();
    }
    await this.questionsService.saveAnswers(answers);
  }
}
