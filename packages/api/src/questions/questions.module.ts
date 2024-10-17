import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ZodValidationPipe } from "nestjs-zod";
import { QuestionsController } from "./questions.controller";
import { QuestionsService } from "./questions.service";
import { SessionAnswer } from "./session-answer.entity";
import { Session } from "./session.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Session, SessionAnswer])],
  controllers: [QuestionsController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    QuestionsService,
  ],
})
export class QuestionsModule {}
