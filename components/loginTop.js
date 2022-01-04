
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, useColorScheme} from 'react-native';
import LoginHeader from "./loginHeader";
import {colorStylesDark, colorStylesLight} from "./styles";

const welcomeDesign = require('../assets/welcome-design.png');


const LoginTop = ({navigation, header, desc}) =>  {

    const colorScheme = useColorScheme();

    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return(
        <View style={[styles.loginTop, colors.bkgGreen1]}>
            <LoginHeader navigation={navigation}/>
            <View style={styles.loginTopInner}>
                <Image source={welcomeDesign} style={[styles.welcomeDesign, {tintColor: colorScheme === 'light' ? '#234434' : '#111111'}]}/>
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
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
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
        width: '100%',
        alignSelf:'flex-end',
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
        position: 'absolute',
        right:0,left:0,top:0,bottom:0,
        width: '100%',
        maxHeight:500,
        flex:1,
        resizeMode: "cover",
        tintColor: '#234434'
    },
});

export default LoginTop;
