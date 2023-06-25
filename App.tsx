import "react-native-gesture-handler";
import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { 
  Login,
  Billet,
  CopyAndPastePix,
  DemandPix,
  Extract,
  ExtractPerId,
  KeysPix,
  MainPage,
  Payments,
  Pix,
  Profile,
  Transfer,
  TransferPix,
  VerifyAccount ,
  Signup,
  Process,
} from "./src/screens";
import AppProvider from "./src/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//List pages
export type RootStackParamList = {
  VerifyAccount: any
  Process: any
};

//Screen props with pages
export type ScreenProp = NativeStackNavigationProp<RootStackParamList>;

function MyStack() {
  return (
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
      <Stack.Screen name="MyTabs" component={MyTabs} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function MyTabs() {
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
            case "Início":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Perfil":
              iconName = focused ? "people" : "people-outline";
              break;
            case "Pagamentos":
              iconName = focused ? "cash" : "cash-outline";
              break;
            default:
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
      <Tab.Screen name="Início" component={MyStackSecondary} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Pagamentos" component={Payments} />
    </Tab.Navigator>
  );
}

function MyStackSecondary() {
  return (
    <Stack.Navigator
      initialRouteName="MainPage"
      screenOptions={{
        headerShown: false,
        headerTransparent: false,
      }}
    >
      <Stack.Screen name="MainPage" component={MainPage} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Pix" component={Pix} />
      <Stack.Screen name="Billet" component={Billet} />
      <Stack.Screen name="Extract" component={Extract} />
      <Stack.Screen name="CopyAndPastePix" component={CopyAndPastePix} />
      <Stack.Screen name="DemandPix" component={DemandPix} />
      <Stack.Screen name="KeysPix" component={KeysPix} />
      <Stack.Screen name="TransferPix" component={TransferPix} />
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <>
      <StatusBar barStyle={"default"} showHideTransition="fade" animated />
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <AppProvider>
              {MyStack()}
          </AppProvider>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
