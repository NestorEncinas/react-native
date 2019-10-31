import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  ImageBackground
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { ScaledSheet } from "react-native-size-matters";

interface GeoLocation {
  location: {
    coords: {
      altitude: number;
      longitude: number;
    };
  };
}
const GeolocationTestScreen = () => {
  // TODO: useReducer
  const [geolocation, setgeoLocation] = useState<GeoLocation>();
  // will hande if theres error
  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(false);
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  //   useEffect(() => {

  const WEATHER_API_KEY = "f0b5bf039eb471a0d6b80fc4f8ab3af7";

  // Life Cycle
  useEffect(() => {
    const obtainLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setError(true);
      }

      let location = await Location.getCurrentPositionAsync({});

      setgeoLocation({ location });
      const {
        coords: { latitude, longitude }
      } = location;

      let cityName = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${API_KEY}`
      );

      cityName = await cityName.json();

      console.log(JSON.stringify(cityName));

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
      );

      const data = await res.json();

      console.log("Data", data);
    };

    obtainLocation();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <StatusBar barStyle="light-content" />
      {/* <ImageBackground styles={styles.imageContainer} imageStyle={styles.image}> */}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text> Geolocation test: {JSON.stringify(geolocation)}</Text>
      </View>
      {/* </ImageBackground> */}
    </KeyboardAvoidingView>
  );
};

export default GeolocationTestScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover"
  }
});
