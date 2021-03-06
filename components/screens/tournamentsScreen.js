
import React from "react";
import {Text, useColorScheme, View} from "react-native";
import {colorStylesDark, colorStylesLight, styles} from "../styles";
import {SafeAreaView} from "react-native-safe-area-context";

const TournamentsScreen = ({navigation, token}) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;

    return (
        <SafeAreaView style={[styles.safeAreaView, colors.bkgGrey1]}>

            <View style={styles.container}>
                <Text style={styles.screenEmpty}>NO TOURNAMENTS</Text>
            </View>
        </SafeAreaView>
    );
}


export default TournamentsScreen;