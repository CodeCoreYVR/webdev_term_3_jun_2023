import { React } from "react"
import {View, Text, StyleSheet} from "react-native"

function Header() {
    return(
        <View style={styles.header}>
            <Text style={styles.h1}>Pokedex</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header : {
        flex: 1,
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 45,
        borderBottomWidth: 15
    },
    h1 : {
        fontSize: 40
    }
})

export default Header