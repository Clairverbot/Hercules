import * as React from 'react';
import { Image, Platform, StyleSheet, Text, Button, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import RoutesScreen from '../screens/RoutesScreen';
import RouteDetailsScreen from '../screens/RouteDetailsScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RoutesStack = createStackNavigator();

export default function RoutesStackScreen({ navigation }) {
  return (
    <RoutesStack.Navigator>
      <RoutesStack.Screen
        name="Routes"
        component={RoutesScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('RouteDetails')}>
              <Text style={styles.addButton}>+</Text>
            </TouchableOpacity>
          )
        }} />
      {/* to pass props */}
      <RoutesStack.Screen name="RouteDetails" component={RouteDetailsScreen} />
    </RoutesStack.Navigator>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    marginHorizontal: 16,
    fontSize: 36,
    textAlign: "center",
    color: "#EF7922",
  }
});