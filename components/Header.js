import React from 'react';
import {Image, StyleSheet, View} from "react-native";

const Header = () =>  {
    return (
        <View style={styles.header}>
            <Image source={require('../assets/top-bar.png')} style={styles.headerLines}/>
            <Image source={require('../assets/logo-beta.png')} style={styles.headerLogo}/>
            <Image source={require('../assets/profile-default.png')} style={styles.profile}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header:{
        height:65,
        backgroundColor: '#214031',
        position: 'relative',
    },
    headerLogo:{
        position: 'absolute',
        height:50,
        width: 95,
        top:7.5,
        left:85,
        tintColor: '#214031',

    },
    headerLines:{
        height:65,
        width: 269,
        left:0,
        position: "absolute",
        top: 0,
    },
    profile:{
        height:40,
        width:40,
        borderRadius: 20,
        position: 'absolute',
        right: 12.5,
        top: 12.5,
    }
});




export default Header;