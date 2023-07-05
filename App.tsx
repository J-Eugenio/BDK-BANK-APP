import React from 'react'
import { StatusBar } from "react-native";
import theme from "./src/global/styles/theme";
import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import {
  Login,
  Billet,
  CopyAndPastePix,
  DemandPix,
  Extract,
  ExtractPerId,
  KeysPix,
  DashboardPage,
  Payments,
  Pix,
  Profile,
  Transfer,
  TransferPix,
  VerifyAccount,
  Signup,
  Process,
  VerifyStatus,
  Forgot,
  Comprovant,
} from "./src/screens";

import AppProvider from "./src/hooks";

const Stack = createNativeStackNavigator();

//List pages
export type RootStackParamList = {
  Login: any;
  Process: any;
  VerifyAccount: any;
  Forgot: any;
  VerifyStatus: any;
  Signup: any;
  DashboardPage: any;
  Payments: any;
  Transfer: any;
  Pix: any;
  Billet: any;
  Extract: any;
  CopyAndPastePix: any;
  DemandPix: any;
  KeysPix: any;
  TransferPix: any;
  Perfil: any;
  Comprovant: any;
  HomeScreenTabs: any;
};

//Screen props with pages
export type ScreenProp = NativeStackNavigationProp<RootStackParamList>;
const Tab = createBottomTabNavigator();

function HomeScreenTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          display: "flex",
          flexDirection: "row",
          height: 90,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          alignItems: "center",
          position: "absolute",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Pagamentos":
              iconName = focused ? "cash" : "cash-outline";
              break;
            default:
              iconName = focused ? "person" : "person-outline";
              break;
          }
          //@ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00214E",
        tabBarInactiveTintColor: "#616161",
        tabBarItemStyle: {
          display: "flex",
          backgroundColor: "#FFF",
          height: 50,
          borderRightWidth: 1,
          borderRightColor: "#DADADA",
        },
        tabBarLabelStyle: {
          color: "#616161",
          fontSize: 11,
        },
      })}
    >
      <Tab.Screen name="Home" component={DashboardPage} />
      <Tab.Screen name="Pagamentos" component={Payments} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <>
      <StatusBar barStyle={"default"} showHideTransition="fade" animated />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AppProvider>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                headerTransparent: false,
              }}
            >
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Process" component={Process} />
              <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
              <Stack.Screen name="HomeScreenTabs" component={HomeScreenTabs} />
              <Stack.Screen name="Forgot" component={Forgot} />
              <Stack.Screen name="VerifyStatus" component={VerifyStatus} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="DashboardPage" component={DashboardPage} />
              <Stack.Screen name="Payments" component={Payments} />
              <Stack.Screen name="Transfer" component={Transfer} />
              <Stack.Screen name="Pix" component={Pix} />
              <Stack.Screen name="Billet" component={Billet} />
              <Stack.Screen name="Extract" component={Extract} />
              <Stack.Screen
                name="CopyAndPastePix"
                component={CopyAndPastePix}
              />
              <Stack.Screen name="DemandPix" component={DemandPix} />
              <Stack.Screen name="KeysPix" component={KeysPix} />
              <Stack.Screen name="TransferPix" component={TransferPix} />
              <Stack.Screen name="Perfil" component={Profile} />
              <Stack.Screen name="Comprovant" component={Comprovant} />
              <Stack.Screen name="ExtractPerId" component={ExtractPerId} />
            </Stack.Navigator>
          </AppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
