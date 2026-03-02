import {
  Text,
  ActivityIndicator,
  View,
  FlatList,
  Pressable,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useChats } from "@/hooks/useChats";
import { Ionicons } from "@expo/vector-icons";
import ChatItem from "@/components/ChatItem";
import EmptyUI from "@/components/EmptyUI";

const ChatTab = () => {
  const handlePressItem = (item: any) => {};
  const router = useRouter();
  const { data: chats, isLoading, error } = useChats();
  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-surface">
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );
  }
  if (error) {
    return (
      <View className="items-center justify-center flex-1 bg-surface">
        <Text className="text-red-500">Error Occur Get Chats</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={chats}
        keyExtractor={(item) => item.chatId}
        renderItem={({ item }) => (
          <ChatItem chat={item} onPress={() => handlePressItem(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingBottom: 24,
          paddingTop: 16,
          paddingHorizontal: 20,
        }}
        ListHeaderComponent={<Header />}
        ListEmptyComponent={
          <EmptyUI
            title="No chats yet"
            subtitle="Start a conversation!"
            iconName="chatbubbles-outline"
            iconColor="#6B6B70"
            iconSize={64}
            buttonLabel="New Chat"
            // onPressButton={() => router.push("/new-chat")}
          />
        }
      />
    </View>
  );
};

export default ChatTab;

function Header() {
  const router = useRouter();

  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">Chats</Text>
        <Pressable
          className="items-center justify-center rounded-full size-10 bg-primary"
          // onPress={() => router.push("/new-chat")}
        >
          <Ionicons name="create-outline" size={20} color="#0D0D0F" />
        </Pressable>
      </View>
    </View>
  );
}
