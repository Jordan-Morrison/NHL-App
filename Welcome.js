import * as React from 'react';
import {Header} from 'react-native-elements';
import { View, Text, Image, Linking, StyleSheet } from 'react-native';

export default function Welcome(props) {

    return (
        <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: props.navigation.openDrawer }}
                centerComponent={{ text: "Welcome", style: { color: '#fff' } }}
                containerStyle={{backgroundColor: "#333333"}}
            />
            <View style={styles.contentArea}>
                <Image style={styles.nhlLogo} source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/1200px-05_NHL_Shield.svg.png' }}/>
                <Text style={styles.text}>Welcome! Start by selecting a team from the menu on the left</Text>
                <Text style={styles.text}>This is a sample NHL app where you can explore team rosters and then see where each player is from. This app was created for an interview with specific requirements which are listed below.</Text>
                <Text style={styles.text}>Using the nhl api specs here <Text style={styles.link} onPress={() => Linking.openURL("https://github.com/erunion/sport-api-specifications/tree/master/nhl")}>https://github.com/erunion/sport-api-specifications/tree/master/nhl</Text>, design an app, with a menu/drawer on the left listing all the team names with logos.</Text>
                <Text style={styles.text}>When you click/tap a team, the page lists a feed of players listing #, name, and position. Add sorting capability on both the name and #</Text>
                <Text style={styles.text}>Add filter capability on the position</Text>
                <Text style={styles.text}>Upon clicking a player, load a page or modal displaying the country name and flag of the nationality of the player</Text>
                <Text style={styles.text}>Feel free to utilize any package dependencies and component libraries of your liking.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    contentArea: {
        padding: 10
    },
    nhlLogo: {
        width: "100%",
        height: 150,
        resizeMode: "contain",
        marginVertical: 20
    },
    text: {
        marginVertical: 5,
        textAlign: "center"
    },
    link: {
        color: "blue"
    }
});