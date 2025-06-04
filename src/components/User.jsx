import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export default async function User() {
  const session = await getServerSession(authOptions);

  if (!session) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
      <p>Your role: {session.user.role}</p>
    </div>
  );
}
