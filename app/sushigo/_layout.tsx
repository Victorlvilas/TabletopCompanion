import { Stack } from 'expo-router';

export default function SushiGoLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#f8f7f5' },
      }}
    />
  );
}