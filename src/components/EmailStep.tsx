import React, { useState } from "react";
import Lottie from "lottie-react-native";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  Pressable,
} from "react-native";
import {
  InterBlackText,
  InterBoldText,
  InterLightText,
  InterMediumText,
  InterText,
} from "./InterText";

type Props = {
  email?: string;
  finishing?: boolean;
  onStep?: (email: string) => void;
  onLogin?: () => void;
};

const EmailStep = ({
  email: emailProp = "",
  finishing = false,
  onStep,
  onLogin,
}: Props) => {
  const windowDimensions = Dimensions.get("window");
  const [email, setEmail] = useState<string>(emailProp);

  return (
    <>
      <Lottie
        style={styles.spaceAnimationContainer}
        source={require("../../assets/animations/login_space.json")}
      />
      <View
        style={[
          styles.container,
          {
            height: windowDimensions.height,
            display: finishing ? "none" : "flex",
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <InterBlackText>
            <Text style={styles.title}>First, Lets get you signed up...</Text>
          </InterBlackText>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ddd"
            textContentType="emailAddress"
            value={email}
            onChange={(e) => setEmail(e.nativeEvent.text)}
          />
        </View>
        <Pressable
          style={styles.loginContainer}
          onPress={() => onLogin && onLogin()}
        >
          <InterLightText>
            <Text style={styles.loginLine}>
              Already have an account?{" "}
              <InterMediumText>
                <Text style={styles.loginText}>Sign Up</Text>
              </InterMediumText>
            </Text>
          </InterLightText>
        </Pressable>
        <View style={styles.nextButtonContainer}>
          <Pressable
            style={{ width: "70%" }}
            onPress={() => onStep && onStep(email)}
          >
            <View style={styles.nextButton}>
              <InterBoldText>
                <Text style={styles.buttonText}>Next</Text>
              </InterBoldText>
            </View>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  spaceAnimationContainer: {
    position: "absolute",
    height: "55%",
    justifyContent: "flex-start",
  },
  titleContainer: {
    width: "70%",
    height: "40%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 30,
    color: "#fff",
  },
  formContainer: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  input: {
    height: 40,
    borderRadius: 10,
    width: "70%",
    paddingHorizontal: 10,
    borderColor: "#fff",
    color: "#fff",
    borderWidth: 1.5,
    fontFamily: "Inter",
  },
  nextButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#5050ff",
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 30,
    elevation: 3,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  loginContainer: {
    width: "70%",
    marginVertical: 10,
    alignItems: "flex-end",
  },
  loginLine: {
    fontSize: 15,
    color: "#fff",
  },
  loginText: {
    color: "#9090ff",
  },
});

export default React.memo(EmailStep);
