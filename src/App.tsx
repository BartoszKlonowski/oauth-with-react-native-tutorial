import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import { NavigationParams } from './navigation';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
