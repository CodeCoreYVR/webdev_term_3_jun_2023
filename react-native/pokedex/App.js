import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Pokedex</Text>
      </View>
      <View style={styles.body}>
        <Text>Hello World</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header : {
    flex: 1,
    backgroundColor: 'red',
    width: '100%',
    alignItems: 'center',
    paddingTop: 25,
    borderBottomWidth: 15
  },
  body : {
    flex: 5
  },
  h1 : {
    fontSize: 40
  }
});
