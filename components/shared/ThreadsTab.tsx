import { getUsersThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

type Props = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: Props) {
  const result = accountType === 'User'? await getUsersThreads(accountId) : await fetchCommunityPosts(accountId);

  console.log('RESULTS', result.threads[0].author);
  

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUser={currentUserId}
          parentId={thread._id}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, _id: result._id }
              : { name: thread.author.name, image: thread.author.image, _id: thread.author._id }
          }
          community={result}
          createdAt={thread.createdAt}
          comments={thread.children}
          isComment={thread.parentId ? true : false}
        />
      ))}
    </section>
  );
}
