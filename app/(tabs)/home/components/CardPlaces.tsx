import React from "react";
import { Image, StyleSheet } from "react-native";
import { TouchableOpacity, Text } from "@/components/Themed";

interface CardPlacesProps {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

const CardPlaces: React.FC<CardPlacesProps> = ({
  title,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 88,
    borderRadius: 8,
  },
  title: {
    textAlign: "left",
    paddingVertical: 8,
    fontSize: 18,
  },
});

export default CardPlaces;
