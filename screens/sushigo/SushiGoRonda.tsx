import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useGame } from "../GameContext";

const CARTAS = [
  {
    nombre: "Tempura",
    subtitulo: "5 pts por pareja",
    grupo: "Cartas base",
    pts: 0,
    tipo: "tempura",
  },
  {
    nombre: "Sashimi",
    subtitulo: "10 pts por trío",
    grupo: "Cartas base",
    pts: 0,
    tipo: "sashimi",
  },
  {
    nombre: "Gyoza",
    subtitulo: "1/3/6/10/15 pts",
    grupo: "Cartas base",
    pts: 0,
    tipo: "gyoza",
  },
  {
    nombre: "Maki",
    subtitulo: "Símbolos totales",
    grupo: "Cartas base",
    pts: 0,
    tipo: "maki",
  },
  {
    nombre: "Nigiri huevo",
    subtitulo: "1 pt c/u",
    grupo: "Nigiri",
    pts: 1,
    tipo: "nigiri",
  },
  {
    nombre: "Nigiri salmón",
    subtitulo: "2 pts c/u",
    grupo: "Nigiri",
    pts: 2,
    tipo: "nigiri",
  },
  {
    nombre: "Nigiri calamar",
    subtitulo: "3 pts c/u",
    grupo: "Nigiri",
    pts: 3,
    tipo: "nigiri",
  },
  {
    nombre: "Wasabi + huevo",
    subtitulo: "3 pts c/u",
    grupo: "Wasabi",
    pts: 3,
    tipo: "wasabi",
  },
  {
    nombre: "Wasabi + salmón",
    subtitulo: "6 pts c/u",
    grupo: "Wasabi",
    pts: 6,
    tipo: "wasabi",
  },
  {
    nombre: "Wasabi + calamar",
    subtitulo: "9 pts c/u",
    grupo: "Wasabi",
    pts: 9,
    tipo: "wasabi",
  },
  {
    nombre: "Pudín",
    subtitulo: "Se acumula hasta ronda 3",
    grupo: "Pudín",
    pts: 0,
    tipo: "pudin",
  },
];

const GYOZA_PTS = [0, 1, 3, 6, 10, 15];

function calcularSubtotal(contadores: number[]): number {
  let total = 0;
  CARTAS.forEach((carta, i) => {
    const val = contadores[i];
    if (carta.tipo === "tempura") total += Math.floor(val / 2) * 5;
    else if (carta.tipo === "sashimi") total += Math.floor(val / 3) * 10;
    else if (carta.tipo === "gyoza") total += GYOZA_PTS[Math.min(val, 5)];
    else if (carta.tipo === "maki" || carta.tipo === "pudin") {
    } else total += carta.pts * val;
  });
  return total;
}

export default function SushiGoRonda() {
  const router = useRouter();
  const { jugador, ronda } = useLocalSearchParams();
  const {
    jugadores,
    puntuaciones,
    setPuntuaciones,
    makiPorRonda,
    setMakiPorRonda,
    pudinTotal,
    setPudinTotal,
  } = useGame();

  const pi = Number(jugador);
  const r = Number(ronda);

  const [contadores, setContadores] = useState<number[]>(CARTAS.map(() => 0));

  const cambiarContador = (index: number, delta: number) => {
    const nuevos = [...contadores];
    nuevos[index] = Math.max(0, nuevos[index] + delta);
    setContadores(nuevos);
  };

  const subtotal = calcularSubtotal(contadores);

  const confirmar = () => {
    const makiIndex = CARTAS.findIndex((c) => c.nombre === "Maki");
    const pudinIndex = CARTAS.findIndex((c) => c.nombre === "Pudín");
    const makiVal = contadores[makiIndex];
    const pudinVal = contadores[pudinIndex];

    const nuevosMaki = makiPorRonda.map((fila, i) =>
      i === pi ? fila.map((v, j) => (j === r ? makiVal : v)) : fila,
    );
    setMakiPorRonda(nuevosMaki);

    const nuevosPudin = pudinTotal.map((v, i) => (i === pi ? v + pudinVal : v));
    setPudinTotal(nuevosPudin);

    const nuevas = puntuaciones.map((p, i) =>
      i === pi ? p.map((v, j) => (j === r ? subtotal : v)) : p,
    );
    setPuntuaciones(nuevas);
    router.back();
  };

  const grupos = [...new Set(CARTAS.map((c) => c.grupo))];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.titulo}>
            {jugadores[pi]} · Ronda {r + 1}
          </Text>
          <Text style={styles.subtitulo}>Introduce tus cartas</Text>
        </View>
      </View>

      <View style={styles.section}>
        {grupos.map((grupo) => (
          <View key={grupo}>
            <Text style={styles.groupTitle}>{grupo}</Text>
            {CARTAS.filter((c) => c.grupo === grupo).map((carta) => {
              const index = CARTAS.indexOf(carta);
              return (
                <View key={carta.nombre} style={styles.cartaRow}>
                  <View>
                    <Text style={styles.cartaNombre}>{carta.nombre}</Text>
                    <Text style={styles.cartaSub}>{carta.subtitulo}</Text>
                  </View>
                  <View style={styles.counter}>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => cambiarContador(index, -1)}
                    >
                      <Text style={styles.counterBtnText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterVal}>{contadores[index]}</Text>
                    <TouchableOpacity
                      style={styles.counterBtn}
                      onPress={() => cambiarContador(index, 1)}
                    >
                      <Text style={styles.counterBtnText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.subtotalBar}>
        <Text style={styles.subtotalLabel}>Subtotal</Text>
        <Text style={styles.subtotalVal}>{subtotal} pts</Text>
      </View>

      <View style={styles.btnWrap}>
        <TouchableOpacity style={styles.primaryBtn} onPress={confirmar}>
          <Text style={styles.primaryBtnText}>Confirmar</Text>
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
  groupTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingVertical: 8,
  },
  cartaRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cartaNombre: { fontSize: 13, fontWeight: "700", color: "#1a1a2e" },
  cartaSub: { fontSize: 11, color: "#999", fontWeight: "600" },
  counter: { flexDirection: "row", alignItems: "center", gap: 8 },
  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#ede9ff",
    alignItems: "center",
    justifyContent: "center",
  },
  counterBtnText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C63FF",
    lineHeight: 22,
  },
  counterVal: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1a1a2e",
    minWidth: 18,
    textAlign: "center",
  },
  subtotalBar: {
    marginHorizontal: 16,
    backgroundColor: "#ede9ff",
    borderRadius: 14,
    padding: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  subtotalLabel: { fontSize: 14, fontWeight: "700", color: "#6C63FF" },
  subtotalVal: { fontSize: 22, fontWeight: "800", color: "#6C63FF" },
  btnWrap: { paddingHorizontal: 16, paddingBottom: 24 },
  primaryBtn: {
    backgroundColor: "#1a1a2e",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  primaryBtnText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
