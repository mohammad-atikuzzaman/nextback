import SignOutBtn from "@/components/SignOutBtn";
import User from "@/components/User";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <User />
      <SignOutBtn />
    </main>
  );
}
