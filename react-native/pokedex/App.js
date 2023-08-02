import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import PokeList from './components/PokeList';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PokeDetails from './components/PokeDetails';

const Stack = createStackNavigator()

const POKEMON_API_ENDPOINT =  'https://pokeapi.co/api/v2/pokemon?limit=50'
export default function App() {

  const [pokeList, setPokeList] = useState([])

  useEffect(()=> {
    fetch(`${POKEMON_API_ENDPOINT}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPokeList(data.results)
      })
  }, [])

  return (
    <NavigationContainer style={styles.container}>
      <Header/>
      <View style={styles.body}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Poke List" 
          children={({navigation}) =>{
            return(
              <PokeList list={pokeList} navigation={navigation} />
            )
          }}/>
          <Stack.Screen name="Poke Details" component={PokeDetails} />
        </Stack.Navigator>
      </View>
      <StatusBar hidden />
    </NavigationContainer>
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
    flex: 20
  },
});

