import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "./GameContext";

const RONDAS_TOTALES = 3;

export default function SushiGoPuntuacion() {
  const router = useRouter();
  const {
    jugadores,
    puntuaciones,
    setPuntuaciones,
    rondaActual,
    setRondaActual,
  } = useGame();

  if (!jugadores.length || !puntuaciones.length) {
    return null;
  }

  const totales: number[] = puntuaciones.map((p) =>
    p.reduce((a: number, v) => a + (v ?? 0), 0),
  );
  const maxTotal = totales.length ? Math.max(...totales) : 0;

  const todasRellenas = puntuaciones.every((p) => p[rondaActual - 1] !== null);

  const siguienteRonda = () => {
    if (!todasRellenas) return;
    if (rondaActual < RONDAS_TOTALES) {
      setRondaActual(rondaActual + 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.titulo}>Puntuación</Text>
          <Text style={styles.subtitulo}>
            Ronda {rondaActual} de {RONDAS_TOTALES}
          </Text>
        </View>
      </View>

      <View style={styles.badgeWrap}>
        <Text style={styles.badge}>Ronda {rondaActual} en curso</Text>
      </View>

      <View style={styles.tableWrap}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, styles.thFirst]}>Jugador</Text>
          <Text style={styles.th}>R1</Text>
          <Text style={styles.th}>R2</Text>
          <Text style={styles.th}>R3</Text>
          <Text style={styles.th}>Total</Text>
        </View>

        {jugadores.map((jugador, pi) => (
          <View
            key={pi}
            style={[
              styles.tableRow,
              pi === jugadores.length - 1 && styles.lastRow,
            ]}
          >
            <Text style={[styles.td, styles.tdFirst]}>{jugador}</Text>
            {[0, 1, 2].map((r) => {
              const val = puntuaciones[pi]?.[r];
              const esActual = r === rondaActual - 1;
              const esFutura = r > rondaActual - 1;
              return (
                <TouchableOpacity
                  key={r}
                  style={styles.tdWrap}
                  onPress={() => {
                    if (!esFutura) {
                      router.push({
                        pathname: "/sushigoronda" as any,
                        params: { jugador: pi, ronda: r },
                      });
                    }
                  }}
                  disabled={esFutura}
                >
                  <Text
                    style={[
                      styles.td,
                      esActual && styles.tdActual,
                      esFutura && styles.tdFutura,
                      val !== null && val !== undefined && styles.tdRellena,
                    ]}
                  >
                    {val !== null && val !== undefined ? val : "—"}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <Text
              style={[
                styles.td,
                totales[pi] === maxTotal && totales[pi] > 0 && styles.tdLider,
              ]}
            >
              {totales[pi]}
            </Text>
          </View>
        ))}

        <View style={styles.liderRow}>
          <Text style={[styles.td, styles.tdFirst, styles.tdLider]}>Líder</Text>
          <Text style={styles.td}></Text>
          <Text style={styles.td}></Text>
          <Text style={styles.td}></Text>
          <Text style={[styles.td, styles.tdLider]}>
            {totales.every((t) => t === 0)
              ? "—"
              : jugadores[totales.indexOf(maxTotal)]}
          </Text>
        </View>
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Toca — para introducir puntuación</Text>
      </View>

      <View style={styles.btnWrap}>
        {rondaActual < RONDAS_TOTALES ? (
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              !todasRellenas && styles.primaryBtnDisabled,
            ]}
            onPress={siguienteRonda}
          >
            <Text style={styles.primaryBtnText}>
              Pasar a ronda {rondaActual + 1}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.primaryBtn,
              styles.primaryBtnGreen,
              !todasRellenas && styles.primaryBtnDisabled,
            ]}
          >
            <Text style={styles.primaryBtnText}>Finalizar partida</Text>
          </TouchableOpacity>
        )}
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
  badgeWrap: { paddingHorizontal: 16, marginBottom: 10 },
  badge: {
    backgroundColor: "#ede9ff",
    color: "#6C63FF",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 14,
    fontSize: 12,
    fontWeight: "700",
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  tableWrap: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a1a2e",
    padding: 10,
  },
  th: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  thFirst: { flex: 1.5, textAlign: "left", paddingLeft: 4 },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  lastRow: { borderBottomWidth: 1, borderBottomColor: "#f5f5f5" },
  liderRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f7ff",
  },
  tdWrap: { flex: 1, alignItems: "center" },
  td: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  tdFirst: {
    flex: 1.5,
    fontWeight: "700",
    color: "#1a1a2e",
    textAlign: "left",
    paddingLeft: 4,
  },
  tdActual: {
    color: "#6C63FF",
    textDecorationLine: "underline",
    fontWeight: "700",
  },
  tdFutura: { color: "#ccc" },
  tdRellena: { color: "#1a1a2e" },
  tdLider: { color: "#6C63FF", fontWeight: "800" },
  hint: { padding: 12, paddingHorizontal: 16 },
  hintText: { fontSize: 12, color: "#999", fontWeight: "600" },
  btnWrap: { paddingHorizontal: 16, paddingBottom: 24 },
  primaryBtn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  primaryBtnGreen: { backgroundColor: "#0F6E56" },
  primaryBtnDisabled: { opacity: 0.4 },
  primaryBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
