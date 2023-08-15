import * as z from 'zod'

export const UserValidation = z.object({
  profile_photo: z.string().url().nonempty(),
  name: z
    .string()
    .min(5, { message: "User full name must be at least 5 characters" })
    .max(30, { message: "User full name cannot exceed 30 characters" }),
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters" })
    .max(30, { message: "username cannot exceed 30 characters" }),
  bio: z
    .string()
    .min(10, { message: "User bio must be at least 10 characters" })
    .max(1000, { message: "User bio cannot exceed 1000 characters" }),
});