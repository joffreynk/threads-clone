import { getUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
    const user  = await currentUser();
    if(!user) redirect('/sign-in')
    const userInfo = await getUser(user?.id.toString());
    if(!userInfo.onboarding) redirect('/onboarding');
    
  return (
    <div>page</div>
  )
}

