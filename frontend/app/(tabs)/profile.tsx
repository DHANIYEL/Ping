import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const ProfileTab = () => {
  const { signOut } = useAuth();
  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-white">Profile</Text>
      <Pressable onPress={() => signOut()} className="p-5 mt-10 bg-red-500 ">
        <Text className="text-white ">Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileTab;
