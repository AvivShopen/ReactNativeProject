import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View } from "react-native";
import ComponentsScreen from "./src/screens/ComponentsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

export type RootStackParamList = {
  Home: undefined;
  Components: undefined;
  Login: undefined;
};

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);

const AppContainer = createAppContainer(navigator);

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    InterLight: require("./assets/fonts/Inter-Light.otf"),
    Inter: require("./assets/fonts/Inter-Regular.otf"),
    InterMedium: require("./assets/fonts/Inter-Medium.otf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.otf"),
    InterBold: require("./assets/fonts/Inter-Bold.otf"),
    InterBlack: require("./assets/fonts/Inter-Black.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    fontsLoaded && (
      <View style={styles.globalStyles} onLayout={onLayoutRootView}>
        <AppContainer />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  globalStyles: {
    width: "100%",
    height: "100%",
    direction: "ltr",
  },
});
