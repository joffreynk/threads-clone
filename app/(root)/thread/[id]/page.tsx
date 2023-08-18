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
        isCommented={thread.children.lengh > 0}
      />

      <ThreadComment
        threadId={thread._id}
        currentUserImage={userInfo.image}
        currentUserId={userInfo.id}
      />
    </section>
  );
}
