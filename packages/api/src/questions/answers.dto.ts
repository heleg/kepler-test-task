import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { answersSchema } from "@kepler-test-task/shared";

export class AnswersDto extends createZodDto(
  z.object({ answers: answersSchema }),
) {}
