import { getUsersThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

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
  const result = await getUsersThreads(accountId);

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
              : { name: thread.name, image: thread.image, _id: thread._id }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
          isComment={true}
        />
      ))}
    </section>
  );
}
