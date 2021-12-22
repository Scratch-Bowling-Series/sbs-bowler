import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Platform, Modal, Alert, TouchableOpacity,useColorScheme, KeyboardAvoidingView,Keyboard } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";
import SettingsModal from "./settingsModal";

import sbsLogo from '../assets/logo-beta.png';
import topBarGraphic from '../assets/top-bar.png';
import topBarGraphicDark from '../assets/top-bar-dark.png';
import defaultProfilePhoto from '../assets/profile-default.png';
import {colorStylesLight, colorStylesDark} from './styles';


const Header = ({userData, onProfile, navigation}) =>  {
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();

    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return (
        <View style={styles.headerWrap}>
            <View style={[styles.header, colors.bkgGreen1 ]}>
                { colorScheme === 'light' ? (
                    <Image source={topBarGraphic} style={[styles.headerLines]}/>
                ) : (
                    <Image source={topBarGraphicDark} style={[styles.headerLines]}/>
                )}
                <Image source={sbsLogo} style={[styles.headerLogo, colors.logoTint]}/>
                { !onProfile ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image style={styles.profile} source={ userData ?{ uri: userData.picture } : defaultProfilePhoto}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.headerSettings} onPress={() => setModalVisible(true)}>
                        <Ionicons name="settings-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                )}
                    <SettingsModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>

                { colorScheme === 'light' ? (
                    <StatusBar style='dark' />
                ):(
                        <StatusBar style='light' />
                    )
                }
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