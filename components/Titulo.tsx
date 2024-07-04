import React from "react";
import { Text } from "./Themed";
import { StyleSheet, TextProps } from "react-native";

interface TituloProps extends TextProps {
  text: string;
}

const Titulo: React.FC<TituloProps> = ({ text, style, ...props }) => {
  return (
    <Text style={[styles.title, style]} {...props}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 32, fontWeight: "bold", paddingTop: 8 },
});
export default Titulo;
