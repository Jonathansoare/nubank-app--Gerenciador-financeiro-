import React, { useState } from 'react';
import { View,Text,StyleSheet,StatusBar,TouchableOpacity } from 'react-native';
import {Feather} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";

const statusBarHeigth = StatusBar.currentHeigh ? StatusBar.currentHeight + 22 : 64; 

export default function Header({saldo,ToggleShowVisible,showVisible}) {
    const [showValue,setShowValue] = useState(false)
    const navigation = useNavigation()

 return (
   <View style={styles.container}>
    <View style={styles.content}>
        <View>
            <Text style={styles.textBalenceTitle}>Saldo</Text>
            {showVisible ? <>
            <Text style={saldo < 0 ? styles.espense : styles.textBalence }>{saldo === "NaN" ? "R$0,00" : `R$${saldo}`}</Text>
            </> : <View style={styles.skeleton}/>}
        </View>
        <TouchableOpacity style={{marginLeft:'-45%'}} onPress={ToggleShowVisible}>
            { 
            showVisible ? 
                <Feather name="eye" size={24} color="white"/>
            :
                <Feather name="eye-off" size={24} color="white" />
        }
            
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} style={styles.buttonUser} onPress={() => navigation.navigate("Perfil")}>
            <Feather name='user' size={24} color='#fff'/>
        </TouchableOpacity>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#820ad1',
        paddingTop:statusBarHeigth,
        flexDirection:'row',
        paddingStart:16,
        paddingEnd:16,
        paddingBottom:44,
    },
    content:{
        flex:1,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
    },
    buttonUser:{
        width:44,
        height:44,
        backgroundColor:"rgba(255,255,255,0.5)",
        alignItems:"center",
        justifyContent:"center",
        borderRadius:44 / 2
    },
    textBalence:{
        fontSize:32,
        color:"#fff",
        position:"relative"
    },
    textBalenceTitle:{
        fontSize:20,
        color:"#fff",
    },
    espense:{
        fontSize:32,
        color:"red",
    },
    skeleton:{
        marginTop:5,
        width:90,
        height:17,
        backgroundColor:"#dadada",
        borderRadius:8,
    },
})