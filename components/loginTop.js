
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import LoginHeader from "./loginHeader";

const welcomeDesign= require('../assets/welcome-design.png');


const LoginTop = ({header, desc}) =>  {
    return(
        <View style={styles.loginTop}>
            <LoginHeader/>
            <View style={styles.loginTopInner}>
                <Image source={welcomeDesign} style={styles.welcomeDesign}/>
                <View style={styles.welcomeTopMessage}>
                    <Text style={styles.welcomeHeaderText}>{header}</Text>
                    <Text style={styles.welcomeHeaderDesc}>{desc}</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    loginContainer:{
        flex: 1,
        backgroundColor: '#214031',
        overflow: 'hidden',
    },
    loginTop:{
        flex:4,
        backgroundColor: '#214031',
    },
    loginTopInner:{
        flex:8,
        position: 'relative',
    },
    loginLogo:{
        resizeMode: 'center',
        tintColor: '#fff',
        flex:1,
        height: '100%',
        alignSelf: 'flex-start',
    },
    loginHelp:{
        flex:3,
        alignItems: 'flex-end',
        paddingVertical: 12,
    },
    loginHeader:{
        position: 'absolute',
        top: 0, right:0, left:0,
        zIndex: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        fontFamily: 'TTOctosquaresCondBlack',
    },
    welcomeTopMessage:{
        position: "absolute",
        bottom: 0,
        left:0,
        padding:30,
    },
    welcomeHeaderText:{
        color: '#fff',
        fontSize: 35,
        fontFamily: 'TTOctosquaresCondBold',
        paddingVertical: 5,
    },
    welcomeHeaderDesc:{
        color: '#fff',
        fontSize: 20,
        maxWidth: '90%',
        fontFamily: 'TTOctosquaresCondBold',
    },
    welcomeDesign:{
        width: '100%',
        height: 600,
        marginVertical: 100,
        resizeMode: "cover",
        tintColor: '#234434'
    },
});

export default LoginTop;
