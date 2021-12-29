import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {styles} from "./styles";




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


const WalletPreview = ({colors, onPress}) =>  {

    const total = 509.67;
    const pending = 22.18;

    return(
        <View style={[styles.blockWrap]}>
            <TouchableOpacity style={[styles.block, colors.bkgWhite]} onPress={() => onPress(tournament.id)}>
                <Text style={[styles.blockHeaderLeft,{textAlign: 'left', flex:1,}, styles.fontBold, colors.textBlack]}>AVAILABLE BALANCE</Text>
                <View style={[{flexDirection:'row',}]}>
                    <Text style={[thisStyles.wAmount, styles.fontBold, colors.textBlack]}>
                        ${total}
                    </Text>
                    {pending > 0 ? (
                        <Text style={[thisStyles.wAmountPending, styles.fontBold, colors.textGrey1]}>
                            (${pending} PENDING)
                        </Text>
                    ) : null}
                </View>
                <View style={[styles.buttonBar]}>
                    <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]}>
                        <Text style={[styles.buttonText, styles.fontBold]}>DEPOSIT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonFull, colors.bkgGreen1]}>
                        <Text style={[styles.buttonText, styles.fontBold]}>CASH OUT</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}



const thisStyles = StyleSheet.create({
    wAmount:{
        fontSize:30,
        marginLeft:30,
        marginVertical:20,
    },
    wAmountPending:{
        fontSize:22,
        marginLeft:15,
        marginVertical:20,
        lineHeight:34,
    },

});



export default WalletPreview;