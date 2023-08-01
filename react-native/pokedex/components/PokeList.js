import { React } from "react"
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from "react-native"

function PokeList({list}){
    return(
        <ScrollView>
            {
                list.map((pokemon, index) => {
                    return (
                        <TouchableHighlight key={index} underlayColor='lightBlue' onPress={(event)=> {console.log(event)}}>
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