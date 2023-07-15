import React, { useEffect, useState } from 'react';
import { View,Text,
    TextInput,StyleSheet,
    SafeAreaView, TouchableOpacity,
    Modal }
    from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DeleteUserModal from '../../components/Modal/DeleteUserModal';
import ConfirmDeleteUserModal from '../../components/Modal/ConfirmDeleteUser';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import api from '../../assets/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function Perfil() {
    const navigation = useNavigation()
    AsyncStorage.getItem('tokenUser').then((res) => setToken(res))
    AsyncStorage.getItem('IdUser').then((res) => setId(res))
    const [isModalVisible,setisModalVisible] = useState(false);
    const [isModalConfirDelete,setIsConfirmDelete] = useState(false)
    const [chooseData,setChooseData] = useState()
    const [chooseDataDelete,setChooseDataDelete] = useState()
    const [isLoading,setIsLoading] = useState(false)
    const [id,setId] = useState()
    const [token,setToken] = useState()
    const [email,setEmail] = useState()
    const [name,setName] = useState()
    const [editable,setEditable] = useState(false)
    const [msg,setMsg] = useState()
    const [msgErro,setMsgErro] = useState()

    const changeModalVisible = (bool) => {
        setisModalVisible(bool)
    }
    const changeModalConfirDelete = (bool) => {
        setIsConfirmDelete(bool)
    }

    const setData = (data) => { 
        setChooseData(data)
        if(data === "delete"){
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setisModalVisible(false)
                changeModalConfirDelete(true)
                deleteUser()
            },2000)
        }
    }
    const setDataConfirDelete = (data) => {
        setChooseDataDelete(data)
        if(data === "back"){
            setIsLoading(true)
            setTimeout(() => {
                navigation.replace("Login")
            }, 1000);
        }
    }

    async function getUser(){
        setIsLoading(true)
        const user = axios.get(`${api}/getUser/${id}`,{
            headers: { 'Authorization': `Bearer ${token}`}
        }).then(res => {
            const email = res.data.email
            const nome = res.data.name
            setEmail(email)
            setName(nome)
            setIsLoading(false)
        }).catch(erro => {
            console.log("ERRO EM PEGAR OS DADOS DO USUARIO: "+erro);
        })
    }

    async function deleteUser(){
        const res = await axios.delete(`${api}/deleteUSer/${id}`,{
            headers: { 'Authorization': `Bearer ${token}`}
        })
        .then((res) => {
            console.log(res.data);
        }).catch((erro) => {
            console.log("ERROR EM APAGAR CONTA DO USUARIO: "+erro);
        })
    }

    async function AtualizaDados(){
        setIsLoading(true)
        const respose = await axios.put(`${api}/uptade/user/${id}`,{
          nome:name,
          email:email,
        }).then((res) => {
          setMsg("Perfil atualizado com sucesso")
          getUser()
          setEditable(false)
          setIsLoading(false)
          setTimeout(() => {
            setMsg()
          }, 2000);
        })
        .catch((e) => {
        console.error("ERRO EM ATUALIZAR DADOS DO USUARIO: "+e)
        setMsgErro("Não foi possil atualizar os dados do usuario")
        setTimeout(() => {
            setMsgErro()
        }, 2500);
    })
      }

    useEffect(() => {
        getUser()
    },[id,editable])
 return (
    <>
    <Spinner visible={isLoading}/>
   <SafeAreaView style={styles.container}>
        <View style={styles.content}>

            <View style={styles.containerUser}>
                <AntDesign name="user" size={80} color="black" />
            </View>

            <View style={styles.containerButtonEdit}>
                <TouchableOpacity style={styles.buttonEdit} onPress={() => setEditable(!editable)}>
                    <Text style={styles.textButtonEdit}>EDITAR</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerForm}>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input} onChangeText={setName} value={name} editable={editable}/>
                </View>

                <View style={styles.containerInput}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} keyboardType='email-address' onChangeText={setEmail} value={email}  editable={editable}/>
                </View>

            </View>
            <Text style={msg ? styles.msg : styles.msgErro}>{msgErro || msg}</Text>
            
            <View style={styles.contentButton}>
                <TouchableOpacity style={!editable ? styles.buttonSaveOff : styles.buttonSave} disabled={!editable ? true : false} onPress={() => AtualizaDados()}>
                    <Text style={styles.textButtonSave}>Salva</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDeleteUser} onPress={() => setisModalVisible(true)}>
                    <Text style={styles.textButtonDeleteUser}>Apagar perfil</Text>
                </TouchableOpacity>
            </View>
            <Modal 
                transparent={true}
                animationType='fade'
                visible={isModalVisible} 
                nRequestClose={() => changeModalVisible(false)}
            >
                <DeleteUserModal changeModalVisible={changeModalVisible}
                setData={setData}/>
            </Modal>
            <Modal 
                transparent={true}
                animationType='fade'
                visible={isModalConfirDelete}
                nRequestClose={() => changeModalConfirDelete(false)}
            >
            <ConfirmDeleteUserModal 
            changeModalVisible={changeModalConfirDelete} 
            setData={setDataConfirDelete} 
            msg="Conta deletada com sucesso"/>
            </Modal>
        </View>
   </SafeAreaView>
   </>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFF",
        flex:1
    },
    content:{
        backgroundColor:"#820ad1",
        flex:1,
        marginTop:250,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop:20,
    },
    containerUser:{
        width:150,
        height:150,
        backgroundColor:"#e9e9e9",
        borderRadius:150 / 2,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        marginTop:-100,
    },
    containerForm:{
        marginTop:20,
    },
    containerInput:{
        width:'90%',
        alignSelf:"center",
        marginTop:20
    },
    label:{
        color:"white",
        fontSize:20,
    },
    input:{
        backgroundColor:"white",
        height:35,
        borderRadius:20,
        fontSize:20,
        paddingLeft:10,
    },
    containerButtonEdit:{
        backgroundColor:"white",
        alignSelf:"center",
        marginTop:15,
        borderRadius:20,
        justifyContent:"center"

    },
    buttonEdit:{
        padding:15
    },
    textButtonEdit:{
        fontSize:16
    },
    buttonSave:{
        backgroundColor:"white",
        width:'90%',
        alignSelf:"center",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
    },
    buttonSaveOff:{
        backgroundColor:"white",
        width:'90%',
        alignSelf:"center",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
        opacity:0.5
    },
    textButtonSave:{
        fontSize:20
    },
    buttonDeleteUser:{
        backgroundColor:"red",
        width:'90%',
        alignSelf:"center",
        marginTop:30,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:20,
    },
    textButtonDeleteUser:{
        fontSize:20,
        color:"white"
    },
    contentButton:{
        marginTop:50
    },
    msgErro:{
        color:"red",
        marginLeft:30,
        marginTop:10,
        fontSize:20
    },
    msg:{
        color:"white",
        marginLeft:30,
        marginTop:10,
        fontSize:20
    },
})