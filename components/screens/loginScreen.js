import React from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import {colorStylesDark, colorStylesLight, styles} from "../styles";
import LoginTop from "../loginTop";
import {SafeAreaView} from "react-native-safe-area-context";
import AuthContext from "../context/authContext";


const LoginScreen = ({ navigation, loginError, applying}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const placeHolderColor = colorScheme === 'light' ? 'lightgrey' : 'grey';
    return (
        <KeyboardAvoidingView style={styles.loginContainer} behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
            <LoginTop header={'SBS BOWLER'} desc={'YOUR COMPANION APP FOR SBS TOURNAMENTS!'} navigation={navigation}/>
            <SafeAreaView style={styles.loginBottom} edges={['bottom']}>
                { loginError ? (<Text style={styles.loginError}>{loginError}</Text>) : null}
                <TextInput style={styles.loginInput} autoComplete="email" textContentType="emailAddress" placeholder="Email Address" placeholderTextColor={placeHolderColor} value={email} onChangeText={setEmail} />
                <TextInput style={styles.loginInput} autoComplete="password" textContentType="password" placeholder="Password" placeholderTextColor={placeHolderColor} value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={[styles.loginButton, colors.bkgGreen1]} onPress={() => signIn({ email, password })} disabled={applying}>
                    <Text style={styles.loginButtonText}>
                        Log In
                    </Text>
                    <ActivityIndicator style={styles.buttonLoader} size="small" color="#fff" animating={applying}/>
                </TouchableOpacity>
                <Text style={styles.loginOrDivider}>OR</Text>
                <TouchableOpacity style={styles.loginButtonOffset} onPress={() => { navigation.navigate('Signup')}} disabled={applying}>
                    <Text style={styles.loginButtonTextOffset}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


const thisStyles = StyleSheet.create({


});


export default LoginScreen;