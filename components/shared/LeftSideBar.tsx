'use client'

import { redirect, usePathname} from 'next/navigation'
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';

import { sidebarLinks } from '@/constants'
import { SideBarProps } from '@/types'
import { getUser } from '@/lib/actions/user.actions';

const LeftSideBar = () => {
  const { userId } = useAuth();
  const pathname = usePathname()
  const [current, setCurrent] = useState(userId ||'')
  if (!userId) redirect("/sign-in");

  // useEffect(() => {
  //   const getCurrentUser = async () => {
  //     const userInfo = await getUser(userId || "");
  //     if (!userInfo) redirect("/onboarding");
  //     setCurrent(userInfo._id.toString());
  //   };
  //   getCurrentUser();
  // }, [userId]);

  if(!current.length) return null;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link: SideBarProps) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              key={link.route}
              href={
                link.route === "/profile"
                  ? `${link.route}/${current}`
                  : link.route
              }
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image src={link.imgURL} alt="nav image" width={24} height={24} />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
        <div className="hidden md:flex gap-2 items-center pl-4 pt-16 cursor-pointer">
          <SignedIn>
            <div className="flex cursor-pointer">
              <SignOutButton>
                <Image
                  src="/assets/logout.svg"
                  alt="logo out"
                  width={24}
                  height={24}
                />
              </SignOutButton>
            </div>
          </SignedIn>
          <p className="text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
}

export default LeftSideBar