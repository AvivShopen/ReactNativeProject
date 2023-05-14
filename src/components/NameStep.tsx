import React from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Lottie from "lottie-react-native";
import { InterBlackText, InterBoldText } from "./InterText";
import { Icon } from "react-native-elements";

type Props = {
  top: number;
  finishing?: boolean;
  firstName?: string;
  lastName?: string;
  onStep?: (firstName: string, lastName: string) => void;
  onBackStep?: (firstName: string, lastName: string) => void;
};

const NameStep = ({
  top,
  finishing = false,
  firstName: firstNameProp = "",
  lastName: lastNameProp = "",
  onStep,
  onBackStep,
}: Props) => {
  const windowDimensions = Dimensions.get("window");
  const [firstName, setFirstName] = React.useState<string>(firstNameProp);
  const [lastName, setLastName] = React.useState<string>(lastNameProp);

  return (
    <View style={[styles.container, { top, height: windowDimensions.height }]}>
      <View>
        <Lottie
          style={styles.cloudsAnimationContainer}
          source={require("../../assets/animations/login_clouds.json")}
          autoPlay
          loop
        />
      </View>

      <Pressable
        style={{ display: finishing ? "none" : "flex" }}
        onPress={() => onBackStep && onBackStep(firstName, lastName)}
      >
        <View style={styles.upButtonContainer}>
          <Icon name="arrowup" type="antdesign" color="#000" />
        </View>
      </Pressable>
      <View
        style={[{ display: finishing ? "none" : "flex" }, styles.boxContainer]}
      >
        <InterBlackText>
          <Text style={styles.title}>Now, Let's get to know your name</Text>
        </InterBlackText>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.nativeEvent.text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.nextButtonContainer}>
          <Pressable
            style={{ width: "100%" }}
            onPress={() => onStep && onStep(firstName, lastName)}
          >
            <View style={styles.nextButton}>
              <InterBoldText>
                <Text style={styles.buttonText}>Next</Text>
              </InterBoldText>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={{ marginTop: finishing ? "70%" : "0%" }}>
        <Lottie
          style={styles.paperPlaneAnimationContainer}
          source={require("../../assets/animations/login_paper_plane.json")}
          progress={0.2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
  },
  upButtonContainer: {
    marginBottom: 75,
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
  cloudsAnimationContainer: {
    width: "100%",
    height: 250,
    marginBottom: -125,
    justifyContent: "flex-start",
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

export default React.memo(NameStep);
