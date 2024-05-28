import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../config/axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";
type RouteDetail = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetail, "FinishOrder">;

export default function FinishOrder() {
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  async function handleFinish() {
    try {
      await api.put("/order/send", {
        order_id: route.params.order_id,
      });
      navigation.popToTop();
    } catch (error) {}
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.titleText}>Você deseja finalizar o pedido?</Text>
        <Text style={styles.Ntable}>Mesa: {route.params.number}</Text>

        <TouchableOpacity style={styles.btn} onPress={handleFinish}>
          <Text style={{ marginRight: 5, fontSize: 18, fontWeight: "bold" }}>
            Finalizar Pedido
          </Text>
          <Icon name="shopping-cart" size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101026",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  details: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  Ntable: {
    fontSize: 22,
    color: "#fff",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  btn: {
    flexDirection: "row",
    width: "65%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});
