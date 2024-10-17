import { z } from "zod";

export enum QuestionType {
  INPUT = "INPUT",
  MULTI_CHOICE = "MULTI_CHOICE",
  SINGLE_CHOICE = "SINGLE_CHOICE",
  NUMERIC = "NUMERIC",
}

const inputQuestionSchema = z.object({
  type: z.literal(QuestionType.INPUT),
  question: z.string().min(1),
});

const multiChoiceQuestionSchema = z.object({
  type: z.literal(QuestionType.MULTI_CHOICE),
  question: z.string().min(1),
  options: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .min(2),
});

const singleChoiceQuestionSchema = z.object({
  type: z.literal(QuestionType.SINGLE_CHOICE),
  question: z.string().min(1),
  options: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .min(2),
});

const numericQuestionSchema = z.object({
  type: z.literal(QuestionType.NUMERIC),
  question: z.string().min(1),
});

const questionSchema = z.union([
  inputQuestionSchema,
  multiChoiceQuestionSchema,
  singleChoiceQuestionSchema,
  numericQuestionSchema,
]);

export const questionsSchema = z.array(questionSchema);

export type Questions = z.infer<typeof questionsSchema>;
export type Question = z.infer<typeof questionSchema>;

const answerSchema = z.union([z.string(), z.number(), z.array(z.string())]);

export const answersSchema = z.array(answerSchema);

export type Answers = z.infer<typeof answersSchema>;
export type Answer = z.infer<typeof answerSchema>;
