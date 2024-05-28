import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order/order";
import FinishOrder from "../pages/FinishOrder";
const Stack = createNativeStackNavigator<StackPramsList>();

export type StackPramsList = {
  Dash: undefined;
  Order: {
    number: number | string;
    order_id: string;
  };
  FinishOrder: {
    number: number | string;
    order_id: string;
  };
};

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

      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Finalizando",
          headerStyle: {
            backgroundColor: "#1d1d2e",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;
