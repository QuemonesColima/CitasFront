import React from "react";
import { StyleSheet } from "react-native";
import Container from "@/components/Container";
import Titulo from "@/components/Titulo";
import GridScreen from "./components/GridScreen";

export default function HomeScreen() {
  return (
    <Container>
      <Titulo text="Explora las opciones" />
      <GridScreen />
    </Container>
  );
}

const styles = StyleSheet.create({});
