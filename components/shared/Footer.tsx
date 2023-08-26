'use client'

import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

import { sidebarLinks } from '@/constants';
import { SideBarProps } from '@/types';
import { useEffect, useState } from 'react';
import { getUser } from '@/lib/actions/user.actions';

const Footer = () => {
      const { userId } = useAuth();
      const pathname = usePathname();
      const [current, setCurrent] = useState("");
      const [isMounted, setIsMounted] = useState(false);
      const router = useRouter();

      useEffect(() => {
        const getCurrentUser = async () => {
          const userInfo = await getUser(userId || "");
          if (!userInfo) redirect("/sign-in");
          setCurrent(userInfo._id);
        };
        getCurrentUser();
        setIsMounted(true);
      }, [userId]);

      if (isMounted === false) return null;
      if (!current.length) return null;
  return (
    <section className="bottombar">
      <div className="bottombar_container">
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
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image src={link.imgURL} alt="nav image" width={24} height={24} />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">
                {link.label.split(" ")[0]}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Footer