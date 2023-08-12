import AccountProfile from "@/components/form/AccountProfile";

export default function OnBoarding() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-startpx-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use Threads
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile />
      </section>
    </main>
  );
}
