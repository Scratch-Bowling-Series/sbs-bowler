import {StyleSheet} from "react-native";

export const colorStylesLight = StyleSheet.create({
    bkgGreen1:{ backgroundColor: '#214031'},
    logoTint:{ tintColor: '#214031'},

    bkgWhite:{ backgroundColor: '#fff'},
    bkgGrey:{ backgroundColor: '#e0e0e0'},
    bkgGrey1:{ backgroundColor: '#e8e8e8'},
    bkgGrey2:{ backgroundColor: '#4d4d4d'},
    bkgGrey3:{ backgroundColor: '#e3e3e3'},
    bkgGrey4:{ backgroundColor: '#262626'},
    bkgGrey5:{ backgroundColor: '#1e1e1e'},
    bkgGrey6:{ backgroundColor: '#131313'},
    bkgRed:{ backgroundColor: '#ff4e4e'},
    bkgTan:{ backgroundColor: '#d9af62'},

    textWhite:{ color: '#fff'},
    textBlack:{ color: '#000'},
    textGrey:{ color: 'grey'},
    textGrey1:{ color: 'lightgrey'},
    textGrey2:{ color: 'grey'},
    textGrey3:{ color: '#565656'},
    textTan:{color:'#d9af62'},
    textRed:{ color: '#b64343'},
    textGreen:{ color: '#40af57'},

    borderBlack:{ borderColor: '#000'},
    borderWhite:{ borderColor: '#fff'},
    borderGrey:{ borderColor: '#e0e0e0'},
    borderTan:{ borderColor:'#d9af62'},

    bkgSilver:{ backgroundColor:'#d7d7d7'},
    bkgBronze:{ backgroundColor:'#c9752e'},
    borderBronze:{ borderColor:'#c9752e'},
    borderSilver:{ borderColor:'#d7d7d7'},
    shadowGrey:{shadowColor:'#b0b0b0',textShadowColor:'#b0b0b0'},
});
export const colorStylesDark = StyleSheet.create({
    bkgGreen1:{ backgroundColor: '#0a0a0a'},
    logoTint:{ tintColor: '#ffffff'},

    bkgWhite:{ backgroundColor: '#1e1e1e'},
    bkgGrey:{ backgroundColor: '#3d3d3d'},
    bkgGrey1:{ backgroundColor: '#000'},
    bkgGrey2:{ backgroundColor: '#4d4d4d'},
    bkgGrey3:{ backgroundColor: '#3a3a3a'},
    bkgGrey4:{ backgroundColor: '#262626'},
    bkgGrey5:{ backgroundColor: '#1e1e1e'},
    bkgGrey6:{ backgroundColor: '#131313'},
    bkgRed:{ backgroundColor: '#8c3333'},
    bkgTan:{ backgroundColor: '#d9af62'},

    textWhite:{ color: '#000'},
    textBlack:{ color: '#ffffff'},
    textTan:{color:'#d9af62'},
    textGrey:{ color: '#e8e8e8'},
    textGrey1:{ color: 'grey'},
    textGrey2:{ color: 'grey'},
    textGrey3:{ color: '#cecece'},
    textRed:{ color: '#b64343'},
    textGreen:{ color: '#40af57'},

    borderBlack:{ borderColor: '#383838'},
    borderWhite:{ borderColor: '#000'},
    borderGrey:{ borderColor: '#3d3d3d'},
    borderTan:{ borderColor:'#d9af62'},


    bkgSilver:{ backgroundColor:'#d7d7d7'},
    bkgBronze:{ backgroundColor:'#ad6c33'},
    borderBronze:{ borderColor:'#ad6c33'},
    borderSilver:{ borderColor:'#d7d7d7'},
    shadowGrey:{ shadowColor:'#3d3d3d', textShadowColor:'#3d3d3d'},
});
export const styles = StyleSheet.create({
    fontReg:{fontFamily: 'TTOctosquaresCondRegular',},
    fontBold:{fontFamily: 'TTOctosquaresCondBold',},


    safeAreaView:{
        flex: 1,
    },
    screenEmpty:{
        fontSize:30,
        fontFamily: 'TTOctosquaresCondBold',
        color:'lightgrey',
    },

    blockWrap:{

    },
    block:{
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    blockHeader:{
        fontSize: 20,
        marginTop:20,
        height:20,
        color: '#000',
        textAlign:'center',
    },
    blockHeaderLeft:{
        fontSize: 20,
        marginTop:20,
        marginLeft:25,
        height:20,
        color: '#000',
        textAlign:'left',
    },

    tabButton:{
    },
    tabButtonIcon:{
        textAlign:'center',
    },
    tabButtonText:{
        fontSize:10,
        textAlign:'center',
    },
    tabButtonCenter:{

        padding:10,
        paddingHorizontal:17,
        borderRadius:999,
    },
    tabButtonCenterIcon:{
        textAlign:'center',
    },
    tabButtonCenterText:{
        fontSize:10,
        textAlign:'center',
    },

    buttonBar:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingBottom:10,
    },
    button:{
        borderRadius: 15,
        marginHorizontal:10,
        marginBottom:10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonFull:{

        flex:1,
        borderRadius: 15,
        marginHorizontal:10,
        marginBottom:10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        textAlignVertical: 'center',
        paddingVertical:10,
        paddingHorizontal: 20,
    },
    signoutButton:{
        marginBottom:20,
        textAlign:'center',
    },
    signoutButtonText:{
        textAlign: 'center',
        paddingVertical:10,
        paddingHorizontal: 20,
        fontSize:18,
        fontFamily: 'TTOctosquaresCondRegular',
    },


    buttonList:{
        margin:5,
        borderRadius:10,
        height:30,
    },
    buttonListText:{
        color:'#fff',
        textAlignVertical:'center',
        lineHeight:30,
        paddingHorizontal:10,
        fontSize:15,
    },
    friendLoader:{
        height:40,
        width:40,
        fontSize:25,
        lineHeight:40,
        textAlign: 'center',
    },


    container:{
        flex: 1,
    },
    profileModify:{
        flex:1,
    },
    locationInputContainer:{
        marginHorizontal: 20,
        position:'relative',
        height:'auto',
        flex: 0,
        zIndex:200,
    },
    locationListView:{
        position:'absolute',
        top:'100%',
        right:0,left:0,
        borderRadius:15,
        overflow:'hidden',
    },
    locationListRow:{
        zIndex:200,
    },
    locationInput:{
        fontSize:18,
        borderWidth: 2,
        borderRadius: 15,
        marginVertical: 10,
        fontFamily: 'TTOctosquaresCondRegular',
        color: 'grey',
        padding:0,
        height: 'auto',
        paddingTop:4,
        paddingHorizontal: 5,
    },
    locationInputText:{
        margin:0,
        fontSize: 18,
        color: '#000',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondRegular',
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        height: 'auto',
        padding:0,
    },
    buttonLoader:{
        left:15,
        position:'absolute',
    },
    photoButton:{
        borderRadius: 15,
        marginVertical:10,
        marginHorizontal:20,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:2,
        borderColor: '#000',
    },
    profilePreviewTop:{
        flexDirection:'row',
        padding:10,
    },
    profilePreviewPicture:{
        margin:10,
        width:100,height:100,
        borderRadius:50,
        backgroundColor: '#e8e8e8',
    },
    profilePreviewDetails:{
        flex:1,
        margin:10,

    },
    profilePreviewName:{
        fontSize: 25,
        fontFamily: 'TTOctosquaresCondBold',
    },
    profilePreviewLocation:{
        fontSize: 16,
        padding:5,
        fontFamily: 'TTOctosquaresCondBold',
    },
    profilePreviewBio:{
        fontSize: 16,
        padding:5,
        fontFamily: 'TTOctosquaresCondBold',
    },
    profilePreviewButtonBar:{
        flexDirection: 'row',
        justifyContent: 'center',
        padding:10,
    },
    profileButton:{
        flex:1,
        borderRadius: 15,
        margin: 10,
        backgroundColor: '#214031',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileButtonText:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase',
        fontFamily: 'TTOctosquaresCondBold',
        textAlignVertical: 'center',
        paddingVertical:10,
        paddingHorizontal: 20,
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

    modalHeader:{
        height:65,
        flexDirection:'row',
        overflow:'hidden',
    },
    modalHeaderText:{
        height:30,
        flex:1,
        fontSize:30,
        marginVertical:22.5,
        paddingHorizontal:22.5,
        lineHeight:30,
    },
    modalHeaderButton:{
        height:65,
        width:65,
        justifyContent:'center',
        textAlign:'center',
    },
    modalHeaderButtonText:{
        flex:1,
        padding:16.5,
    },

    helpModal:{

    },
    helpHeader:{
        flexDirection: 'row',
        height:65,
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
        paddingVertical:20,
        paddingLeft:20,
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
    profileInput:{
        fontSize:18,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 15,
        margin: 10,
        marginHorizontal:20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontFamily: 'TTOctosquaresCondRegular',
        color: 'grey'
    },

    listEmpty:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:100,
    },
    listEmptyText:{
        fontSize:20,
        maxWidth:'50%',
        color:'#e8e8e8',
        textAlign:'center',
        paddingVertical:10,
    },
    listEmptyIcon:{
        fontSize:80,
        color:'#e8e8e8',
    },


    settingsItems:{
        flex:1,
    },
    settingsItem:{
        flexDirection: 'row',
    },
    settingsItemName:{
        flex:1,
        margin:20,
        fontSize: 17,
        padding:5,
        fontFamily: 'TTOctosquaresCondBold',
    },
    settingsSwitch:{
        margin:20,
        alignSelf: 'flex-end',
    },
    settingsVersion:{
        fontSize:14,
        color: 'grey',
        fontFamily: 'TTOctosquaresCondRegular',
        textAlign: 'center',
        alignSelf:'flex-end',
        width: '100%',
    },
    settingsWeb:{
        paddingVertical:5,
        fontSize:12,
        color: 'grey',
        fontFamily: 'TTOctosquaresCondRegular',
        textAlign: 'center',
        alignSelf:'flex-end',
        width: '100%',
    },
    settingsSignOut:{
        textAlign: 'center',
        marginBottom:20,
    },
    settingsSignOutText:{
        textAlign: 'center',
        paddingVertical:10,
        paddingHorizontal: 20,
        fontSize:18,
        fontFamily: 'TTOctosquaresCondRegular',
    },




    loginError:{
        color: 'red',
        paddingHorizontal:10,
        textTransform: 'capitalize',
    },




});