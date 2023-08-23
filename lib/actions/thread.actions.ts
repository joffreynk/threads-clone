"use server";
import { revalidatePath } from "next/cache";

import Thread from "../models/thread.model";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";
import Community from "../models/community.model";

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
     const communityIdObject = await Community.findOne(
       { id: communityId },
       { _id: 1 }
     );
    const createdThread = await Thread.create({
      text,
      author,
      community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
    });

    // update user's threads
    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdThread._id,
      },
    });

     if (communityIdObject) {
       // Update Community model
       await Community.findByIdAndUpdate(communityIdObject, {
         $push: { threads: createdThread._id },
       });
     }

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
        path: "community",
        model: Community,
      })
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

async function fetchAllChildThreads(threadId: string): Promise<any[]> {
  const childThreads = await Thread.find({ parentId: threadId });

  const descendantThreads = [];
  for (const childThread of childThreads) {
    const descendants = await fetchAllChildThreads(childThread._id);
    descendantThreads.push(childThread, ...descendants);
  }

  return descendantThreads;
}

export async function deleteThread(id: string, path: string): Promise<void> {
  try {
    await dbConnection();

    // Find the thread to be deleted (the main thread)
    const mainThread = await Thread.findById(id).populate("author community");

    if (!mainThread) {
      throw new Error("Thread not found");
    }

    // Fetch all child threads and their descendants recursively
    const descendantThreads = await fetchAllChildThreads(id);

    // Get all descendant thread IDs including the main thread ID and child thread IDs
    const descendantThreadIds = [
      id,
      ...descendantThreads.map((thread: any) => thread._id),
    ];

    // Extract the authorIds and communityIds to update User and Community models respectively
    const uniqueAuthorIds = new Set(
      [
        ...descendantThreads.map((thread: any) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.author?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    const uniqueCommunityIds = new Set(
      [
        ...descendantThreads.map((thread: any) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
        mainThread.community?._id?.toString(),
      ].filter((id) => id !== undefined)
    );

    // Recursively delete child threads and their descendants
    await Thread.deleteMany({ _id: { $in: descendantThreadIds } });

    // Update User model
    await User.updateMany(
      { _id: { $in: Array.from(uniqueAuthorIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    // Update Community model
    await Community.updateMany(
      { _id: { $in: Array.from(uniqueCommunityIds) } },
      { $pull: { threads: { $in: descendantThreadIds } } }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to delete thread: ${error.message}`);
  }
}


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
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
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