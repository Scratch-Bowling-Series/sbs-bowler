import React, {Component, useContext, useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../header";
import {StyleSheet, Text, useColorScheme, View} from "react-native";
import {colorStylesLight, colorStylesDark} from '../styles';
import UserContext from "../context/userContext";
import AuthContext from "../context/authContext";


const base_url = 'https://scratchbowling.pythonanywhere.com';
const sbsLogo = require('../../assets/logo-beta.png');
const topBarGraphic = require('../../assets/top-bar.png');
const defaultProfilePhoto = require('../../assets/profile-default.png');
const welcomeDesign= require('../../assets/welcome-design.png');


const HomeScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const [userData, userToken] = useContext(UserContext);
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]}>
            <Header navigation={navigation}/>
            <View style={styles.container}>
                <Text style={styles.screenEmpty}>UUID:{userData.id} TOKEN:{ userToken }</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeAreaView:{
        flex: 1,
    },
    container:{
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    screenEmpty:{
        fontSize:30,
        fontFamily: 'TTOctosquaresCondBold',
        color:'lightgrey',
    },


});

export default HomeScreen;