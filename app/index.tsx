import { View, Text, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>TabletopCompanion</Text>
      <Text style={styles.subtitulo}>Cargando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  subtitulo: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});