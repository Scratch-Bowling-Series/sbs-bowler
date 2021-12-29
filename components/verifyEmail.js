import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {styles} from "./styles";
import {TouchableOpacity} from "react-native-gesture-handler";







const VerifyEmail = ({colors, visible, onRequestToResend}) =>  {
    const [resend, setResend] = React.useState(false);
    const [confirmResend, setConfirmResend] = React.useState(false);

    const resendEmail = () => {
        console.log('Resend Email.')
        if(!resend && confirmResend){
            onRequestToResend();
            setResend(true);
            setConfirmResend(false);
            setTimeout(() => {
                setResend(false);
            }, 5000);
        }
    }

    if(!visible){
        return null;
    }

    if(!resend && !confirmResend){
        return(
            <TouchableOpacity style={[styles.block, colors.bkgWhite]} onPress={() => setConfirmResend(true)}>
                <Text style={[thisStyles.topNotifyText, styles.fontBold, colors.textBlack]}>
                    We've sent a verification link to the email provided.
                    <Text style={[colors.textTan]} >
                        &nbsp;Tap here to resend it.
                    </Text>
                </Text>
            </TouchableOpacity>

        );
    }
    else if (confirmResend){
        return(
            <View style={[styles.block, colors.bkgWhite, {flexDirection:'row',}]}>
                <Text style={[thisStyles.topNotifyText, styles.fontBold, colors.textBlack]}>
                    Are you sure?
                </Text>
                <TouchableOpacity  style={[thisStyles.topNotifyButton, colors.bkgGreen1]}
                                   onPress={() => {resendEmail();}}>
                    <Text style={[thisStyles.topNotifyButtonText, styles.fontBold]}>
                        CONFIRM
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity  style={[thisStyles.topNotifyButton, colors.bkgGreen1]}
                            onPress={() => {setConfirmResend(false);}}>
                    <Text style={[thisStyles.topNotifyButtonText, styles.fontBold]}>
                        CANCEL
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    else if (resend){
        return(
            <View style={[styles.block, colors.bkgWhite]}>
                <Text style={[thisStyles.topNotifyText, styles.fontBold, colors.textBlack]}>
                    We've resent the verification link to the email provided.
                </Text>
            </View>
        );
    }
}



const thisStyles = StyleSheet.create({
    topNotifyText:{
        fontSize:16,
        padding:20,
        textAlign:'center',
        flex:1,
    },
    topNotifyButton:{
        margin:10,
        borderRadius:10,
        paddingVertical:10,
        paddingHorizontal:15,
        marginLeft:0,
    },
    topNotifyButtonText:{

        color:'#fff'
    },

});



export default VerifyEmail;