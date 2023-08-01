import { React } from "react"
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from "react-native"

function PokeList({list, navigation}){
    return(
        <ScrollView>
            {
                list.map((pokemon, index) => {
                    return (
                        <TouchableHighlight key={index} underlayColor='lightBlue' onPress={(event)=> {
                            navigation.navigate("Poke Details", {pokemon})
                            // console.log(navigation)
                        }}>
                            <View key={index} style= {styles.pokemon}>
                                <Text>{pokemon.name}</Text>
                            </View>
                        </TouchableHighlight>
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