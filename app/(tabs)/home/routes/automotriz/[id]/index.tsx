import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { View, Text, ScrollView } from "@/components/Themed";
import { Belleza } from "@/constants/Ejemplo";

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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.location}>{product.location}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.schedule}>{product.schedule}</Text>
      <Text style={styles.rating}>Rating: {product.rating}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
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
