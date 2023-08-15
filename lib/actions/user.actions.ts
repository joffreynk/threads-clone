'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";

type Params = {
   userId: string,
    name: string,
    username: string,
    image: string,
    bio: string,
    path: string
}

export default async function createAndUpdateUser({
  userId,
  name,
  username,
  image,
  bio,
  path,
}: Params) {
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        name,
        username: username.toLocaleLowerCase(),
        image,
        bio,
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    console.log(`Failed to create/update user: ${error.message}`);
  }
}