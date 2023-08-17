import ThreadCard from '@/components/cards/ThreadCard';
import { getThreadById } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs';
import React from 'react'

export default async function page({params}: {params : {id: string}}) {
  if(!params.id) return null;

  const user  = await currentUser()

  if(!user) return null;

  const thread = await getThreadById(params.id)
  
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
    </section>
  );
}
