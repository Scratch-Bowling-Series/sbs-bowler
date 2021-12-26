import React, {Component, useContext, useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "../header";
import {StyleSheet, Text, useColorScheme, View, Image} from "react-native";
import {colorStylesLight, colorStylesDark} from '../styles';
import UserContext from "../context/userContext";
import AuthContext from "../context/authContext";
import { Dimensions } from 'react-native';

const base_url = 'http://10.0.0.211:8000';
const sbsLogo = require('../../assets/logo-beta.png');
const topBarGraphic = require('../../assets/top-bar.png');
const defaultProfilePhoto = require('../../assets/profile-default.png');
const welcomeDesign= require('../../assets/welcome-design.png');
const adImage = require('../../assets/ad-example.png');
const adImageTwo = require('../../assets/ad-example-2.png');

const HomeScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    const [userData, userToken] = useContext(UserContext);
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const [adsImage,setAdImage] = React.useState(null)

    React.useEffect(() => {
        const random = Math.floor(Math.random() * 11);
        if(random > 5){
            setAdImage(adImage);
        }
        else{
            setAdImage(adImageTwo);
        }
    },[])

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]}>
            <Header navigation={navigation}/>
            <View style={styles.container}>
                <View style={styles.adWrap}>
                    <Image style={styles.ad} source={adsImage}/>
                </View>
                <Text style={styles.screenEmpty}>UUID:{userData.id} TOKEN:{ userToken }</Text>
            </View>
        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    safeAreaView:{
        flex: 1,
    },
    container:{
        flex: 1,
    },
    screenEmpty:{
        fontSize:15,
        fontFamily: 'TTOctosquaresCondBold',
        color:'lightgrey',
        margin:20,
    },
    adWrap:{
        margin:10,
        width: windowWidth - 20,
        height: (windowWidth - 20) / 2,
        overflow:'hidden',
        backgroundColor:'orange',
        borderRadius:10,
    },
    ad:{
        flex:1,
        width: windowWidth - 20,
        resizeMode:'contain',
    }


});

export default HomeScreen;