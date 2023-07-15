import React, { useState,useEffect } from 'react';
import { View,Text,
  StyleSheet,TouchableOpacity,
  Keyboard,ActivityIndicator, 
  Modal,SafeAreaView, TextInput } from 'react-native';
import {AntDesign } from "@expo/vector-icons";
import axios from 'axios';
import api from '../../assets/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import ConfirmMovimentsModal from '../../components/Modal/ConfirmMoviment';
import Spinner from 'react-native-loading-spinner-overlay';

export default function Deposit() {
  AsyncStorage.getItem('IdUser').then((res) => setId(res))
  const navigation = useNavigation()
  const [value, setValue] = useState('')
  const [inputDisabled, setInpuDisabled] = useState(true)
  const [isKeyboardActive, setKeyboardActive] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [isLoadingSpinner,setIsLoadingSpinner] = useState()
  const [id,setId] = useState()
  const [isModalVisible,setisModalVisible] = useState(false); 


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


  function deposito() {
    setIsLoading(true);
    const valorFormatado = value.replace("R$", "").replaceAll(",", ".")
    axios.post(`${api}/cadastrarMoviments`, {
      idUser: id,
      type: 1,
      label: "Entrada",
      value: valorFormatado,
      data: formatDate()
    }).then((res) => {
      setIsLoadingSpinner(true)
      setTimeout(() => {
        setisModalVisible(true);
        setIsLoading(false);
        setIsLoadingSpinner(false)
        setValue(' ');
      }, 1000);
    }).catch((e) => console.log("ERRO: " + e));
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
  },[value])
 return (
  <>
      <Spinner visible={isLoadingSpinner}/>
   <SafeAreaView style={styles.container}>
    <Text style={styles.textTitle}>Qual é o valor da entrada?</Text>

    <View style={styles.containerInput}>
    <TextInput 
      style={styles.input} 
      value={value}
      onChangeText={value => setValue(value)}
      placeholder='Digite um valor'
      keyboardType='number-pad'
    />
    </View>

    <View style={!isKeyboardActive ? styles.containerButton : styles.containerButtonKeyboard}>
      <TouchableOpacity style={inputDisabled ? styles.buttonOff : styles.button} onPress={() => deposito()} disabled={inputDisabled}>
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
        setData={setData} msg="Entrada cadastrada com sucesso!"/>
    </Modal>

    </SafeAreaView>
  </>
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
    marginTop:550
  },
  containerButtonKeyboard:{
    marginTop:350
  }
})