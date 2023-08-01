import { React } from "react"
import {View, Text, StyleSheet, ScrollView} from "react-native"

function PokeList({list}){
    return(
        <ScrollView>
            {
                list.map((pokemon, index) => {
                    return (
                        <View key={index} style= {styles.pokemon}>
                            <Text>{pokemon.name}</Text>
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pokemon: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PokeList