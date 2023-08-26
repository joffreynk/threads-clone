import * as z from "zod";

export const CommunityValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Community must be at least two characters" }),
  username: z
    .string()
    .min(2, { message: "Community must be at least two characters" }),
  image: z
    .string()
    .min(2, { message: "Community must be at least two characters" }),
  bio: z
    .string()
    .min(2, { message: "Community must be at least two characters" }),
});
