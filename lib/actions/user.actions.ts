'use server';

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";

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