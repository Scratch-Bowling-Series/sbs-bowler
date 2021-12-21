import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Platform, Modal, Alert, TouchableOpacity,TextInput, KeyboardAvoidingView,Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";
const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');

const Header = ({userData, onProfile, navigation}) =>  {
    return (
        <View style={styles.headerWrap}>
            <View style={styles.header}>
                <Image source={topBarGraphic} style={styles.headerLines}/>
                <Image source={sbsLogo} style={styles.headerLogo}/>
                { !onProfile ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image style={styles.profile} source={ userData ?{ uri: userData.picture } : defaultProfilePhoto}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.headerSettings} onPress={() => this.setModalVisible(false)}>
                        <Ionicons name="settings-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                )}
                <StatusBar style="dark" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrap:{
        height:65,
        paddingTop: 0,
    },
    header:{
        height:65,
        backgroundColor: '#214031',
        position: 'relative',
    },
    headerLogo:{
        position: 'absolute',
        height:50,
        width: 95,
        top:7.5,
        left:85,
        tintColor: '#214031',
    },
    headerLines:{
        height:65,
        width: 269,
        left:0,
        position: "absolute",
        top: 0,
    },
    headerSettings:{
        height:40,
        width:40,
        padding:4,
        borderRadius: 20,
        position: 'absolute',
        right: 12.5,
        top: 12.5,
    },
    profile:{
        height:40,
        width:40,
        borderRadius: 20,
        position: 'absolute',
        right: 12.5,
        top: 12.5,
    },
});




export default Header;