import ThreadPost from '@/components/form/ThreadPost';
import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const user  = await currentUser();
    if(!user) redirect('/sign-in')
    const userInfo = await getUser(user?.id.toString());
    if (!userInfo.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <ThreadPost userId={userInfo._id} />
    </>
  );
}

