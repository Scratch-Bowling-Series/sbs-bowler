import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, useColorScheme, Text, ActivityIndicator} from 'react-native';
import {colorStylesLight, colorStylesDark, styles} from './styles';
import AllFriendsModal from "./allFriendsModal";
import FindFriendsModal from "./findFriendsModal";
const base_url = 'https://scratchbowling.pythonanywhere.com';

const getFriendsListFromApi = async (token) => {
    let response = await fetch(base_url + '/api/user/friends/', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + token,
            credentials: 'include',
        },
    });
    const jsonData = await response.json();
    return jsonData ? jsonData[0] : null
}
const removeFriendWithApi = async (token, friendId) => {
    try{
        const formData = new FormData();
        formData.append('friend_id', friendId);
        let response = await fetch(base_url + '/api/user/friend/remove/', {
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

const FriendsList = ({navigation, userData, userToken, shouldRefresh, onDoneRefreshing}) =>  {
    const [friendFinderVisible, setFriendFinderVisible] = React.useState(false);
    const [friendsAllVisible, setFriendAllVisible] = React.useState(false);
    const [refreshingSelf, setRefreshingSelf] = React.useState(false);

    const [friendsList, setFriendsList] = React.useState(null);
    const [friendRequestListInbound, setFriendRequestListInbound] = React.useState(null);
    const [friendRequestListOutbound, setFriendRequestListOutbound] = React.useState(null);
    const [friendCount, setFriendCount] = React.useState(0);

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const performRefresh = async () => {
        setRefreshingSelf(true);
        const friendsList_ = await getFriendsListFromApi(userToken);
        if(friendsList_){
            setFriendsList(friendsList_.friends);
            setFriendCount(friendsList_.friends.length);
            setFriendRequestListInbound(friendsList_.requests);
            setFriendRequestListOutbound(friendsList_.sent);
        }else{ setFriendCount(0); }
        setRefreshingSelf(false);
    }

    React.useEffect(()=>{
        if(shouldRefresh){
            performRefresh().then(r => {
                onDoneRefreshing();
            });
        }
    },[shouldRefresh]);

    const headerTextPressed = () => {

    }
    const removeFriend = (id) => {
        setFriendsList(friendsList.filter(item => item.id !== id));
        removeFriendWithApi(userToken, id);
    }

    return (
        <View style={[styles.block, colors.bkgWhite, {flexDirection: friendCount === 0 ? 'row': 'column'}]}>
            <TouchableOpacity onPress={() => { if(friendCount === 0){setFriendAllVisible(true)} }} disabled={friendCount > 0}>
                <Text style={[styles.blockHeaderLeft, styles.fontBold, colors.textBlack,{paddingLeft:10,width:'auto',lineHeight: friendCount === 0 ? 40: 20, height: friendCount === 0 ? 40: 20}]}>FRIENDS ({friendCount})</Text>
            </TouchableOpacity>
            <View style={[thisStyles.friendsListContainer]}>
                {friendsList ? friendsList.slice(0,5).map(friend => {
                    return(
                        <View style={[thisStyles.friendsListItem, colors.bkgGrey2]} key={friend.id}>
                            <Image style={[thisStyles.friendsListImage]} source={{uri: friend.picture}}/>
                        </View>
                    )
                }) : null}
                {friendCount > 5? (
                    <TouchableOpacity style={[thisStyles.friendsListItem, colors.bkgGrey3]} onPress={() => setFriendAllVisible(true)}>
                        <Text style={[thisStyles.friendsListEnd, styles.fontBold, colors.textGrey]} numberOfLines={1} adjustsFontSizeToFit >{friendCount - 5}+</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            <View style={[styles.buttonBar, { alignItems:'flex-end', justifyContent:'flex-end'}, {paddingTop: friendCount === 0 ? 20: 0 }]}>
                <TouchableOpacity style={[styles.button, colors.bkgGreen1]} onPress={() => setFriendFinderVisible(true)} disabled={shouldRefresh}>
                    <Text style={[styles.buttonText, styles.fontBold, {paddingHorizontal: 25}]}>
                        FIND FRIENDS
                    </Text>
                </TouchableOpacity>
                { friendCount > 0 ? (
                    <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]} onPress={() => setFriendAllVisible(true)} disabled={shouldRefresh}>
                        <Text style={[styles.buttonText, styles.fontBold]}>
                            VIEW ALL
                        </Text>
                    </TouchableOpacity>
                ) : null }
            </View>
            <FindFriendsModal visible={friendFinderVisible}
                              onRequestToClose={()=> setFriendFinderVisible(false)}
                              onAskForRefresh={()=> performRefresh()}
                              refreshing={refreshingSelf}
                              userData={userData} userToken={userToken}
            />
            <AllFriendsModal visible={friendsAllVisible}
                             onRequestToClose={()=> setFriendAllVisible(false)}
                             onAskForRefresh={()=> performRefresh()}
                             refreshing={refreshingSelf}
                             userData={userData} userToken={userToken}
                             friendsList={friendsList} friendCount={friendCount}
                             removeFriend={(id) => {removeFriend(id)}}
            />
        </View>
    );
};


const thisStyles = StyleSheet.create({
    friendsListContainer:{
        flex:1,
        flexDirection: 'row',
        paddingHorizontal:15,
        paddingVertical:15,
    },
    friendsListItem:{
        flex:1,
        aspectRatio: 1,
        maxWidth:50,
        backgroundColor:'lightgrey',
        margin:5,
        borderRadius: 999,
        overflow:'hidden',
    },
    friendsListImage:{
        flex:1,
        resizeMode: 'cover',
    },
    friendsListEnd:{
        flex:1,
        fontSize:18,
        color:'grey',
        textAlign:'center',
        textAlignVertical:'center',
        lineHeight:50,
        borderRadius: 999,
    }
});


export default FriendsList;