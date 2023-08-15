import Thread from "../models/thread.model";
import User from "../models/user.model";
import dbConnection from "../mongoConnection";

type params = {
  text: string,
  author: string,
  community: string,
  path: string
}

export const createThread = async ({text, author, community, path}: params) => {
  try {
    await dbConnection();
    const createdThread = await Thread.create({text, author, community: null});
    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdThread._id
      }
    })
  } catch (error: any) {
    console.log(`Error creating thread ${error.message}`);
    throw new Error(`Error creating thread ${error.message}`);
  }
};