import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Platform, Modal, Alert, TouchableOpacity,TextInput, KeyboardAvoidingView,Keyboard, Switch} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');

const SettingsModal = ({modalVisible, setModalVisible}) =>  {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                this.setModalVisible(!this.modalVisible);
            }}
            style={styles.helpModal}
        >
            <SafeAreaView style={{flex:1, position:'relative'}}>
                <View style={styles.helpHeader}>
                    <Text style={styles.helpHeaderText}>Settings</Text>
                    <TouchableOpacity style={[styles.helpClose, {paddingHorizontal: 20,}]} onPress={() => setModalVisible(false)}>
                        <Ionicons name="close" size={32} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsItems}>
                    <View style={styles.settingsItem}>
                        <Text style={styles.settingsItemName}>Automatically Enter Game Mode</Text>
                        <Switch style={styles.settingsSwitch}/>
                    </View>
                    <View style={styles.settingsItem}>
                        <Text style={styles.settingsItemName}>Send Usage & Diagnostics Data</Text>
                        <Switch style={styles.settingsSwitch}/>
                    </View>
                </View>
                <Text style={styles.settingsVersion}>SBS BOWLER - v1.0.0-b</Text>
                <Text style={styles.settingsWeb}>SCRATCH BOWLING SERIES</Text>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    settingsItems:{
        flex:1,
    },
    settingsItem:{
        flexDirection: 'row',
    },
    settingsItemName:{
        flex:1,
        margin:20,
        fontSize: 17,
        padding:5,
        fontFamily: 'TTOctosquaresCondBold',
    },
    settingsSwitch:{
        margin:20,
        alignSelf: 'flex-end',
    },
    settingsVersion:{
        fontSize:14,
        color: 'grey',
        fontFamily: 'TTOctosquaresCondRegular',
        textAlign: 'center',
        alignSelf:'flex-end',
        width: '100%',
    },
    settingsWeb:{
        paddingVertical:5,
        fontSize:12,
        color: 'grey',
        fontFamily: 'TTOctosquaresCondRegular',
        textAlign: 'center',
        alignSelf:'flex-end',
        width: '100%',
    },


    helpModal:{

    },
    helpHeader:{
        flexDirection: 'row',
    },
    helpClose:{
        flex:1,
        paddingVertical: 12,
        textAlign: 'right',
        alignItems: 'flex-end',
    },
    helpHeaderText:{
        flex:10,
        color: '#000',
        fontSize: 35,
        fontFamily: 'TTOctosquaresCondBold',
        padding:20,
    },
    helpBody: {
        flex:9,
    },
    helpText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'TTOctosquaresCondBold',
        paddingHorizontal:30,
        paddingVertical: 10,
    },
});




export default SettingsModal;
