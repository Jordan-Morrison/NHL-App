import * as React from 'react';
import {Header, ListItem} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { View, FlatList, StyleSheet } from 'react-native';

export default function Home(props) {

    const team = props.route.params?.team;

    const [roster, setRoster] = React.useState({
        lastModified: Date.now(),
        players: []
    });

    React.useEffect(() => {
        getRoster();
    },[]);

    async function getRoster() {
        let data = await fetch(`https://statsapi.web.nhl.com/api/v1/teams/${team.id}/roster`);
        data = await data.json();
        setRoster({
            lastModified: Date.now(),
            players: data.roster.alphaSort("person.fullName")
        });
    }

    function filterRoster(filterBy) {
        let filteredRoster = Array.from(roster.players, player => {
            if (filterBy === "All"){
                player.hidden = false;
            }
            else if (player.position.name != filterBy){
                player.hidden = true;
            }
            else {
                player.hidden = false;
            }
            return player;
        });
        setRoster({
            lastModified: Date.now(),
            players: filteredRoster
        });
    }

    function sortRoster(sortBy) {
        let sorted = null;

        if (sortBy === "Name: A-Z"){
            sorted = roster.players.alphaSort("person.fullName");
        }
        else if (sortBy === "Name: Z-A"){
            sorted = roster.players.alphaSort("person.fullName").reverse();
        }
        else if (sortBy === "Number: ASC"){
            sorted = roster.players.alphaSort("jerseyNumber");
        }
        else if (sortBy === "Number: DESC"){
            sorted = roster.players.alphaSort("jerseyNumber").reverse();
        }

        setRoster({
            lastModified: Date.now(),
            players: sorted
        });
    }

    Array.prototype.alphaSort = function (sortParameter) {
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            let playerA = sortParameter.split('.').reduce((p,c)=>p&&p[c]||null, a).toUpperCase();
            let playerB = sortParameter.split('.').reduce((p,c)=>p&&p[c]||null, b).toUpperCase();

            if (sortParameter === "jerseyNumber"){
                playerA = Number(playerA);
                playerB = Number(playerB);
            }
    
            if (playerA > playerB) {
                return 1;
            }
            else if (playerA < playerB) {
                return -1;
            }
            return 0;
        }
        return this.sort(compare);
    }

    function PlayerDetails(player) {
        return(
            <ListItem
                key={player.player.person.id}
                onPress={() => {props.navigation.navigate("Player", {player: player.player})}}
                leftAvatar={{ source: { uri: `https://nhl.bamcontent.com/images/headshots/current/168x168/${player.player.person.id}.jpg` } }}
                title={player.player.person.fullName}
                subtitle={`#${player.player.jerseyNumber} ${player.player.position.name}`}
                bottomDivider
                chevron
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: props.navigation.openDrawer }}
                centerComponent={{ text: team.name, style: { color: '#fff' } }}
                containerStyle={{backgroundColor: "#333333"}}
            />
            <View style={styles.dropDownsView}>
                <Dropdown
                    label='Position'
                    data={[
                        {value: "All"},
                        {value: "Center"},
                        {value: "Left Wing"},
                        {value: "Right Wing"},
                        {value: "Defenseman"},
                        {value: "Goalie"}
                    ]}
                    value="All"
                    itemCount={6}
                    onChangeText={filterRoster}
                    dropdownPosition={0}
                    containerStyle={styles.dropDown}
                />
                <Dropdown
                    label='Sort by'
                    data={[
                        {value: "Name: A-Z"},
                        {value: "Name: Z-A"},
                        {value: "Number: ASC"},
                        {value: "Number: DESC"}
                    ]}
                    value="Name: A-Z"
                    onChangeText={sortRoster}
                    dropdownPosition={0}
                    containerStyle={styles.dropDown}
                />
            </View>
            
            <FlatList style={styles.list} data={roster.players} extraData={roster.lastModified} renderItem={({item}) => !item.hidden ? <PlayerDetails player={item}/> : undefined} keyExtractor={item => item.person.id}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    dropDownsView: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 5
    },
    dropDown: {
        flex: 1,
        paddingHorizontal: 5
    },
    list: {
        width: "100%"
    },
    playerDetails: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 5
    },
    altPlayerDetails: {
        display: "flex",
        flexDirection: "row",
        padding: 5,
        backgroundColor: "#EFEFF4",
    },
    number: {
        flex: 1
    },
    name: {
        flex: 3
    },
    position: {
        flex: 2
    }
});