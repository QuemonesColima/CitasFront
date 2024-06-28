import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { useNavigation } from "expo-router";

const CalendarScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    toggleModal();
  };

  const hours = Array.from({ length: 13 }, (_, i) => i + 8); // Genera las horas de 8AM a 8PM

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDay]: {
            selected: true,
            marked: true,
            selectedColor: "blue",
          },
        }}
        style={styles.calendar}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Horario para {selectedDay}</Text>
          <ScrollView style={styles.scrollView}>
            {hours.map((hour) => (
              <View key={hour} style={styles.hourBlock}>
                <Text style={styles.hourText}>{`${hour}:00`}</Text>
                <View style={styles.appointmentBlock}>
                  <Text style={styles.appointmentText}>Sin citas</Text>
                </View>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("schedule-service")}
      >
        <Text style={styles.buttonText}>Agendar Nuevo Servicio</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("map")}
      >
        <Text style={styles.buttonText}>Buscar Servicios en el Mapa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  calendar: {
    marginBottom: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    width: "100%",
  },
  hourBlock: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  hourText: {
    width: 60,
    fontSize: 16,
    fontWeight: "bold",
  },
  appointmentBlock: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  appointmentText: {
    fontSize: 14,
    color: "#888",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CalendarScreen;
