'use server';
import { revalidatePath } from "next/cache";

import Thread from "../models/thread.model";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";

type params = {
  text: string;
  author: string;
  communityId?: string;
  path: string;
};

export const createThread = async ({ text, author, communityId, path }: params) => {
  try {
    await dbConnection();
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

    // update user's threads
    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdThread._id,
      },
    });
    
    revalidatePath(path);
  } catch (error: any) {
    console.log(`Error creating thread ${error.message}`);
    throw new Error(`Error creating thread ${error.message}`);
  }
};