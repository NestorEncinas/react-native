import React, { useContext } from "react";
import { View, Text, Button, Image } from "react-native";

/**
 * Use Navigation Hook - https://github.com/react-navigation/hooks/blob/master/src/Hooks.ts
 */

import {
  NavigationStackScreenProps,
  NavigationStackScreenComponent
} from "react-navigation-stack";

interface HomeScreenProps extends NavigationStackScreenProps {}

const HomeScreen: NavigationStackScreenComponent<HomeScreenProps> = ({
  navigation
}) => {
  return (
    <>
      <Image
        source={require("../assets/homePage.jpeg")}
        style={{ width: 450 }}
      />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> Lidska Troska</Text>
        <Button
          title="Go to Details Page"
          onPress={() => navigation.navigate("Details")}
        >
          Details
        </Button>
      </View>
    </>
  );
};

HomeScreen.navigationOptions = {
  headerRight: () => (
    <Button
      onPress={() => alert("This is a button!")}
      title="Info"
      color="#fff"
    />
  )
};

export default HomeScreen;
