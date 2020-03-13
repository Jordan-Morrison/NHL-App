import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SvgUri from 'react-native-svg-uri';
import Welcome from './Welcome';
import RosterNavigator from './RosterNavigator';

const Drawer = createDrawerNavigator();

export default function App() {

    const [teams, setTeams] = React.useState([]);

    React.useEffect(() => {
        getTeams()
    },[]);

    async function getTeams() {
        let data = await fetch("https://statsapi.web.nhl.com/api/v1/teams");
        data = await data.json();
        setTeams(data.teams);
    }


    if (teams != []){

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Welcome" component={Welcome} options={{
            headerTitle: "hello"
        }}/>
        {teams.map((team) =>
            <Drawer.Screen key={team.id} name={team.name} component={RosterNavigator} initialParams={{team}} options={{
                drawerIcon: () => {return <SvgUri width="50" height="50" source={{uri: `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${team.id}.svg`}}/>}
            }}/>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
        }
}