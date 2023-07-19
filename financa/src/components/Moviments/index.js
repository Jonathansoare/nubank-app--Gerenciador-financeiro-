import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Details from '../../pages/Details';

export default function Moviments({data,showValue}) {
    const navigation = useNavigation()

    const abrirDetalhesMovimentacao = (movimentacao) => {
        <Details data={data}/>
      };

 return (
   <TouchableOpacity style={styles.container}>
    <Text style={styles.date}>{data.data}</Text>

         <View style={styles.content}>
             <View style={styles.containerLabel}>
                 <View style={styles.icons}>
                     {data.type === 1 ?
                         <MaterialCommunityIcons name="cash-plus" size={34} color="#2ecc71"/>
                         :
                         <MaterialCommunityIcons name="cash-minus" size={34} color="#e74c3c"/>}
                 </View>
                 
                <Text style={styles.label}>{data.label}</Text>
             </View>
       {showValue ? (
         <Text style={data.type === 0 ? styles.expense : styles.value}>
         {data.type === 1 ? `R$ ${(data.value).toFixed(2)}` : `R$ -${(data.value).toFixed(2)}`}
         </Text>
       ) : <View style={styles.skeleton}/>}
    </View>
   </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container:{
        marginBottom:10,
        borderRadius:20,
        backgroundColor:"#fff",
        padding:10,
    },
    content:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 5,
    },
    date:{
        color:"#707070",
        fontWeight: "bold",
        marginLeft:5
    },
    label:{
        fontWeight:"bold",
        fontSize: 18,
        marginLeft: 5,
    },
    value:{
        fontSize:16,
        color:"#2ecc71",
        fontWeight: "bold",
        marginTop:15
    },
    expense:{
        fontSize:16,
        color:"#e74c3c",
        fontWeight: "bold",
        marginTop:15
    },
    skeleton:{
        marginTop:17,
        width:80,
        height:10,
        backgroundColor:"#dadada",
        borderRadius:8,
    },
    containerLabel: {
        flexDirection: "row",
        alignItems: "center",
    },
    icons: {
        width: 50,
        height:50,
        backgroundColor: "#f1f1f1",
        borderRadius: 50 / 2,
        alignItems: "center",
        justifyContent:"center"
    }
})