import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import uuid from "react-native-uuid";

export default function App() {
  const [message, setMessage] = useState();
  const [messageList, setMessageList] = useState([]);

  const fetchMessages = () => {
    axios
      .get(
        "https://forum-app-react-native-default-rtdb.europe-west1.firebasedatabase.app/messages.json"
      )
      .then((res) => {
        let messages = [];
        Object.keys(res.data).forEach((x) => {
          messages.push(res.data[x]);
        });
        setMessageList(messages);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log(messageList.length, messageList);
  }, [messageList]);
  const handleMessageSend = () => {
    // console.log("Sending message:", message);

    axios
      .post(
        "https://forum-app-react-native-default-rtdb.europe-west1.firebasedatabase.app/messages.json",
        {
          id: uuid.v4(),
          message: message,
        }
      )
      .then((response) => {
        fetchMessages();
      });
  };

  const handleMessageChange = (message) => {
    setMessage(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messageList}
        renderItem={({ item }) => {
          return (
            <View style={styles.message}>
              <Text>{item.message}</Text>
            </View>
          );
        }}
      />
      <View style={styles.messageWriter}>
        <TextInput
          onChangeText={handleMessageChange}
          placeholder="enter message"
          style={styles.textInput}
          value={message}
        />
        <Pressable onPress={handleMessageSend} style={styles.button}>
          <Text>Send</Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "pink",
  },
  textInput: {
    backgroundColor: "#dadada",
    textAlign: "center",
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "lightgreen",
    borderRadius: 12,
  },
  message: {
    padding: 9,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    shadowColor: "#eaeaea",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 5,
      height: 0,
    },
    margin: 3,
    borderRadius: 6,
  },
});
