import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function ListaJuegos() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Lena y Víctor</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Text style={styles.iconBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Buscar juego...</Text>
      </View>

      <Text style={styles.sectionLabel}>3 Juegos</Text>

      <View style={styles.cardsList}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/sushigo")}
        >
          <View style={[styles.cardImg, styles.sushi]}>
            <Text style={styles.emoji}>🍣</Text>
            <View style={styles.cardImgOverlay} />
            <Text style={styles.cardTitle}>Sushi Go!</Text>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>👥 2–5</Text>
            <Text style={styles.metaText}>🕐 15 min</Text>
            <TouchableOpacity style={styles.dotsBtn}>
              <Text style={styles.dots}>···</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.arrowBtn} onPress={() => router.push('/sushigoconfig')}>
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={[styles.cardImg, styles.unmatched]}>
            <Text style={styles.emoji}>⚔️</Text>
            <View style={styles.cardImgOverlay} />
            <View>
              <Text style={styles.cardTitle}>Unmatched</Text>
              <Text style={styles.cardSubtitle}>Cobble & Fog</Text>
            </View>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>👥 2–4</Text>
            <Text style={styles.metaText}>🕐 20-40 min</Text>
            <TouchableOpacity style={styles.dotsBtn}>
              <Text style={styles.dots}>···</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrowBtn, { backgroundColor: "#185FA5" }]}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={[styles.cardImg, styles.heretoslay]}>
            <Text style={styles.emoji}>🐉</Text>
            <View style={styles.cardImgOverlay} />
            <Text style={styles.cardTitle}>Here to Slay</Text>
          </View>
          <View style={styles.cardMeta}>
            <Text style={styles.metaText}>👥 2–6</Text>
            <Text style={styles.metaText}>🕐 30-60 min</Text>
            <TouchableOpacity style={styles.dotsBtn}>
              <Text style={styles.dots}>···</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.arrowBtn, { backgroundColor: "#0F6E56" }]}
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
    gap: 12,
    padding: 20,
    paddingTop: 52,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 22, color: "#fff", lineHeight: 26 },
  titulo: { fontSize: 20, fontWeight: "800", color: "#1a1a2e", flex: 1 },
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
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    paddingHorizontal: 14,
  },
  searchText: { fontSize: 14, color: "#bbb" },
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
  cardImg: {
    height: 110,
    padding: 14,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  cardImgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  emoji: {
    position: "absolute",
    top: 16,
    left: "40%",
    fontSize: 52,
    zIndex: 0,
  },
  sushi: { backgroundColor: "#ff6b35" },
  unmatched: { backgroundColor: "#2c3e50" },
  heretoslay: { backgroundColor: "#1a472a" },
  cardTitle: { fontSize: 17, fontWeight: "800", color: "#fff", zIndex: 1 },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.85)",
    zIndex: 1,
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
  arrowText: { fontSize: 18, color: "#fff", lineHeight: 22 },
});
