import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const AuthLayout = () => {
  if (true) return <Redirect href={"/(tabs)"} />;
  return (
    <View className=" mt-20 ml-10">
      <Text>AuthLayout</Text>
    </View>
  );
};

export default AuthLayout;
