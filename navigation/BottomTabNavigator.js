import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import RoutesStackScreen from './RoutesStackNavigator';
import CardStackScreen from './CardStackNavigator';
import AccountStackScreen from './AccountStackNavigator'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Routes';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: null });

  return (
    <BottomTab.Navigator
      // initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        activeTintColor: '#EF7922',
      }}>
      <BottomTab.Screen
        name="Routes"
        component={RoutesStackScreen}
        options={{
          title: 'Routes',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-map" />,
        }}
      />
      <BottomTab.Screen
        name="Card"
        component={CardStackScreen}
        options={{
          title: 'Card',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-card" />,
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountStackScreen}
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
    case 'Routes':
      return 'Routes';
    case 'Card':
      return 'Card';
    case 'Account':
      return 'Account'
  }
}
