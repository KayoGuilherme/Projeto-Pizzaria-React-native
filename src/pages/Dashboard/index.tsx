import react, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackPramsList } from "../../routes/app.routes";
import { api } from "../../config/axios";

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  const { signOut } = useContext(AuthContext);
  const [table, setTable] = useState("");

  async function Order() {
    if (table === "") {
      return;
    }

    const response = await api.post("/order", {
      table: Number(table),
    });

    navigation.navigate("Order", {
      number: table,
      order_id: response.data.id,
    });

    setTable("");
    
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Novo Pedido</Text>
        <TextInput
          placeholder="Numero da Mesa"
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          style={styles.input}
          value={table}
          onChangeText={setTable}
        />

        <TouchableOpacity style={styles.btn} onPress={Order}>
          <Text style={styles.btntext}>Abrir Mesa</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1d1d2e",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#101026",
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#fff",
  },
  btntext: {
    fontSize: 18,
    color: "#101026",
    fontWeight: "bold",
  },
  btn: {
    width: "90%",
    height: 40,
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },
});
