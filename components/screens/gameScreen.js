

import React, {useContext} from "react";
import {Dimensions, TouchableOpacity, RefreshControl, StyleSheet, Text, useColorScheme, View} from "react-native";
import UserContext from "../context/userContext";
import {colorStylesDark, colorStylesLight, styles} from "../styles";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView} from "react-native-gesture-handler";
import VerifyEmail from "../verifyEmail";
import LeaderboardPreview from "../leaderboardPreview";
import LastTournament from "../lastTournament";
import SeasonStats from "../seasonStats";
import CareerStats from "../careerStats";
import {BarCodeScanner} from "expo-barcode-scanner";
import CheckScanner from "../checkScanner";
import { CommonActions } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";


const base_url = 'https://bowl.sbs';
const adImage = require('../../assets/ad-example.png');

const GameScreen = ({navigation}) => {
    const isFocused = useIsFocused();
    const [checkedIn, setCheckedIn] = React.useState(false);
    const [tournamentId, setTournamentId] = React.useState(null);
    const [scannerVisible, setScannerVisible] = React.useState(false);

    const [userData, userToken] = useContext(UserContext);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const closeScanner = (id) => {
        if(id){
            setScannerVisible(false);
            setCheckedIn(true);
            setTournamentId(id);
        }
        else{

            setScannerVisible(false);
            setCheckedIn(false);
            navigation.goBack();
        }
    }

    React.useEffect(() => {
        if(isFocused){
            if(!checkedIn){
                setScannerVisible(true);
            }
            else{
                setScannerVisible(false);
            }
        }
    },[isFocused]);

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]} edges={['top']}>
            <CheckScanner visible={scannerVisible}
                          onRequestToClose={(data) => closeScanner(data)}
                          colors={colors}/>

            <Text style={[{fontSize:20,margin:40,marginVertical:100,}, colors.textBlack]}>Tournament Id Received. Checked In: TRUE, T_ID: {tournamentId}, U_ID: {userData.id}</Text>

        </SafeAreaView>
    );
}

const windowWidth = Dimensions.get('window').width;

const thisStyles = StyleSheet.create({







    topNotifyText:{
        fontSize:18,
        padding:20,
        textAlign:'center'
    },



    debug:{
        fontSize:12,
        fontFamily: 'TTOctosquaresCondBold',
        color:'grey',
        margin:20,
        paddingHorizontal:20,
        textAlign:'center',
    },
    adWrap:{
        marginTop:10,
        marginHorizontal:10,
        width: windowWidth - 20,
        height: undefined,
        aspectRatio:4,
        overflow:'hidden',
        borderRadius:10,
    },
    ad:{
        flex:1,
        height:undefined,
        aspectRatio:4,
        resizeMode:'contain',
    }

});

export default GameScreen;

