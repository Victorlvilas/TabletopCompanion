import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "../GameContext";

export default function SushiGoFinal() {
  const router = useRouter();
  const { jugadores, puntuaciones } = useGame();

  const totales = jugadores.map(
    (_, pi) => puntuaciones[pi]?.reduce((a: number, v) => a + (v ?? 0), 0) ?? 0,
  );
  const maxTotal = Math.max(...totales);
  const ganador = jugadores[totales.indexOf(maxTotal)];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Partida finalizada</Text>
      <Text style={styles.ganador}>🏆 {ganador}</Text>
      <Text style={styles.sub}>Puntuación final</Text>

      {jugadores.map((j, i) => (
        <View
          key={i}
          style={[styles.row, totales[i] === maxTotal && styles.rowWinner]}
        >
          <Text
            style={[
              styles.nombre,
              totales[i] === maxTotal && styles.nombreWinner,
            ]}
          >
            {j}
          </Text>
          <Text
            style={[styles.pts, totales[i] === maxTotal && styles.ptsWinner]}
          >
            {totales[i]} pts
          </Text>
        </View>
      ))}

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/listajuegos")}
      >
        <Text style={styles.btnText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f7f5",
    padding: 24,
    paddingTop: 80,
    alignItems: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a2e",
    marginBottom: 8,
  },
  ganador: {
    fontSize: 32,
    fontWeight: "800",
    color: "#6C63FF",
    marginBottom: 4,
  },
  sub: { fontSize: 13, color: "#999", fontWeight: "600", marginBottom: 24 },
  row: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  rowWinner: { backgroundColor: "#ede9ff", borderColor: "#6C63FF" },
  nombre: { fontSize: 15, fontWeight: "700", color: "#1a1a2e" },
  nombreWinner: { color: "#6C63FF" },
  pts: { fontSize: 15, fontWeight: "800", color: "#333" },
  ptsWinner: { color: "#6C63FF" },
  btn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 14,
    padding: 14,
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
  btnText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
