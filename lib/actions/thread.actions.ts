"use server";
import { revalidatePath } from "next/cache";

import Thread from "../models/thread.model";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";

type params = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

type Comment = {
  threadId: string;
  currentUserId: string;
  communityId: string | null;
  text: string;
  path: string;
};

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: params) => {
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

export const getThreads = async (pageNumber = 1, pageSize = 20) => {
  try {
    await dbConnection();
    const skipAmount = (pageNumber - 1) * pageSize;

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
      })
      .exec();

    const totalThreads = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const isNext = totalThreads > skipAmount + threads.length;

    return { threads, isNext };
  } catch (error: any) {
    console.log(`Error fetching threads ${error.message}`);
    throw new Error(`Error fetching threads ${error.message}`);
  }
};

export const getThreadById = async (id: string) => {
  try {
    dbConnection();
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id name parentId image",
      })
      .populate({
        path: "children",
        model: Thread,
        populate: [
          {
            path: "author",
            model: User,
            select: "_id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id name parentId image",
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread ${error.message}`);
  }
};

export const addCommentThread = async ({
  threadId,
  currentUserId,
  communityId,
  text,
  path,
}: Comment) => {
  try {
    await dbConnection();
    //commented thread
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) throw new Error("Could not find thread to comment on");

    // new thread
    const newThread = await Thread.create({
      text,
      author: currentUserId,
      parentId: threadId,
      communityId,
    });

    // Update parent thread

    await originalThread.children.push(newThread._id);

    await originalThread.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread coment ${error.message}`);
  }
};