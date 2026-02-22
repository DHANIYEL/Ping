import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";
function useSocialAuth() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { startSSOFlow } = useSSO();

  const handleAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    console.log(strategy);
    setIsLoading(strategy);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.log("Erro in Social Auth", error);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert("Error", `Failed to authenticate with ${provider}`);
      setIsLoading(null);
    }
  };
  return {
    isLoading,
    handleAuth,
  };
}
export default useSocialAuth;
