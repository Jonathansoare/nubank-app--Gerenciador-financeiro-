import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TouchableOpacity, View,Text,StyleSheet,Dimensions, SafeAreaView } from 'react-native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 150

export default function ConfirmDeleteUserModal(props) {

    const closeModal = (bool,data) => {
        props.changeModalVisible(bool);
        props.setData(data);
    }
 return (
    <>
    <StatusBar style='auto'/>
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <View style={styles.modal}>

                <View style={styles.textView}>
                    <Text style={styles.text}>{props.msg}</Text>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => closeModal(false,'back')}>
                        <Text style={styles.textButton}>Sair</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
    container:{
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        flex:1,
        width:0
    },
    modal:{
        height:HEIGHT_MODAL,
        paddingTop:10,
        backgroundColor:"white",
        borderRadius:10,
        width:WIDTH - 80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    textView:{
        flex:1,
        alignItems:"center"
    },
    text:{
        margin:5,
        fontSize:22,
        fontWeight:"bold"
    },
    buttonView:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        margin:5
    },
    buttonBack:{
        backgroundColor:"green",
        width:"45%",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        margin:5
    },
    textButton:{
        color:"white",
        fontSize:18
    },
})