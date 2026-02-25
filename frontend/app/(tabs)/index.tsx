import { Text, ScrollView, Button } from "react-native";
import React from "react";
import * as Sentry from "@sentry/react-native";

const ChatTab = () => {
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Chat </Text>
      <Button
        title="Try!"
        onPress={() => {
          Sentry.captureException(new Error("First error"));
        }}
      />
    </ScrollView>
  );
};

export default ChatTab;
