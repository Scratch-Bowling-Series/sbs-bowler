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
    TextInput,
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
import SettingsContext from "./context/settingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');

const base_url = 'http://10.0.0.211:8000';


const getNotificationsFromApi = async (token) => {
    let response = await fetch(base_url + '/api/user/notifications/', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            credentials: 'include',
        },
    });
    return await response.json();
}
const cancelFriendWithApi = async (token, notification) => {
    try{
        const formData = new FormData();
        formData.append('notification_id', notification.id);
        formData.append('friend_id', notification.sender);
        let response = await fetch(base_url + '/api/user/friend/cancel-request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
                credentials: 'include',
            },
            body: formData
        });
        const jsonData = await response.json();
        return jsonData && jsonData.success ? 'stranger' : 'failed';
    }catch(errors){
        console.log(errors);
    }
}
const acceptFriendWithApi = async (token, notification) => {
    try{
        const formData = new FormData();
        formData.append('notification_id', notification.id);
        formData.append('friend_id', notification.sender);
        let response = await fetch(base_url + '/api/user/friend/accept-request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
                credentials: 'include',
            },
            body: formData
        });
        const jsonData = await response.json();
        return jsonData ? jsonData.success : false;
    }catch(errors){
        console.log(errors);
    }
}



const NotificationFriendRequest = ({ notification, userToken, colors }) => {
    const data = JSON.parse(notification.data);

    return (
        <View style={[thisStyles.notifyItem, colors.borderGrey]}>
            <Image style={[thisStyles.notifyImage]} source={{uri: base_url + data.picture}} />

            <View style={[thisStyles.notifyWrap]}>
                <Text style={[thisStyles.friendsListName, colors.textBlack]} numberOfLines={2}>{notification.body}</Text>
                <View style={[thisStyles.notifyButtons]}>
                    <TouchableOpacity style={[thisStyles.notifyButton, colors.textBlack, colors.bkgGreen1]} onPress={() =>{acceptFriendWithApi(userToken, notification)} }>
                        <Text style={[thisStyles.notifyButtonText]}>ACCEPT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[thisStyles.notifyButton, colors.textBlack, colors.bkgGrey2]} onPress={() => {cancelFriendWithApi(userToken, notification)} }>
                        <Text style={[thisStyles.notifyButtonText]}>REMOVE</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );}
const NotificationFriendAccept = ({ notification, userToken, colors }) => {
    const data = JSON.parse(notification.data);

    return (
        <View style={[thisStyles.notifyItem, colors.borderGrey]}>
            <Image style={[thisStyles.notifyImage]} source={{uri: base_url + data.picture}} />

            <View style={[thisStyles.notifyWrap]}>
                <Text style={[thisStyles.friendsListName,{paddingBottom:0,paddingTop:20,flex:0,}, colors.textBlack]} numberOfLines={2}>{notification.body}</Text>
                <Text style={[thisStyles.notifyDateTime, colors.textGrey1]}>12m</Text>
            </View>

        </View>
    );}

const NotificationsModal = ({visible, onRequestToClose, userData, userToken}) =>  {
    const [notifications, setNotifications] = React.useState(null);
    const [notificationsCount, setNotificationsCount] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;


    const notificationTemplate = ({ item }) => {
        console.log(item.type);
        if(item.type === 'friend_request'){
            return (<NotificationFriendRequest notification={item} colors={colors} userToken={userToken}/>)
        }
        else if(item.type === 'friend_accept'){
            return (<NotificationFriendAccept notification={item} colors={colors} userToken={userToken}/>)
        }
    }

    const performRefresh = async () => {
        setRefreshing(true);
        const notifications_ = await getNotificationsFromApi(userToken);
        if(notifications_){
            setNotificationsCount(notifications_.length);
            setNotifications(notifications_);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        if(!visible){
            performRefresh();
        }
    },[visible]);

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                onRequestToClose();
            }}
            style={styles.helpModal}
        >
            <SafeAreaView style={[{flex:1, position:'relative'}, colors.bkgWhite]} edges={['top']}>
                <View style={styles.helpHeader}>
                    <Text style={[styles.helpHeaderText, colors.textBlack]}>Notifications</Text>
                    <TouchableOpacity style={[styles.helpClose, {paddingHorizontal: 20}, colors.textBlack]} onPress={() => {onRequestToClose();}}>
                        <Ionicons name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>
                {notificationsCount > 0 ? (
                    <FlatList
                        style={thisStyles.friendsList}
                        contentContainerStyle={thisStyles.friendsList}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{performRefresh()}}/>}
                        data={notifications} renderItem={notificationTemplate} keyExtractor={item => item.id} />
                ) : (
                    <View style={styles.listEmpty}>
                        <Ionicons style={[styles.listEmptyIcon, colors.textGrey1]} name="sad-outline" color={colorScheme === 'light' ? '#000' : '#fff'} />
                        <Text style={[styles.listEmptyText, colors.textGrey1]}>You don't have any notifications! </Text>
                    </View>
                )}
            </SafeAreaView>
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
        fontSize:18,
        textAlignVertical: 'center',
        lineHeight:22,
        textAlign:'left',
    },
    notifyButtons:{
        flex:1,
        flexDirection:'row'
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




export default NotificationsModal;
