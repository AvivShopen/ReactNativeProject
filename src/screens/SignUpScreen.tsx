import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Lottie, { AnimatedLottieViewProps } from "lottie-react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "react-navigation-stack/lib/typescript/src/vendor/types";
import { LinearGradient } from "expo-linear-gradient";
import {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo,
  set,
} from "react-native-reanimated";
import NameStep from "../components/NameStep";
import EmailStep from "../components/EmailStep";
import PasswordStep from "../components/PasswordStep";
import {
  InterBlackText,
  InterBoldText,
  InterMediumText,
  InterText,
} from "../components/InterText";

interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
};

const Step = {
  EMAIL: 0,
  NAME: 1,
  PASSWORD: 2,
};

const START_STEP = Step.EMAIL;

const Phase = {
  PROGRESS: 0,
  FINISHING: 1,
  FINISHED: 2,
};

const START_PHASE = Phase.PROGRESS;

const SignUpScreen = ({ navigation }: Props) => {
  // Constants & Values
  const windowDimensions = Dimensions.get("window");
  const ANIMATION_GRADIENT_HEIGHT = windowDimensions.height * 2;
  const STEPS_GRADIENT_HEIGHT = windowDimensions.height * 4;
  const FIRST_COLOR_STOP = 0.33;
  const SCROLL_DOWN_ANIMATION_DURATION = 1000;
  const TAKEOFF_PERIOD = 1000;
  const FLIGHT_DURATION = 6000;
  const ASCEND_DURATION = 1000;
  const LOADING_PERIOD = 100;
  const StepHeights = {
    [Step.EMAIL]: ANIMATION_GRADIENT_HEIGHT - 0.07,
    [Step.NAME]:
      ANIMATION_GRADIENT_HEIGHT +
      windowDimensions.height * (1 + FIRST_COLOR_STOP),
    [Step.PASSWORD]: ANIMATION_GRADIENT_HEIGHT + windowDimensions.height * 3,
  };
  const START_SCROLL_Y = StepHeights[START_STEP] * 1.02;

  // Hooks
  const scrollContainerRef = useRef<ScrollView>(null);
  const [user, setUser] = useState<IUser>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [step, setStep] = useState<number>(START_STEP);
  const [animating, setAnimating] = useState<number>(-1);
  const [phase, setPhase] = useState<number>(START_PHASE);
  const [rocketProps, setRocketProps] =
    useState<Partial<AnimatedLottieViewProps | null>>(null);
  const scroll = useRef(new Animated.Value(START_SCROLL_Y));
  const rocketProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    scrollContainerRef.current &&
      scrollContainerRef.current.scrollTo({
        y: START_SCROLL_Y,
        animated: false,
      });
  }, []);

  useEffect(() => {
    if (phase === Phase.PROGRESS && animating !== -1) {
      scroll.current.addListener((animation) => {
        scrollContainerRef.current &&
          scrollContainerRef.current.scrollTo({
            y: animation.value,
            animated: false,
          });
      });

      setTimeout(() => {
        Animated.timing(scroll.current, {
          toValue: StepHeights[step] * 1.02,
          duration: SCROLL_DOWN_ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }).start();

        setTimeout(() => {
          setAnimating(-1);
        }, SCROLL_DOWN_ANIMATION_DURATION);
      }, LOADING_PERIOD);

      return () => scroll.current.removeAllListeners();
    }
  }, [step]);

  useEffect(() => {
    if (phase === Phase.FINISHING) {
      scroll.current.addListener((animation) => {
        scrollContainerRef.current &&
          scrollContainerRef.current.scrollTo({
            y: animation.value,
            animated: false,
          });
      });

      setTimeout(() => {
        rocketProgress.current.addListener((animation) => {
          setRocketProps({
            progress: animation.value,
            style: [styles.rocketAnimationContainer, { bottom: 90 }],
          });
        });

        Animated.timing(rocketProgress.current, {
          toValue: 0.55,
          duration: TAKEOFF_PERIOD,
          useNativeDriver: true,
          easing: Easing.linear,
        }).start();

        setTimeout(() => {
          rocketProgress.current.removeAllListeners();
          Animated.timing(scroll.current, {
            toValue: 0,
            duration: FLIGHT_DURATION,
            useNativeDriver: true,
            easing: Easing.linear,
          }).start();

          setTimeout(() => {
            scroll.current.removeAllListeners();

            rocketProgress.current.addListener((animation) => {
              setRocketProps({
                progress: animation.value,
                style: [
                  styles.rocketAnimationContainer,
                  { bottom: 90 + ((animation.value - 0.55) / 0.45) * 400 },
                ],
              });
            });

            Animated.timing(rocketProgress.current, {
              toValue: 1,
              duration: ASCEND_DURATION,
              useNativeDriver: true,
              easing: Easing.linear,
            }).start();

            setTimeout(() => {
              rocketProgress.current.removeAllListeners();
              rocketProgress.current = new Animated.Value(0);
              scroll.current = new Animated.Value(0);
              setPhase(Phase.FINISHED);
              setRocketProps(null);
            }, ASCEND_DURATION);
          }, FLIGHT_DURATION);
        }, TAKEOFF_PERIOD);
      }, LOADING_PERIOD);

      return () => scroll.current.removeAllListeners();
    }
  }, [phase]);

  function goToStep(newStep: number) {
    if (animating === -1) {
      setAnimating(step);
      setStep(newStep);
    }
  }

  return (
    <>
      {phase === Phase.FINISHED && (
        <Lottie
          source={require("../../assets/animations/login_fireworks.json")}
          style={{
            position: "absolute",
            bottom: -300,
            zIndex: 1,
          }}
          autoPlay
          loop
        />
      )}
      <ScrollView
        ref={scrollContainerRef}
        bounces={false}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          style={[
            styles.animationGradientContainer,
            { height: ANIMATION_GRADIENT_HEIGHT },
          ]}
          locations={[0.3, 0.5, 0.7, 1]}
          colors={[
            "rgba(0,0,20,1)",
            "rgba(0,0,50,1)",
            "rgba(50,0,100,1)",
            "#462774fd",
          ]}
        >
          {/* <Image source={require("../../assets/white_stars.png")} /> */}
          {phase === Phase.FINISHED && (
            <>
              <InterBlackText>
                <Text style={{ color: "white", fontSize: 30 }}>
                  Welcome, {user.firstName}!
                </Text>
              </InterBlackText>
              <View style={{ marginTop: 5 }}>
                <InterMediumText>
                  <Text style={{ color: "white", fontSize: 20 }}>
                    We're happy to have you with us
                  </Text>
                </InterMediumText>
              </View>
              <Pressable>
                <View
                  style={{
                    backgroundColor: "#5050ff",
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginTop: 30,
                  }}
                >
                  <InterMediumText>
                    <Text style={{ color: "white", fontSize: 20 }}>
                      Lets start!
                    </Text>
                  </InterMediumText>
                </View>
              </Pressable>
            </>
          )}
        </LinearGradient>
        <LinearGradient
          style={[styles.container, { height: STEPS_GRADIENT_HEIGHT }]}
          locations={[
            FIRST_COLOR_STOP,
            FIRST_COLOR_STOP,
            FIRST_COLOR_STOP + 0.02,
            0.94,
            0.94,
            1,
          ]}
          colors={[
            "rgba(255,255,255,1)",
            "rgba(255,255,255,1)",
            "rgba(50,50,255,0.5)",
            "rgba(255,255,255, 1)",
            "rgba(100,100,100,0.5)",
            "rgba(100,100,100,0.5)",
          ]}
        >
          {(phase === Phase.FINISHING ||
            animating === Step.EMAIL ||
            step === Step.EMAIL) && (
            <EmailStep
              email={user.email}
              finishing={phase === Phase.FINISHING}
              onStep={(email) => {
                setUser((user) => ({ ...user, email }));
                goToStep(Step.NAME);
              }}
              onLogin={() => navigation.navigate("Login")}
            />
          )}
          {(phase === Phase.FINISHING ||
            animating === Step.NAME ||
            step === Step.NAME) && (
            <NameStep
              top={StepHeights[Step.NAME] - ANIMATION_GRADIENT_HEIGHT}
              finishing={phase === Phase.FINISHING}
              firstName={user.firstName}
              lastName={user.lastName}
              onBackStep={(firstName, lastName) => {
                setUser((user) => ({
                  ...user,
                  firstName,
                  lastName,
                }));
                goToStep(Step.EMAIL);
              }}
              onStep={(firstName, lastName) => {
                setUser((user) => ({
                  ...user,
                  firstName,
                  lastName,
                }));
                goToStep(Step.PASSWORD);
              }}
            />
          )}
          {(phase === Phase.FINISHING ||
            animating === Step.PASSWORD ||
            step === Step.PASSWORD) && (
            <PasswordStep
              top={
                StepHeights[Step.PASSWORD] * 0.96 - ANIMATION_GRADIENT_HEIGHT
              }
              finishing={phase === Phase.FINISHING}
              onBackStep={(password) => {
                setUser((user) => ({ ...user, password }));
                goToStep(Step.NAME);
              }}
              onStep={(password) => {
                setUser((user) => ({ ...user, password }));
                setPhase(Phase.FINISHING);
              }}
            />
          )}
        </LinearGradient>
        {rocketProps == null && (
          <Lottie
            style={styles.rocketAnimationContainer}
            source={require("../../assets/animations/login_rocket.json")}
          />
        )}
      </ScrollView>
      {rocketProps && (
        <Lottie
          source={require("../../assets/animations/login_rocket.json")}
          {...rocketProps}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  rocketAnimationContainer: {
    width: "100%",
    height: 250,
    position: "absolute",
    bottom: 90,
  },
  animationGradientContainer: {
    alignItems: "center",
    paddingTop: 300,
  },
});

export default SignUpScreen;
