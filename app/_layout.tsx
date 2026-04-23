import { Stack } from "expo-router";
import { GameProvider } from "../screens/GameContext";

export default function Layout() {
  return (
    <GameProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#f8f7f5" },
        }}
      />
    </GameProvider>
  );
}
