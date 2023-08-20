import { getMyActivities, getUser, searchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await currentUser();

  if (!user) return null;
  const userInfo = await getUser(user.id);
  if (!userInfo) return redirect("/onboarding");

  const actitvies = await getMyActivities(userInfo._id);
  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {actitvies.length < 0 ? (
          <p className="no-result">No activity yet</p>
        ): (
          actitvies.map((activity) => (
            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
              <article className="activity-card">
                <Image
                src={activity.author.image}
                alt="profile photo"
                width={30}
                height={30}
                className="rounded-full object-cover"
                />
              </article>
            </Link>
          ))
        )}
      </section>
    </section>
  );
}
