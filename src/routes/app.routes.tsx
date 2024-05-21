import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order/order";
const Stack = createNativeStackNavigator<StackPramsList>();

export type StackPramsList = {
  Dash: undefined;
  Order: {
    number: number | string;
    order_id: string;
  }
}

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dash"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
