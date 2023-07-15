import React from 'react';
import { TouchableOpacity, View,Text,StyleSheet,Dimensions } from 'react-native';

const WIDTH = Dimensions.get("window").width;
const HEIGHT_MODAL = 150

export default function DeleteUserModal(props) {

    const closeModal = (bool,data) => {
        props.changeModalVisible(bool);
        props.setData(data);
    }

    const deleteModal = (bool,data) => {
        props.changeModalVisible(bool)
        props.setData(data)
    }
 return (
   <TouchableOpacity
   disabled={true}
   style={styles.container}
   >
    <View style={styles.modal}>

        <View style={styles.textView}>
            <Text style={styles.text}>Deseja apagar a conta?</Text>
        </View>

        <View style={styles.buttonView}>

            <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteModal(true,'delete')}>
                <Text style={styles.textButton}>Apagar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCanceled} onPress={() => closeModal(false,'Cancel')}>
                <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>


        </View>


    </View>
   </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    modal:{
        height:HEIGHT_MODAL,
        paddingTop:10,
        backgroundColor:"white",
        borderRadius:10,
        width:WIDTH - 80
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
        justifyContent:"space-between",
        margin:5
    },
    buttonDelete:{
        backgroundColor:"red",
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
    buttonCanceled:{
        backgroundColor:"green",
        width:"45%",
        height:50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:30,
        margin:5
    }
})