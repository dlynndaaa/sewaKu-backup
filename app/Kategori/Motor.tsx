import { Responsive } from "@/src/constants/responsive";
import { useNavigation } from "@react-navigation/native";
import { useState, useLayoutEffect } from "react";
import { ActivityIndicator, Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { CarCard } from "../../components/CarCard";
import { CarTypeFilter } from "../../components/CarTypeFilter";
import { SearchBar } from "../../components/SearchBar";

const { height } = Dimensions.get("window");

// Dummy data untuk Motor
const dummyMotor = [
  {
    id: "MOT001",
    code: "MOT001",
    name: "Honda CB150R Streetfire",
    price: "350.000",
    pricePerDay: 350000,
    location: "Jakarta Pusat",
    lokasi: "Jakarta Pusat",
    image: require("@/assets/images/audi.jpg"),
    imageName: "honda-cb150r",
    transmission: "Manual" as const,
    seats: 2,
    bagCapacity: "Small",
    description: "Motor sport 150cc dengan performa responsif dan irit bahan bakar, cocok untuk daily rider.",
    carType: "City Car" as const,
  },
  {
    id: "MOT002",
    code: "MOT002",
    name: "Yamaha NMAX 155 ABS",
    price: "400.000",
    pricePerDay: 400000,
    location: "Surabaya",
    lokasi: "Surabaya",
    image: require("@/assets/images/audi.jpg"),
    imageName: "yamaha-nmax",
    transmission: "Automatic" as const,
    seats: 2,
    bagCapacity: "Medium",
    description: "Skuter premium 155cc dengan ABS dan desain modern, nyaman untuk perjalanan harian.",
    carType: "City Car" as const,
  },
  {
    id: "MOT003",
    code: "MOT003",
    name: "Kawasaki Ninja 250 SL",
    price: "500.000",
    pricePerDay: 500000,
    location: "Bandung",
    lokasi: "Bandung",
    image: require("@/assets/images/audi.jpg"),
    imageName: "kawasaki-ninja",
    transmission: "Manual" as const,
    seats: 2,
    bagCapacity: "Small",
    description: "Motor sport 250cc bermesin 4-stroke, cocok untuk yang mencari performa dan efisiensi bahan bakar.",
    carType: "City Car" as const,
  },
  {
    id: "MOT004",
    code: "MOT004",
    name: "Suzuki GSX-R150",
    price: "380.000",
    pricePerDay: 380000,
    location: "Medan",
    lokasi: "Medan",
    image: require("@/assets/images/audi.jpg"),
    imageName: "suzuki-gsx-r150",
    transmission: "Manual" as const,
    seats: 2,
    bagCapacity: "Small",
    description: "Sport 150cc dengan teknologi terkini, desain agresif dan handling yang sempurna.",
    carType: "City Car" as const,
  },
  {
    id: "MOT005",
    code: "MOT005",
    name: "Honda PCX 160",
    price: "420.000",
    pricePerDay: 420000,
    location: "Yogyakarta",
    lokasi: "Yogyakarta",
    image: require("@/assets/images/audi.jpg"),
    imageName: "honda-pcx",
    transmission: "Automatic" as const,
    seats: 2,
    bagCapacity: "Medium",
    description: "Skuter matik 160cc dengan fitur lengkap, bahan bakar efisien dan nyaman dikendarai.",
    carType: "City Car" as const,
  },
  {
    id: "MOT006",
    code: "MOT006",
    name: "Yamaha YZF-R15 V4",
    price: "450.000",
    pricePerDay: 450000,
    location: "Lampung",
    lokasi: "Lampung",
    image: require("@/assets/images/audi.jpg"),
    imageName: "yamaha-yzf-r15",
    transmission: "Manual" as const,
    seats: 2,
    bagCapacity: "Small",
    description: "Sport 150cc berkualitas tinggi dengan teknologi VVA, desain aerodinamis dan performa maksimal.",
    carType: "City Car" as const,
  },
];

const carTypes = ["All", "Sport", "Skuter", "Touring", "Cruiser", "Matic"];

export default function Motor() {
  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");
  const [loading] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Filter berdasarkan search dan type
  const filteredMotor = dummyMotor.filter((motor) => {
    const matchesSearch = motor.name.toLowerCase().includes(search.toLowerCase()) ||
                         motor.lokasi.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || 
                       motor.name.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  // Hitung padding top responsif berdasarkan tinggi screen
  const getResponsivePaddingTop = () => {
    if (height < 700) return 8;
    if (height < 800) return 12;
    if (height < 900) return 16;
    return 20;
  };

  return (
    <ImageBackground
      source={require("../../assets/images/Jenismobilbg.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={[styles.screenContainer, { paddingTop: getResponsivePaddingTop() }]}>
        <View style={styles.fixedHeader}>
          <SearchBar value={search} onChangeText={setSearch} onBackPress={handleBackPress} />
          <CarTypeFilter
            carTypes={carTypes}
            selectedType={selectedType}
            onSelect={setSelectedType}
          />
        </View>
        <ScrollView style={styles.scrollArea} contentContainerStyle={styles.listContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : filteredMotor.length === 0 ? (
            <Text style={styles.messageText}>Motor tidak tersedia di saat ini.</Text>
          ) : (
            filteredMotor.map((motor, index) => (
              <CarCard key={`${motor.code ?? motor.name}-${index}`} car={motor} />
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  screenContainer: {
    flex: 1,
    padding: Responsive.containerPadding.horizontal,
  },
  fixedHeader: {
    marginBottom: Responsive.spacing.md,
  },
  scrollArea: {
    flex: 1,
  },
  listContainer: {
    marginTop: 0,
    paddingBottom: 100,
  },
  messageText: {
    color: "#fff",
    textAlign: "center",
    marginTop: Responsive.spacing.lg,
    fontSize: Responsive.fontSize.lg,
  },
});
