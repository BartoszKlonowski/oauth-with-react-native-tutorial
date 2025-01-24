import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import { NavigationParams } from './navigation';
import { Profile } from './screens/Profile';

const Stack = createNativeStackNavigator<NavigationParams>();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login using OAuth2.0'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: "My profile"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
