import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, useColorScheme, Text, ActivityIndicator} from 'react-native';
import {colorStylesLight, colorStylesDark, styles} from './styles';
import AllFriendsModal from "./allFriendsModal";
import FindFriendsModal from "./findFriendsModal";
import { apiGet, apiPost } from '../utils/api';


const getFriendsListFromApi = async (token) => {
    return await apiGet('/api/user/friend/list/', token);
}
const removeFriendWithApi = async (token, friendId) => {
    const formData = new FormData();
    formData.append('friend_id', friendId);
    const response = await apiPost('/api/user/friend/remove/', formData, token);
    return response ? response.success : false;
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
            setFriendRequestListInbound(friendsList_.requests_received);
            setFriendRequestListOutbound(friendsList_.requests_sent);
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
        <View style={[styles.block, colors.bkgWhite, {flexDirection: friendCount === 0 ? 'column': 'column'}]}>
            <TouchableOpacity onPress={() => {setFriendAllVisible(true)}}>
                <Text style={[styles.blockHeaderLeft, styles.fontBold, colors.textBlack,{paddingLeft:10,width:'auto',lineHeight: 40, height: 30}]}>FRIENDS ({friendCount})</Text>
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
            <View style={[styles.buttonBar]}>
                <TouchableOpacity style={[styles.button, colors.bkgGreen1]} onPress={() => setFriendFinderVisible(true)} disabled={shouldRefresh}>
                    <Text style={[styles.buttonText, styles.fontBold, {paddingHorizontal: 25}]}>
                        FIND FRIENDS
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]} onPress={() => setFriendAllVisible(true)} disabled={shouldRefresh}>
                    <Text style={[styles.buttonText, styles.fontBold]}>
                        VIEW ALL
                    </Text>
                </TouchableOpacity>
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
                             onRequestToFindFriends={() => {setFriendAllVisible(false); setFriendFinderVisible(true);}}
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