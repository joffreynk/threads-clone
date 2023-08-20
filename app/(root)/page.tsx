import ThreadCard from "@/components/cards/ThreadCard"
import { getThreads } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user  = await currentUser()
  if (!user) return redirect('/sign-in');

  const {threads, isNext} = await getThreads(1, 30)

  return (
    <>
      <h1 className="head-text text-left">Threads</h1>
      <section className="mt-9 flex flex-col gap-10">
        {threads.length === 0 ? (
          <p className="no-result">No thread found</p>
        ) : (
          threads.map((thread) => (
            <ThreadCard
              key={thread._id}
              id={thread._id}
              currentUser={user?.id}
              parentId={thread.parentId}
              content={thread.text}
              author={thread.author}
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
            />
          ))
        )}
      </section>
    </>
  );
}
