import React, {Component, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context";
import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import sbsLogo from "../assets/logo-beta.png";
import {colorStylesDark, colorStylesLight, styles} from "./styles";
import {StatusBar} from "expo-status-bar";
import * as Application from "expo-application";

const LoginHeader = ({navigation}) =>  {
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();

    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return(
        <SafeAreaView style={thisStyles.loginHeader} edges={['top']}>
            <TouchableOpacity style={thisStyles.loginLogoWrap} onPress={() => navigation.navigate('Welcome')}>
                <Image source={sbsLogo} style={thisStyles.loginLogo}/>
            </TouchableOpacity>
            <TouchableOpacity style={thisStyles.loginHelp} onPress={() => setModalVisible(true)}>
                <Ionicons name="help-circle-outline" size={32} color="#fff" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {

                }}
                style={thisStyles.helpModal}
            >
                <SafeAreaView style={[{flex:1,},colors.bkgWhite]}>
                    <View style={[styles.modalHeader, colors.borderGrey]}>
                        <Text style={[styles.modalHeaderText, colors.textBlack, styles.fontBold]}>Need Help?</Text>
                        <TouchableOpacity style={[styles.modalHeaderButton, styles.fontBold, colors.textBlack]} onPress={() => setModalVisible(false) }>
                            <Ionicons style={[styles.modalHeaderButtonText]} name="close" size={32} color={colorScheme === 'light' ? '#000' : '#fff'} />
                        </TouchableOpacity>
                    </View>
                    <View style={thisStyles.helpBody}>
                        <Text style={[thisStyles.helpHeaderText, styles.fontBold, colors.textBlack]}>What is SBS?</Text>
                        <Text style={thisStyles.helpText}>We have put together a very useful help center on our website. You can visit it at </Text>
                        <TouchableOpacity>
                            <Text style={[thisStyles.helpText,{color: 'blue'}]}>https://scratchbowling.com/help-center/</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', justifyContent: 'center'}}>
                        <TouchableOpacity style={[styles.settingsSignOut]} onPress={() => console.log('Forgot Password!')}>
                            <Text style={[styles.settingsSignOutText, colors.textBlack]}>
                                Forgot Password
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
            <StatusBar style='light' />
        </SafeAreaView>
    );
}
const thisStyles = StyleSheet.create({
    loginContainer:{
        flex: 1,
        backgroundColor: '#214031',
        overflow: 'hidden',
    },
    loginBottom:{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 20,
        textAlign: 'center',

    },
    loginTop:{
        flex:4,
        backgroundColor: '#214031',
    },
    loginTopInner:{
        flex:8,
        position: 'relative',
    },
    loginLogoWrap:{
        alignSelf: 'flex-start',
        alignItems:'flex-start',
    },
    loginLogo:{
        resizeMode: 'contain',
        tintColor: '#fff',
        height: 50,
        width:100,
        alignSelf: 'flex-start',
        alignItems:'flex-start',
        padding:10,
    },
    loginOrDivider:{
        textAlign: 'center',
        fontSize: 14,
        color: '#3d3d3d',
        fontFamily: 'TTOctosquaresCondBold',
    },
    loginHelp:{
        flex:1,
        height:50,
        alignSelf: 'flex-end',
        paddingVertical: 8,
        textAlign:'right',
        alignItems:'flex-end',
    },
    loginHeader:{
        alignItems:'flex-start',
        justifyContent: 'flex-start',
        zIndex: 200,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        fontFamily: 'TTOctosquaresCondBlack',
    },
    welcomeTopMessage:{
        position: "absolute",
        bottom: 0,
        left:0,
        padding:30,
    },
    welcomeHeaderText:{
        color: '#fff',
        fontSize: 35,
        fontFamily: 'TTOctosquaresCondBold',
        paddingVertical: 5,
    },
    welcomeHeaderDesc:{
        color: '#fff',
        fontSize: 20,
        maxWidth: '90%',
        fontFamily: 'TTOctosquaresCondBold',
    },
    loginInput:{
        fontSize:18,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 15,
        margin: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'TTOctosquaresCondRegular',
        color: 'grey'
    },
    loginButton:{
        borderRadius: 15,
        margin: 10,
        backgroundColor: '#214031',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonText:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondBold',
        textAlignVertical: 'center',
        padding:10,
    },
    loginButtonOffset:{
        margin: 10,
        borderRadius: 15,
        backgroundColor: 'lightgrey',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonTextOffset:{
        fontSize: 20,
        padding:10,
        textAlign: 'center',
        color: '#3d3d3d',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondBold',
        textAlignVertical: 'center',
    },
    welcomeDesign:{
        width: '100%',
        height: 600,
        marginVertical: 100,
        resizeMode: "cover",
        tintColor: '#234434'
    },
    helpModal:{

    },
    helpHeader:{
        flex:1,
        flexDirection: 'row',
    },
    helpClose:{
        flex:1,
        paddingVertical: 12,
        textAlign: 'right',
        alignItems: 'flex-end',
    },
    helpHeaderText:{
        fontSize: 25,
        padding:30,
    },
    helpBody: {
        flex:9,
    },
    helpText: {
        color: '#000',
        fontSize: 18,
        fontFamily: 'TTOctosquaresCondBold',
        paddingHorizontal:30,
        paddingVertical: 10,
    },
});

export default LoginHeader;