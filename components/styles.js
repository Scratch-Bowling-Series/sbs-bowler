import {StyleSheet} from "react-native";

export const colorStylesLight = StyleSheet.create({
    bkgGreen1:{ backgroundColor: '#214031'},
    logoTint:{ tintColor: '#214031'},

    bkgWhite:{ backgroundColor: '#fff'},
    bkgGrey1:{ backgroundColor: '#e8e8e8'},
    bkgGrey2:{ backgroundColor: '#4d4d4d'},
    bkgGrey3:{ backgroundColor: '#e3e3e3'},
    bkgGrey4:{ backgroundColor: '#262626'},
    bkgGrey5:{ backgroundColor: '#1e1e1e'},
    bkgGrey6:{ backgroundColor: '#131313'},

    textWhite:{ color: '#fff'},
    textBlack:{ color: '#000'},
    textGrey:{ color: 'grey'},
    textGrey1:{ color: 'lightgrey'},

    borderBlack:{ borderColor: '#000'},
    borderWhite:{ borderColor: '#fff'},
    borderGrey:{ borderColor: '#e0e0e0'}
});
export const colorStylesDark = StyleSheet.create({
    bkgGreen1:{ backgroundColor: '#0a0a0a'},
    logoTint:{ tintColor: '#ffffff'},

    bkgWhite:{ backgroundColor: '#1e1e1e'},
    bkgGrey1:{ backgroundColor: '#000'},
    bkgGrey2:{ backgroundColor: '#4d4d4d'},
    bkgGrey3:{ backgroundColor: '#3a3a3a'},
    bkgGrey4:{ backgroundColor: '#262626'},
    bkgGrey5:{ backgroundColor: '#1e1e1e'},
    bkgGrey6:{ backgroundColor: '#131313'},

    textWhite:{ color: '#000'},
    textBlack:{ color: '#ffffff'},
    textGrey:{ color: '#e8e8e8'},
    textGrey1:{ color: 'grey'},

    borderBlack:{ borderColor: '#383838'},
    borderWhite:{ borderColor: '#000'},
    borderGrey:{ borderColor: '#3d3d3d'}
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
    block:{
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    blockHeader:{
        fontSize: 20,
        marginLeft:20,
        marginTop:20,
        height:20,
        color: '#000',
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
        backgroundColor: '#214031',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonFull:{
        flex:1,
        borderRadius: 15,
        marginHorizontal:10,
        marginBottom:10,
        backgroundColor: '#214031',
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

    nav:{
        flex:2
    },
    headerWrap:{
        height:65,
        paddingTop: 0,
    },
    header:{
        height:65,
        backgroundColor: '#214031',
        position: 'relative',
    },
    headerLogo:{
        position: 'absolute',
        height:50,
        width: 95,
        top:7.5,
        left:85,
        tintColor: '#214031',
    },
    headerLines:{
        height:65,
        width: 269,
        left:0,
        position: "absolute",
        top: 0,
    },
    profile:{
        height:40,
        width:40,
        borderRadius: 20,
        position: 'absolute',
        right: 12.5,
        top: 12.5,
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
        paddingVertical:10,
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
    },
    listEmptyIcon:{
        fontSize:80,
        color:'#e8e8e8',
    },


});