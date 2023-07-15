import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import Register from '../pages/Register';
import HomeRoutes from './HomeRoutes';

const Stack = createNativeStackNavigator()

function Router(){
    return(
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={
        {headerShown:false,
        headerShadowVisible:false,
        title:"",
        headerStyle:{backgroundColor:"#fff"},
        }} />
        <Stack.Screen name="AtionRouter" component={HomeRoutes} options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register} options={
            {
            headerShown: true,
            headerShadowVisible:false,
            title:"",
            headerStyle: { backgroundColor: "#820ad1"},
            }} />
      </Stack.Navigator>

    )
}

export default Router;