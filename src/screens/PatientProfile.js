import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  onPress,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Button
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,

  Card,
} from "react-native-paper";
import { Rating, AirbnbRating } from "react-native-ratings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ion from "react-native-vector-icons/Ionicons";
import Font from "react-native-vector-icons/FontAwesome5";
import {getPatient} from '../../Redux/Slices/PatientSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import ModalComponent from "../../Components/Modal";
import { IP } from  '../../src/screens/Theme'
import jwtDecode from "jwt-decode";
import { Badge } from 'react-native-paper';
import io from 'socket.io-client';

//rating
const StarRating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const halfStars = Math.round(rating - filledStars);
  const emptyStars = 5 - filledStars - halfStars;

  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(filledStars)].map((_, i) => (
        <Icon name="star" key={`star-${i}`} size={30} color="gold" />
      ))}
      {[...Array(halfStars)].map((_, i) => (
        <Icon name="star-half" key={`half-star-${i}`} size={30} color="gold" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon name="star-outline" key={`empty-star-${i}`} size={30} color="gold" />
      ))}
    </View>
  );
};



// end rating



// const direction = isRTL ? 'rtl' : 'ltr';

// import { I18nManager } from 'react-native';
const ProfileScreen = ({ navigation }) => {
 




 
  const patient = useSelector((state) => state.PatientSlice.patient);

  const API_URL = `http://${IP}:3500`;
  const Socket = io(API_URL);
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

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };
  const [topRated, getTopRated] = useState([])
  // console.log(topRated);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenString = await AsyncStorage.getItem('token');
        const patientData = await AsyncStorage.getItem('data');
        const token = JSON.parse(tokenString);
        const data = JSON.parse(patientData);
    
        const decoded = jwtDecode(token);
        const patientId = decoded.userid;
        // const patientId = data._id;
        console.log(patientId , "id patient");
        axios.get(`http://${IP}:3500/book/NursebookingNative/?patientId=${patientId}`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
        )
          .then((res) => {
            console.log(res , "lllllll");
            getTopRated(res.data.data);
          })
          .catch((err) => {
            console.log(err,'errrr');
          });
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);


  console.log(topRated); 
  const dispatch = useDispatch()
   useEffect(() => {
     dispatch(getPatient());
    }, []);
    // I18nManager.forceRTL(false)
    // const patient = useSelector((state) => state.PatientSlice.patient);
    // console.log(patient , "kkkkkk")
  //   const [rating, setRating] = useState(0);

  // const submitRating = () => {
  //   const value = rating;
  //   console.log(rating);
  // };
  async function logout() {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('data');
      navigation.navigate('Signin');
    } catch (error) {
      console.error('Error removing items from AsyncStorage:', error);
      // Handle the error gracefully, such as showing an error message to the user
    }
  }

const [rating, setRating] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const submitRating = (id,r) => {
  const  patientId= patient._id
  const nurseId= id
    console.log('Rating submitted:', rating ,id ,patientId);
    axios.put(`http://${IP}:3500/patient/addrate/${patientId}/${nurseId} `, {"rate":rating}).then((res) => {
      console.log(res.data , "fghgjgfhj")
      }).catch((error) => {
       alert(error)
    });
    setModalVisible(false);  };

  const isValidRating = () => {
    return !isNaN(parseFloat(rating)) && rating >= 0 && rating <= 5;
  };

  const closeModal = () => {
    setModalVisible(false);
  };



  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <View>

           <Badge
            visible={notifications.length&&true}
            size={20}
            style={{ position: 'absolute', top: 1, right: 19 }}
          >
            {notifications.length}
          </Badge>

          <Ion
           onPress={() => navigation.navigate("notification")}
            name="notifications"
            color="#041858"
            size={30}
            containerStyle={{
              position: "absolute",
              left: -10,
              top: 10,
              alignSelf: "left",
            }} // set the left value to -10
          />
            </View>
          <Font
            onPress={() => navigation.navigate("editProfile")}
            name="user-edit"
            color="#041858"
            size={30}
            containerStyle={{
              position: "absolute",
              left: -10,
              top: 10,
              alignSelf: "left",
            }} // set the left value to -10
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Avatar.Image
             source={{ uri: `http://${IP}:3500/${patient.profile}` }}
            
            size={80}
            style={{ borderWidth: 2, borderColor: "#041858", elevation: 5 }}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {" "}
              {patient.name}{" "}
            </Title>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#041858" size={20} />
          <Text style={{ color: "#777777", marginRight: 20 , marginLeft :10 }}>
            {patient.address }
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#041858" size={20} />
          <Text style={{ color: "#777777", marginRight: 20 , marginLeft :10 }}>{patient.phoneNumber } </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#041858" size={20} />
          <Text style={{ color: "#777777", marginRight: 20 , marginLeft :10 }}>
           {patient.email}
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              // borderLeftWidth: 1,
              alignItems: "center",
              justifyContent: 'center',
            },
          ]}
        >
          <Title>5</Title>
          <Caption>مرات طلب ممرض</Caption>
        </View>
        <View style={[styles.infoBox,   {
              borderRightColor: "#dddddd",
              // borderLeftWidth: 1,
              alignItems: "center",
              justifyContent: 'center',
            }]}>
          <Title>12</Title>
          <Caption>الطلبات</Caption>
        </View>
      </View>
         {/* start bookedNurseSection */}

<View style={{ 
          marginTop: 20, 
          justifyContent: 'center' , 
          alignItems: 'center', 
         display: 'flex',
         marginBottom: 30
         }}
         >
<Text
           style={{ marginTop: 20 , color:"#041585", marginBottom:30 , fontSize:20  , fontWeight: '700' , borderBottomColor: '#041585' , borderBottomWidth: 2}}
          >
           الممرضين الذين قمت بحجزهم          
           </Text>

          <ScrollView
          style={{ height: 350 }}
          horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 40, marginTop: 30, height: 900,  }}
          >
           
            {topRated.map((nurse,index) => (
  <Card key={index} style={{height: 300 , marginLeft:30 , backgroundColor: "#FEFEFE",  justifyContent: "center",
                  alignItems: "center" }}
    onPress={() => navigation.navigate("NurseProfile")}
  >
          <View
            style={{
              // backgroundColor: "#FEFEFE",
              // height: 200,
              width: 210,
              borderRadius: 15,
              // marginLeft: 20,
              // padding: 5,
              // paddingTop: 40,
              shadowColor: "#041858",
              // elevation: 6,
              justifyContent: "center",
                  alignItems: "center",
              
            }}
          >
           <View style={{
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width:'80%',
            marginLeft:'auto',
            marginRight:'auto'
           }}>
             <Image
              source={{uri:`http://${IP}:3500/${nurse.profile}`}}
              style={{
                width: "100%",
                borderRadius: 10,
                height: 200,
                resizeMode: "contain",
                alignItems: 'center',
            justifyContent: 'center',
              }}
            />
           </View>
            <View
              style={{
                flexDirection: "row",
                // width: 150,
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: -10
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* <Icon name="star" color="#f5ca3c" size={20} /> */}
                  {/* <Text style={{ marginLeft: 0 }}>{nurse.rates}</Text> */}
                </View>
                <Text
                  style={{
                    width: "100%",
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 7,
                    marginTop: 7,
                    color: "#041585",
                    textAlign: 'center',
                    // marginTop: -10
                    // marginLeft: "auto",
                    // marginRight: "auto",
                  }}
                >
                  {nurse.name}
                </Text>
                <Button 
                title="قيم الآن"
                style={{width: 100 , backgroundColor:'#0bc13c'   }} onPress={handlePress}>
                  
                </Button>
              </View>
            </View>
          </View>
          <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>تقييم الممرض</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>التقييم:</Text>
            <TextInput
              style={styles.ratingInput}
              placeholder="ادخل التقييم (0-5)"
              keyboardType="numeric"
              value={rating}
              onChangeText={(value) => setRating(value)}
            />
          </View>
          {isValidRating() && (
            <View style={styles.starRatingContainer}>
              <StarRating rating={parseFloat(rating)} />
            </View>
          )}
          <View style={styles.buttonContainer}>
            <Button
              title="ارسل التقييم"
              onPress={()=>{submitRating(nurse._id)}}
              disabled={!isValidRating()}
              color="#4CAF50"
            />
            <Button title="اغلق" onPress={closeModal} color="#f44336" />
          </View>
        </View>
      </View>
    </Modal>
        </Card>
      ))}           
          </ScrollView>

</View>
{/* end bookedNurseSection */} 
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {navigation.navigate('patientPost' , { patientId: patient._id })}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#041858" size={25} />
            <Text style={{ ...styles.menuItemText }}>طلباتي</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={logout}>
          <View style={styles.menuItem}>
            <Ion name="exit-outline" color="#041858" size={25} />
            <Text style={{ ...styles.menuItemText }}>تسجيل الخروج</Text>
          </View>
        </TouchableRipple>
       
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    paddingTop: 14,
    marginBottom: 25,
  },
  icons: {
    flexDirection: "row",
 
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
 
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent:'space-around',
    height: 100,
  },
  infoBox: {
    // width: "50%",
 
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
 
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
//modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  ratingInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    fontSize: 16,
  },
  starRatingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});