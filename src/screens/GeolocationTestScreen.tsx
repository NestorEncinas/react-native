import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const GeolocationTestScreen = () => {
  // TODO: useReducer
  const [geolocation, setgeoLocation] = useState("");
  const [loading, isLoading] = useState(false);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  //   useEffect(() => {
  const obtainGeo = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const tete = JSON.stringify(pos);
      console.log("Location", tete);

      setgeoLocation(tete);
    });
  };
  //   }, []);

  console.log("AAAA", location);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text onPress={() => obtainGeo()}> Geolocation test: {geolocation}</Text>
    </View>
  );
};

export default GeolocationTestScreen;
