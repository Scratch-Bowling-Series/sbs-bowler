import React, {Component, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from "react-native-safe-area-context";
import {Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import sbsLogo from "../assets/logo-beta.png";

const LoginHeader = ({navigation}) =>  {
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <SafeAreaView style={styles.loginHeader} edges={'top'}>
            <Image source={sbsLogo} style={styles.loginLogo}/>
            <TouchableOpacity style={styles.loginHelp} onPress={() => setModalVisible(true)}>
                <Ionicons name="help-circle-outline" size={32} color="#fff" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    this.setModalVisible(!this.modalVisible);
                }}
                style={styles.helpModal}
            >
                <SafeAreaView style={{flex:1,}}>
                    <View style={styles.helpHeader}>
                        <Text style={styles.helpHeaderText}>Need Help?</Text>
                        <TouchableOpacity style={[styles.helpClose, {paddingHorizontal: 20,}]} onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={32} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.helpBody}>
                        <Text style={styles.helpText}>We have put together a very useful help center on our website. You can visit it at </Text>
                        <TouchableOpacity>
                            <Text style={[styles.helpText,{color: 'blue'}]}>https://scratchbowling.com/help-center/</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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
    loginLogo:{
        resizeMode: 'center',
        tintColor: '#fff',
        flex:1,
        height: '100%',
        alignSelf: 'flex-start',
    },
    loginOrDivider:{
        textAlign: 'center',
        fontSize: 14,
        color: '#3d3d3d',
        fontFamily: 'TTOctosquaresCondBold',
    },
    loginHelp:{
        flex:3,
        alignItems: 'flex-end',
        paddingVertical: 12,
    },
    loginHeader:{
        position: 'absolute',
        top: 0, right:0, left:0,
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
        flex:10,
        color: '#000',
        fontSize: 35,
        fontFamily: 'TTOctosquaresCondBold',
        padding:20,
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