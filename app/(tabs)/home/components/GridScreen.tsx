import React from "react";
import { StyleSheet } from "react-native";
import { View, ScrollView } from "@/components/Themed";
import CardPlaces from "./CardPlaces";
import services from "@/constants/Services";
import { useRouter } from "expo-router";

const GridScreen: React.FC = () => {
  const navigation = useRouter();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.grid}
    >
      {services.map((service, index) => (
        <View key={index} style={styles.gridItem}>
          <CardPlaces
            title={service.title}
            imageUrl={service.imageUrl}
            onPress={() => navigation.push(service.route)}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  gridItem: {
    width: "48%",
    marginVertical: 16,
  },
});

export default GridScreen;
