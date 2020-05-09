import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import CardScreen from '../screens/CardScreen';

const CardStack = createStackNavigator();

export default function CardStackScreen() {
  return (
    <CardStack.Navigator>
      <CardStack.Screen name="Card" component={CardScreen} />
    </CardStack.Navigator>
  );
}