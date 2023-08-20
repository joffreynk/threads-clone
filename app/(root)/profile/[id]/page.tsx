import ThreadCard from "@/components/cards/ThreadCard";
import ProfilePage from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import { getThreads } from "@/lib/actions/thread.actions";
import {  getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({params}: {params: {id: string}}) {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userInfo = await getUserById(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
    const  {threads}  = await getThreads();


  return (
    <section>
      <ProfilePage
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imageUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.icon} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label} </p>
                {tab.label === "Thraeds" && <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">{userInfo.threads.length}</p>}
              </TabsTrigger>
            ))}
          </TabsList>
          {
            profileTabs.map((tab) => (
              <TabsContent key={tab.icon} value={tab.value} className="w-full text-light-1">
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType='User'
                />
              </TabsContent>
            ))
          }
        </Tabs>
      </div>

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