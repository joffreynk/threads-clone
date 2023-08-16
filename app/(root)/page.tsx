import { getThreads } from "@/lib/actions/thread.actions"

export default async function Home() {

  const {threads, isNext} = await getThreads(1, 30)

  return (
    <main >
      <h1 className="text-white">Threads</h1>
    </main>
  )
}
