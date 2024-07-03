import React from "react";
import { StyleSheet } from "react-native";
import Container from "@/components/Container";
import ContentGrid from "../../components/GridContent";
import ProductsHeader from "../../components/ProductsHeader";
import { Belleza } from "@/constants/Ejemplo";

export default function Automotriz() {
  return (
    <>
      <ProductsHeader
        title="Automotriz"
        image="https://images.unsplash.com/photo-1713813091434-fbc0870401ed?q=80&w=3412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Container>
        <ContentGrid data={Belleza} baseRoute={"/home/routes/automotriz"} />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({});
