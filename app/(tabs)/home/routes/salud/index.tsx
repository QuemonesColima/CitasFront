import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "@/components/Themed";
import Container from "@/components/Container";

export default function Salud() {
  return (
    <Container>
      <Text style={styles.title}>Salud</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});