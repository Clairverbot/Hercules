import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import JournalStackScreen from "./JournalStackNavigator";
import SupportStackScreen from "./SupportStackNavigator";
import SettingsStackScreen from "./SettingsStackNavigator";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Journal";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: null });

  return (
    <BottomTab.Navigator
      // initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: "#A979E5",
      }}
    >
      <BottomTab.Screen
        name="Journal"
        component={JournalStackScreen}
        options={{
          title: "Journal",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="book" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Support"
        component={SupportStackScreen}
        options={{
          title: "Support",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="heart" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Journal":
    case "Support":
    case "Settings":
      return routeName;
  }
}
