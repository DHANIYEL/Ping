import { useAuthCallback } from "@/hooks/useAuth";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useRef } from "react";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false);

  useEffect(() => {
    console.log("Looking use effect");
    if (isSignedIn && !hasSynced.current && user) {
      console.log("Inside use effect");
      //   console.log("isSignedIn :", isSignedIn);
      //   console.log("user :", user);
      hasSynced.current = true;
      syncUser(undefined, {
        onSuccess: (data) => {
          console.log(" ✅ Auth Synced", data);
        },
        onError: (error) => {
          console.log("❌ Auth Sync Error", error);
        },
      });
    }
    if (!isSignedIn) hasSynced.current = false;
  }, [isSignedIn, user, syncUser]);
  return null;
};

export default AuthSync;
