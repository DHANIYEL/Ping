import { View, Text, ScrollView } from "react-native";
import React from "react";

const ChatTab = () => {
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
