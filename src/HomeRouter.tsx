import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// Separate to /src/screen - the UI of the component
// /src/routes - All the router stuff

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> Lidska Troska</Text>
    </View>
  );
};

const HomeNavigator = createStackNavigator({
  Home: HomeScreen
});

export default createAppContainer(HomeNavigator);
