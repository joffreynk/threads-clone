//app/page.tsx
import { UserButton } from "@clerk/nextjs";

export default function OnBoarding() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
