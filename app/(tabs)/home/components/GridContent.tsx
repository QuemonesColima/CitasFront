import React from "react";
import ProductCard from "./ProductCard";
import { FlashList } from "@shopify/flash-list";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";

interface ContentGridProps {
  data: Array<{
    id: string;
    name: string;
    imageUrl: string;
    location: string;
    description: string;
    schedule: string;
    rating: number;
  }>;
  baseRoute: string;
}

const ContentGrid: React.FC<ContentGridProps> = ({ data, baseRoute }) => {
  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => (
          <ProductCard service={item} baseRoute={baseRoute} />
        )}
        estimatedItemSize={100}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 16, flex: 1 },
});

export default ContentGrid;
