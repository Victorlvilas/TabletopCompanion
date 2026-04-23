import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function Bibliotecas() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.titulo}>Bibliotecas</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.iconBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionLabel}>2 Bibliotecas</Text>

      <View style={styles.cardsList}>
        <TouchableOpacity style={styles.card}>
          <View style={[styles.cardImg, styles.bib1]}>
            <Text style={styles.cardTitle}>Lena y Víctor</Text>
            <Text style={styles.cardSubtitle}>Colección compartida</Text>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>3 juegos</Text>
            <TouchableOpacity style={styles.dotsBtn}>
              <Text style={styles.dots}>···</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.arrowBtn}
              onPress={() => router.push("/listajuegos")}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={[styles.cardImg, styles.bib2]}>
            <Text style={styles.cardTitle}>Bruno</Text>
            <Text style={styles.cardSubtitle}>Colección personal</Text>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>2 juegos</Text>
            <TouchableOpacity style={styles.dotsBtn}>
              <Text style={styles.dots}>···</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrowBtn, styles.arrowGreen]}
              onPress={() => router.push("/listajuegos")}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f7f5" },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 52,
  },
  titulo: { fontSize: 26, fontWeight: "800", color: "#1a1a2e" },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnText: { fontSize: 22, color: "#1a1a2e", lineHeight: 26 },
  sectionLabel: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  cardsList: { paddingHorizontal: 16, gap: 12, paddingBottom: 24 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardImg: { height: 110, padding: 14, justifyContent: "flex-end" },
  bib1: { backgroundColor: "#2c3e50" },
  bib2: { backgroundColor: "#1a472a" },
  cardTitle: { fontSize: 17, fontWeight: "800", color: "#fff" },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
  },
  cardMeta: {
    padding: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: { fontSize: 12, color: "#666", fontWeight: "600" },
  dotsBtn: {
    marginLeft: "auto",
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#f8f7f5",
    alignItems: "center",
    justifyContent: "center",
  },
  dots: { fontSize: 14, color: "#888", letterSpacing: 2 },
  arrowBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowGreen: { backgroundColor: "#2d6a4f" },
  arrowText: { fontSize: 18, color: "#fff", lineHeight: 22 },
});
