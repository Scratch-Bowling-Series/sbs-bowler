import React from 'react';
import {StyleSheet, Text, View, Platform, useColorScheme,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from "expo-font";
import {colorStylesLight, colorStylesDark, styles} from './components/styles';
import {AuthProvider} from "./components/context/authContext";
import {UserProvider} from "./components/context/userContext";
import {SettingsProvider} from "./components/context/settingsContext";
import Header from "./components/header";
import HomeScreen from "./components/screens/homeScreen";
import TournamentsScreen from './components/screens/tournamentsScreen';
import GameScreen from "./components/screens/gameScreen";
import LiveScreen from "./components/screens/liveScreen";
import ProfileScreen from "./components/screens/profileScreen";
import WelcomeScreen from './components/screens/welcomeScreen';
import LoginScreen from './components/screens/loginScreen';
import SignupScreen from "./components/screens/signupScreen";
import SplashScreen from "./components/screens/splashScreen";
import { apiGet, apiPost, apiUserData} from './utils/api';

const logoutUserOnServer = async (token) => {
    return await apiGet('/api/user/logout/', token);
}
const performSignIn = async (email, password) => {
    const formData = new FormData();
    formData.append('email', email.toLowerCase());
    formData.append('password', password)
    return await apiPost('/api/user/login/', formData);
}
const performSignUp = async (first, last, email, password) => {
    const formData = new FormData();
    formData.append('first_name', first)
    formData.append('last_name', last);
    formData.append('email', email.toLowerCase());
    formData.append('password', password)
    return await apiPost('/api/user/signup/', formData);
}
const storeExpoPushTokenWithApi = async (userToken, pushToken) => {
    const formData = new FormData();
    formData.append('pushToken', pushToken);
    return await apiPost('/api/user/store-push/', formData, userToken);
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () =>  {
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const [hasNotifications, setHasNotifications] = React.useState(false);
    const [clickedNotification, setClickedNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();

    const colorScheme = useColorScheme();
    const colors = colorScheme === 'light' ? colorStylesLight : colorStylesDark;
    const [settings, setSettings] = React.useState({'autoGameMode': true, 'sendDiagData': false});
    const [applying, setApplying] = React.useState(false);
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        userData: action.userData,
                        isLoading: false,
                        loginError: null,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        userData: action.userData,
                        loginError: null,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        userData: null,
                        loginError: null,
                    };
                case 'FAILED':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: null,
                        userData: null,
                        loginError: action.loginError,
                    };
                case 'UPDATE_DATA':
                    return {
                        ...prevState,
                        userData: action.userData,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            userData: null,
            loginError: null,
        }
    );

    const linking = {
        prefixes: ['https://bowler.scratchbowling.com', 'exps://bowler.scratchbowling.com'],

    };
    const mainScreenOptions = ({ route }) => ({
        header: (props) => <Header {...props} userData={state.userData} clickedNotification={clickedNotification} hasNotifications={hasNotifications} onNotificationsChange={(value) => setHasNotifications(value)} userToken={state.userToken}/>,
        headerShown: true,
        tabBarShowLabel: false,
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
            } else if (route.name === 'Game') {
                iconName = 'ios-game-controller';
            }

            if(route.name === 'Game'){
                return (
                    <View style={[styles.tabButtonCenter, colors.bkgGreen1]}>
                        <Ionicons style={[styles.tabButtonCenterIcon, {color: focused ? '#d9af62' : '#fff'}]} name={iconName} size={size} color={color} />
                        <Text style={[styles.tabButtonCenterText, styles.fontBold, {color: focused ? '#d9af62' : '#fff'}]}>{route.name}</Text>
                    </View>
                );
            }

            // You can return any component that you like here!
            return (
                <View style={[styles.tabButton]}>
                    <Ionicons style={[styles.tabButtonIcon,{color: focused ? '#d9af62' : 'grey'}]} name={iconName} size={size} color={color} />
                    <Text style={[styles.tabButtonText, styles.fontBold, {color: focused ? '#d9af62' : 'grey'}]}>{route.name}</Text>
                </View>
            );
        },
        tabBarStyle:{
            borderTopColor: colorScheme === 'light' ? '#adadad' : '#1e1e1e',
            backgroundColor: colorScheme === 'light' ? '#ffffff' : '#131313',
        },

        tabBarActiveTintColor: colorScheme === 'light' ? '#d9af62' : '#fff' ,
        tabBarInactiveTintColor: route.name !== 'Game' ? 'grey' : '#fff',
        backgroundColor:'red',
    });
    const gameScreenOptions = {
        headerShown:false,
    };
    const welcomeScreenOptions = ({ route }) => ({ headerShown: false,});

    React.useEffect(() => {
        const getSettings = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@settings')
                const data = jsonValue != null ? JSON.parse(jsonValue) : {'autoGameMode': true, 'sendDiagData': false};
                setSettings(data);
            } catch(e) {
                // error reading value
            }
        }

        const bootstrapAsync = async () => {
            let userToken;
            let userData_;
            try {
                userToken = await SecureStore.getItemAsync('userToken');
                const userDataJson = await AsyncStorage.getItem('@user_data')
                userData_ = userDataJson != null ? JSON.parse(userDataJson) : null;
            } catch (e) {
                // Restoring token failed
            }
            await getSettings();
            if(userToken){
                userData_ = await apiUserData(userToken);
                if(userData_){
                    setHasNotifications(userData_.has_notifications);
                    await AsyncStorage.setItem('@user_data', JSON.stringify(userData_))
                }
                else{
                    userToken = null;
                }
            }
            dispatch({ type: 'RESTORE_TOKEN', token: userToken, userData: userData_});
        };

        bootstrapAsync();


        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setHasNotifications(true);
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            setClickedNotification(response);
        });




    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                setApplying(true);
                try {
                    if(!data['email'] || !data['password']){
                        dispatch({type: 'FAILED', loginError: 'Please fill out fields.'})
                    }
                    else{
                        const response = await performSignIn(data['email'], data['password']);
                        if(response){
                            if(response.token && response.user){
                                await SecureStore.setItemAsync('userToken', response.token);
                                await AsyncStorage.setItem('@user_data', JSON.stringify(response.user));
                                const pushToken = await registerForPushNotificationsAsync();
                                setExpoPushToken(pushToken);
                                await storeExpoPushTokenWithApi(response.token, pushToken);
                                dispatch({ type: 'SIGN_IN', token: response.token, userData: response.user});
                            }
                            else{
                                dispatch({type: 'FAILED', loginError: 'Incorrect credentials.'})
                                console.log(response);
                            }
                        }
                        else{
                            dispatch({type: 'FAILED', loginError: 'Unknown error occurred.'})
                        }
                    }
                } catch (error) {
                    dispatch({type: 'FAILED', loginError: 'Unknown error occurred.'})
                }
                setApplying(false);
            },
            signOut: async () => {
                try{
                    await logoutUserOnServer(state.userToken);
                    await AsyncStorage.removeItem('@user_data');
                    await SecureStore.deleteItemAsync('userToken');

                }
                catch(error){

                }
                dispatch({ type: 'SIGN_OUT' })
            },
            signUp: async data => {
                setApplying(true);
                try {
                    if(!data['email'] || !data['password'] || !data['firstName'] || !data['lastName']){
                        dispatch({type: 'FAILED', loginError: 'Please fill out fields.'});
                    }
                    else{
                        const response = await performSignUp(data['firstName'], data['lastName'], data['email'], data['password']);
                        if(response){
                            if(response.token && response.user){
                                await SecureStore.setItemAsync('userToken', response.token);
                                await AsyncStorage.setItem('@user_data', JSON.stringify(response.user))
                                const pushToken = await registerForPushNotificationsAsync();
                                setExpoPushToken(pushToken);
                                await storeExpoPushTokenWithApi(response.token, pushToken);
                                dispatch({ type: 'SIGN_IN', token: response.token, userData: response.user});
                            }
                            else{
                                if(response.email){
                                    dispatch({type: 'FAILED', loginError: response.email[0]})
                                }
                                else if(response.password){
                                    dispatch({type: 'FAILED', loginError: response.password[0]})
                                }
                                else{
                                    dispatch({type: 'FAILED', loginError: 'Incorrect credentials.'})
                                }
                            }
                        }
                        else{
                            dispatch({type: 'FAILED', loginError: 'Unknown error occurred.'})
                        }
                    }
                } catch (error) {
                    dispatch({type: 'FAILED', loginError: 'Unknown error occurred.'})
                }
                setApplying(false);
            },
            updateUserData: async data => {
                if(data){
                    dispatch({ type: 'UPDATE_DATA', userData: data});
                }
            }
        }),
        []
    );

    const [fontsLoaded] = useFonts({
        TTOctosquaresCondRegular: require('./assets/fonts/TTOctosquaresCond-Regular.otf'),
        TTOctosquaresCondBlack: require('./assets/fonts/TTOctosquaresCond-Black.otf'),
        TTOctosquaresCondBold: require('./assets/fonts/TTOctosquaresCond-Bold.otf'),
    });

    const [splashFinished, setSplashFinished] = React.useState(false);
    if (state.isLoading || !fontsLoaded || !splashFinished) {
        return <SplashScreen setSplashFinished={setSplashFinished}/>;
    }

  return (
      <SettingsProvider value={[settings, setSettings]}>
          <AuthProvider value={authContext}>
              <UserProvider value={[state.userData, state.userToken]}>
                  <SafeAreaProvider>
                      <NavigationContainer linking={linking}>
                          {state.userToken == null || state.userData == null ? (
                              <Stack.Navigator initialRouteName="Welcome" screenOptions={welcomeScreenOptions} >
                                  <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                                  <Stack.Screen name="Login">
                                      {(props) => <LoginScreen {...props} loginError={state.loginError} applying={applying}/>}
                                  </Stack.Screen>
                                  <Stack.Screen name="Signup">
                                      {(props) => <SignupScreen {...props} loginError={state.loginError} applying={applying}/>}
                                  </Stack.Screen>
                              </Stack.Navigator>
                          ) : (
                              <Tab.Navigator initialRouteName="Home" screenOptions={mainScreenOptions} >
                                  <Tab.Screen name="Home" >
                                      {(props) => <HomeScreen {...props} />}
                                  </Tab.Screen>
                                  <Tab.Screen name="Tournaments" >
                                      {(props) => <TournamentsScreen {...props} />}
                                  </Tab.Screen>
                                  <Tab.Screen name="Game" options={gameScreenOptions}>
                                      {(props) => <GameScreen {...props} />}
                                  </Tab.Screen>
                                  <Tab.Screen name="Live">
                                      {(props) => <LiveScreen {...props} />}
                                  </Tab.Screen>
                                  <Tab.Screen name="Profile">
                                      {(props) => <ProfileScreen {...props} />}
                                  </Tab.Screen>
                              </Tab.Navigator>
                          )}
                      </NavigationContainer>
                  </SafeAreaProvider>
              </UserProvider>
          </AuthProvider>
      </SettingsProvider>
  );
};


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;

    } else {
        //alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}


export default App;