import { sidebarLinks } from '@/constants'
import { SideBarProps } from '@/types'
import React from 'react'

const LeftSideBar = () => {
  return (
    <section className='custom-scrollbar leftsidebar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {
          sidebarLinks.map((link: SideBarProps)=>(<div key={link.route}></div>) )
        }
      </div>
    </section>
  )
}

export default LeftSideBar