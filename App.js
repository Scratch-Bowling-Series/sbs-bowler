
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Platform, Modal, Alert, TouchableOpacity,TextInput, KeyboardAvoidingView,Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StatusBar} from "expo-status-bar";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from "expo-font";
import ProfileDisplay from './components/profiledisplay';
import Header from "./components/header";
import LoginTop from "./components/loginTop";

import HomeScreen from "./screens/homeScreen";


import AuthContext, {AuthProvider, AuthConsumer} from "./components/context/authContext";
import UserContext, {UserProvider, UserConsumer} from "./components/context/userContext";

const base_url = 'http://10.0.0.211:8000';
const sbsLogo = require('./assets/logo-beta.png');
const topBarGraphic = require('./assets/top-bar.png');
const defaultProfilePhoto = require('./assets/profile-default.png');
const welcomeDesign= require('./assets/welcome-design.png');


function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.loginContainer}>
            <LoginTop header={'SBS BOWLER'} desc={'YOUR COMPANION APP FOR SBS TOURNAMENTS!'}/>
            <SafeAreaView style={styles.loginBottom} edges={['bottom']}>
                <TouchableOpacity style={styles.loginButton} title="LOG IN" onPress={() => { navigation.navigate('Login')}}>
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
function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signIn } = React.useContext(AuthContext);
    return (
        <KeyboardAvoidingView style={styles.loginContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <LoginTop header={'SBS BOWLER'} desc={'YOUR COMPANION APP FOR SBS TOURNAMENTS!'}/>
            <SafeAreaView style={styles.loginBottom} edges={['bottom']}>
                <TextInput style={styles.loginInput} placeholder="Email Address" value={email} onChangeText={setEmail} />
                <TextInput style={styles.loginInput} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.loginButton} title="LOG IN" onPress={() => signIn({ email, password })}>
                    <Text style={styles.loginButtonText}>
                        Log In
                    </Text>
                </TouchableOpacity>
                <Text style={styles.loginOrDivider}>OR</Text>
                <TouchableOpacity style={styles.loginButtonOffset} title="LOG IN" onPress={() => { navigation.navigate('Signup')}}>
                    <Text style={styles.loginButtonTextOffset}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
function SignupScreen({navigation}) {
    const [firstName, setFirst] = React.useState('');
    const [lastName, setLast] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { signUp } = React.useContext(AuthContext);
    return (
        <KeyboardAvoidingView style={styles.loginContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <LoginTop header={'SBS BOWLER'} desc={'YOUR COMPANION APP FOR SBS TOURNAMENTS!'}/>
            <SafeAreaView style={styles.loginBottom} edges={['bottom']}>
                <TextInput style={styles.loginInput} placeholder="First Name" value={firstName} onChangeText={setFirst} />
                <TextInput style={styles.loginInput} placeholder="Last Name" value={lastName} onChangeText={setLast} />
                <TextInput style={styles.loginInput} placeholder="Email Address" value={email} onChangeText={setEmail} />
                <TextInput style={styles.loginInput} placeholder="Password"  value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity style={styles.loginButton} title="LOG IN" onPress={()=> signUp({ firstName, lastName, email, password })}>
                    <Text style={styles.loginButtonText}>
                        Create an Account
                    </Text>
                </TouchableOpacity>
                <Text style={styles.loginOrDivider}>OR</Text>
                <TouchableOpacity style={styles.loginButtonOffset} title="LOG IN" onPress={() => { navigation.navigate('Login')}}>
                    <Text style={styles.loginButtonTextOffset}>
                        Log In
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}


function TournamentsScreen({navigation, userData, token}) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Header userData={userData} navigation={navigation}/>
            <View style={styles.container}>
                <Text style={styles.screenEmpty}>NO TOURNAMENTS</Text>
            </View>
        </SafeAreaView>
    );
}
function LiveScreen({navigation, userData, token}) {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Header userData={userData} navigation={navigation}/>
            <View style={styles.container}>
                <Text style={styles.screenEmpty}>NO LIVE STREAMS</Text>
            </View>
        </SafeAreaView>
    );
}
function ProfileScreen({navigation, userData, token}) {

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Header userData={userData} onProfile={true}/>
            <ProfileDisplay navigation={navigation} token={token} userData={userData} />
        </SafeAreaView>
    );
}

function SplashScreen(){
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <Text>Profile Screen</Text>
            </View>
        </SafeAreaView>
    );
}
function SettingsScreen() {
    return (
        <SafeAreaView
            style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Settings Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const storeUserData = async (value) => {
    try {
        if(value === null){
            value = {'first_name':'', 'last_name':''};
        }

        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@user_data', jsonValue)
    } catch (e) {
        // saving error
    }
}
const getUserData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_data')
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        return data != null ? data : {'first_name':'', 'last_name':''};
    } catch(e) {
        // error reading value
    }
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () =>  {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        userData: action.userData,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        userData: action.userData,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        userData: {'first_name':'', 'last_name':''},
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            userData: {'first_name':'', 'last_name':''},
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let userData;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
                userData = await getUserData();
            } catch (e) {
                // Restoring token failed
            }
            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken, userData: userData});
        };

        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                try {
                    if(data['email'] && data['password']){

                    }
                    else{
                        return
                    }


                    const response = await fetch(
                        base_url + '/api/auth/login/', {
                        method: 'POST',
                            headers: {
                            Accept: 'application/json',
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: data['email'],
                            password: data['password']
                        })
                    });
                    const jsonData = await response.json();
                    if(jsonData.token && jsonData.token.length > 10 && jsonData.user){
                        await SecureStore.setItemAsync('userToken', jsonData.token);
                        await storeUserData(jsonData.user);
                        dispatch({ type: 'SIGN_IN', token: jsonData.token, userData: jsonData.user});
                    }else{
                        console.log(jsonData);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            signOut: () => {
                try{
                    storeUserData(null).then(r => {});
                    SecureStore.deleteItemAsync('userToken').then(r => {});
                    console.log('cleared secure store');
                }
                catch(error){

                }

                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async data => {
                try {
                    if(data['email'] && data['password'] && data['firstName'] && data['lastName']){

                    }
                    else{
                        return
                    }

                    const response = await fetch(
                        base_url + '/api/auth/signup/', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                first_name: data['firstName'],
                                last_name: data['lastName'],
                                email: data['email'],
                                password: data['password']
                            })
                        });
                    const jsonData = await response.json();
                    if(jsonData.token && jsonData.token.length > 10 && jsonData.user){
                        await SecureStore.setItemAsync('userToken', jsonData.token);
                        await storeUserData(jsonData.user);
                        dispatch({ type: 'SIGN_IN', token: jsonData.token, userData: jsonData.user});
                    }else{
                        console.log(jsonData);
                    }
                } catch (error) {
                    console.error(error);
                }
            },
            getToken: () => { return state.userToken; }


        }),
        []
    );

    if (state.isLoading && false) {
        // We haven't finished checking for the token yet
        return <SplashScreen />;
    }

    const [loaded] = useFonts({
        TTOctosquaresCondRegular: require('./assets/fonts/TTOctosquaresCond-Regular.otf'),
        TTOctosquaresCondBlack: require('./assets/fonts/TTOctosquaresCond-Black.otf'),
        TTOctosquaresCondBold: require('./assets/fonts/TTOctosquaresCond-Bold.otf'),
    });
    if (!loaded) {
        return null;
    }

  return (
      <AuthProvider value={authContext}>
          <UserProvider value={state.userData}>
              <SafeAreaProvider>
                  <NavigationContainer>

                      {state.userToken == null ? (
                          <Stack.Navigator initialRouteName="Welcome" screenOptions={({ route }) => ({ headerShown: false,})} >
                              <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                              <Stack.Screen name="Login" component={LoginScreen}/>
                              <Stack.Screen name="Signup" component={SignupScreen}/>
                          </Stack.Navigator>
                      ) : (
                          <Tab.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
                              //header: (props) => <Header {...props} userData={state.userData}/>,
                              headerShown: false,
                              headerStyle: {

                              },
                              headerTintColor: '#fff',
                              headerTitleStyle: {

                              },
                              tabBarIcon: ({ focused, color, size }) => {
                                  let iconName;

                                  if (route.name === 'Home') {
                                      iconName = 'home-outline'
                                  } else if (route.name === 'Tournaments') {
                                      iconName = 'list-outline';
                                  } else if (route.name === 'Live') {
                                      iconName = 'tv-outline';
                                  } else if (route.name === 'Profile') {
                                      iconName = 'person-circle-outline';
                                  }

                                  // You can return any component that you like here!
                                  return <Ionicons name={iconName} size={size} color={color} />;
                              },
                              tabBarActiveTintColor: '#d9af62',
                              tabBarInactiveTintColor: 'grey',
                          })}>
                              <Tab.Screen name="Home" >
                                  {(props) => <HomeScreen {...props} userData={state.userData} token={state.userToken}/>}
                              </Tab.Screen>
                              <Tab.Screen name="Tournaments" >
                                  {(props) => <TournamentsScreen {...props} userData={state.userData} token={state.userToken}/>}
                              </Tab.Screen>
                              <Tab.Screen name="Live">
                                  {(props) => <LiveScreen {...props} userData={state.userData} token={state.userToken}/>}
                              </Tab.Screen>
                              <Tab.Screen name="Profile">
                                  {(props) => <ProfileScreen {...props} userData={state.userData} token={state.userToken}/>}
                              </Tab.Screen>
                          </Tab.Navigator>
                      )}
                  </NavigationContainer>
              </SafeAreaProvider>
          </UserProvider>
      </AuthProvider>
  );
};



const styles = StyleSheet.create({
    safeAreaView:{
        flex: 1,
    },
    container:{
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    screenEmpty:{
        fontSize:30,
        fontFamily: 'TTOctosquaresCondBold',
        color:'lightgrey',
    },


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

export default App;