import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'styled-components/native';
import { Login } from './src/screens/Login';
import theme from './src/global/styles/theme';
import { VerifyAccount } from './src/screens/VerifyAccount';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="VerifyAccount"
          screenOptions={{
            headerShown: false,
            headerTransparent: false
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    
  );
}