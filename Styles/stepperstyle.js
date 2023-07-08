import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      // paddingBottom: 25,
      color: 'white',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
    
      width: 300,
      height: 300,
      // marginBottom: 60,
      // tintColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeForegroundColor,
    },
    button: {
      fontSize: 18,
      color: '#041858',
      marginTop: 10,
      fontWeight:"bold",
      marginTop:50,
      backgroundColor:"white",
      padding:10,
      borderRadius:15

    },
  });
};

export default dynamicStyles;
