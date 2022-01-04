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
    useColorScheme
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Application from 'expo-application';
import {SafeAreaView} from "react-native-safe-area-context";
import AuthContext from "./context/authContext";
import UserContext from "./context/userContext";
import {colorStylesDark, colorStylesLight, styles} from "./styles";
import SettingsContext from "./context/settingsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const sbsLogo = require('../assets/logo-beta.png');
const topBarGraphic = require('../assets/top-bar.png');
const defaultProfilePhoto = require('../assets/profile-default.png');


const storeSettingsObj = async (value) => {
    try {
        if(!value){
            return
        }
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@settings', jsonValue)
    } catch (e) {
        // saving error
    }
}

const SettingsModal = ({visible, onRequestToClose}) =>  {
    const {signOut} = useContext(AuthContext);
    const [settings, setSettings] = useContext(SettingsContext)
    const userData = useContext(UserContext);

    const [autoGameMode, setAutoGameMode] = useState(false);
    const [sendDiagData, setSendDiagData] = useState(false);

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;


    function saveSettings(){
        const settingsData = {'autoGameMode': autoGameMode, 'sendDiagData': sendDiagData}
        setSettings(settingsData);
        storeSettingsObj(settingsData);
    }

    useEffect(() => {
        if(settings){
            setAutoGameMode(settings.autoGameMode);
            setSendDiagData(settings.sendDiagData);
        }
    }, [visible]);



    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                onRequestToClose();
                setSettings({'autoGameMode': autoGameMode, 'sendDiagData': sendDiagData});
            }}
            style={styles.helpModal}
        >
            <SafeAreaView style={[{flex:1, position:'relative'}, colors.bkgWhite]}>
                <View style={[styles.modalHeader]}>
                    <Text style={[styles.modalHeaderText, colors.textBlack, styles.fontBold]}>Settings</Text>
                    <TouchableOpacity style={[styles.helpClose, {paddingHorizontal: 20}, colors.textBlack]} onPress={() => {onRequestToClose(); saveSettings();}}>
                        <Ionicons name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.settingsItems}>
                    <View style={styles.settingsItem}>
                        <Text style={[styles.settingsItemName, colors.textBlack]}>Automatically Enter Game Mode</Text>
                        <Switch style={styles.settingsSwitch} value={autoGameMode} onValueChange={setAutoGameMode}/>
                    </View>
                    <View style={styles.settingsItem}>
                        <Text style={[styles.settingsItemName, colors.textBlack]}>Send Usage & Diagnostics Data</Text>
                        <Switch style={styles.settingsSwitch} value={sendDiagData} onValueChange={setSendDiagData}/>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'center'}}>
                    <TouchableOpacity style={[styles.settingsSignOut]} onPress={() => signOut()}>
                        <Text style={[styles.settingsSignOutText, colors.textBlack]}>
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.settingsSignOut]} onPress={() => console.log('Report a bug!')}>
                        <Text style={[styles.settingsSignOutText, colors.textBlack]}>
                            Report Bug
                        </Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.settingsVersion}>SBS BOWLER - v{Application.nativeApplicationVersion}</Text>
                <Text style={styles.settingsWeb}>SCRATCH BOWLING SERIES</Text>
            </SafeAreaView>
        </Modal>
    );
};

const thiStyles = StyleSheet.create({

});




export default SettingsModal;
