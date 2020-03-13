import * as React from 'react';
import {Header} from 'react-native-elements';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Player(props) {

    const player = props.route.params?.player;

    const [countryInfo, setCountryInfo] = React.useState(null);

    React.useEffect(() => {
        getFlag(player.person.id);
    },[]);

    async function getFlag(playerId) {
        let playerData = await fetch(`https://statsapi.web.nhl.com/api/v1/people/${playerId}`);
        playerData = await playerData.json();

        let countryData = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${playerData.people[0].nationality}`);
        countryData = await countryData.json();
        setCountryInfo(countryData[0]);
    }

    return (
        <View>
            <Header
                leftComponent={{ icon: 'chevron-left', color: '#fff', onPress: props.navigation.goBack }}
                centerComponent={{ text: player.person.fullName, style: { color: '#fff' } }}
                containerStyle={{backgroundColor: "#333333"}}
            />
            <View style={styles.contentView}>
                <Image style={styles.avatar} source={{uri: `https://nhl.bamcontent.com/images/headshots/current/168x168/${player.person.id}.jpg`}}/>
                { countryInfo != null &&
                    <React.Fragment>
                        <Text>{countryInfo.name}</Text>
                        <Image style={styles.flag} source={{uri: `https://www.countryflags.io/${countryInfo.alpha2Code}/flat/64.png`}}/>
                    </React.Fragment>
                }
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    contentView: {
        display: "flex",
        alignItems: "center"
    },
    avatar: {
        width: 168,
        height: 168,
        marginTop: 20,
        marginBottom: 50,
        borderRadius: 100
    },
    flag: {
        width: 120,
        height: 120,
        marginTop: 1
    }
});