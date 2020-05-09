import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/AccountScreen';

const AccountStack = createStackNavigator();

export default function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={AccountScreen} />
    </AccountStack.Navigator>
  );
}