import React from "react";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { View, Text, ScrollView } from "@/components/Themed";
import { Belleza } from "@/constants/Ejemplo";
import Container from "@/components/Container";
import ServiceHeader from "../../../components/ServiceHeader";

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  console.log("ID recibido:", id);

  const product = Belleza.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <>
      <ServiceHeader image={product.imageUrl} title={product.name} />
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.location}>{product.location}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.schedule}>{product.schedule}</Text>
          <Text>{product.Data.description}</Text>
        </ScrollView>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  schedule: {
    fontSize: 16,
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
  },
});
