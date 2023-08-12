'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton } from "@clerk/nextjs";

import { sidebarLinks } from '@/constants';
import { SideBarProps } from '@/types';

const Footer = () => {
    const pathname = usePathname();
    const router = useRouter();
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
              href={link.route}
              className={`bottombar_link ${isActive && "bg-primary-500"}`}
            >
              <Image src={link.imgURL} alt="nav image" width={24} height={24} />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">{link.label.split(' ')[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Footer