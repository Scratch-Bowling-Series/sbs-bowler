import React, { useContext } from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import { RefreshControl, ScrollView, useColorScheme, View} from "react-native";
import {colorStylesLight, colorStylesDark, styles} from '../styles';
import UserContext from "../context/userContext";
import ProfilePreview from "../profilePreview";
import FriendsList from "../friendsList";
import WalletPreview from "../walletPreview";



const ProfileScreen = ({navigation}) => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [refreshingPreview, setRefreshingPreview] = React.useState(false);
    const [refreshingFriends, setRefreshingFriends] = React.useState(true);
    const [userData, userToken] = useContext(UserContext);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const onRefresh = async () => {
        setRefreshing(true);
        setRefreshingPreview(true);
        while(refreshingPreview){}
        setRefreshingFriends(true);
        while(refreshingFriends){}
        setRefreshing(false);
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

                    <WalletPreview colors={colors}/>
                    <ProfilePreview userData={userData} userToken={userToken} shouldRefresh={refreshingPreview} onDoneRefreshing={() => {setRefreshingPreview(false)}}/>
                    <FriendsList userData={userData} userToken={userToken} shouldRefresh={refreshingFriends} onDoneRefreshing={() => {setRefreshingFriends(false)}}/>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}


export default ProfileScreen;