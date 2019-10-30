import { Platform, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreent";
import GeolocationTestScreen from "./screens/GeolocationTestScreen";

const HomeStack = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Geolocation: GeolocationTestScreen
  },
  {
    tabBarOptions: {
      style: {
        marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
    }
  }
);
// const DetailStack = createStackNavigator({ Details: DetailsScreen });

export default createAppContainer(HomeStack);
