import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider } from 'styled-components/native';
import theme from './src/global/styles/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Login } from './src/screens/Login';
import { VerifyAccount } from './src/screens/VerifyAccount';
import { MainPage } from './src/screens/MainPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        height: 90,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        position: 'absolute'
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Início':
            iconName = focused
            ? 'home'
            : 'home-outline';
            break;
          case 'Perfil':
            iconName = focused
            ? 'people'
            : 'people-outline';
            break;
          case 'Sair':
            iconName = focused
            ? 'cash'
            : 'cash-outline';
            break;
          default:
            break;
        }  
        //@ts-ignore
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#00214E',
      tabBarInactiveTintColor: '#616161',
      tabBarItemStyle: {
        display: 'flex',
        backgroundColor: "#FFF",
        height: 50,
        borderRightWidth: 1,
        borderRightColor: "#DADADA"
      },
      tabBarLabelStyle: {
        color: '#616161',
        fontSize: 11
      },
    })}
    >
      <Tab.Screen name="Início" component={MainPage} />
      <Tab.Screen name="Perfil" component={MainPage} />
      <Tab.Screen name="Sair" component={MainPage}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
   <>
     <StatusBar 
        barStyle={"default"}
        showHideTransition="fade"
        animated
      />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MyTabs"
            screenOptions={{
              headerShown: false,
              headerTransparent: false
            }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
            <Stack.Screen name="MyTabs" component={MyTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
   </>
  );
}