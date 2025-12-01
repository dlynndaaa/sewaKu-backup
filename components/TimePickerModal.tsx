import React, { useState, useRef, useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isVisible: boolean;
  onConfirm: (time: string) => void;
  onCancel: () => void;
  title?: string;
};

export default function TimePickerModal({
  isVisible,
  onConfirm,
  onCancel,
  title = "Pilih Waktu",
}: Props) {
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        hourScrollRef.current?.scrollTo({ y: Math.max(0, selectedHour * 40 - 80), animated: false });
        minuteScrollRef.current?.scrollTo({ y: Math.max(0, selectedMinute * 40 - 80), animated: false });
      }, 100);
    }
  }, [isVisible]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formatTime = (hour: number, minute: number) => {
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  };

  const handleConfirm = () => {
    onConfirm(formatTime(selectedHour, selectedMinute));
  };

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={s.backdrop}>
        <ScrollView style={s.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={s.container}>
            <Text style={s.title}>{title}</Text>

            <View style={s.timeDisplay}>
              <Text style={s.timeValue}>{formatTime(selectedHour, selectedMinute)}</Text>
            </View>

            {/* Hour and Minute Picker */}
            <View style={s.pickerContainer}>
              {/* Hour Picker */}
              <View style={s.pickerSection}>
                <Text style={s.pickerLabel}>Jam</Text>
                <ScrollView
                  ref={hourScrollRef}
                  style={s.scrollPicker}
                  snapToInterval={40}
                  decelerationRate="fast"
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={s.pickerPadding}>
                    {hours.map((hour) => (
                      <TouchableOpacity
                        key={hour}
                        style={[
                          s.pickerItem,
                          selectedHour === hour && s.selectedPickerItem,
                        ]}
                        onPress={() => setSelectedHour(hour)}
                      >
                        <Text
                          style={[
                            s.pickerItemText,
                            selectedHour === hour && s.selectedPickerItemText,
                          ]}
                        >
                          {String(hour).padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Separator */}
              <Text style={s.separator}>:</Text>

              {/* Minute Picker */}
              <View style={s.pickerSection}>
                <Text style={s.pickerLabel}>Menit</Text>
                <ScrollView
                  ref={minuteScrollRef}
                  style={s.scrollPicker}
                  snapToInterval={40}
                  decelerationRate="fast"
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                >
                  <View style={s.pickerPadding}>
                    {minutes.map((minute) => (
                      <TouchableOpacity
                        key={minute}
                        style={[
                          s.pickerItem,
                          selectedMinute === minute && s.selectedPickerItem,
                        ]}
                        onPress={() => setSelectedMinute(minute)}
                      >
                        <Text
                          style={[
                            s.pickerItemText,
                            selectedMinute === minute && s.selectedPickerItemText,
                          ]}
                        >
                          {String(minute).padStart(2, "0")}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>

            {/* Quick Select Buttons */}
            <View style={s.quickSelectContainer}>
              <TouchableOpacity
                style={s.quickSelectBtn}
                onPress={() => {
                  setSelectedHour(7);
                  setSelectedMinute(0);
                }}
              >
                <Text style={s.quickSelectText}>07:00</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.quickSelectBtn}
                onPress={() => {
                  setSelectedHour(12);
                  setSelectedMinute(0);
                }}
              >
                <Text style={s.quickSelectText}>12:00</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.quickSelectBtn}
                onPress={() => {
                  setSelectedHour(17);
                  setSelectedMinute(0);
                }}
              >
                <Text style={s.quickSelectText}>17:00</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={s.quickSelectBtn}
                onPress={() => {
                  setSelectedHour(20);
                  setSelectedMinute(0);
                }}
              >
                <Text style={s.quickSelectText}>20:00</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={s.buttonGroup}>
              <TouchableOpacity style={[s.button, s.cancelBtn]} onPress={onCancel}>
                <Text style={s.cancelText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[s.button, s.confirmBtn]}
                onPress={handleConfirm}
              >
                <Text style={s.confirmText}>Pilih</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flex: 1,
    maxHeight: "90%",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    alignSelf: "center",
    marginVertical: "auto",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: "#0f1e4a",
    textAlign: "center",
    marginBottom: 16,
  },
  timeDisplay: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#0f1e4a",
    alignItems: "center",
  },
  timeValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0f1e4a",
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    height: 220,
  },
  pickerSection: {
    flex: 1,
    alignItems: "center",
  },
  pickerLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: 8,
  },
  scrollPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
  },
  pickerPadding: {
    paddingVertical: 80,
  },
  pickerItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  selectedPickerItem: {
    backgroundColor: "#0f1e4a",
  },
  pickerItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  selectedPickerItemText: {
    color: "#fff",
  },
  separator: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f1e4a",
    marginHorizontal: 4,
  },
  quickSelectContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 16,
  },
  quickSelectBtn: {
    width: "48%",
    backgroundColor: "#f3f4f6",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  quickSelectText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f1e4a",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#e5e7eb",
  },
  cancelText: {
    color: "#111827",
    fontWeight: "600",
  },
  confirmBtn: {
    backgroundColor: "#0f1e4a",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});
