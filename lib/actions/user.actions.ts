'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";
import Thread from "../models/thread.model";

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

export async function getUsersPosts(id: string){
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