import react, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../config/axios";
import ModalPicker from "../../components/ModalPicker";
import ListItem from "../../components/ListItem/Items";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

type RouteDetail = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

export type CategoryProps = {
  id: string;
  name: string;
};

type ProductProps = {
  id: string;
  name: string;
};

type ItemsProps = {
  id: string;
  product_id: string;
  name: string;
  amount: number | string;
};

type OrderRouteProps = RouteProp<RouteDetail, "Order">;

export default function Order() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();
  const route = useRoute<OrderRouteProps>();
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelect, setCategorySelect] = useState<CategoryProps>();
  const [amount, setAmount] = useState("1");
  const [items, setItems] = useState<ItemsProps[]>([]);
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps>();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  useEffect(() => {
    async function loadingData() {
      const response = await api.get("/category");
      setCategory(response.data);

      setCategorySelect(response.data[0]);
    }
    loadingData();
  }, []);

  useEffect(() => {
    async function handleProduct() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelect?.id,
        },
      });
      setProducts(response.data);
      setProductSelected(response.data[0]);
    }
    handleProduct();
  }, [categorySelect]);

  function ChangeCategory(item: CategoryProps) {
    setCategorySelect(item);
  }

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id,
        },
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAdd() {
    try {
      const response = await api.post("/order/add", {
        order_id: route.params?.order_id,
        product_id: productSelected?.id,
        amount: Number(amount),
      });

      let data = {
        id: response.data.id,
        product_id: productSelected?.id as string,
        name: productSelected?.name as string,
        amount: amount,
      };
      setItems((oldArray) => [...oldArray, data]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteItem(item_id: string) {
    await api.delete("/order/remove", {
      params: {
        item_id,
      },
    });
    let removeItem = items.filter((item) => {
      return item.id !== item_id;
    });

    setItems(removeItem);
  }

  function handleNavigation() {
    navigation.navigate("FinishOrder", {
      number: route.params?.number,
      order_id: route.params?.order_id,
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#ff3f4d" />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>{categorySelect?.name}</Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#FFF" }}> {productSelected?.name} </Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNavigation}
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
        >
          <Text style={styles.btnText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={item} deleteItem={handleDeleteItem} />
        )}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={ChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={setProductSelected}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 30,
    marginLeft: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 12,
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "100%",
    height: 60,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#fff",
    fontSize: 22,
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonAdd: {
    backgroundColor: "#3fd1ff",
    width: "20%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  button: {
    backgroundColor: "green",
    width: "75%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
