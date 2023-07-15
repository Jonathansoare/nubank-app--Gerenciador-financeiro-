import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,SafeAreaView,RefreshControl } from 'react-native';
import Header from '../../components/Header';
import Balance from '../../components/Balance';
import Moviments from '../../components/Moviments';
import Actions from '../../components/Actions';
import db from  '../../../db.json'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '../../assets/api/api';
import Spinner from 'react-native-loading-spinner-overlay';


export default function Home() {
  AsyncStorage.getItem('IdUser').then((res) => setId(res))
  const [ganhos,setGanhos] = useState()
  const [despesas,setDespesas] = useState()
  const [id,setId] = useState()
  const [dados,setdados] = useState()
  const [refresh,setRefresh] = useState()
  const [isLoading,setIsLoading] = useState()
  const [showVisible,setShowVisible] = useState(false)

  
  async function calcularEntradas() {
    try {
      const res = (await axios.get(`${api}/getSumMoviments/${id}`)).data;
      const ganhos = res.result.ganhos
      setGanhos((ganhos).toFixed(2));
    } catch (error) {
      console.log("ERRO EM CALCULAR ENTRADA:", error);
    }
  }

  const toggleSaldoVisivel = () => {
    setShowVisible(!showVisible);
  };
  

  function Refresh(){
    setRefresh(true)
    getMOviments()
    calcularSaidas()
    calcularEntradas()
    setTimeout(() => {
      setRefresh(false)
    }, 500);
  }
  

  function getMOviments(){
    axios.get(`${api}/getMoviments/${id}`).then((res) => {
      const lista = res.data.result
      lista.sort((a,b) => b.id - a.id)
      setdados(lista)
    })
  }

  async function calcularSaidas(){
    try {
      const res = (await axios.get(`${api}/getSumMoviments/${id}`)).data;
      const despesas = res.result.despesas
      setDespesas((despesas).toFixed(2));
    } catch (error) {
      console.log("ERRO EM CALCULAR SAIDA:", error);
    }
  }  

  useEffect(() => {
    calcularSaidas()
    calcularEntradas()
    getMOviments()
  },[id])

  useEffect(() => {
    if(dados === undefined){
      setIsLoading(true)
    }else{
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);

    }
  },[dados])

  return (
    <>
    <Spinner visible={isLoading} textContent='Carregando...' textStyle={{color:"white"}}/>
      <SafeAreaView style={styles.container}>
          <Header saldo={(ganhos - despesas).toFixed(2)} ToggleShowVisible={toggleSaldoVisivel} showVisible={showVisible}/>
          <Balance saldo={ganhos} gastos={despesas} showVisible={showVisible} />
          <View style={styles.containerActions}><Actions/></View>

          <Text style={styles.title}>Ultimas movimentações</Text>
          <FlatList
            style={styles.list}
            data={dados}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <Moviments data={item} showValue={showVisible}/>}
            refreshControl={
              <RefreshControl 
                refreshing={refresh}
                onRefresh={() => Refresh()}/>
            }/>
      </SafeAreaView>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title:{
    fontSize:18,
    fontWeight:"bold",
    margin:14,
  },
  list:{
    marginTop:1,
    marginLeft:14,
    marginEnd:14
  },
  containerActions:{
  },
  textMoviments:{
    color:"black",
    fontSize:20,
    textAlign:"center",
    marginTop:50
  },
});
