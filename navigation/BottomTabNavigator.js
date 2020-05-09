import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import AccountScreen from '../screens/AccountScreen'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: '#EF7922',
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Routes',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Card',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-card" />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'How to get started';
    case 'Links':
      return 'Links to learn more';
  }
}
