import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  InterBlackText,
  InterBoldText,
  InterLightText,
  InterMediumText,
  InterText,
} from "../components/InterText";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function navigateToSignUp() {
    navigation.navigate("SignUp");
  }

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.25, 0.6, 1]}
      colors={[
        "rgba(255,0,0,0.1)",
        "rgba(255,0,255, 0.1)",
        "rgba(255,255,0,0.1)",
      ]}
      style={styles.backgroundContainer}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <InterBlackText>
            <Text style={styles.title}>Alright, Log In!</Text>
          </InterBlackText>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            textContentType="emailAddress"
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
          />
          <View>
            <Pressable onPress={() => navigateToSignUp()}>
              <InterLightText>
                <Text style={styles.signUpLine}>
                  Don't have an account?{" "}
                  <InterMediumText>
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </InterMediumText>
                </Text>
              </InterLightText>
            </Pressable>
          </View>
        </View>
        <View style={styles.w100}>
          <Pressable style={[styles.w100, styles.center]}>
            <View style={styles.loginButton}>
              <InterBoldText>
                <Text style={styles.loginText}>Log In</Text>
              </InterBoldText>
            </View>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  w100: {
    width: "100%",
  },
  center: {
    alignItems: "center",
  },
  backgroundContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  container: {
    height: 350,
    width: "85%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    elevation: 6,
  },
  titleContainer: {
    width: "70%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
  },
  formContainer: {
    width: "70%",
    height: "40%",
    maxHeight: 150,
    alignItems: "flex-end",
  },
  input: {
    height: 40,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 5,
    borderWidth: 1.5,
    fontFamily: "Inter",
  },
  signUpLine: {
    fontSize: 15,
  },
  signUpText: {
    color: "#3030ff",
  },
  loginButton: {
    width: "75%",
    backgroundColor: "#5050ff",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 30,
    marginTop: 15,
    elevation: 3,
  },
  loginText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default LoginScreen;
