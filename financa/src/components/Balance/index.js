import React,{useState} from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';

export default function Balance({saldo,gastos,showVisible}) {
 return (
    <>
   <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.itemTitle}>Entradas</Text>
                <View style={styles.content}>
                {showVisible ? <><Text style={styles.currencySymbol}>R$</Text>
                <Text style={styles.balance}>{saldo === undefined ? "R$0,00" : saldo}</Text></> : <View style={styles.skeleton}/>}
                
            </View>    
        </View>
    {/* despesa */}

        <View style={styles.item}>
            <Text style={styles.itemTitle}>Saidas</Text>
                <View style={styles.content}>
                    {showVisible ? 
                    <>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.expense}>{gastos === undefined ? "R$0,00" : gastos}</Text></> : <View style={styles.skeleton}/>}
                    
                </View>
        </View>
   </View>
   </>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        flexDirection:"row",
        justifyContent:"space-between", 
        paddingStart: 18,
        paddingEnd:18,
        marginTop:-20,
        marginStart:14,
        marginEnd:14,
        borderRadius:7,
        paddingTop:22,
        paddingBottom:22,   
        zIndex:99
    },
    itemTitle:{
        fontSize:20,
        color:"#707070",
    },
    content:{
        flexDirection:"row",
        alignItems:"center"
    },
    currencySymbol:{
        color:"#505050",
        marginRight:6,    
    },
    balance:{
        fontSize:22,
        color:"green"
    },
    expense:{
        fontSize:22,
        color:"red"
    },
    item:{
        flexDirection:"column"
    },
    skeleton:{
        marginTop:6,
        width:90,
        height:15,
        backgroundColor:"#dadada",
        borderRadius:8,
    },
})