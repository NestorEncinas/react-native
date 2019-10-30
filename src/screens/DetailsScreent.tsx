import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationStackScreenProps } from "react-navigation-stack";

const DetailsScreen: React.FC<NavigationStackScreenProps> = ({
  navigation
}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home Page"
        onPress={() => navigation.navigate("Geolocation")}
      >
        Home
      </Button>
    </View>
  );
};

export default DetailsScreen;
