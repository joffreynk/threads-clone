import ThreadCard from "@/components/cards/ThreadCard";
import ThreadPost from "@/components/form/ThreadPost";
import ProfilePage from "@/components/shared/ProfileHeader";
import { getThreads } from "@/lib/actions/thread.actions";
import {  getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({params}: {params: {id: string}}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await getUserById(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
    const { threads } = await getThreads();


  return (
    <section>
      <ProfilePage />

      <div className="mt-10 flex flex-col gap-6">
        {threads.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUser={user?.id}
            parentId={childItem._id}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
}