import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const SignupScreen = ({navigation}) => {
  const handlePatientCardPress = () => {
    // Handle patient card press event
  };

  const handleNurseCardPress = () => {
    
   };

  return (
    <ImageBackground source={require('../../assets/medical.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.cardTitle}>  انضم كمستخدم</Text>
          <Text style={styles.cardDescription}> انضم الينا الان واستفيد من خدمات الموقع وسرعة الوصول</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("SignupNurse")}>
          <Text style={styles.cardTitle}>انضم كممرض</Text>
          <Text style={styles.cardDescription}>سجل كممرض وحقق ارباح اكثر من خلال نشاطك علي الموقع </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    
  },
  card: {
    width: '100%',
    backgroundColor: '#0415855f',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    // shadowColor: '#041585',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#041858',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
    textShadowColor: 'rgba(245, 241, 241, 0.5)',
  },
  cardDescription: {
    fontSize: 16,
    color: 'white',
  },
});

export default SignupScreen;