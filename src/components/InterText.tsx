import React, { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export const InterLightText = ({ children }: PropsWithChildren) => {
  return <Text style={styles.interLightFont}>{children}</Text>;
};

export const InterText = ({ children }: PropsWithChildren) => {
  return <Text style={styles.interFont}>{children}</Text>;
};

export const InterMediumText = ({ children }: PropsWithChildren) => {
  return <Text style={styles.interMediumFont}>{children}</Text>;
};

export const InterSemiBoldText = ({ children }: PropsWithChildren) => {
  return <Text style={styles.interSemiBoldFont}>{children}</Text>;
};

export const InterBoldText = ({ children }: PropsWithChildren) => {
  return <Text style={styles.interBoldFont}>{children}</Text>;
};

export const InterBlackText = ({ children }: PropsWithChildren) => {
  return <Text style={styles.interBlackFont}>{children}</Text>;
};

const styles = StyleSheet.create({
  interLightFont: {
    fontFamily: "InterLight",
  },
  interFont: {
    fontFamily: "Inter",
  },
  interMediumFont: {
    fontFamily: "InterMedium",
  },
  interSemiBoldFont: {
    fontFamily: "InterSemiBold",
  },
  interBoldFont: {
    fontFamily: "InterBold",
  },
  interBlackFont: {
    fontFamily: "InterBlack",
  },
});
