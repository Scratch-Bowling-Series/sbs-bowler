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
import Swipeable from "react-native-gesture-handler/Swipeable";
import {BarCodeScanner} from "expo-barcode-scanner";

const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');

const base_url = 'https://bowl.sbs';



const validateCheckInUrl = (url) => {
    if(url){
        if(url.startsWith('https://bowler.scratchbowling.com/check-in/')){
            const strs = url.split('https://bowler.scratchbowling.com/check-in/');
            if(strs && strs.length > 0){
                return strs[1];
            }
        }
    }
    return null;
}



const CheckScanner = ({visible, onRequestToClose, colors}) =>  {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOADING':
                    return {
                        ...prevState,
                        loadingUrl: true,
                        failedUrl: false,
                        hasPermissions: true,
                        scanned: false,
                    };
                case 'FAILED':
                    return {
                        ...prevState,
                        loadingUrl: false,
                        failedUrl: true,
                        hasPermissions: true,
                        scanned: null,
                    };
                case 'SCANNED':
                    return {
                        ...prevState,
                        loadingUrl: false,
                        failedUrl: false,
                        hasPermissions: true,
                        scanned: true,
                    };
                case 'PERMS':
                    return {
                        ...prevState,
                        loadingUrl: false,
                        failedUrl: false,
                        hasPermissions: action.hasPermissions,
                        scanned: false,
                    };
                case 'RETRY':
                    return {
                        ...prevState,
                        loadingUrl: false,
                        failedUrl: false,
                        hasPermissions: true,
                        scanned: false,
                    };
            }
        },
        {
            loadingUrl: false,
            failedUrl: false,
            hasPermissions: null,
            scanned: null,
        }
    );


    const handleBarCodeScanned = ({ type, data }) => {
        if(type === 'org.iso.QRCode'){
            const tournamentId = validateCheckInUrl(data);
            if(tournamentId){
                dispatch({type:'LOADING'});
                setTimeout(() => {
                    dispatch({type:'SCANNED'});
                    onRequestToClose(id);
                }, 2000);
            }
            else{
                dispatch({type:'FAILED'});
                setTimeout(() => {
                    dispatch({type:'RETRY'});
                }, 2000);
            }
        }
    };

    const Scanner = () => {
        if (state.hasPermissions === null) {
            return (
                <View style={thisStyles.scannerMessageInner}>
                    <Ionicons style={[thisStyles.scannerMessageInnerIcon, colors.textBlack]} name='camera' />
                    <Text style={[thisStyles.scannerMessageInnerText, colors.textBlack, styles.fontBold]}>Requesting for camera permission...</Text>
                </View>
            );
        }
        if (state.hasPermissions === false) {
            return (
                <View style={thisStyles.scannerMessageInner}>
                    <Ionicons style={[thisStyles.scannerMessageInnerIcon, colors.textBlack]} name='camera' />
                    <Text style={[thisStyles.scannerMessageInnerText, colors.textBlack, styles.fontBold]}>No Camera Found...</Text>
                </View>
            );
        }
        if (state.loading){
            return (
                <View style={thisStyles.scannerMessageInner}>
                    <ActivityIndicator style={[thisStyles.scannerMessageInnerLoader, colors.textBlack]} size="large"/>
                </View>
            );
        }
        return (
            <BarCodeScanner
                onBarCodeScanned={state.scanned ? undefined : handleBarCodeScanned}
                style={thisStyles.scannerCamera}
            />
        );
    }

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            dispatch({type:'PERMS', hasPermissions: status === 'granted'});
        })();
    }, []);

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
            <SafeAreaView style={[{flex:1, position:'relative'}, colors.bkgWhite]} edges={['bottom']}>
                <Ionicons style={[thisStyles.scannerHelp, colors.textBlack]} size={10}  name="help-circle-outline"  />
                <View style={[styles.container, { justifyContent:'flex-end', alignItems:'center'}]}>
                    <View style={[{flex:1}]}>
                        <Text style={[thisStyles.scannerTopText, colors.textBlack, styles.fontBold]}>ENTER GAME MODE</Text>
                        <Text style={[thisStyles.scannerSubText, colors.textBlack, styles.fontBold]}>SCAN THE TOURNAMENT CHECK-IN CODE LOCATED NEAR THE REGISTRATION TABLE</Text>
                        <Ionicons style={[thisStyles.scannerArrow, colors.textTan]} size={40}  name="ios-arrow-down-outline"  />
                        <View style={[thisStyles.scannerWrap, colors.borderTan]}>
                            { !state.loadingUrl ? (
                                <View style={[thisStyles.scannerCoverVertical, colors.bkgWhite]}></View>
                            ) : null}{ !state.scanned ? (
                                <View style={[thisStyles.scannerCoverHorizontal, colors.bkgWhite]}></View>
                            ) : null}
                            <View style={[thisStyles.scannerInner, colors.borderGrey]}>
                                <Scanner/>
                            </View>
                        </View>
                        <View style={[{ justifyContent:'center', alignItems:'center',}]}>
                            <Text style={[thisStyles.scannerBottomText, colors.textGrey3, styles.fontBold]}>OR</Text>
                            <Text style={[thisStyles.scannerBottomText, colors.textBlack, styles.fontBold, {textDecorationLine: 'underline'}]} onPress={() => onRequestToClose() }>ENTER DEMO MODE</Text>
                        </View>
                    </View>

                    <View style={[styles.buttonBar, {paddingTop:20,}]}>
                        <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]} onPress={() => onRequestToClose() }>
                            <Text style={[styles.buttonText, styles.fontBold, {color:'#fff'}]}>GO BACK</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </Modal>
    );
};

const thisStyles = StyleSheet.create({
    scannerMessageInner:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    scannerMessageInnerText:{
        textAlign:'center',
        fontSize:16,
    },
    scannerMessageInnerIcon:{
        textAlign:'center',
        fontSize:40,
        paddingBottom:15,
    },
    scannerMessageInnerLoader:{
        textAlign:'center',
        fontSize:40,
        lineHeight:40,
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

});




export default CheckScanner;
