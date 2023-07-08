import React, { useEffect, useState } from 'react'
// import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import {  } from "react-native-gesture-handler";
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Avatar, Card, IconButton, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPatient } from '../../Redux/Slices/PatientSlice';
import * as Font from 'expo-font';
import { useDispatch, useSelector } from 'react-redux';
import { IP } from  '../../src/screens/Theme'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';


import io from 'socket.io-client';
 

export default function Notification({ Navigation }) {

  const navigation = useNavigation();
    // Socketr
    const API_URL = `http://${IP}:3500`;
    const Socket = io(API_URL);
    
  // const patient = useSelector((state) => state.PatientSlice.patient);
  // const dispatch = useDispatch();
  // const [notifications, setNotifications] = useState([]);
  // useEffect(() => {
  //   dispatch(getPatient());
  //   Socket.on('connect', () => {
  //   console.log('Socket connected');
  // })
  // }, []);
  // console.log("patient._id",patient._id);
  // useEffect(() => {
  //   Socket?.on("getNotification", (data) => {
  //     console.log("data.patientId ",data.patientId );
  //     console.log("data....",data);
  //     if (data.patientId == patient._id) {
  //       console.log("after ..........");
  //       setNotifications((prevNotifications) => [...prevNotifications, data]);
  //     }
  //   });
  //      Socket.on('disconnect', () => {
  //     console.log('Socket.IO connection closed');
  //   });
  // }, [Socket]);

  const patient = useSelector((state) => state.PatientSlice.patient);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    dispatch(getPatient())
    
    Socket.on('connect', () => {
      console.log('Socket connected');
  
      Socket?.on("getNotification", (data) => {
    
          setNotifications(prevNotifications => [...prevNotifications, data]);
        });
    
    });
  
    Socket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });
  
    return () => {
      Socket.off('connect');
      Socket.off('getNotification');
      Socket.off('disconnect');
    };
  }, [dispatch, patient._id]);
  const currentTime = moment.utc();
    const commentTimeFormatted = currentTime.format('YYYY-MM-DDTHH:mm:ss[Z]');
    // setcomments({ ...comments, [item._id]: comments[item._id] ? [...comments[item._id], comment] : [comment] });
    // setCommentTime({ ...commentTime, [item._id]: commentTime[item._id] ? [...commentTime[item._id], commentTimeFormatted] : [commentTimeFormatted] });
  return (
    <ScrollView>
      <View style={{
        marginTop: 20,
      }} >
        {notifications.map((notification, index) => (
        <View style={styles.cardSectionNot}>
          <View style={styles.SectionNot}>
            <Image style={styles.imgNot}  source={{uri : `${notification.nurseImg}`}} />
            <View style={styles.container}>
            <Text style={styles.Notf}>علق {notification.postNurseName}  على الطلب الخاص بك</Text>
            <View style={styles.row}>
              <Text style={styles.Notftitle}>
              {notification.postTitle}
              </Text>
             </View>
              </View>
              </View>
              {/* <Text style={styles.time}>
                {getElapsedTime(item.createdAt)}
                </Text> */}
          </View>
        
        ))}
      </View>
      <Button
  mode="contained"
  onPress={() => navigation.navigate('allNotification')}
  style={styles.viewAllButton}
>
  كل الاشعارات
</Button>
                
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  cardSectionNot: {
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 7,
    elevation: 5
  },
  viewAllButton: {
    marginTop: 10,
    backgroundColor: '#041585',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  SectionNot: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  Notf:{
    fontWeight: 'bold',
    fontSize: 19,
    color: '#041585',
  },
  imgNot: {
    width: 90,
    height: 90,
    borderRadius: 50,
    backgroundColor: "#eee",
  },

  row: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  Notf: {
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    textAlign: 'right'
  },
  Notftitle: {
    marginTop: 35,
    fontSize: 16,
    // marginRight: -15,
    color: '#041585',
    alignItems: 'center',
    flexWrap: 'wrap',
    // margin:15,
    
  },
  container: {
    flexDirection: 'column',
    // alignItems: 'stretch',
  },
 
  time: {
    fontSize: 13,
    color: '#041585bb',
    marginLeft:100
  },
});