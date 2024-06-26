import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfilePage from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import {fetchCommunityDetails} from '@/lib/actions/community.actions'
import { communityTabs } from "@/constants";

export default async function page({params}: {params: {id: string}}) {
  const user = await currentUser();
  
  if(!user) return null;

  console.log('LOGGED IN USER WAS AVAILABLE');
  

  const communityDetails = await fetchCommunityDetails(params.id)


  return (
    <section>
      <ProfilePage
        accountId={communityDetails._id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imageUrl={communityDetails.image}
        bio={communityDetails.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.icon} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label} </p>
                {tab.label === "Thraeds" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {communityDetails.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
            <TabsContent
              value='threads'
              className="w-full text-light-1"
            >
              <ThreadsTab
                currentUserId={user.id}
                accountId={communityDetails.id}
                accountType="User"
              />
            </TabsContent>
        </Tabs>
      </div>

    </section>
  );
}