import React, { useState } from "react";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Modal, Portal, Button, Text, Provider } from "react-native-paper";
import { ThemedFeatherIcon, TouchableOpacity } from "@/components/Themed";

const BottomModal = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <View>
        <TouchableOpacity onPress={showModal}>
          <ThemedFeatherIcon name="more-horizontal" />
        </TouchableOpacity>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Text>Example Modal. Click outside to dismiss.</Text>
            <Button onPress={hideModal}>Close Modal</Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 16,
  },
});

export default BottomModal;
