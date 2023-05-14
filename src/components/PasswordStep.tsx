import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { InterBlackText, InterBoldText } from "./InterText";

type Props = {
  top: number;
  finishing?: boolean;
  password?: string;
  onStep?: (password: string) => void;
  onBackStep?: (password: string) => void;
};

const PasswordStep = ({
  top,
  finishing = false,
  password: passwordProp = "",
  onStep,
  onBackStep,
}: Props) => {
  const windowDimensions = Dimensions.get("window");
  const [password, setPassword] = useState<string>(passwordProp);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            top,
            height: windowDimensions.height,
            display: finishing ? "none" : "flex",
          },
        ]}
      >
        <Pressable onPress={() => onBackStep && onBackStep(password)}>
          <View style={styles.upButtonContainer}>
            <Icon name="arrowup" type="antdesign" color="#000" />
          </View>
        </Pressable>
        <View style={styles.boxContainer}>
          <InterBlackText>
            <Text style={styles.title}>Up last, Choose your password</Text>
          </InterBlackText>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              textContentType="password"
              placeholder="Password"
            />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Confirm Password"
            />
          </View>
          <View style={styles.nextButtonContainer}>
            <Pressable
              style={{ width: "100%" }}
              onPress={() => onStep && onStep(password)}
            >
              <View style={styles.nextButton}>
                <InterBoldText>
                  <Text style={styles.buttonText}>Finish</Text>
                </InterBoldText>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  upButtonContainer: {
    marginTop: 200,
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0.5,
  },
  title: {
    fontSize: 30,
  },
  boxContainer: {
    width: "80%",
    height: "40%",
    borderRadius: 10,
    justifyContent: "space-evenly",
    elevation: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 15,
    marginHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    height: "50%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderRadius: 10,
    width: "100%",
    paddingHorizontal: 10,
    borderWidth: 1.5,
    fontFamily: "Inter",
  },
  paperPlaneAnimationContainer: {
    width: "100%",
    height: 250,
    marginTop: 30,
    justifyContent: "flex-start",
  },
  nextButtonContainer: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
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
});

export default PasswordStep;
