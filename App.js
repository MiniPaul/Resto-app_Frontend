import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import ResultScreen from "./screens/ResultScreen";
import RestoScreen from "./screens/RestoScreen";

import MyReservationScreen from "./screens/HistoScreen";
import AccountScreen from "./screens/AccountScreen";
import ReservationScreen from "./screens/ReservationScreen";

import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import user from "./reducers/token";
import restoSelected from "./reducers/resto";
import search from "./reducers/search";
import resultsDirection from "./reducers/resultsDest";
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);

const reducer = combineReducers({ user, restoSelected, search, resultsDirection });

const store = configureStore({ reducer });


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigatorTest = function () {
  // On sauvegarde une fonction StackNavigatorTest dans une const
  return (
    <Stack.Navigator>
      <Stack.Screen name="Recherche" component={HomeScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Resto" component={RestoScreen} />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator 
          initialRouteName="Restaurant"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              if(route.name=='Mon compte') {
                iconName = 'person';
              } else if(route.name == 'Restaurant') {
                iconName = 'restaurant';
              } else if(route.name == 'Mes réservations') {
                iconName = 'file-tray-full'
              }
              return <Ionicons name={iconName} size={25} color={color} />;
            },
          })}
          
          tabBarOptions={{
            activeTintColor:'black',
            inactiveTintColor:'lightgrey',
          //   style: {
          //     backgroundColor:'#130f40',
          //   }
          }}
          >
          <Tab.Screen name="Mon compte" component={AccountScreen} />
          <Tab.Screen name="Restaurant" component={StackNavigatorTest} />
          <Tab.Screen name="Mes réservations" component={MyReservationScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
