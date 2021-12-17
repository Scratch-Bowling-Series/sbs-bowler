import React from 'react';
import {Image, StyleSheet, View, Text} from "react-native";

const Navigation = () =>  {
    return (
        <View style={styles.nav}>
            <Text>this is nav</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    nav:{
        height:85,
        padding:10,
        backgroundColor: 'white',
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
        borderStyle: 'solid',
        position: 'absolute',
        bottom: 0,
        right:0,
        left:0,
        textAlign: 'center',
    }
});




export default Navigation;