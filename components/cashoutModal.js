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

const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');

const base_url = 'https://bowl.sbs';




const CashoutModal = ({visible, onRequestToClose, userData, userToken, onUpdateUserData}) =>  {

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
                    <Text style={[styles.modalHeaderText, colors.textBlack, styles.fontBold]}>Cash Out</Text>
                    <TouchableOpacity style={[styles.modalHeaderButton, styles.fontBold, colors.textBlack]} onPress={() => onRequestToClose() }>
                        <Ionicons style={[styles.modalHeaderButtonText]} name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
};

const thisStyles = StyleSheet.create({
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




export default CashoutModal;
