import * as React from "react";
import { Image, Platform, StyleSheet, Text, Button, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import JournalScreen from "../screens/JournalScreen";
import ChatScreen from "../screens/ChatScreen";
import { TouchableOpacity } from "react-native-gesture-handler";

const JournalStack = createStackNavigator();

export default function JournalStackScreen({ navigation }) {
  return (
    <JournalStack.Navigator>
      <JournalStack.Screen
        name="Journal"
        component={JournalScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat")}
            >
              <Feather
                name="message-circle"
                size={24}
                style={{ marginRight: 12 }}
                color="#A979E5"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <JournalStack.Screen name="Chat" component={ChatScreen} />
    </JournalStack.Navigator>
  );
}
