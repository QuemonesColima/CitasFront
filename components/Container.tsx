import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { View } from "./Themed";

interface ContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
  },
});

export default Container;
