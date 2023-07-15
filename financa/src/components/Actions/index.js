import React from 'react';
import { View,Text,StyleSheet,ScrollView,TouchableOpacity } from 'react-native';
import {AntDesign} from "@expo/vector-icons"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";



export default function Actions() {
    const navigation = useNavigation()
 return (
   <ScrollView horizontal={true} showsHorizontalScrollIndicator={false } style={styles.container}>

    <TouchableOpacity style={styles.Actionsbutton} onPress={() => navigation.navigate('Deposit')}>
        <View style={styles.areaButton}>
            <MaterialCommunityIcons name="cash-plus" size={30} color="#000" />
        </View>
        <Text style={styles.labelButton}>Entrada</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Actionsbutton} onPress={() => navigation.navigate("Retire")}>
        <View style={styles.areaButton}>
            <MaterialCommunityIcons name="cash-minus" size={30} color="#000" />
        </View>
        <Text style={styles.labelButton}>Saida</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Actionsbutton}>
        <View style={styles.areaButton}>
            <AntDesign name='addfolder' size={30} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Entradas</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Actionsbutton}>        
        <View style={styles.areaButton}>
            <AntDesign name='tagso' size={30} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Compras</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Actionsbutton}>       
        <View style={styles.areaButton}>
            <AntDesign name='creditcard' size={30} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Carteira</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Actionsbutton}>
        <View style={styles.areaButton}>
            <AntDesign name='barcode' size={30} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Boleto</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.Actionsbutton}>
        <View style={styles.areaButton}>
            <AntDesign name='setting' size={30} color="#000"/>
        </View>
        <Text style={styles.labelButton}>Conta</Text>
    </TouchableOpacity>

   </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
        maxHeight:100,
         marginBottom:14,
         marginTop:18,
         marginEnd:14,
         marginStart:14,
    },
    Actionsbutton:{
        alignItems:"center",
        marginRight:32,
    },
    areaButton:{
        backgroundColor:"#ecf0f1",
        height:60,
        width:60,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30
    },
    labelButton:{
        marginTop:4,
        textAlign:"center",
        fontWeight:"bold",
        fontSize:16
    }
})