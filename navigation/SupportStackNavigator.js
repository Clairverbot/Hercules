import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import SupportScreen from "../screens/SupportScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";



const SupportStack = createStackNavigator();

export default function SupportStackScreen({navigation}) {
  return (
    <SupportStack.Navigator>
      <SupportStack.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
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
    </SupportStack.Navigator>
  );
}
