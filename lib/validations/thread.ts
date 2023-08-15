import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z.string().min(5, {message: "Thread mmust have at least 5 characters"}),
  accountId: z.string().nonempty(),
});

export const CommentValidation = z.object({
  thread: z
    .string()
    .min(5, { message: "Thread mmust have at least 5 characters" }),
});