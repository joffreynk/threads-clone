import UserCard from "@/components/cards/UserCard";
import { getUser, searchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function page() {

  const user = await currentUser();

  if (!user) return null;
  const userInfo = await getUser(user.id);
  if (!userInfo) return redirect("/onboarding");
  const {users} = await searchUsers({userId: user.id, searchString:''})

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* search user bar */}

      <div className="mt-14 flex flex-col gap-9">
        {users.length === 0 ? (
            <p className="no-result"> No Users found</p>
        ): (
            <>
            {users.map((person) => (<UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                image={person.image}
                personType="User"
                 />))}
            </>
        )}
      </div>
    </section>
  );
}
