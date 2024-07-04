import React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import {
  View,
  TouchableOpacity,
  ThemedFeatherIcon,
  Text,
} from "@/components/Themed";

interface ServiceHeaderProps {
  image: string;
  title: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ image, title }) => {
  const route = useRouter();
  return (
    <View style={styles.headerContainer}>
      <ImageBackground source={{ uri: image }} style={styles.backgroundImage}>
        <View style={styles.overlay} />
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => route.back()}
          >
            <ThemedFeatherIcon name="arrow-left-circle" size={32} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <ThemedFeatherIcon name="more-horizontal" size={32} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{title}</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 152,
  },
  backgroundImage: {
    flex: 1,
    borderRadius: 16,
    paddingTop: 24,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  backButton: {
    padding: 8,
    backgroundColor: "transparent",
  },
  moreButton: {
    padding: 8,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 16,
    textAlign: "center",
  },
});

export default ServiceHeader;
