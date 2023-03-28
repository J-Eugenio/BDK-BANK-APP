import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

function Home(){
  const navigation = useNavigation<any>();

  return (
    <>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Notifications")}
      >
        <Text>Teste</Text>
      </TouchableOpacity>
    </>
  )
}

function Notifications(){
  return (
    <Text>Notifications</Text>
  )
}

function Profile(){
  return (
    <Text>Profile</Text>
  )
}

function Settings(){
  return (
    <Text>Settings</Text>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}