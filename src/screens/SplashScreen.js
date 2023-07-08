import React ,{useRef} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
     Animated
} from 'react-native';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
// import { Home } from 'react-native-feather';
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#041858' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../images/welcome.gif')}
          
            />
            </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
                
            }]}
            animation="fadeInUpBig">
            <Text style={styles.title}>اهلا بكم فى موقع خدمات طبية Nursique</Text>
           
            <View style={styles.button}>
            <TouchableOpacity onPress={() => {
  navigation.navigate('Signin');
  // onPressButton();
}}>
  {/* <View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}> */}
  <View>
    <Text style={styles.textSign}>سجل الان</Text>
  </View>             
</TouchableOpacity>

                    <MaterialIcons style={styles.next}
                        name="navigate-next"
                        color="#00A02B"
                        size={20}
                    />
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',

    
  },
  footer: {
      flex: 1,
      // backgroundColor: '#fff',
      marginTop:50,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingVertical: 40,
      paddingHorizontal: 30
  },
//   logo: {
//       width: height_logo,
//       height: height_logo
//   },
  title: {
      color: '#041858',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
    
      flexDirection:'row',
      marginTop: 30,
      justifyContent:'flex-end'
  },
  
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: '#00A02B',
      fontWeight: '900',
      fontSize:19
      
  }
});

