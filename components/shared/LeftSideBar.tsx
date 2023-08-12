'use client'

import { usePathname, useRouter} from 'next/navigation'
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from 'next/link'
import Image from 'next/image'


import { sidebarLinks } from '@/constants'
import { SideBarProps } from '@/types'

const LeftSideBar = () => {
  const pathname = usePathname()
  const router = useRouter()
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
              href={link.route}
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
              <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
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