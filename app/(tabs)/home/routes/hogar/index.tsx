import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import Container from "@/components/Container";

export default function Hogar() {
  return (
    <Container>
      <Text style={styles.title}>Hogar</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
