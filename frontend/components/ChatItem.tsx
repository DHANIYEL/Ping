import { View, Text, Pressable } from "react-native";
import React from "react";
import { Chat } from "@/type";
import { Image } from "expo-image";
import { formatDistanceToNow } from "date-fns";

const ChatItem = ({ chat, onPress }: { chat: Chat; onPress: () => void }) => {
  console.log("chat vde ethy:", chat);
  const participants = chat.participantId;
  console.log("participants:", participants);
  const isOnline = true;
  const isTyping = false;
  const hasUnread = false;
  return (
    <Pressable
      className="flex-row items-center py-3 active:opacity-70"
      onPress={onPress}
    >
      <View className="relative">
        <Image
          source={{ uri: participants.avatar }}
          className="w-16 h-16 rounded-full"
          contentFit="cover"
        />
        {isOnline && (
          <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
        )}
      </View>
      <View className="flex-1 ml-4">
        <View className="flex-row items-center justify-between">
          <Text
            className={`text-base font-medium ${hasUnread ? "text-primary" : "text-foreground"}`}
          >
            {participants.username}
          </Text>

          <View className="flex-row items-center gap-2">
            {hasUnread && (
              <View className="w-2.5 h-2.5 bg-primary rounded-full" />
            )}
            <Text className="text-xs text-subtle-foreground">
              {chat.lastMessageAt
                ? formatDistanceToNow(new Date(chat.lastMessageAt), {
                    addSuffix: false,
                  })
                : ""}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatItem;
