import React, { useState, useEffect, useReducer } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground
} from "react-native";

import { ScaledSheet } from "react-native-size-matters";

const weatherReducer = (state: any, action: any) => {
  switch (action.type) {
    case "fetching": {
      return {
        ...state,
        loading: false,
        error: false,
        location: action.payload.title,
        weather: action.payload.weather_state_name,
        temperature: action.payload.the_temp
      };
    }
    case "error": {
      return {
        ...state,
        loading: false,
        error: true
      };
    }
    default:
      return state;
  }
};

const initialState = {
  loading: false,
  error: false,
  location: "",
  temperature: "",
  weather: ""
};

const DetailsScreen = () => {
  // use reducer
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const { loading, error, location, temperature, weather } = state;
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getLocationId = async () => {
      let r;

      try {
        const res = await fetch(
          `https://www.metaweather.com/api/location/search/?query=${query}`
        );
        r = await res.json();
      } catch (e) {
        dispatch({ type: "error", payload: e });
      }

      const response = await fetch(
        `https://www.metaweather.com/api/location/${r[0].woeid}/`
      );

      let { title, consolidated_weather } = await response.json();
      let { weather_state_name, the_temp } = consolidated_weather[0];
      dispatch({
        type: "fetching",
        payload: { title, weather_state_name, the_temp }
      });
    };
    console.log("Effect Runs");
    getLocationId();
  }, [query]);

  console.log("State", state);
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/clear.jpeg")}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View>
          <Text style={[styles.largeText, styles.textStyle]}></Text>
          <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
          <Text style={[styles.largeText, styles.textStyle]}>
            {`${Math.round(temperature)}°`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <TextInput
            placeholder="Search any city"
            style={styles.textInput}
            autoCorrect={false}
            // value={query}
            // onChangeText={value => {
            //   setQuery(value);
            // }}
            onSubmitEditing={event => setQuery(event.nativeEvent.text)}
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default DetailsScreen;

const styles = ScaledSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
    flex: 1
    // backgroundColor: "#34495E"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "cover"
  },
  textContainer: {
    height: 60,
    paddingTop: 20,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    color: "#222"
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white"
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
});
