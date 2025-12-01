import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  isVisible: boolean;
  onConfirm: (date: string) => void;
  onCancel: () => void;
  title?: string;
  placeholder?: string;
};

export default function DatePickerModal({
  isVisible,
  onConfirm,
  onCancel,
  title = "Pilih Tanggal",
  placeholder = "mm/dd/yy",
}: Props) {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date(today.getFullYear(), today.getMonth(), 1));

  const formatDate = (date: Date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const getDaysInMonth = (date: Date) => {
    if (!(date instanceof Date)) return 0;
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    if (!(date instanceof Date)) return 0;
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    if (!(displayMonth instanceof Date)) {
      return [];
    }
    const daysInMonth = getDaysInMonth(displayMonth);
    const firstDay = getFirstDayOfMonth(displayMonth);
    const days: (number | null)[] = [];

    // Empty cells untuk hari sebelum bulan dimulai
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Hari-hari dalam bulan
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleSelectDay = (day: number) => {
    if (!(displayMonth instanceof Date)) return;
    const newDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
    setSelectedDate(newDate);
  };

  const handlePrevMonth = () => {
    if (!(displayMonth instanceof Date)) return;
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    if (!(displayMonth instanceof Date)) return;
    setDisplayMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1));
  };

  const handleConfirm = () => {
    onConfirm(formatDate(selectedDate));
  };

  const calendarDays = generateCalendarDays();
  const monthYear = displayMonth instanceof Date
    ? displayMonth.toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      })
    : "";

  const isSelectedDay = (day: number | null) => {
    if (!day || !(selectedDate instanceof Date) || !(displayMonth instanceof Date)) return false;
    return (
      day === selectedDate.getDate() &&
      displayMonth.getMonth() === selectedDate.getMonth() &&
      displayMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={s.backdrop}>
        <View style={s.container}>
          <Text style={s.title}>{title}</Text>

          {/* Month Navigation */}
          <View style={s.monthHeader}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <Ionicons name="chevron-back" size={24} color="#0f1e4a" />
            </TouchableOpacity>
            <Text style={s.monthText}>{monthYear}</Text>
            <TouchableOpacity onPress={handleNextMonth}>
              <Ionicons name="chevron-forward" size={24} color="#0f1e4a" />
            </TouchableOpacity>
          </View>

          {/* Day Headers */}
          <View style={s.dayHeadersRow}>
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
              <Text key={day} style={s.dayHeader}>
                {day}
              </Text>
            ))}
          </View>

          {/* Calendar Grid */}
          <View style={s.calendarGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  s.dayCell,
                  day === null && s.emptyCellc,
                  isSelectedDay(day) && s.selectedDayCell,
                ]}
                onPress={() => day && handleSelectDay(day)}
                disabled={!day}
              >
                <Text
                  style={[
                    s.dayText,
                    day === null && s.emptyDayText,
                    isSelectedDay(day) && s.selectedDayText,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Selected Date Display */}
          <View style={s.selectedDisplay}>
            <Text style={s.selectedLabel}>Tanggal Dipilih:</Text>
            <Text style={s.selectedValue}>{formatDate(selectedDate)}</Text>
          </View>

          {/* Buttons */}
          <View style={s.buttonGroup}>
            <TouchableOpacity style={[s.button, s.cancelBtn]} onPress={onCancel}>
              <Text style={s.cancelText}>Batal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[s.button, s.confirmBtn]} onPress={handleConfirm}>
              <Text style={s.confirmText}>Pilih</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    color: "#0f1e4a",
    textAlign: "center",
    marginBottom: 16,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f1e4a",
    textTransform: "capitalize",
  },
  dayHeadersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b7280",
    width: "14.28%",
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#f9fafb",
  },
  emptyCellc: {
    backgroundColor: "transparent",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  emptyDayText: {
    color: "transparent",
  },
  selectedDayCell: {
    backgroundColor: "#0f1e4a",
  },
  selectedDayText: {
    color: "#fff",
    fontWeight: "700",
  },
  selectedDisplay: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#0f1e4a",
  },
  selectedLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  selectedValue: {
    fontSize: 16,
    fontWeight: "700",
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
