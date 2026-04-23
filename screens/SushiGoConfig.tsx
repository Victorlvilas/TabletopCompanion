import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SushiGoConfig() {
  const router = useRouter();
  const [jugadores, setJugadores] = useState(["Lena", "Víctor"]);

  const añadirJugador = () => {
    if (jugadores.length < 5) {
      setJugadores([...jugadores, ""]);
    }
  };

  const eliminarJugador = (index: number) => {
    if (jugadores.length > 2) {
      const nuevos = jugadores.filter((_, i) => i !== index);
      setJugadores(nuevos);
    }
  };

  const cambiarNombre = (texto: string, index: number) => {
    const nuevos = [...jugadores];
    nuevos[index] = texto;
    setJugadores(nuevos);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.titulo}>Sushi Go!</Text>
          <Text style={styles.subtitulo}>Nueva partida</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Jugadores (2–5)</Text>

        {jugadores.map((jugador, index) => (
          <View key={index} style={styles.playerRow}>
            <View style={styles.playerNum}>
              <Text style={styles.playerNumText}>{index + 1}</Text>
            </View>
            <TextInput
              style={styles.playerInput}
              value={jugador}
              onChangeText={(texto) => cambiarNombre(texto, index)}
              placeholder={`Jugador ${index + 1}`}
              placeholderTextColor="#bbb"
            />
            {index > 0 && (
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => eliminarJugador(index)}
              >
                <Text style={styles.removeBtnText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {jugadores.length < 5 && (
          <TouchableOpacity style={styles.addPlayerBtn} onPress={añadirJugador}>
            <Text style={styles.addPlayerText}>+ Añadir jugador</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => router.push("/sushigopuntuacion")}
        >
          <Text style={styles.primaryBtnText}>Iniciar partida</Text>
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
  titulo: { fontSize: 17, fontWeight: "800", color: "#1a1a2e" },
  subtitulo: { fontSize: 12, color: "#999", fontWeight: "600" },
  section: { padding: 16 },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
  },
  playerRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  playerNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ede9ff",
    alignItems: "center",
    justifyContent: "center",
  },
  playerNumText: { fontSize: 13, fontWeight: "800", color: "#6C63FF" },
  playerInput: { flex: 1, fontSize: 15, fontWeight: "600", color: "#1a1a2e" },
  removeBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtnText: {
    fontSize: 16,
    color: "#e24b4a",
    fontWeight: "800",
    lineHeight: 20,
  },
  addPlayerBtn: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 14,
    alignItems: "center",
    marginBottom: 8,
  },
  addPlayerText: { fontSize: 14, fontWeight: "700", color: "#999" },
  primaryBtn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    marginTop: 20,
  },
  primaryBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
