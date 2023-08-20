'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

type Params = {
   userId: string,
    name: string,
    username: string,
    image: string,
    bio: string,
    path: string
}

export async function createAndUpdateUser({
  userId,
  name,
  username,
  image,
  bio,
  path,
}: Params) {
  try {
    await dbConnection();
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

export  async function getUser(id: String) {
  try {
    await dbConnection();
    return await User.findOne({id})
  } catch (error: any) {
    console.log(`Failed to create/update user: ${error.message}`);
    return new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function getUserById(id: String) {
  try {
    await dbConnection();
    return await User.findById(id );
  } catch (error: any) {
    console.log(`Failed to create/update user: ${error.message}`);
    return new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function getUsersThreads(id: string){
  try {
    await dbConnection();

    // TODO: populate communities on this user
    const threads = await User.findOne({id})
      .populate({
        path: 'threads',
        model: Thread,
        populate: {
          path: 'children',
          model: Thread,
          populate: {
            path: 'author',
            model: User,
            select: 'name image id',
          }
        }
      })

      return threads;
  } catch (error: any) {
    throw new Error(`Error fetching threads: ${error.message}`);
  }
}

export async function searchUsers({
  userId,
  searchString,
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await dbConnection();
    const skipAmount = (pageNumber-1)*pageSize;
    const regex = new RegExp(searchString, 'i');
    const query: FilterQuery<typeof User> = {id: {$ne: userId}};

    if(searchString.trim() !== ''){
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
      ];
    }

    const sortOptions = {createdAt: sortBy}

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions)
      .exec();

    const totalUsers = await User.countDocuments(query);

    const isNext = totalUsers > users.length

    return {users, isNext}

  } catch (error: any) {
    throw new Error(`Error fetching users: ${error.message}`)
  }
}