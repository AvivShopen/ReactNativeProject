import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import {
  InterBoldText,
  InterMediumText,
  InterBlackText,
  InterText,
  InterLightText,
} from "../components/InterText";
import Lottie from "lottie-react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const HomeScreen = ({ navigation }: Props) => {
  function navigateToSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <AnimatedLinearGradient
      style={[styles.fullScreen, styles.alignCenter]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.25, 0.6, 1]}
      colors={[
        "rgba(255,0,0,0.1)",
        "rgba(255,0,255, 0.1)",
        "rgba(255,255,0,0.1)",
      ]}
    >
      <View style={styles.titleContainer}>
        <InterBlackText>
          <Text style={styles.title}>Trolley</Text>
        </InterBlackText>
      </View>
      <View style={styles.subtitleContainer}>
        <InterLightText>
          <Text style={styles.subtitle}>
            Manage your shopping list with ease & simplicity!
          </Text>
        </InterLightText>
      </View>
      <View style={styles.animationContainer}>
        <Lottie
          source={require("../../assets/animations/landing_page.json")}
          autoPlay
          loop
        />
      </View>
      <View style={styles.getStartedButtonContainer}>
        <TouchableOpacity onPress={navigateToSignUp}>
          <View style={styles.getStartedButton}>
            <InterBoldText>
              <Text style={styles.getStartedText}>Get Started</Text>
            </InterBoldText>
          </View>
        </TouchableOpacity>
      </View>
    </AnimatedLinearGradient>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    width: "100%",
    height: "100%",
  },
  alignCenter: {
    alignItems: "center",
  },
  titleContainer: {
    height: "15%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 50,
  },
  subtitleContainer: {
    width: "80%",
    height: "15%",
    justifyContent: "center",
    alignContent: "flex-start",
  },
  subtitle: {
    fontSize: 25,
  },
  animationContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButtonContainer: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 3,
  },
  getStartedText: {
    fontSize: 20,
  },
});

export default HomeScreen;
