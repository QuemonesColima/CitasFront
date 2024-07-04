import React from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text, TouchableOpacity } from "@/components/Themed";
import { useRouter } from "expo-router";

interface ProductCardProps {
  service: {
    id: string;
    name: string;
    imageUrl: string;
    location: string;
    description: string;
    schedule: string;
    rating: number;
  };
  baseRoute: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ service, baseRoute }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.cardContent}
      onPress={() => router.push(`${baseRoute}/${service.id}`)}
    >
      <Image source={{ uri: service.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.location}>{service.location}</Text>
        <Text>{service.description}</Text>
        <Text style={styles.schedule}>{service.schedule}</Text>
      </View>
      <Text style={styles.rating}>{service.rating}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {},
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    flexWrap: "wrap",
    marginVertical: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  title: { fontSize: 18, fontWeight: "regular" },
  details: {
    flex: 1,
    rowGap: 1,
  },
  location: { color: "blue" },
  schedule: {
    color: "green",
    fontWeight: "bold",
  },
  rating: {
    padding: 4,
    backgroundColor: "#f2f2f2",
    color: "black",
    borderRadius: 16,
  },
});

export default ProductCard;
