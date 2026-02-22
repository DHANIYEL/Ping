import { View, Text, ScrollView } from "react-native";
import React from "react";

const ProfileTab = () => {
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Profile</Text>
    </ScrollView>
  );
};

export default ProfileTab;
