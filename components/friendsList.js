import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, useColorScheme, Text, ActivityIndicator} from 'react-native';
import {colorStylesLight, colorStylesDark, styles} from './styles';
import AllFriendsModal from "./allFriendsModal";
import FindFriendsModal from "./findFriendsModal";
const base_url = 'http://10.0.0.211:8000';

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
    console.log(jsonData);
    return jsonData ? jsonData[0] : null
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
            console.log(friendsList_);
            setFriendsList(friendsList_.friends);
            setFriendCount(friendsList_.friends.length);
            setFriendRequestListInbound(friendsList_.requests);
            setFriendRequestListOutbound(friendsList_.sent);
        }else{ setFriendCount(0)}
        setRefreshingSelf(false);
    }

    React.useEffect(()=>{
        if(shouldRefresh){
            performRefresh().then(r => {
                onDoneRefreshing();
            });
        }
    },[shouldRefresh]);

    return (
        <View style={[styles.block, colors.bkgWhite, {flexDirection: friendCount === 0 ? 'row': 'column'}]}>
            <Text style={[styles.blockHeader, styles.fontBold, colors.textBlack,{paddingLeft:10,width:'auto',lineHeight: friendCount === 0 ? 40: 20, height: friendCount === 0 ? 40: 20}]}>FRIENDS ({friendCount})</Text>
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