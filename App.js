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
      <View style={styles.inner}>
        <FlatList
          data={messageList}
          style={styles.messageList}
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
            <Text style={styles.buttonLabel}>Send</Text>
          </Pressable>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  inner: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  textInput: {
    backgroundColor: "#dadada",
    textAlign: "center",
    paddingVertical: 24,
  },
  button: {
    borderRadius: 12,
    marginTop: 12,
    backgroundColor: "lightgreen",
    maxWidth: 120,
  },
  buttonLabel: {
    paddingVertical: 12,
    textAlign: "center",
    backgroundColor: "lightgreen",
    borderRadius: 9,
  },
  message: {
    padding: 9,
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#bababa",
    shadowColor: "#eaeaea",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 5,
      height: 0,
    },
    marginBottom: 3,
    borderRadius: 6,
  },
});
