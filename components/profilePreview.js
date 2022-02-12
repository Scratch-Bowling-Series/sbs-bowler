import React, { useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, useColorScheme, Text} from 'react-native';
import defaultProfilePhoto from '../assets/profile-default.png';
import {colorStylesLight, colorStylesDark, styles} from './styles';
import ModifyProfileModal from "./modifyProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./context/authContext";


const base_url = 'https://bowl.sbs';

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

const ProfilePreview = ({navigation, userData, userToken, shouldRefresh, onDoneRefreshing}) =>  {
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const {updateUserData} = useContext(AuthContext);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    const performRefresh = async () => {
        const userData_ = await getProfileDataFromApi(userToken);
        const hasChanged = userData_ !== userData_;
        if(userData_ && hasChanged){
            updateUserData(userData_);
            await AsyncStorage.setItem('@user_data', JSON.stringify(userData_));
        }
    }

    React.useEffect(() =>{
        if(shouldRefresh){
            performRefresh().then(r => {
                onDoneRefreshing();
            });
        }
    },[shouldRefresh]);


    return (
        <View style={[styles.block, colors.bkgWhite]}>
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

            <View style={styles.buttonBar}>
                <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]} onPress={() => setEditProfileVisible(true)} disabled={shouldRefresh}>
                    <Text style={styles.profileButtonText}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
            </View>
            <ModifyProfileModal visible={editProfileVisible} onRequestToClose={()=> setEditProfileVisible(false)} userData={userData} userToken={userToken}/>
        </View>
    );
};



export default ProfilePreview;