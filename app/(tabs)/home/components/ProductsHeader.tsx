import React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { ThemedFeatherIcon, Text, TouchableOpacity } from "@/components/Themed";
import { useRouter } from "expo-router";

interface ProductHeaderProps {
  title: string;
  image: string;
}

const ProductsHeader: React.FC<ProductHeaderProps> = ({ title, image }) => {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      <ImageBackground source={{ uri: image }} style={styles.backgroundImage}>
        <View style={styles.overlay} />
      </ImageBackground>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ThemedFeatherIcon name="arrow-left-circle" size={32} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 112,
    paddingTop: 8,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 8,
    top: 8,
    padding: 8,
    backgroundColor: "transparent",
  },
  title: {
    marginTop: 24,
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default ProductsHeader;
