import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Keyboard,ActivityIndicator,Modal,TextInput } from 'react-native';
import { AntDesign } from "@expo/vector-icons"
import db from '../../../db.json'
import axios from 'axios';
import api from '../../assets/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import ConfirmMovimentsModal from '../../components/Modal/ConfirmMoviment';

const dados = db

export default function Retire() {
  AsyncStorage.getItem('IdUser').then((res) => setId(res))
  const [value, setValue] = useState('')
  const [inputDisabled, setInpuDisabled] = useState(true)
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const navigation = useNavigation()
  const [id,setId] = useState()
  const [isLoading,setIsLoading] = useState(false)
  const [isModalVisible,setisModalVisible] = useState(false); 
  const [saldo,setSaldo] = useState()


  const changeModalVisible = (bool) => {
    setisModalVisible(bool)
  }
  const setData = (data) => {
   if(data === "back"){
    navigation.replace("AtionRouter")
    setTimeout(() => {
      setisModalVisible(false)
    }, 1000);
   }
  }

  async function getSaldo() {
    setIsLoading(true)
    try {
      const res = (await axios.get(`${api}/getSumMoviments/${id}`)).data;
      const ganhos = res.result.ganhos
      const despesas = res.result.despesas
      setSaldo((ganhos - despesas).toFixed(2));
      setIsLoading(false)
    } catch (error) {
      console.log("ERRO:", error);
    }
  }


  function Sacar() {
    setIsLoading(true)
    axios.post(`${api}/cadastrarMoviments`,{
      idUser:id,
      type:0,
      label:"Saida",
      value:value.replace("R$","").replace(",","."),
      data:formatDate()
    }).then((res) =>{
      console.log("Movimentação cadastrada com sucesso.")
      setisModalVisible(true)
      setIsLoading(false)
      setValue(' ')
    }).
    catch((e) => console.log("ERRO: "+e))
  }

  function formatDate() {
    const date = new Date()
    const mes = date.getMonth() + 1
    const dia = date.getDate()
    const ano = date.getFullYear()
    const mesFormt = ''
    return (`${dia <= 9 ? '0' + dia : dia}/${mes <= 9 ? '0' + mes : mes}/${ano}`)
  }

  function validationInput(value) {  
    // Converte a entrada em um número
    const numericValue = parseFloat(value);
    if (value === "") {
      setInpuDisabled(true);
    } else if (numericValue <= 0 || isNaN(numericValue)) {
      setInpuDisabled(true);
    } else {
      setInpuDisabled(false);
    }
  }

  function keyboard(){
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardActive(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardActive(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }

  useEffect(() => {
    keyboard()
  }, []);

  useEffect(() => {
    validationInput(value)
    getSaldo()
  },[value,id])
 return (
  <View style={styles.container}>
         <Text style={styles.textTitle}>Qual é o valor da saida?</Text>
     <Text style={styles.textValueText}>Saldo disponivel em conta <Text style={styles.textValue}>R$ {saldo}</Text></Text>

    <View style={styles.containerInput}>
      <TextInput 
        style={styles.input} 
        value={value}
        onChangeText={value => setValue(value)}
        placeholder='Digite um valor'
        keyboardType='number-pad'
        returnKeyLabel='number'
      />
    </View>

    <View style={!isKeyboardActive ? styles.containerButton : styles.containerButtonKeyboard}>
      <TouchableOpacity style={inputDisabled ? styles.buttonOff : styles.button} onPress={() => Sacar()} disabled={inputDisabled}>
       {isLoading ? <ActivityIndicator color={"white"} size={35}/> : <AntDesign name="arrowright" size={30} color="white" />}
      </TouchableOpacity>
    </View>


    <Modal 
        transparent={true}
        animationType='fade'
        visible={isModalVisible} 
        nRequestClose={() => changeModalVisible(false)}
    >
        <ConfirmMovimentsModal changeModalVisible={changeModalVisible}
        setData={setData} msg="Saida cadastrada com sucesso!"/>
    </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
  },
  textTitle:{
    fontSize:40,
    fontWeight:"bold",
    marginStart:14,
    marginTop:20
    },
    textValue: {
        fontSize:16,
        marginStart: 14,
        color:"#000"
    },
    textValueText: {
        color: "#505050",
        marginStart: 14,
        fontSize:15
    },
  containerInput:{
    flexDirection:"row",
    width:'90%',
    marginStart:14,
    marginEnd:14,
    borderBottomWidth:0.5,
    borderBottomColor:"#d9d9d9",
    marginTop:10
  },
  input:{
    width:"95%",
    fontSize:29,
    marginLeft:4,
    fontWeight:"bold",
  },
  currencySymbol:{
    fontSize:30,
    fontWeight:"bold"

  },
  button:{
    backgroundColor:"#8000ff",
    width:80,
    height:80,
    borderRadius:80 / 2,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"flex-end",
    marginEnd:20,
    marginBottom:"auto",
  },
  buttonOff:{
    backgroundColor:"#8000ff",
    width:80,
    height:80,
    borderRadius:80 / 2,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"flex-end",
    marginEnd:20,
    marginBottom:"auto",
    opacity:0.3
  },
  containerButton:{
    marginTop:580
  },
  containerButtonKeyboard:{
    marginTop:350
  }
})