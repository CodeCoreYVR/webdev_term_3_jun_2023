import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import PokeList from './components/PokeList';

const POKEMON_API_ENDPOINT =  'https://pokeapi.co/api/v2/pokemon?limit=100'
export default function App() {

  const [pokeList, setPokeList] = useState([])

  useEffect(()=> {
    fetch(`${POKEMON_API_ENDPOINT}`)
      .then(res => res.json())
      .then(payload => {
        console.log(payload)
        setPokeList(payload.results)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Header/>
      <View style={styles.body}>
        <PokeList list={pokeList}/>
      </View>
      <StatusBar hidden />
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
  body : {
    flex: 5
  },
});

