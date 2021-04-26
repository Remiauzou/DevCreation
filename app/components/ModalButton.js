         // Imports appelés dans la page actuelle
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AddRecipe from '../screens/AddRecipe';

export default ModalButton = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [datas, setDatas] = useState([]);

    const addData = (data) => {
        data.key = Math.random().toString();
        setDatas((currentDatas) => {
            return [data, ...currentDatas]
        });
        setModalOpen(false);
    };
    
    return (
        <View>
            <Modal visible={modalOpen}>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalOpen(false)} name="close">
                        <View style={styles.addWrapperClose}>
                            <Text style={styles.title}>Ajouter une recette</Text>
                            <Text style={styles.addTextClose}>X</Text>
                        </View>
                    </TouchableOpacity>
                    <AddRecipe addData={addData}/>
                </View>
            </Modal>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalOpen(true)} name="add">
                <View style={styles.addWrapperAdd}>
                    <Text style={styles.addTextAdd}> + </Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
};

         // Définition des différents styles des éléments de la page
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f0faff'
    },

    addWrapperAdd: {

        width: 30,
        height: 30,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        borderColor: '#002448',
        borderWidth: 1,
    },

    addTextAdd: {
        color: '#002448',
        fontSize: 20,

    },
    addWrapperClose: {
        flexDirection: 'row',
        justifyContent: 'center',
        
    },

    addTextClose: {
        
        color: '#002448',
        fontSize: 20,
        marginLeft: 70,
        paddingTop: 12,

    },
    title: {
        fontSize: 20,
        marginTop: 12,
        marginLeft: 90,
        color: '#002448',
        fontWeight: 'bold'

    }


});

