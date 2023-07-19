import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home/index';
import Deposit from '../pages/Deposit/index';
import Retire from '../pages/Retire';
import Perfil from '../pages/Perfil';
import Details from '../pages/Details';

const Stack = createNativeStackNavigator()

function HomeRoutes(){
    return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Deposit" component={Deposit} options={
            {headerShown:true,
            headerShadowVisible:false,
            title:"",
            headerStyle:{backgroundColor:"#fff"},
            }} />
        <Stack.Screen name="Retire" component={Retire} options={
            {headerShown:true,
            headerShadowVisible:false,
            title:"",
            headerStyle:{backgroundColor:"#fff"},
            }} />
        <Stack.Screen name="Perfil" component={Perfil} options={
            {headerShown:true,
            headerShadowVisible:false,
            title:"",
            headerStyle:{backgroundColor:"#fff"},
            }} />
        <Stack.Screen name="Details" component={Details} options={
            {headerShown:true,
            headerShadowVisible:false,
            title:"",
            headerStyle:{backgroundColor:"#fff"},
            }} />
      </Stack.Navigator>

    )
}

export default HomeRoutes;