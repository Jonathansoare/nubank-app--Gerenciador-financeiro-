import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,ActivityIndicator} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import api from "../../assets/api/api"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function Login() {
    AsyncStorage.getItem('tokenUser').then((res) => setToken(res))
    const [token,setToken] = useState(null)
    const navigation = useNavigation()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const[check,setIsCheck] = useState(true)
    const [IconName, setIconName] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const [msgErro,setMsgErro] = useState(' ')

    function validationInput() {
        if (!email) {
            setButtonDisabled(true)
        }
        if (!password) {
            setButtonDisabled(true)
        }      
        else {
            setButtonDisabled(false)
        }
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
    function login(){
        setIsLoading(true)
       axios.post(`${api}/login`,{
        email,
        password,
       })
       .then((res) => {
            if(res.data.erro !== 'false'){
                const user = res.data
                const id = user.id
                const token = user.token
                AsyncStorage.setItem("IdUser",String(id))
                AsyncStorage.setItem("tokenUser",token)
                navigation.replace("AtionRouter")
                setIsLoading(false)
            }
            else{
                console.log("senha ou email invalido");
            }
       })
       .catch((e) => {
        console.log("ERRO LOGIN: "+e);
        setMsgErro("Usuario ou senha invalido.")
        setIsLoading(false)
        setTimeout(() => {
            setMsgErro(' ')
        }, 1000);

       })
    }
    useEffect(() => {
        validationInput()
    })
 return (
     <SafeAreaView style={styles.container}>
         <View style={styles.content}>
             <Text style={styles.textTitle}>Faça seu login</Text>

             <View style={styles.contentInput}>
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
                onPress={() => login()} disabled={buttonDisabled}>
                    {!isLoading ? 
                        <Text style={styles.textButton}>Login</Text>
                    :
                        <ActivityIndicator color={"white"} size={30} style={styles.spinner}/>
                    }
             </TouchableOpacity>

             <TouchableOpacity style={styles.textcreateUSerA}
                onPress={() =>  navigation.navigate('Register')}>
                 <Text style={styles.textButtom}>Criar nova conta</Text>
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
        borderRadius: 10,
    },
    textTitle: {
        fontSize:30,
        marginTop:10,
        textAlign:"center"
    },
    containerInput: {
        width: "75%",
        justifyContent: "center",
        marginTop:10,
        alignSelf:"center"
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
        marginTop: '20%',
        justifyContent: "center",
        alignItems:"center",
        width:'100%'
    },
    button: {
        marginTop: 20,
        backgroundColor: "#820ad1",
        height: 50,
        width:'75%',
        alignItems: "center",
        justifyContent: "center",
        borderRadius:30,
        alignSelf:"center",
        flexDirection:"row"
    },
    buttonOff: {
        marginTop: 20,
        backgroundColor: "#820ad1",
        height: 50,
        width:'75%',
        alignItems: "center",
        justifyContent: "center",
        opacity:0.5,
        borderRadius:30,
        alignSelf:"center",
        flexDirection:"row",
    },
    textButton: {
        color: "white",
        fontSize:24
    },
    textButtom: {
        color: "#820ad1",
        fontSize: 23,
        marginTop:20,
        alignSelf:"center"
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
    }
})