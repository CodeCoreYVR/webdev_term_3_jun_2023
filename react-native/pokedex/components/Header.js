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
        backgroundColor: '#3f3',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        borderBottomWidth: 5
    },
    h1 : {
        fontSize: 20
    }
})

export default Header