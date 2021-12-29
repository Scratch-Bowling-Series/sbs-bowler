import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {styles} from "./styles";
import {TouchableOpacity} from "react-native-gesture-handler";




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


const SeasonStats = ({colors, tournament, onPress}) =>  {

    const winnings = 5125;
    const entryPaid = 2900;


    const BlockCounter = ({title, count, golden}) => {
        if(golden){
            return (
                <View style={[thisStyles.tBlockWrap]}>
                    <Text style={[thisStyles.tBlockTitle, styles.fontBold, colors.textBlack]}>RANK</Text>
                    <View style={[thisStyles.tBlock, colors.bkgGrey, {
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                    }, colors.borderTan]}>
                        <Text
                            style={[thisStyles.tBlockCount, styles.fontBold, colors.textGrey3, colors.textTan, {padding: 4,}]}>1st</Text>
                    </View>
                </View>)
        }else{
            return(
                <View style={[thisStyles.tBlockWrap]}>
                    <Text style={[thisStyles.tBlockTitle, styles.fontBold, colors.textBlack]}>{title}</Text>
                    <View style={[thisStyles.tBlock, colors.bkgGrey]}>
                        <Text style={[thisStyles.tBlockCount, styles.fontBold, colors.textGrey3]}>{count}</Text>
                    </View>
                </View>
            )
        }
    }

    const FinanceBottom = ({winnings, entryPaid}) => {
        const wstr = nFormatter(winnings, 1);
        const estr = nFormatter(entryPaid, 1);



        return (
            <View style={[thisStyles.tBottom]}>
                <Text style={[thisStyles.tPayout, styles.fontBold, colors.textBlack]}>
                    ENTRY PAID:&nbsp;
                    <Text style={[entryPaid > 0 ? {color:'#b64343'} : null]}>
                        ${estr}
                    </Text>
                </Text>
                <Text style={[thisStyles.tPayout, styles.fontBold, colors.textBlack]}>
                    TOTAL WINNINGS:&nbsp;
                    <Text style={[winnings > 0 ? {color:'#40af57'} : null]}>
                        ${wstr}
                    </Text>
                </Text>
            </View>
        );
    }


    if(!tournament){
        return null;
    }

    return(
        <View style={[styles.blockWrap]}>
            <TouchableOpacity style={[styles.block, colors.bkgWhite]} onPress={() => onPress(tournament.id)}>
                <Text style={[styles.blockHeader, styles.fontBold, colors.textBlack]}>2021 SEASON STATISTICS</Text>

                <View style={[thisStyles.tBlocks]}>
                    <BlockCounter title='RANK' count='1st' golden={true}/>
                    <BlockCounter title='GAMES' count='104'/>
                    <BlockCounter title='AVG SCORE' count='284.6'/>
                    <BlockCounter title='TOTAL' count='2704'/>
                </View>
                <View style={[thisStyles.tBlocks, {marginTop:0,}]}>
                    <BlockCounter title='ATTENDED' count='54' golden={false}/>
                    <BlockCounter title='QUALIFIED' count='29'/>
                    <BlockCounter title='WINS' count='12'/>
                    <BlockCounter title='LOSSES' count='12'/>
                </View>
                <FinanceBottom winnings={winnings} entryPaid={entryPaid}/>
            </TouchableOpacity>
        </View>
    );
}



const thisStyles = StyleSheet.create({
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
    tBlocks:{
        flexDirection:'row',
        paddingHorizontal:10,
        marginVertical:15,
        marginTop:20,
    },
    tBlock:{
        borderRadius:10,
    },
    tBlockTitle:{
        textAlign:'center',
        paddingBottom:5,
        fontSize:12,
    },
    tBlockCount:{
        textAlign:'center',
        padding:6,
        fontSize:16,
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



export default SeasonStats;