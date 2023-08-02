import { React, useState, useEffect } from "react"
import { View, Text, StyleSheet, Image } from "react-native"

function PokeDetails(props) {

    const { route } = props;
    const { params } = route;

    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        fetch(params.pokemon.url)
            .then(res => res.json())
            .then(data => {
                setPokemon(data)
            })
            .catch(err => { console.error(err) })
    }, [])

    return (
        <View style={styles.container}>
            {pokemon.name ?
                <>
                    <Image style={styles.image} source={{uri: pokemon.sprites.front_default}}/>
                    <Text style={styles.h1}>{pokemon.name}</Text>
                    <Text style={styles.text}>Weight: {pokemon.weight}</Text>
                </>
                :
                <Text>Loading...</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      height: 300,
      width: 300
    },
    h1: {
        fontSize: 30
    },
    text: {
        fontSize: 20
    }
  });

export default PokeDetails