import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DashboardPage, Payments, Profile } from "../../screens";

const Tab = createBottomTabNavigator();

function BottomBarNavigation() {
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
      <Tab.Screen name="Início" component={DashboardPage} />
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Pagamentos" component={Payments} />
    </Tab.Navigator>
  );
}

export { BottomBarNavigation }