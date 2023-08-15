'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";

export default async function createAndUpdateUser(
    userId: string,
    name: string,
    username: string,
    image: string,
    bio: string,
    path: string
) {
   try {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          name,
          username: username.toLocaleLowerCase(),
          image,
          bio,
          onboarded: true,
        },
        { upsert: true }
      );
      if(path === '/profile/edit') {
        revalidatePath(path);
      }
   } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
   }
}