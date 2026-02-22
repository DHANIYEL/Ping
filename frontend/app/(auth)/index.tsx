import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useSocialAuth from "@/hooks/useSocialAuth"
const AuthScreen = () => {
  const { width, height } = Dimensions.get("window");
  const { handleAuth, isLoading } = useSocialAuth();
  const isLoadings = isLoading !== null;
  return (
    <View className="flex-1 bg-surface-dark">
      <View className="absolute inset-0 overflow-hidden"></View>

      <SafeAreaView className="flex-1">
        <View className="items-center pt-10">
          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: 100, height: 100, marginVertical: -20 }}
            contentFit="contain"
          />
          <Text className="font-serif text-4xl font-bold tracking-wider uppercase text-primary">
            Ping
          </Text>
        </View>

        <View className="items-center justify-center flex-1 px-8">
          <Image
            source={require("../../assets/images/auth.png")}
            style={{ width: width - 48, height: height * 0.3 }}
            contentFit="contain"
          />
        </View>
        <View className="items-center mt-6">
          <Text className="font-sans text-5xl font-bold text-center text-white">
            Connect & Chat
          </Text>
          <Text className="font-mono text-3xl font-bold text-center text-primary">
            Seemlessly
          </Text>
        </View>
        <View className="flex-row gap-4 px-5 mt-10">
          {/* GOOGLE BTN */}
          <Pressable
            className="flex-1 flex-row items-center justify-center gap-2 bg-white/95 py-4 rounded-2xl active:scale-[0.97]"
            disabled={isLoadings}
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
            onPress={() => !isLoading && handleAuth("oauth_google")}
          >
            {isLoading === "oauth_google" ? (
              <ActivityIndicator size="small" color="#1a1a1a" />
            ) : (
              <>
                <Image
                  source={require("../../assets/images/google.png")}
                  style={{ width: 20, height: 20 }}
                  contentFit="contain"
                />
                <Text className="text-sm font-semibold text-gray-900">
                  Google
                </Text>
              </>
            )}
          </Pressable>

          {/* APPLE BTN */}
          <Pressable
            className="flex-1 flex-row items-center justify-center gap-2 bg-white/10 py-4 rounded-2xl border border-white/20 active:scale-[0.97]"
            disabled={isLoadings}
            accessibilityRole="button"
            accessibilityLabel="Continue with Apple"
            onPress={() => !isLoading && handleAuth("oauth_apple")}
          >
            {isLoading === "oauth_apple" ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="logo-apple" size={20} color="#FFFFFF" />
                <Text className="text-sm font-semibold text-foreground">
                  Apple
                </Text>
              </>
            )}
          </Pressable>
        </View>
        <View className="flex items-center justify-center">
          <Text className="w-full max-w-sm pt-10 text-xs text-center text-white">
            By continuing, you agree to our Terms of Service and acknowledge you
            have read our Privacy Policy
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AuthScreen;
