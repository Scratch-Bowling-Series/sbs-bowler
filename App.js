import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './components/Header'
import Navigation from './components/Navigation'



const App = () =>  {
  return (
    <View style={styles.container}>
      <Header/>

      <Navigation style={styles.nav}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 42,
    backgroundColor: '#e8e8e8'
  },
  nav:{
    flex:2
  }
});




export default App;