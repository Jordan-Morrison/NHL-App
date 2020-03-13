import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home.js';
import Player from './Player.js';

const Stack = createStackNavigator();

export default function RosterNavigator(props) {

    const team = props.route.params?.team;

    return (
        <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={Home} initialParams={{team}}/>
            <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
    );
}