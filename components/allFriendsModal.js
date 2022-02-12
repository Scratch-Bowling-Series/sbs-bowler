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
    FlatList, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context";
import {colorStylesDark, colorStylesLight, styles} from "./styles";

import {
    MenuProvider,
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
} from 'react-native-popup-menu';

const base_url = 'https://bowl.sbs';







const Friend = ({ token, friend, colors, removeFriend}) => {
    const [loading, setLoading] = React.useState(false);

    const optionSelected = async (option, friendId) => {
        setLoading(true);
        if(option === 'view'){

        }else if(option === 'message'){

        }else if(option === 'remove'){
            removeFriend(friendId);
        }
        setLoading(false);
    }


    return (
    <View style={[thisStyles.friendsListItem, colors.borderGrey]}>
        <Image style={[thisStyles.friendsListImage]} source={{uri: friend.picture}} />
        <Text style={[thisStyles.friendsListName, colors.textBlack]}>{friend.first_name} {friend.last_name}</Text>

        <Menu onSelect={value => optionSelected(value, friend.id)} disabled={loading}>
            <MenuTrigger>
                {loading ? (
                    <ActivityIndicator style={[thisStyles.friendsListMoreLoader]} size="small" color="grey" animating={true}/>
                ) : (
                    <Ionicons style={[thisStyles.friendsListMore]} name="ellipsis-horizontal" size={20} color='grey' />
                )}
            </MenuTrigger>
            <MenuOptions customStyles={{optionsContainer:[thisStyles.friendsListOptions, colors.bkgWhite], optionWrapper: [thisStyles.friendsListOption]}}>
                <MenuOption value="view" style={[thisStyles.friendsListOption]}>
                    <Ionicons style={[thisStyles.friendsListMoreIcon]} name="eye-outline" size={20} color='grey' />
                    <Text style={[thisStyles.friendsListMoreName, colors.textGrey, styles.fontBold]}>View Profile</Text>
                </MenuOption>
                <MenuOption value="message" style={[thisStyles.friendsListOption]}>
                    <Ionicons style={[thisStyles.friendsListMoreIcon]} name="mail-outline" size={20} color='grey' />
                    <Text style={[thisStyles.friendsListMoreName, colors.textGrey, styles.fontBold]}>Send Message</Text>
                </MenuOption>
                    <MenuOption value="remove" style={[thisStyles.friendsListOption]}>
                        <Ionicons style={[thisStyles.friendsListMoreIcon]} name="trash-outline" size={20} color='red' />
                        <Text style={[thisStyles.friendsListMoreName, {color:'red'}, styles.fontBold]}>Remove Friend</Text>
                    </MenuOption>
            </MenuOptions>
        </Menu>
    </View>
);}


const AllFriendsModal = ({visible, onRequestToClose, userData, userToken, friendsList, friendCount, onAskForRefresh, refreshing, removeFriend, onRequestToFindFriends}) =>  {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const placeHolderColor = colorScheme === 'light' ? 'grey' : 'grey';

    const friendTemplate = ({ item }) => <Friend friend={item} colors={colors} token={userToken} removeFriend={(id) => {removeFriend(id)}}/>;




    React.useEffect(() => {


    },[visible]);


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
                <MenuProvider>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalHeaderText, colors.textBlack, styles.fontBold]}>Your Friends</Text>
                        <TouchableOpacity style={[styles.modalHeaderButton, colors.textBlack]} onPress={() => onRequestToClose() }>
                            <Ionicons style={[styles.modalHeaderButtonText]} name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                        </TouchableOpacity>
                    </View>
                    {friendsList && friendsList.length > 0 ? (
                        <FlatList
                            style={[thisStyles.friendsList]}
                            contentContainerStyle={[thisStyles.friendsList, {borderTopWidth:1,}, colors.borderGrey]}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onAskForRefresh}/>}
                            data={friendsList} renderItem={friendTemplate} keyExtractor={item => item.id} />
                    ) : (
                        <View style={styles.listEmpty}>
                            <Ionicons style={[styles.listEmptyIcon, colors.textGrey1]} name="sad-outline" color={colorScheme === 'light' ? '#000' : '#fff'} />
                            <Text style={[styles.listEmptyText, colors.textGrey1, styles.fontBold]}>You don't have any friends! </Text>
                            <TouchableOpacity style={[styles.button, colors.bkgGreen1]} onPress={() => onRequestToFindFriends()}>
                                <Text style={[styles.buttonText, styles.fontBold, {paddingHorizontal: 25}]}>
                                    FIND FRIENDS
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </MenuProvider>
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
        width:40,
        textAlign:'center',
    },
    friendsListOptions:{
        width: 160,
    },
    friendsListOption: {
        flexDirection: 'row',
        height:40,
    },
    friendsListMoreIcon:{
        margin:0,
        paddingHorizontal:5,
        paddingVertical:5,
        fontSize:20,
        lineHeight:20,
    },
    friendsListMoreLoader:{
        margin:0,
        paddingHorizontal:5,
        paddingVertical:5,
        paddingTop:10,
    },
    friendsListMoreName:{
        fontSize:15,
        padding:6,
    },
});


export default AllFriendsModal;
