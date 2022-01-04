import {StyleSheet, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {colorStylesDark, colorStylesLight, styles} from "../styles";
import LoginTop from "../loginTop";
import {SafeAreaView} from "react-native-safe-area-context";




const WelcomeScreen = ({ navigation }) => {
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    return (
        <View style={[styles.loginContainer, colors.bkgGreen1]}>
            <LoginTop header={'SBS BOWLER'} desc={'YOUR COMPANION APP FOR SBS TOURNAMENTS!'} navigation={navigation}/>
            <SafeAreaView style={styles.loginBottom} edges={['bottom']}>
                <TouchableOpacity style={[styles.loginButton, colors.bkgGreen1]} title="LOG IN" onPress={() => { navigation.navigate('Login')}}>
                    <Text style={styles.loginButtonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginButtonOffset} title="LOG IN" onPress={() => { navigation.navigate('Signup')}}>
                    <Text style={styles.loginButtonTextOffset}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}


const thisStyles = StyleSheet.create({


});

export default WelcomeScreen;