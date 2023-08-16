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

export const getThreads = async(pageNumber = 1, pageSize =20)=>{
  try {
    await dbConnection();
    const skipAmount = (pageNumber-1) * pageSize

    const threads = await Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalThreads = await Thread.countDocuments({parentId: {$in: [null, undefined]}})
    // const threads = await threadsQuery.exec()

    const isNext = totalThreads > skipAmount + threads.length;
    
    return {threads, isNext};
    
  } catch (error: any) {
    console.log(`Error fetching threads ${error.message}`);
    throw new Error(`Error fetching threads ${error.message}`);
  }
}