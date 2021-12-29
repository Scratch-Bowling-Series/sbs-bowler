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

const base_url = 'https://scratchbowling.pythonanywhere.com';




const CheckScanner = ({visible, onRequestToClose, colors}) =>  {

    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);

    const handleBarCodeScanned = ({ type, data }) => {
        if(type === 'org.iso.QRCode'){
            if(data.startsWith('https://bowler.scratchbowling.com/check-in/')){
                const id = data.split('https://bowler.scratchbowling.com/check-in/')[1];
                if(id){
                    setScanned(true);
                    onRequestToClose(id);
                }
            }
        }
    };

    React.useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return (
            <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]} edges={['top']}>
                <View style={styles.container}>
                    <Text style={[colors.textBlack]}>Requesting for camera permission</Text>
                </View>
            </SafeAreaView>
        );
    }
    if (hasPermission === false) {
        return (
            <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]} edges={['top']}>
                <View style={styles.container}>
                    <Text style={[colors.textBlack]}>No access to camera</Text>
                </View>
            </SafeAreaView>
        );
    }


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
                <Ionicons style={[thisStyles.scannerHelp, colors.textBlack]} size={10}  name="help-circle-outline"  />
                <View style={[styles.container, { justifyContent:'flex-end', alignItems:'center'}]}>
                    <View style={[{flex:1,justifyContent:'center', paddingBottom:100,}]}>
                        <Text style={[thisStyles.scannerTopText, colors.textBlack, styles.fontBold]}>ENTER GAME MODE</Text>
                        <Text style={[thisStyles.scannerSubText, colors.textBlack, styles.fontBold]}>SCAN THE TOURNAMENT CHECK-IN CODE LOCATED NEAR THE REGISTRATION TABLE</Text>
                        <Ionicons style={[thisStyles.scannerArrow, colors.textTan]} size={40}  name="ios-arrow-down-outline"  />
                        <View style={[thisStyles.scannerWrap, colors.borderTan]}>
                            <View style={[thisStyles.scannerCoverVertical, colors.bkgWhite]}></View>
                            <View style={[thisStyles.scannerCoverHorizontal, colors.bkgWhite]}></View>
                            <View style={[thisStyles.scannerInner, colors.borderGrey, ]}>
                                <BarCodeScanner
                                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                    style={thisStyles.scannerCamera}
                                />
                            </View>
                        </View>
                        <View style={[{ justifyContent:'center', alignItems:'center',}]}>
                            <Text style={[thisStyles.scannerBottomText, colors.textGrey3, styles.fontBold]}>OR</Text>
                            <Text style={[thisStyles.scannerBottomText, colors.textBlack, styles.fontBold, {textDecorationLine: 'underline'}]} onPress={() => onRequestToClose() }>ENTER DEMO MODE</Text>
                        </View>
                    </View>

                    <View style={[styles.buttonBar, {paddingTop:20,}]}>
                        <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]} onPress={() => onRequestToClose() }>
                            <Text style={[styles.buttonText, styles.fontBold, {colors:'#fff'}]}>GO BACK</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const thisStyles = StyleSheet.create({
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
