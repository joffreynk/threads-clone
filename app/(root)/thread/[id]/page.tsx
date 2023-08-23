import ThreadCard from '@/components/cards/ThreadCard';
import ThreadComment from '@/components/form/ThreadComment';
import { getThreadById } from '@/lib/actions/thread.actions'
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function page({params}: {params : {id: string}}) {
  if(!params.id) return null;

  const user  = await currentUser()

  if(!user) return null;
  const userInfo = await getUser(user.id);
  if(!userInfo) return redirect('/onboarding');

  const thread = await getThreadById(params.id)
  if(!thread) return null;
  
  return (
    <section className="relative">
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
        isComment={thread.parentId ? true : false}
      />

      <ThreadComment
        threadId={thread._id}
        currentUserImage={userInfo.image}
        currentUserId={userInfo._id}
      />

      <div className="mt-10 flex flex-col gap-6">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUser={user?.id}
            parentId={thread._id}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={childItem.parentId ? true : false}
          />
        ))}
      </div>
    </section>
  );
}
