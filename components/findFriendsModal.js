import React, {useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TouchableOpacity,
    useColorScheme,
    Image,
    ScrollView,
    RefreshControl,
    FlatList, TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context";
import {colorStylesDark, colorStylesLight, styles} from "./styles";

const defaultProfilePhoto = require('../assets/profile-default.png');
const base_url = 'https://bowl.sbs';



const addFriendWithApi = async (token, friendId) => {
    try{
        const formData = new FormData();
        formData.append('friend_id', friendId);
        let response = await fetch(base_url + '/api/user/friend/send-request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
                credentials: 'include',
            },
            body: formData
        });
        const jsonData = await response.json();
        return jsonData && jsonData.success ? 'request_outbound' : 'failed';

    }catch(errors){
        console.log(errors);
    }
}
const cancelFriendWithApi = async (token, friendId) => {
    try{
        const formData = new FormData();
        formData.append('friend_id', friendId);
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
const acceptFriendWithApi = async (token, friendId) => {
    try{
        const formData = new FormData();
        formData.append('friend_id', friendId);
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

const friendSearchFromApi = async (token, text) => {
    try{
        const formData = new FormData();
        formData.append('query', text);
        let response = await fetch(base_url + '/api/user/friend/search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Token ' + token,
                credentials: 'include',
            },
            body: formData
        });
        return await response.json();
    }catch(errors){
        console.log(errors);
    }
}






const FindFriendsModal = ({visible, onRequestToClose, userData, userToken, friendCount, onAskForRefresh, refreshing}) =>  {
    const [friendSearch, setFriendSearch] = React.useState('');
    const [friendsList, setFriendsList] = React.useState(null);
    const [reRenderList, setReRenderList] = React.useState(false);


    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const placeHolderColor = colorScheme === 'light' ? 'grey' : 'grey';


    const performSearch = async (text) => {
        if(text){
            const results = await friendSearchFromApi(userToken, text);
            if(results){
                const users = results.users;
                const statuses = results.statuses;
                if (users && statuses){
                    let index = 0
                    users.forEach((user) => {
                        user.status = statuses[index];
                        index++;
                    });
                    setFriendsList(users);
                }
                else{
                    setFriendsList(null);
                }
            }
            else{
                setFriendsList(null);
            }
        }
        else{
            setFriendsList(null);
        }
    }

    const textChanged = (text) => {
        if(text !== friendSearch){
            setFriendSearch(text);
            performSearch(text).then((r)=>{});
        }
    }

    useEffect(() => {
        if(!visible){
            setFriendSearch('');
            setFriendsList(null);
            setReRenderList(!reRenderList);
        }
    },[visible]);


    const Friend = ({token, friend, colors }) =>
        {
            const [status, setStatus] = React.useState(friend.status);

        return (
            <View style={[thisStyles.friendsListItem, colors.borderGrey]}>
                <Image style={[thisStyles.friendsListImage]} source={friend.picture ? {uri: base_url + friend.picture} : defaultProfilePhoto} />
                <Text style={[thisStyles.friendsListName, colors.textBlack]}>{friend.first_name} {friend.last_name}</Text>

                {status === 'stranger' ? (
                    <TouchableOpacity style={[styles.buttonList, colors.bkgGreen1]} onPress={() => addFriendWithApi(token, friend.id).then(r =>{ setStatus(r);})} >
                        <Text style={[styles.buttonListText, styles.fontBold]}>ADD</Text>
                    </TouchableOpacity>
                ) : null}
                {status === 'request_inbound' ? (
                    <TouchableOpacity style={[styles.buttonList, colors.bkgGreen1]} onPress={() => acceptFriendWithApi(token, friend.id)} >
                        <Text style={[styles.buttonListText, styles.fontBold]}>ACCEPT</Text>
                    </TouchableOpacity>
                ) : null}
                {status === 'request_outbound' ? (
                    <TouchableOpacity style={[styles.buttonList, colors.bkgGrey3]} onPress={() => cancelFriendWithApi(token, friend.id).then(r =>{ setStatus(r);})}>
                        <Text style={[styles.buttonListText, styles.fontBold, colors.textGrey]}>SENT</Text>
                    </TouchableOpacity>
                ) : null}
                {status === 'friends' ? (
                    <TouchableOpacity style={[styles.buttonList, colors.bkgGrey1]} onPress={() => {}} >
                        <Ionicons style={[{lineHeight:30,paddingHorizontal:7,}, colors.textGrey]} name="checkmark-sharp" size={20} color="#fff" />
                    </TouchableOpacity>
                ) : null}
                {status === 'self' ? (
                    <TouchableOpacity style={[styles.buttonList, colors.bkgGrey1]} onPress={() => {}} disabled={true}>
                        <Text style={[styles.buttonListText, styles.fontBold, colors.textGrey]}>YOU</Text>
                    </TouchableOpacity>
                ) : null}
                {status === 'failed' ? (
                    <TouchableOpacity style={[styles.buttonList, colors.bkgGrey1]} onPress={() => {}} >
                        <Text style={[styles.buttonListText, styles.fontBold, colors.textGrey]}>FAILED</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        );}

    const friendTemplate = ({ item }) => <Friend friend={item} colors={colors} token={userToken}/>;

    return (
        <Modal
            presentationStyle='pageSheet'
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                onRequestToClose();
            }}
            style={styles.helpModal}>
            <SafeAreaView style={[{flex:1, position:'relative',}, colors.bkgWhite]} edges={['top']}>
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalHeaderText, styles.fontBold, colors.textBlack]}>Find Friends</Text>
                    <TouchableOpacity style={[styles.modalHeaderButton, colors.textBlack]} onPress={() => onRequestToClose() }>
                        <Ionicons style={[styles.modalHeaderButtonText]} name="close"  size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>
                <TextInput style={[styles.profileInput, colors.borderBlack, colors.textBlack]} placeholder="Search by Name" placeholderTextColor={placeHolderColor} value={friendSearch} onChangeText={ text => { textChanged(text); }}/>

                {friendsList && friendsList.length > 0? (
                    <FlatList
                        style={[thisStyles.friendsList]}
                        contentContainerStyle={[thisStyles.friendsList, {borderTopWidth:1,}, colors.borderGrey]}
                        data={friendsList} extraData={reRenderList} renderItem={friendTemplate} keyExtractor={item => item.id} />
                ) : (
                    <View style={styles.listEmpty}>
                        <Ionicons style={[styles.listEmptyIcon, colors.textGrey1]} name="search" color={colorScheme === 'light' ? '#000' : '#fff'} />
                        <Text style={[styles.listEmptyText, colors.textGrey1, styles.fontBold]}>Begin searching for new friends by typing their name above!</Text>
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
    friendsListItem:{
        paddingHorizontal:20,
        paddingVertical:5,
        flexDirection: 'row',
        borderBottomWidth:1,
        borderColor:'#e8e8e8',
    },
    friendsListImage:{
        aspectRatio:1,
        height:40,
        width:40,
        resizeMode:'cover',
        borderRadius:999,
    },
    friendsListName:{
        flex:1,
        paddingLeft:15,
        fontSize:18,
        textAlignVertical: 'center',
        lineHeight:40,
    },
    friendsListMore:{
        textAlignVertical:'center',
        lineHeight:40,
    },

});


export default FindFriendsModal;
