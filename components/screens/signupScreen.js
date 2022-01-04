import AuthContext from "../context/authContext";
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


const SignupScreen = ({navigation, loginError, applying}) => {
    const [firstName, setFirst] = React.useState('');
    const [lastName, setLast] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signUp } = React.useContext(AuthContext);
    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const placeHolderColor = colorScheme === 'light' ? 'lightgrey' : 'grey';

    return (
        <KeyboardAvoidingView style={styles.loginContainer} behavior={Platform.OS === "ios" ? "padding" : "undefined"}>
            <LoginTop header={'SBS BOWLER'} desc={'YOUR COMPANION APP FOR SBS TOURNAMENTS!'} navigation={navigation}/>
            <SafeAreaView style={styles.loginBottom} edges={['bottom']}>
                { loginError ? (<Text style={styles.loginError}>{loginError}</Text>) : null}
                <TextInput style={styles.loginInput} autoComplete="name-given" textContentType="givenName" placeholder="First Name" placeholderTextColor={placeHolderColor} value={firstName} onChangeText={setFirst} />
                <TextInput style={styles.loginInput} autoComplete="name-family" textContentType="familyName" placeholder="Last Name" placeholderTextColor={placeHolderColor} value={lastName} onChangeText={setLast} />
                <TextInput style={styles.loginInput} autoComplete="email" textContentType="emailAddress" placeholder="Email Address" placeholderTextColor={placeHolderColor} value={email} onChangeText={setEmail} />
                <TextInput style={styles.loginInput} autoComplete="password" textContentType="password" placeholder="Password"  placeholderTextColor={placeHolderColor} value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={[styles.loginButton, colors.bkgGreen1]} onPress={()=> signUp({ firstName, lastName, email, password })} disabled={applying}>
                    <Text style={styles.loginButtonText}>
                        Create an Account
                    </Text>
                    <ActivityIndicator style={styles.buttonLoader} size="small" color="#fff" animating={applying}/>
                </TouchableOpacity>
                <Text style={styles.loginOrDivider}>OR</Text>
                <TouchableOpacity style={styles.loginButtonOffset} onPress={() => { navigation.navigate('Login')}} disabled={applying}>
                    <Text style={styles.loginButtonTextOffset}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const thisStyles = StyleSheet.create({


});


export default SignupScreen;