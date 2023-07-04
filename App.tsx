import "react-native-gesture-handler";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//List pages
export type RootStackParamList = {
  VerifyAccount: any;
  Process: any;
  VerifyStatus: any;
  DashboardPage: any;
  Login: any;
  Forgot: any;
  Signup: any;
  Comprovant: any;
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
      <Stack.Screen name="Forgot" component={Forgot} />
      <Stack.Screen name="VerifyStatus" component={VerifyStatus} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="DashboardPage" component={DashboardPage} />
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
      <Stack.Screen name="Comprovant" component={Comprovant} />
    </Stack.Navigator>
  );
}

// function MyTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarHideOnKeyboard: true,
//         tabBarStyle: {
//           display: "flex",
//           flexDirection: "row",
//           height: 90,
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 0,
//           borderTopLeftRadius: 20,
//           borderTopRightRadius: 20,
//           alignItems: "center",
//           position: "absolute",
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           switch (route.name) {
//             case "Início":
//               iconName = focused ? "home" : "home-outline";
//               break;
//             case "Perfil":
//               iconName = focused ? "people" : "people-outline";
//               break;
//             case "Pagamentos":
//               iconName = focused ? "cash" : "cash-outline";
//               break;
//             default:
//               break;
//           }
//           //@ts-ignore
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: "#00214E",
//         tabBarInactiveTintColor: "#616161",
//         tabBarItemStyle: {
//           display: "flex",
//           backgroundColor: "#FFF",
//           height: 50,
//           borderRightWidth: 1,
//           borderRightColor: "#DADADA",
//         },
//         tabBarLabelStyle: {
//           color: "#616161",
//           fontSize: 11,
//         },
//       })}
//     >
//       <Tab.Screen name="Início" component={MyStackSecondary} />
//       <Tab.Screen name="Perfil" component={Profile} />
//       <Tab.Screen name="Pagamentos" component={Payments} />
//     </Tab.Navigator>
//   );
// }

function MyStackSecondary() {
  const [userToken, setUserToken] = React.useState(false);

  const validateToken = async () => {
    const user = await AsyncStorage.getItem("@bdkbank:user");
    // @ts-ignore
    const userFormatted = JSON.parse(user);
    if (userFormatted) {
      if (userFormatted.Token.length > 0) {
        setUserToken(true);
      } else {
        setUserToken(false);
      }
    } else {
      return;
    }
  };

  React.useEffect(() => {
    validateToken();
  }, [validateToken, userToken]);

  return (
    <Stack.Navigator
      initialRouteName="DashboardPage"
      screenOptions={{
        headerShown: false,
        headerTransparent: false,
      }}
    >
      {userToken ? <Stack.Screen name="Login" component={Login} /> : null}
      <Stack.Screen name="DashboardPage" component={DashboardPage} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Pix" component={Pix} />
      <Stack.Screen name="Billet" component={Billet} />
      <Stack.Screen name="Extract" component={Extract} />
      <Stack.Screen name="CopyAndPastePix" component={CopyAndPastePix} />
      <Stack.Screen name="DemandPix" component={DemandPix} />
      <Stack.Screen name="KeysPix" component={KeysPix} />
      <Stack.Screen name="TransferPix" component={TransferPix} />
      <Stack.Screen name="Comprovant" component={Comprovant} />
      <Stack.Screen name="Perfil" component={Profile} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [userToken, setUserToken] = React.useState(false);

  const validateToken = async () => {
    const user = await AsyncStorage.getItem("@bdkbank:user");
    // @ts-ignore
    const userFormatted = JSON.parse(user);
    if (userFormatted) {
      if (userFormatted.Token.length > 0) {
        setUserToken(true);
      } else {
        setUserToken(false);
      }
    } else {
      return;
    }
  };

  React.useEffect(() => {
    validateToken();
  }, [validateToken, userToken]);
  return (
    <>
      {/* <StatusBar barStyle={"default"} showHideTransition="fade" animated /> */}
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          {/* @ts-ignore */}
          <AppProvider>{MyStack()}</AppProvider>
          {/* <AppProvider>{userToken ? MyTabs() : MyStack()}</AppProvider> */}
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
}
