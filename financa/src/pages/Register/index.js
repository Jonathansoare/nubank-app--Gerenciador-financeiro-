import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../assets/api/api';
import axios from 'axios';

export default function Register() {
    const navigation = useNavigation()
    const [name, setName] = useState()
    const [email,setEmail] = useState()
    const [password, setPassword] = useState()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const[check,setIsCheck] = useState(true)
    const [IconName, setIconName] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [msgErro,setMsgErro] = useState()
    
    function validationInput() {      
        var emailPattern =  /^[_A-z0-9-]+(\.[_A-z0-9-]+)*@[A-z0-9-]+(\.[A-z0-9-]+)*(\.[A-z]{3})$/;
        var resul  = emailPattern.test(email);   

        if (!email) {
            setButtonDisabled(true)
        }
        else if (!name) {
            setButtonDisabled(true)
        }
        else if (!password) {
            setButtonDisabled(true)
        }
        else {
            if (resul !== true){
                setButtonDisabled(true)
                setMsgErro("Email invalido.")
                setTimeout(() => {
                    setMsgErro()
                },1000)
            }
            else if(password.length < 8){
                setMsgErro("A senha teve ter no minimo 8 digitos.")
                setButtonDisabled(true)
            }
            else{
                setButtonDisabled(false)
            }
        }
    }

    function cadastro(){
        setIsLoading(true)
        axios.post(`${api}/cadastrar`,{
            email,
            name,
            password
        }).then((res) => {
            navigation.navigate("Login")
        }).catch((e) => {
            setMsgErro("Usuario ja cadastrado")
            setIsLoading(false)
            setTimeout(() => {
                setMsgErro(' ')
            },1000)
        })
    }

    function toggle(){
        if(check === false){
            setIsCheck(true)
            setIconName('')
        }
        else{

            setIsCheck(false)
            setIconName('check-bold')
            
        }
}

    useEffect(() => {
        validationInput()
    },[email,name,password])
 return (
     <SafeAreaView style={styles.container}>
         <View style={styles.content}>
             <Text style={styles.textTitle}>Faça seu cadastro</Text>

             <View style={styles.contentInput}>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                 </View>
                 
                <View style={styles.containerInput}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail}/>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Senha</Text>
                     <TextInput style={styles.input} secureTextEntry={check} value={password} onChangeText={setPassword}/>
                </View>
            </View>
            <Text style={styles.msgErro}>{msgErro}</Text>
            <View style={styles.containerCheckBox}>
                    <View style={styles.optionContainerCheckBox}>
                            <TouchableOpacity 
                            style={styles.touchable}
                            onPress={() => toggle()}>
                                <MaterialCommunityIcons name={IconName} size={26} color={IconName !== '' ? '#820ad1' : 'white'} />
                            </TouchableOpacity>
                            <Text style={styles.titleCheckBox}>Mostra senha</Text>
                    </View>
                </View>  
            
            
             <TouchableOpacity style={!buttonDisabled ? styles.button : styles.buttonOff}
                onPress={() => cadastro()} disabled={buttonDisabled}>
                    {!isLoading ? 
                        <Text style={styles.textButton}>Cadastrar</Text>
                    :
                        <ActivityIndicator color={"white"} size={30} style={styles.spinner}/>
                    }
             </TouchableOpacity>
            </View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#820ad1"
    },
    content: {
        backgroundColor: "#f1f1f1",
        width: '90%',
        height: 550,
        borderRadius: 30,
    },
    textTitle: {
        fontSize:30,
        marginTop: 10,
        textAlign:"center"
    },
    containerInput: {
        width: "75%",
        justifyContent: "center",
        marginTop:10
    },
    input: {
        backgroundColor: "#dadada",
        height:40,
        marginTop: 5,
        fontSize: 20,
        width: '100%',
        paddingLeft: 10,
        borderRadius:20,
    },
    label: {
        fontSize: 20,
        marginTop:10
    },
    contentInput: {
        marginTop: '10%',
        justifyContent: "center",
        alignItems:"center",
        width:'100%'
    },
    buttonOff: {
        marginTop: 30,
        backgroundColor: "#820ad1",
        height: 50,
        width:'75%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        opacity:0.5,
        alignSelf:"center"
    },
    button: {
        marginTop: 30,
        backgroundColor: "#820ad1",
        height: 50,
        width:'75%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius:30,
        alignSelf:"center"
    },
    textButton: {
        color: "white",
        fontSize:24
    },
    textButtom: {
        color: "#820ad1",
        fontSize: 23,
        marginTop:20
    },
    containerCheckBox:{
        marginTop:20,
        marginLeft:'13%',
    },
    touchable:{
        height:30,
        width:30,
        borderRadius:4,
        backgroundColor:"#dadada",
        justifyContent:'center',
        alignItems:"center"
    },
    optionContainerCheckBox:{
        flexDirection:"row",
        alignItems:"center",
    },
    titleCheckBox:{
        marginLeft:10,
        color:"black",
        fontSize:16,
        fontWeight:'600',
    },
    msgErro:{
        color:"red",
        marginLeft:56,
        marginTop:5
    },
})