import { View, Text } from 'react-native'
import React from 'react'
import Home from './Screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Details from './Screens/Details';
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
<NavigationContainer>
      <Stack.Navigator 
      >
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Details" component={Details} options={{
          headerStyle: {
            backgroundColor: '#f8766e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes