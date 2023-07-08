
import React, { useEffect, useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import io from "socket.io-client";
import { IP } from "./Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = `http://${IP}:3500`;
const socket = io(API_URL);

const ChatScreen = ({ route }) => {
  const { data } = route.params;

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState();
  
  const scrollViewRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientData = await AsyncStorage.getItem("data");
        console.log(patientData); // add this line to check
        const data = JSON.parse(patientData);
        const username = data.name;
        console.log("username...",username);
        setUsername(username);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: data._id,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
  
      await socket.emit("send_message_mobile", messageData);
      console.log("messageData sent:", messageData);
      setMessageList((list) => {
        if (list.some((msg) => msg.author === messageData.author && msg.message === messageData.message)) {
          return list;
        } else {
          return [...list, messageData];
        }
      });
      setCurrentMessage("");
    }
  };
  
  useEffect(() => {
    socket.on("receive_message_mobile", (data) => {
      if (data.author !== username) {
        setMessageList((list) => {
          if (list.some((msg) => msg.author === data.author && msg.message === data.message)) {
            return list;
          } else {
            return [...list, data];
          }
        });
      }
    });
  
    return () => {
      socket.off("receive_message_mobile");
    };
  }, [socket, username]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messageContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {messageList.map((messageContent, index) => (
          <View
            key={index}
            style={[
              styles.message,
              {
                justifyContent: username === messageContent.author ? "flex-start" : "flex-end",
              },
            ]}
          >
            <View>
              <View style={styles.messageContent}>
                <Text style={styles.messageText}>{messageContent.message}</Text>
              </View>
              <View style={styles.messageMeta}>
                <Text style={styles.authorText}>{messageContent.author}</Text>
                <Text style={styles.timeText}>{messageContent.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          value={currentMessage}
          placeholder="Hey..."
          onChangeText={(text) => setCurrentMessage(text)}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  };
  
  const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: "#fff",
  },
  messageContainer: {
  flexGrow: 1,
  },
  message: {
  padding: 10,
  flexDirection: "row",
  },
  messageContent: {
  minHeight: 40,
  maxWidth: 120,
  backgroundColor: "#43a047",
  borderRadius: 5,
  color: "white",
  flexDirection: "row",
  alignItems: "center",
  marginHorizontal: 5,
  paddingHorizontal: 5,
  overflowWrap: "break-word",
  wordBreak: "break-word",
  },
  messageText: {
  color: "white",
  },
  messageMeta: {
  flexDirection: "row",
  fontSize: 12,
  },
  authorText: {
  marginLeft: 10,
  fontWeight: "bold",
  },
  timeText: {
  marginLeft: 5,
  },
  footer: {
  height: 40,
  borderTopWidth: 1,
  borderColor: "#263238",
  flexDirection: "row",
  alignItems: "center",
  },
  input: {
  flex: 1,
  height: "100%",
  borderWidth: 0,
  paddingLeft: 10,
  fontSize: 16,
  },
  sendButton: {
  width: "15%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#43a047",
  borderColor: "#43a047",
  borderWidth: 1,
  },
  sendButtonText: {
  fontSize: 18,
  color: "white",
  },
  });
  
  export default ChatScreen;