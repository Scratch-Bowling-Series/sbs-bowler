import React, {useContext} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, useColorScheme, View, Image, TouchableOpacity, RefreshControl} from "react-native";
import {colorStylesLight, colorStylesDark, styles} from '../styles';
import UserContext from "../context/userContext";
import { Dimensions } from 'react-native';
import LastTournament from "../lastTournament";
import SeasonStats from "../seasonStats";
import CareerStats from "../careerStats";
import {ScrollView} from "react-native-gesture-handler";
import VerifyEmail from "../verifyEmail";
import LeaderboardPreview from "../leaderboardPreview";

const base_url = 'https://bowl.sbs';
const adImage = require('../../assets/ad-example.png');

const HomeScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const colorScheme = useColorScheme();
    const [userData, userToken] = useContext(UserContext);
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const [adsImage,setAdImage] = React.useState(null)

    const [lastTournament, setLastTournament] = React.useState(false);
    const openTournament = (tournamentId) => {
        console.log(tournamentId);
    }

    const refresh = () => {

    }

    React.useEffect(() => {
        setAdImage(adImage);

        setLastTournament({'id': 5});

    },[])

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]} edges={['top']}>
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()}/>}>

                <VerifyEmail colors={colors}
                             visible={!userData.is_verified}
                             onRequestToResend={() => {}}
                />
                <LeaderboardPreview navigation={navigation}
                                colors={colors}
                                tournament={lastTournament}
                                onPress={(tournamentId) => { openTournament(tournamentId)}}
                />
                <LastTournament navigation={navigation}
                                colors={colors}
                                tournament={lastTournament}
                                onPress={(tournamentId) => { openTournament(tournamentId)}}
                />
                <View style={thisStyles.adWrap}>
                    <Image style={thisStyles.ad} source={adsImage}/>
                </View>
                <SeasonStats navigation={navigation}
                                colors={colors}
                                tournament={lastTournament}
                                onPress={(tournamentId) => { openTournament(tournamentId)}}
                />
                <CareerStats navigation={navigation}
                             colors={colors}
                             tournament={lastTournament}
                             onPress={(tournamentId) => { openTournament(tournamentId)}}
                />

                <Text style={thisStyles.debug}>UUID: { userData.id }</Text>
            </ScrollView>
        </View>
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

export default HomeScreen;