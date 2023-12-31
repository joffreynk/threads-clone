import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import TopNavBar from '@/components/shared/topnavbar'
import LeftSideBar from '@/components/shared/LeftSideBar'
import RightSideBar from '@/components/shared/RightSideBar'
import Footer from '@/components/shared/Footer'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thread clone app',
  description: 'created by Joffrey',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}  bg-dark-1`}>
          <TopNavBar />
          <main className="flex">
            <LeftSideBar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightSideBar />
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
