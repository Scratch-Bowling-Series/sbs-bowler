import React, {Component, useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../header";
import {StyleSheet, Text, useColorScheme, View} from "react-native";
import {colorStylesLight, colorStylesDark} from '../styles';


const base_url = 'http://10.0.0.211:8000';
const sbsLogo = require('../../assets/logo-beta.png');
const topBarGraphic = require('../../assets/top-bar.png');
const defaultProfilePhoto = require('../../assets/profile-default.png');
const welcomeDesign= require('../../assets/welcome-design.png');


const HomeScreen = ({navigation, userData, token}) => {
    const colorScheme = useColorScheme();

    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]}>
            <Header userData={userData} navigation={navigation}/>
            <View style={styles.container}>
                <Text style={styles.screenEmpty}>{ userData.first_name } Home Screen</Text>
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