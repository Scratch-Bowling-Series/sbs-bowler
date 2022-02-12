import React, { useContext, useEffect, useState, useRef} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    Alert,
    TouchableOpacity,
    TextInput,
    useColorScheme, Platform, KeyboardAvoidingView, ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context";
import AuthContext from "./context/authContext";
import {colorStylesDark, colorStylesLight, styles} from "./styles";
import UserContext from "./context/userContext";
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const googlePlacesApiKey = 'AIzaSyAJF26vR7y95AC7xjFt2cqSRv21gEC-yZE';
const base_url = 'https://bowl.sbs';

function getAddressStringFromUserData(userData){
    const street = userData.street || '';
    const city = userData.city || '';
    let state = userData.state || '';
    let country = userData.country || '';
    if(state){state = ', ' + state}
    if(country){country = ', ' + country}
    return street + ' ' + city + state + country;
}

function convertGoogleLocationDetailsToArray(details){
    let number = '';
    let street = '';
    let city = '';
    let state = '';
    let zip = '';
    let country = '';

    var arrayLength = details.address_components.length;
    for (var i = 0; i < arrayLength; i++) {
        const comp = details.address_components[i];
        if(comp && comp.types){
            if(comp.types.includes('street_number')){
                number = comp.long_name;
            } else if(comp.types.includes('route')){
                street = comp.long_name;
            }
            else if(comp.types.includes('locality')){
                city = comp.long_name;
            }
            else if(comp.types.includes('administrative_area_level_1')) {
                state = comp.short_name;
            }
            else if(comp.types.includes('postal_code')){
                zip = comp.long_name;
            }
            else if(comp.types.includes('country')){
                country = comp.short_name;
            }
        }
    }
    street = number + ' ' + street;
    return [street, city, state, country, zip];
}



const ModifyProfileModal = ({visible, onRequestToClose, userData, userToken}) =>  {
    const [profileModified, setProfileModified] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [modifyError, setModifyError] = React.useState('');
    const [pictureExists, setPictureExists] = React.useState(true);

    const [firstName, setFirst] = React.useState('');
    const [lastName, setLast] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [address, setAddress] = React.useState(null);

    const [applying, setApplying] = React.useState(false);
    const { signOut, updateUserData } = React.useContext(AuthContext);
    const ref = useRef();

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const placeHolderColor = colorScheme === 'light' ? 'lightgrey' : 'grey';

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage(pickerResult);
        setProfileModified(true);
    };

    const modifyProfileWithApi = async () => {
        const formData = new FormData();
        setApplying(true);
        try {
            let picture = '';
            if(selectedImage){
                picture = {uri: selectedImage.uri, name: 'image', type: 'image/png'}
            }
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('bio', bio);
            formData.append('email', email);
            formData.append('picture', picture);
            formData.append('address', JSON.stringify(address));

            let response = await fetch(base_url + '/api/user/modify/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Token ' + userToken,
                    credentials: 'include',
                },
                body: formData
            });

            const jsonData = await response.json();
            if(jsonData && jsonData.user){
                updateUserData(jsonData.user)
                await AsyncStorage.setItem('@user_data', JSON.stringify(jsonData.user))
                setSelectedImage(null);
                onRequestToClose();
            }

        } catch (error){

        }
        setApplying(false);
    }

    useEffect(() => {
        if(userData.picture && userData.picture.endsWith('/profile-pictures/default.jpg')){
            setPictureExists(false);
        }

        const address = getAddressStringFromUserData(userData);
        if(address && address.length > 5){
            ref.current?.setAddressText(address);
        }

        setEmail(userData.email || '');
        setFirst(userData.first_name || '');
        setLast(userData.last_name || '');
        setBio(userData.bio || '');
        setProfileModified(false);

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

            <SafeAreaView style={[{flex:1, position:'relative',}, colors.bkgWhite]}>
                <View style={styles.modalHeader}>
                    <Text style={[styles.modalHeaderText, styles.fontBold, colors.textBlack]}>Edit Profile</Text>
                    <TouchableOpacity style={[styles.modalHeaderButton, colors.textBlack]} onPress={() => onRequestToClose() }>
                        <Ionicons style={styles.modalHeaderButtonText} name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileModify}>
                    { modifyError ? (<Text style={styles.loginError}>{modifyError}</Text>) : null}

                    { selectedImage ? (
                        <TouchableOpacity style={[styles.photoButton, colors.bkgBlack, colors.borderBlack]} onPress={openImagePickerAsync}>
                            <Text style={[styles.loginButtonText, colors.textBlack]}>
                                Picture Added
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={[styles.photoButton, colors.bkgBlack, colors.borderBlack]} onPress={openImagePickerAsync}>
                            { pictureExists ? (
                                <Text style={[styles.loginButtonText, colors.textBlack]}>
                                    Change Picture
                                </Text>
                            ) : (
                                <Text style={[styles.loginButtonText, colors.textBlack]}>
                                    Add Picture
                                </Text>
                            )}


                        </TouchableOpacity>
                    )}

                    <TextInput style={[styles.profileInput, colors.borderBlack, colors.textBlack]} autoComplete="name-given" textContentType="givenName" placeholder="First Name" placeholderTextColor={placeHolderColor} value={firstName.toString()} onChangeText={ text => {setFirst(text); setProfileModified(true)}}/>
                    <TextInput style={[styles.profileInput, colors.borderBlack, colors.textBlack]} autoComplete="name-family" textContentType="familyName" placeholder="Last Name" placeholderTextColor={placeHolderColor} value={lastName.toString()} onChangeText={ text => {setLast(text); setProfileModified(true)}} />
                    <GooglePlacesAutocomplete
                        ref={ref}
                        styles={{ textInputContainer: [styles.locationInput, colors.borderBlack],listView: [styles.locationListView], row: [styles.locationListRow, colors.bkgGrey3], description: {color:'white'}, textInput: [styles.locationInputText, colors.textBlack] , container: styles.locationInputContainer }}
                        placeholder='Your Address'
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        textInputProps={{placeholderTextColor: 'lightgrey', autoComplete: 'street-address', textContentType: 'fullStreetAddress'}}
                        onPress={(data, details = null) => {
                            setAddress(convertGoogleLocationDetailsToArray(details))
                            setProfileModified(true);
                        }}
                        query={{
                            key: googlePlacesApiKey,
                            language: 'en',
                        }}
                    />
                    <TextInput style={[styles.profileInput, colors.borderBlack, colors.textBlack]} placeholder="Bio" placeholderTextColor={placeHolderColor} value={bio.toString()} onChangeText={ text => {setBio(text); setProfileModified(true)}} maxLength={40}/>
                    <TextInput style={[styles.profileInput, colors.borderBlack, colors.textBlack]} autoComplete="email" textContentType="emailAddress"  placeholder="Email" placeholderTextColor={placeHolderColor} value={email.toString()} onChangeText={ text => {setEmail(text); setProfileModified(true)}} />

                    <TouchableOpacity style={[styles.button, {marginHorizontal: 20,marginTop:10,},colors.bkgGreen1, {opacity: profileModified ? 1 : 0.5}]} onPress={()=> modifyProfileWithApi() } disabled={!profileModified || applying}>
                        <Text style={styles.loginButtonText}>
                            Apply
                        </Text>
                        <ActivityIndicator style={styles.buttonLoader} size="small" color="#fff" animating={applying}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={[styles.signoutButton]} onPress={() => signOut()}>
                        <Text style={[styles.signoutButtonText, colors.textBlack]}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};



export default ModifyProfileModal;
