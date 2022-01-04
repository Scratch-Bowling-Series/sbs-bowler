import React from "react";
import {useColorScheme, View} from "react-native";
import {colorStylesDark, colorStylesLight} from "../styles";
import {Video} from "expo-av";

const welcomeVideo = require('../../assets/SBS_Logo_Reveal.mp4');

const SplashScreen = ({setSplashFinished}) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' || true ? colorStylesLight : colorStylesDark;

    const playbackStatusUpdate = (status) => {
        if(status.didJustFinish){
            setSplashFinished(true);
        }
    }

    return (
        <View style={{flex: 1,}}>
            <Video source={welcomeVideo}
                   style={{flex:1, resizeMode:'contain'}}
                   resizeMode="contain" shouldPlay={true}
                   onPlaybackStatusUpdate={ (playbackStatus) => playbackStatusUpdate(playbackStatus)}/>
        </View>
    );
}


export default SplashScreen;