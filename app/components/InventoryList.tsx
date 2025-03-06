import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

interface InventoryListProps {
  items: InventoryItem[];
}

export default function InventoryList({}: InventoryListProps): JSX.Element {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [itemName, setItemName] = useState<string>("");

  const addItem = (): void => {
    if (itemName.trim() !== "") {
        setItems((prevItems) =>[
        ...prevItems,
        {
          id: Math.random().toString(36).substr(2, 9),
          name: itemName,
          quantity: 1,
        },
      ]);
      setItemName("");
    }
  };

  const removeItem = (id: string): void => {
    if (items.length === 0) return;
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

    const updateItem = (id: string, quantity: number): void => {
    if (quantity < 0) return;
    setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter an item name"
        value={itemName}
              onChangeText={setItemName}
              onFocus={() => setItemName("")} 
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Enter") addItem();
              }
          }
      />
  <View style={styles.button}>
        <Button title="Add Item" onPress={addItem} />
      </View>   

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.actionButton}>
             
                    <Button
                title="-"
                        onPress={() => updateItem(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 0}
              />
                    <TextInput
                        style={styles.quantityInput}
                        value={item.quantity.toString()}
                        keyboardType="numeric"
                        onChangeText={(text) =>{
                            const parsed = parseInt(text, 10);
                            if (!isNaN(parsed))
                                updateItem(
                                item.id, parseInt(text)
                            )
                        }}
                    
                    />
              <Button
                title="+"
                onPress={() => updateItem(item.id, item.quantity + 1)}
                    />
              <Button title="Remove" onPress={() => removeItem(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      marginBottom: 10,
    },
    button: {
      marginBottom: 10,
    },
    item: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      marginBottom: 10,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    quantityInput: {
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      width: 45,
      textAlign: "center",
    },
  });
  
