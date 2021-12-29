import React from 'react';
import {StyleSheet, Text, View, Image} from "react-native";
import {styles} from "./styles";
import {TouchableOpacity} from "react-native-gesture-handler";
import starburst from '../assets/starburst.png'
import defaultProfilePicture from '../assets/profile-default.png'
import Ionicons from "react-native-vector-icons/Ionicons";


function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup.slice().reverse().find(function(item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}


const LeaderboardPreview = ({colors, tournament, onPress}) =>  {

    const rankings = [{'first_name': 'Christian','last_name': 'Starr',},
                    {'first_name': 'Daniel','last_name': 'Higgins',},
                    {'first_name': 'Brian','last_name': 'Regan',},
                    {'first_name': 'Randy','last_name': 'Smith',},
                    {'first_name': 'Aaron','last_name': 'Micheal',},
                    {'first_name': 'Evan','last_name': 'Canola',},
                    {'first_name': 'Mike','last_name': 'Johnson',}]





    if(!rankings){
        return null;
    }

    return(
        <View style={[styles.blockWrap]}>
            <TouchableOpacity style={[styles.block, colors.bkgWhite]} onPress={() => onPress(tournament.id)}>
                <Text style={[styles.blockHeader, styles.fontBold, colors.textBlack]}>2021 SEASON RANKINGS</Text>
                <View style={[thisStyles.rBlocks]}>
                    <View style={[thisStyles.starburstWrap]}>
                        <Image style={[thisStyles.starburst]} source={starburst}/>
                    </View>
                    <View style={[thisStyles.rBlockWrap]}>
                        <Ionicons style={[thisStyles.rBlockCarrot, colors.textGreen]} name='triangle'/>
                        <View style={[thisStyles.rBlock, colors.borderSilver, colors.shadowGrey]}>
                            <View style={[thisStyles.rBlockPictureWrap]}>
                                <Image style={[thisStyles.rBlockPicture]} source={defaultProfilePicture}/>
                            </View>
                            <View style={[thisStyles.rBlockCountWrap]}>
                                <View style={[thisStyles.rBlockCount, colors.bkgSilver]}>
                                    <Text style={[thisStyles.rBlockCountText, styles.fontBold]}>2</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[thisStyles.rBlockWrap, {flex:3,}]}>
                        <Ionicons style={[thisStyles.rBlockCarrotCenter, colors.textTan, colors.shadowGrey]} name='medal'/>
                        <View style={[thisStyles.rBlock, colors.borderTan, colors.shadowGrey]}>
                            <View style={[thisStyles.rBlockPictureWrap]}>
                                <Image style={[thisStyles.rBlockPicture]} source={defaultProfilePicture}/>
                            </View>
                            <View style={[thisStyles.rBlockCountWrap]}>
                                <View style={[thisStyles.rBlockCount, colors.bkgTan]}>
                                    <Text style={[thisStyles.rBlockCountText, styles.fontBold]}>1</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[thisStyles.rBlockWrap]}>
                        <Ionicons style={[thisStyles.rBlockCarrot, colors.textRed, {transform: [{ rotate: '180deg'}]}]} name='triangle'/>
                        <View style={[thisStyles.rBlock, colors.borderBronze, colors.shadowGrey]}>
                            <View style={[thisStyles.rBlockPictureWrap]}>
                                <Image style={[thisStyles.rBlockPicture]} source={defaultProfilePicture}/>
                            </View>
                            <View style={[thisStyles.rBlockCountWrap]}>
                                <View style={[thisStyles.rBlockCount, colors.bkgBronze]}>
                                    <Text style={[thisStyles.rBlockCountText, styles.fontBold]}>3</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[thisStyles.rNames]}>
                    <Text style={[thisStyles.rName, styles.fontBold, colors.textBlack]}>{rankings[1].first_name} {rankings[1].last_name}</Text>
                    <Text style={[thisStyles.rName, styles.fontBold, colors.textBlack, {flex:3,fontSize:14,}]}>{rankings[0].first_name} {rankings[0].last_name}</Text>
                    <Text style={[thisStyles.rName, styles.fontBold, colors.textBlack]}>{rankings[2].first_name} {rankings[2].last_name}</Text>
                </View>
                <View style={[thisStyles.rRows]}>
                    <View style={[thisStyles.rRow, colors.borderGrey]}>
                        <Text style={[thisStyles.rRowName, colors.textBlack, styles.fontBold]}>{rankings[3].first_name} {rankings[3].last_name}</Text>
                        <Text style={[thisStyles.rRowRank, colors.textBlack, styles.fontBold]}>4th</Text>
                        <Ionicons style={[thisStyles.rRowCarrot, colors.textGreen]} name='triangle'/>
                    </View>
                    <View style={[thisStyles.rRow, colors.borderGrey]}>
                        <Text style={[thisStyles.rRowName, colors.textBlack, styles.fontBold]}>{rankings[4].first_name} {rankings[4].last_name}</Text>
                        <Text style={[thisStyles.rRowRank, colors.textBlack, styles.fontBold]}>5th</Text>
                        <Ionicons style={[thisStyles.rRowCarrot, colors.textRed, {transform: [{ rotate: '180deg'}]}]} name='triangle'/>
                    </View>
                    <View style={[thisStyles.rRow, colors.borderGrey]}>
                        <Text style={[thisStyles.rRowName, colors.textBlack, styles.fontBold]}>{rankings[5].first_name} {rankings[5].last_name}</Text>
                        <Text style={[thisStyles.rRowRank, colors.textBlack, styles.fontBold]}>6th</Text>
                        <Ionicons style={[thisStyles.rRowCarrot, colors.textRed, {transform: [{ rotate: '180deg'}]}]} name='triangle'/>
                    </View>
                    <View style={[thisStyles.rRow, colors.borderGrey, {borderBottomWidth: 0,}]}>
                        <Text style={[thisStyles.rRowName, colors.textBlack, styles.fontBold]}>{rankings[6].first_name} {rankings[6].last_name}</Text>
                        <Text style={[thisStyles.rRowRank, colors.textBlack, styles.fontBold]}>7th</Text>
                        <Ionicons style={[thisStyles.rRowCarrot, colors.textGreen]} name='triangle'/>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}



const thisStyles = StyleSheet.create({
    rRows:{
        marginHorizontal:20,
        marginBottom:20,
    },
    rRow:{
        flex:1,
        borderBottomWidth:1,
        flexDirection:'row',
        height:38,
    },
    rRowName:{
        flex:1,
        color:'#fff',
        paddingLeft:5,
        fontSize:15,
        lineHeight:15,
        marginVertical:12.5,
    },
    rRowRank:{
        color:'#fff',
        paddingRight:5,
        fontSize:15,
        lineHeight:15,
        marginVertical:12.5,
    },
    rRowCarrot:{
        color:'#368d23',
        fontSize:10,
        width:10,
        height:10,
        textAlign:'center',
        marginVertical:15,
        marginHorizontal:5,
    },





    tTop:{
        flexDirection:'row',
        paddingHorizontal:25,
        paddingTop:20,
    },
    tName:{
        flex:1,
        fontSize:17,
        lineHeight:20,
    },
    tDate:{
        fontSize:14,
        lineHeight:20,
    },
    tBlockWrap:{
        flex:1,
        paddingHorizontal:10,
    },
    rBlocks:{
        flexDirection:'row',
        paddingHorizontal:40,
        marginTop:20,
        alignItems:'flex-end',
        position:'relative',
    },

    starburstWrap:{
        position:'absolute',
        right:0,left:0,top:-20,bottom:-20,
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
    },
    starburst:{
        flex:1,
        resizeMode:'contain',
        justifyContent:'center',
        opacity:0.2,
        alignItems:'center',
        alignSelf:'center',
        top:0,right:0,left:0,bottom:0,
    },
    rBlockWrap:{
        zIndex:2,
        flex:2,
        aspectRatio:1,
        margin:10,
        marginTop:0,
        position:'relative',
        justifyContent:'center',
        alignItems:'center',
    },
    rBlockCarrot:{
        color:'#368d23',
        fontSize:10,
        width:10,
        height:10,
        marginHorizontal:5,
        textAlign:'center',
        marginBottom:10,
    },
    rBlockCarrotCenter:{
        color:'#368d23',
        fontSize:20,
        width:20,
        height:20,
        marginHorizontal:5,
        textAlign:'center',
        marginBottom:10,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 2,
    },
    rBlock:{
        aspectRatio:1,
        borderRadius:999,
        borderWidth:3,
        borderColor:'grey',
        flex:1,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    rBlockPictureWrap:{
        flex:1,
        overflow:"hidden",
        borderRadius:999,
    },
    rBlockPicture:{
        width:'100%',
        height:undefined,
        aspectRatio:1,
        backgroundColor:'red',
        resizeMode:'cover',
        borderRadius:999,
    },
    rBlockCountWrap:{
        position:'absolute',
        bottom:-10,
        right:0,left:0,
        justifyContent:'center',
        alignItems:'center',
    },
    rBlockCount:{
        width:20,
        height:20,
        borderRadius:20/2,
        backgroundColor:'grey',
    },
    rBlockCountText:{
        textAlign:'center',
        padding:6,
        fontSize:12,
        lineHeight:12,
        width:20,
        color:'#000',
    },
    tBlockTitle:{
        textAlign:'center',
        paddingBottom:5,
        fontSize:12,
    },

    rNames:{
        flex:1,
        marginTop:10,
        marginBottom:20,
        paddingHorizontal:40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    rName:{
        flex:2,
        marginHorizontal:5,
        textAlign:'center',
        fontSize:12,
        lineHeight:14,
    },



    tBottom:{
        flexDirection:'row',
        paddingHorizontal:20,
        paddingBottom:15,
        justifyContent:'center',
    },
    tPayout:{
        padding:5,
        marginHorizontal:5,
        fontSize:14,
        textAlign:'center',
    },

});



export default LeaderboardPreview;