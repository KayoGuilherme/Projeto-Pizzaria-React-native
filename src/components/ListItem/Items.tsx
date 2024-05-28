import react from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Feather as Icon} from '@expo/vector-icons'
import { api } from "../../config/axios";
interface ItemProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  deleteItem: (item_id: string) => void;
}



export default function ListItem({ data, deleteItem }: ItemProps) {


  async function handleTrashItem(){
  deleteItem(data.id)
}

  return (
    <View style={styles.container}>
      <Text style={styles.item}>
        {data.amount} - {data.name}
      </Text>

      <TouchableOpacity style={styles.trashItem} onPress={handleTrashItem}>
        <Icon name="trash-2" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101026",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#8a8a8a'
  },
  item: {
    color: '#fff'
  },
  trashItem:{}
});
