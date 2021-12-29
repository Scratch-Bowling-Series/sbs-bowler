import React, { useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity,useColorScheme,SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";
import SettingsModal from "./settingsModal";

import sbsLogo from '../assets/logo-beta.png';
import topBarGraphic from '../assets/top-bar.png';
import topBarGraphicDark from '../assets/top-bar-dark.png';
import defaultProfilePhoto from '../assets/profile-default.png';
import {colorStylesLight, colorStylesDark} from './styles';
import UserContext from "./context/userContext";
import NotificationsModal from "./notificationsModal";
import AuthContext from "./context/authContext";


const Header = ({route, navigation, userData, userToken}) =>  {
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);

    const colorScheme = useColorScheme();
    const { updateUserData } = React.useContext(AuthContext);
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return (
        <SafeAreaView style={[styles.headerWrap, colors.bkgGrey1]} edges={['top']}>
            <View style={[styles.header, colors.bkgGreen1 ]}>
                { colorScheme === 'light' ? (
                    <Image source={topBarGraphic} style={[styles.headerLines]}/>
                ) : (
                    <Image source={topBarGraphicDark} style={[styles.headerLines]}/>
                )}
                <Image source={sbsLogo} style={[styles.headerLogo, colors.logoTint]}/>
                <TouchableOpacity style={[styles.headerButton, {marginRight:0,}]} onPress={() => setNotificationsVisible(true)}>
                    { userData.has_notifications ? (<View style={styles.headerButtonNotify} />): null}
                    <Ionicons style={styles.headerButtonText} name="notifications-outline" size={30} color="#fff" />
                </TouchableOpacity>
                { route.name !== 'Profile' ? (
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Profile')}>
                        <Image style={styles.headerButtonImage} source={ userData ?{ uri: userData.picture } : defaultProfilePhoto}/>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.headerButton} onPress={() => setSettingsVisible(true)}>
                        <Ionicons style={styles.headerButtonText} name="settings-outline" size={30} color="#fff" />
                    </TouchableOpacity>
                )}
                    <SettingsModal visible={settingsVisible} onRequestToClose={() => {setSettingsVisible(false)}}/>
                    <NotificationsModal visible={notificationsVisible}
                                        onRequestToClose={() =>{setNotificationsVisible(false)}}
                                        userData={userData} userToken={userToken} onUpdateUserData={(data)=>{updateUserData(data);}}/>
                { colorScheme === 'light' ? (
                    <StatusBar style='dark' />
                ):(
                        <StatusBar style='light' />
                    )
                }
            </View>
        </SafeAreaView>
    );
};





const styles = StyleSheet.create({


    headerWrap:{
        height:65,
        paddingTop: 25,
    },
    header:{
        height:65,
        backgroundColor: '#214031',
        position: 'relative',
        flexDirection:'row',
        alignItems:'flex-end',
        justifyContent:'flex-end',
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
    headerButton:{
        height:65,
        width:40,
        marginRight:10,
        alignSelf:'flex-end',
        position:'relative',
    },
    headerButtonText:{
        height:40,
        width:40,
        fontSize:25,
        textAlign:'center',
        textAlignVertical:'center',
        lineHeight:40,
        borderRadius: 20,
        marginVertical:12.5,
    },
    headerButtonImage:{
        height:40,
        width:40,
        borderRadius: 20,
        marginVertical:12.5,
    },
    headerButtonNotify:{
        position:"absolute",
        top:17,right:8,
        backgroundColor:'red',
        borderRadius:4,
        width:8,height:8,
        zIndex:2,
    }
});




export default Header;