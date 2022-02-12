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
        formData.append('friend_id', JSON.parse(notification.data).user_id);
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
        formData.append('friend_id', JSON.parse(notification.data).user_id);
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
const dismissNotificationWithApi = async (token, notification) => {
    try{
        const formData = new FormData();
        formData.append('notification_id', notification.id);
        let response = await fetch(base_url + '/api/user/clear-notification/', {
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


const NotificationFriendRequest = ({ notification, userToken, colors, removeNotification}) => {

    const data = JSON.parse(notification.data);
    return (
        <View style={[thisStyles.notifyItem, colors.borderGrey]} >
            <Image style={[thisStyles.notifyImage]} source={{uri: base_url + data.picture}} />
            <View style={[thisStyles.notifyWrap]}>
                <Text style={[thisStyles.friendsListName, colors.textBlack]} numberOfLines={2}>{notification.body}</Text>
                <View style={[thisStyles.notifyButtons]}>
                    <TouchableOpacity style={[thisStyles.notifyButton, colors.bkgGreen1]} onPress={() =>{acceptFriendWithApi(userToken, notification).then(() => {removeNotification(notification.id)});} }>
                        <Text style={[thisStyles.notifyButtonText]}>ACCEPT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[thisStyles.notifyButton, colors.bkgGrey3]} onPress={() => {cancelFriendWithApi(userToken, notification).then(() => {removeNotification(notification.id)});} }>
                        <Text style={[thisStyles.notifyButtonText, colors.textBlack]}>REMOVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );}
const NotificationFriendAccept = ({ notification, userToken, colors, removeNotification}) => {
    const renderRightActions = (progress, dragX) => {

        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [64, 80,100, 150],
        });


        return (
            <Animated.View style={[{width:200,height:100,backgroundColor:'#000000', flexDirection:'row', transform: [{ translateX: trans }],}, colors.bkgGrey]}>
                <RectButton style={[{width:100,height:99,textAlign:'center',}, colors.bkgGrey]} onPress={() => {}}>
                    <Text style={[{flex:1,textAlign: 'center',lineHeight:18,color:'#e8e8e8',paddingHorizontal:20,paddingTop:32,}, styles.fontBold, colors.textBlack]} numberOfLines={2}>
                        VIEW PROFILE
                    </Text>
                </RectButton>
                <RectButton style={[{width:100,height:99,textAlign:'center',}, colors.bkgRed]} onPress={() => {dismissNotificationWithApi(userToken, notification).then(()=>{removeNotification(notification.id)});}}>
                    <Text style={[{flex:1,textAlign: 'center',lineHeight:99,color:'#e8e8e8',paddingHorizontal:20,}, styles.fontBold, colors.textBlack]} numberOfLines={2}>
                        DISMISS
                    </Text>
                </RectButton>
            </Animated.View>


        );
    };
    const data = JSON.parse(notification.data);
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={[thisStyles.notifyItem, colors.bkgWhite, colors.borderGrey]}>
            <Image style={[thisStyles.notifyImage]} source={{uri: base_url + data.picture}} />
            <View style={[thisStyles.notifyWrap]}>
                <Text style={[thisStyles.friendsListName,{paddingBottom:0,paddingTop:20,flex:0,}, colors.textBlack]} numberOfLines={2}>{notification.body}</Text>
                <Duration datetime={notification.datetime} />
            </View>
            </View>
        </Swipeable>
    );}

const Duration = (datetime) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const calculateDuration = () => {
        datetime = datetime.datetime;
        const date = new Date(datetime);
        if(date){
            const ms = date.getTime();
            const seconds = Math.floor((Date.now() - ms)/1000);
            const minutes = Math.floor(seconds/60);
            const hours = Math.floor(minutes/60);
            const days = Math.floor(hours/24);
            const weeks = Math.floor(days/7);

            if(weeks > 0){
                return weeks + 'w';
            }else if(days > 0){
                return days + 'd';
            }else if(hours > 0){
                return hours + 'h';
            }else if(minutes > 0){
                return minutes + 'm';
            }else if(seconds > 0){
                return seconds + 's';
            }
        }
    }

    const duration = calculateDuration();


    return (<Text style={[thisStyles.notifyDateTime, colors.textGrey2]}>{duration}</Text>)
}

const NotificationsModal = ({visible, onRequestToClose, userData, userToken, onNotificationsChange}) =>  {
    const [notifications, setNotifications] = React.useState(null);
    const [notificationsCount, setNotificationsCount] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const setNotificationsTask = (data) => {
        setNotifications(data);
        const length = data ? data.length : 0;

        setNotificationsCount(length);
        if(length === 0){
            onNotificationsChange(false);
        }
        else{
            onNotificationsChange(true);
        }
    }
    const removeNotification = (id) => {
        setNotificationsTask(notifications.filter(item => item.id !== id));
    }
    const notificationTemplate = ({ item }) => {
        if(item.type === 1){
            return (<NotificationFriendRequest notification={item} colors={colors} userToken={userToken} removeNotification={(id) => {removeNotification(id)}}/>)
        }
        else if(item.type === 0){
            return (<NotificationFriendAccept notification={item} colors={colors} userToken={userToken} removeNotification={(id) => {removeNotification(id)}}/>)
        }
    }

    const performRefresh = async () => {
        setRefreshing(true);
        const notifications = await getNotificationsFromApi(userToken);
        setNotificationsTask(notifications);
        setRefreshing(false);
    }

    React.useEffect(() => {
        if(userData.has_notifications || (visible && !userData.has_notifications)){
            performRefresh();
        }
    },[visible]);

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
                    <Text style={[styles.modalHeaderText, colors.textBlack, styles.fontBold]}>Notifications</Text>
                    <TouchableOpacity style={[styles.modalHeaderButton, styles.fontBold, colors.textBlack]} onPress={() => onRequestToClose() }>
                        <Ionicons style={[styles.modalHeaderButtonText]} name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>
                {notificationsCount > 0 ? (
                    <FlatList
                        style={[thisStyles.friendsList]}
                        contentContainerStyle={[thisStyles.friendsList, {borderTopWidth:1,}, colors.borderGrey]}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{performRefresh()}}/>}
                        data={notifications} renderItem={notificationTemplate} keyExtractor={item => item.id} />
                ) : (
                    <View style={styles.listEmpty}>
                        <Ionicons style={[styles.listEmptyIcon, colors.textGrey1]} name="happy-outline" color={colorScheme === 'light' ? '#000' : '#fff'} />
                        <Text style={[styles.listEmptyText, colors.textGrey1, styles.fontBold]}>You don't have any notifications! </Text>
                    </View>
                )}
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




export default NotificationsModal;
