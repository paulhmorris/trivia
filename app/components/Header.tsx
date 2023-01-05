import type { User } from "@prisma/client";
import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/lib/utils";

export function Header() {
  const user = useOptionalUser();
  return (
    <header className="flex items-center justify-between py-8 px-6 sm:px-4">
      <Link
        to="/"
        className="block text-2xl font-extrabold tracking-wide text-pink-700 "
      >
        Trivvia
      </Link>
      <div className="ml-auto flex items-center">
        {user ? <SignedInNav user={user} /> : <SignedOutNav />}
      </div>
    </header>
  );
}

function SignedInNav({ user }: { user: User }) {
  return <div>{user.email}</div>;
}

function SignedOutNav() {
  return (
    <div>
      <Link to="/login" className="font-medium">
        Login
      </Link>
    </div>
  );
}
