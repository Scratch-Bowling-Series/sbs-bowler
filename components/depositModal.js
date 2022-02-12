import React, {Component, useContext, useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Modal,
    Alert,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    Keyboard,
    Switch,
    useColorScheme, FlatList, RefreshControl, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";
import {SafeAreaView} from "react-native-safe-area-context";
import AuthContext from "./context/authContext";
import UserContext from "./context/userContext";
import {colorStylesDark, colorStylesLight, styles} from "./styles";
import { RectButton } from "react-native-gesture-handler";
import QRCode from 'react-native-qrcode-svg';

const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');

const base_url = 'https://bowl.sbs';




const DepositModal = ({visible, onRequestToClose, userData, userToken, onUpdateUserData}) =>  {

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;



    React.useEffect(() => {

    },[]);

    return (
        <Modal
            presentationStyle='pageSheet'
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                onRequestToClose();
            }}
            style={styles.helpModal}
        >
            <View style={[{flex:1, position:'relative'}, colors.bkgWhite]}>
                <View style={[styles.modalHeader, colors.borderGrey]}>
                    <Text style={[styles.modalHeaderText, colors.textBlack, styles.fontBold]}>Deposit</Text>
                    <TouchableOpacity style={[styles.modalHeaderButton, styles.fontBold, colors.textBlack]} onPress={() => onRequestToClose() }>
                        <Ionicons style={[styles.modalHeaderButtonText]} name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>

                <View style={[thisStyles.qrWrap]}>
                    <Text style={[thisStyles.scannerTopText, colors.textBlack, styles.fontBold]}>SHOW US YOUR CODE</Text>
                    <Text style={[thisStyles.scannerSubText, colors.textBlack, styles.fontBold]}>WE'LL LOAD YOUR BALANCE WITH CASH</Text>
                    <Ionicons style={[thisStyles.scannerArrow, colors.textTan]} size={40}  name="ios-arrow-down-outline"  />

                    <View style={[thisStyles.qrFrame, colors.borderTan]}>
                        <View style={[thisStyles.scannerCoverVertical, colors.bkgWhite]}></View>
                        <View style={[thisStyles.scannerCoverHorizontal, colors.bkgWhite]}></View>
                        <View style={[thisStyles.qrCode, colors.borderGrey]}>
                            <View style={[thisStyles.qrCodeInner]}>
                                <QRCode
                                    size={180}
                                    value={userData.id}
                                    backgroundColor='transparent'
                                    color='white'
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const thisStyles = StyleSheet.create({
    qrWrap:{
        alignItems:'center',
        justifyContent:'center',
    },
    qrFrame:{
        width:240,
        height:240,
        padding:10,
        borderWidth:5,
        borderRadius:18,
    },
    qrCode:{
        width:210,
        height:210,
        padding:10,
        borderWidth:5,
        borderRadius:15,
    },
    qrCodeInner:{
        borderRadius:15,
    },
    scannerCoverVertical:{
        position:'absolute',
        top:-5, bottom:-5,
        right:30, left:30,
    },
    scannerCoverHorizontal:{
        position:'absolute',
        left:-5,right:-5,
        top:30, bottom:30,
    },
    scannerCamera:{
        flex:1,
    },
    scannerBottomIcon:{
        fontSize:16,
        lineHeight:16,
        paddingVertical:20,
    },
    scannerBottomText:{
        fontSize:16,
        lineHeight:16,
        paddingTop:20,
        marginRight:10,
    },
    scannerTopText:{
        fontSize:25,
        textAlign:'center',
    },
    scannerSubText:{
        paddingTop:5,
        fontSize:13,
        textAlign:'center',
        maxWidth:'70%',
    },
    scannerHelp:{
        fontSize:32,
        height:50,
        alignSelf: 'flex-end',
        margin:20,
        lineHeight:32,
        width:32,
        textAlign:'center',
        alignItems:'flex-end',
    },
    scannerArrow:{
        marginTop:15,
        fontSize:40,
        textAlign:'center',
    },
    scannerWrap:{
        position:'relative',
        padding:10,
        borderRadius:18,
        borderWidth:4,
        marginTop:20,
        aspectRatio:1,
        width:'60%',
    },
    scannerInner:{
        flex:1,
        borderRadius:12,
        overflow:'hidden',
        borderWidth:5,
    },
    friendsList:{
        marginHorizontal:0,
        paddingBottom:40,
    },
    notifyItem:{
        paddingHorizontal:20,
        height:100,
        borderBottomWidth:1,

        flexDirection:'row',
    },
    notifyWrap:{
        flex:4,
        marginLeft:10,
    },
    notifyImage:{
        aspectRatio:1,
        height:80,
        marginVertical:10,
        resizeMode:'cover',
        borderRadius:999,
    },
    friendsListName:{
        flex:1,
        paddingTop:5,
        paddingHorizontal:5,
        fontSize:16,
        textAlignVertical: 'center',
        lineHeight:22,
        textAlign:'left',
    },
    notifyButtons:{
        flex:1,
        flexDirection:'row',
        paddingTop:5,
    },
    notifyButton:{
        borderRadius:10,
        flex:1,
        marginHorizontal:5,
        flexDirection:'row',
        height:35,
        justifyContent:'center',
        position:'relative'
    },
    notifyButtonText:{
        color:'#fff',
        fontSize:15,
        paddingVertical:10,
        lineHeight:15,
    },
    notifyDateTime:{
        flex:1,
        paddingTop:5,
        paddingHorizontal:5,
        fontSize:12,
    }
});




export default DepositModal;
