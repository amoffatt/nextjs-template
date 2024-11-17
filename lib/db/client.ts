"use client"

import { useSession } from "next-auth/react";
import { useLayoutEffect, useState } from "react";
import { User } from "@prisma/client";
import { fetchUserByEmail } from "./actions";

/// { session: Session, user: Person | null | undefined }
/// If user is undefined, it is unknown if the user is logged in or not.
/// If user is null, the user is logged out.
export function useAppSession() {
  const session = useSession();
  const userModel = session?.data?.user;
  const email = userModel?.email;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"authenticated" | "unauthenticated" | "loading">("loading");
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (session.status === "unauthenticated") {
      setLoading(false)
      setStatus("unauthenticated")
    } else if (email) {
      fetchUserByEmail(email).then((user) => {
        setUser(user)
        setLoading(false)
        setStatus(user ? "authenticated" : "unauthenticated")
      }).catch((error) => {
        setLoading(false)
        setError(error.message)
        setStatus("unauthenticated")
        console.error("error fetching user profile", error)
      })
    }
  }, [email, session.status]);

  const result = { session, user, loading, status, error };
//   console.log("Session state:", result)

  return result;
};

export function useIsAdmin() {
  const { user } = useAppSession()
  return isAdminUser(user)
}

export function isAdminUser(user: User | null) {
  return user?.role === 'ADMIN'
}