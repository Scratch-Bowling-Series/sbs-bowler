import React, { Component, useState, useEffect, useContext } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, useColorScheme, ScrollView, RefreshControl} from "react-native";

import UserContext, {UserConsumer} from "./context/userContext";
import AuthContext from "./context/authContext";
import {colorStylesLight, colorStylesDark} from './styles';
import ModifyProfileModal from "./modifyProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultProfilePhoto = require('../assets/profile-default.png');
const base_url = 'https://scratchbowling.pythonanywhere.com';


const getProfileDataFromApi = async (token) => {
    let response = await fetch(base_url + '/api/user/data/', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            credentials: 'include',
        },
    });
    const jsonData = await response.json();
    if(jsonData && jsonData[0]){
        return jsonData[0]
    }
    return null;
}




const ProfileDisplay = ({navigation}) => {

    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const {updateUserData} = useContext(AuthContext);
    const [userData, userToken] = useContext(UserContext);

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const onRefresh = async () => {
        const userData_ = await getProfileDataFromApi(userToken);
        const hasChanged = userData_ !== userData_;
        if(userData_ && hasChanged){
            updateUserData(userData_);
            await AsyncStorage.setItem('@user_data', JSON.stringify(userData_));
        }
    }

    return(
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                        >
                    <View style={[styles.profilePreview, colors.bkgWhite]}>
                        <View style={styles.profilePreviewTop}>
                            { userData && !userData.picture.endsWith('/default.jpg') ? (
                                <Image style={styles.profilePreviewPicture} source={{ uri: userData.picture }} key={userData.picture}/>
                            ) : (
                                <Image style={styles.profilePreviewPicture} source={defaultProfilePhoto}/>
                            ) }

                           <View style={styles.profilePreviewDetails}>
                                <Text style={[styles.profilePreviewName, colors.textBlack]}>{ userData.first_name } { userData.last_name }</Text>
                                {userData.city && userData.state ? (
                                    <Text style={[styles.profilePreviewLocation, colors.textBlack]}>({ userData.city || 'City' }, { userData.state || 'State' })</Text>
                                ) : (
                                    <Text style={[styles.profilePreviewLocation, colors.textBlack]}>Location Unknown</Text>
                                )}
                                <Text style={[styles.profilePreviewBio, colors.textBlack]}>{ userData.bio || 'Your Bio is Empty.' }</Text>
                            </View>
                        </View>

                        <View style={styles.profilePreviewButtonBar}>
                            <TouchableOpacity style={[styles.profileButton, colors.bkgGreen1]} onPress={() => setModalVisible(true)}>
                                <Text style={styles.profileButtonText}>
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <ModifyProfileModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                    </View>
                </ScrollView>
            </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    profilePreview:{
        margin:10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    profilePreviewTop:{
        flexDirection:'row',
        padding:10,
    },
    profilePreviewPicture:{
        margin:10,
        width:100,height:100,
        borderRadius:50,
        backgroundColor: '#e8e8e8',
    },
    profilePreviewDetails:{
        flex:1,
        margin:10,

    },
    profilePreviewName:{
        fontSize: 25,
        fontFamily: 'TTOctosquaresCondBold',
    },
    profilePreviewLocation:{
        fontSize: 16,
        padding:5,
        fontFamily: 'TTOctosquaresCondBold',
    },
    profilePreviewBio:{
        fontSize: 16,
        padding:5,
        fontFamily: 'TTOctosquaresCondBold',
    },
    profilePreviewButtonBar:{
        flexDirection: 'row',
        justifyContent: 'center',
        padding:10,
    },
    profileButton:{
        flex:1,
        borderRadius: 15,
        margin: 10,
        backgroundColor: '#214031',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileButtonText:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondBold',
        textAlignVertical: 'center',
        paddingVertical:10,
        paddingHorizontal: 20,
    },















    safeAreaView:{
        flex: 1,
    },

    nav:{
        flex:2
    },
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
    profile:{
        height:40,
        width:40,
        borderRadius: 20,
        position: 'absolute',
        right: 12.5,
        top: 12.5,
    },

    loginContainer:{
        flex: 1,
        backgroundColor: '#214031',
        overflow: 'hidden',
    },
    loginBottom:{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        textAlign: 'center',

    },
    loginTop:{
        flex:4,
        backgroundColor: '#214031',
    },
    loginTopInner:{
        flex:8,
        position: 'relative',
    },
    loginLogo:{
        resizeMode: 'center',
        tintColor: '#fff',
        flex:1,
        height: '100%',
        alignSelf: 'flex-start',
    },
    loginOrDivider:{
        textAlign: 'center',
        fontSize: 14,
        color: '#3d3d3d',
        fontFamily: 'TTOctosquaresCondBold',
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
        position: "absolute",
        bottom: 0,
        left:0,
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
    loginInput:{
        fontSize:18,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 15,
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'TTOctosquaresCondRegular',
        color: 'grey'
    },
    loginButton:{
        borderRadius: 15,
        margin: 10,
        backgroundColor: '#214031',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondBold',
        textAlignVertical: 'center',
        padding:10,
    },
    loginButtonOffset:{
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonTextOffset:{
        fontSize: 20,
        padding:10,
        textAlign: 'center',
        color: '#3d3d3d',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondBold',
        textAlignVertical: 'center',
    },
    welcomeDesign:{
        width: '100%',
        height: 600,
        marginVertical: 100,
        resizeMode: "cover",
        tintColor: '#234434'
    },
    helpModal:{

    },
    helpHeader:{
        flex:1,
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

export default ProfileDisplay;
