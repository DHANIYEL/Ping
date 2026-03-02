import { Text, ScrollView, ActivityIndicator, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useChats } from "@/hooks/useChats";

const ChatTab = () => {
  const router = useRouter();
  const { data: chats, isLoading, error } = useChats();
  // console.log(`Chats: ${chats} , isLoading: ${isLoading}, error: ${error}`);
  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-surface">
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Chat </Text>
    </ScrollView>
  );
};

export default ChatTab;
