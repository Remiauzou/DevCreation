// Imports appelés dans la page actuelle
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Detail = ({ route }) => {

    const navigation = useNavigation()
    const [datas, setDatas] = useState([]);

    // fonction servant à la suppression d'une recette
    const actionOnTask = () => {
        supprimerRecette = [...datas];
        console.log(supprimerRecette);
        supprimerRecette = datas.filter(({ id }) => id !== route.params.id);
        setDatas(supprimerRecette);
        AsyncStorage.setItem('@recettes', JSON.stringify(supprimerRecette));
        navigation.navigate('HomeScreen')
    };

    const deleteMessage = () => {
        Alert.alert(
            "",
            "Voulez vous définitivement supprimer cette recette ? ",
            [
                {
                    text: "Non",
                },
                { text: "Oui", onPress: () => actionOnTask() }
            ]
        );
    };
    useEffect(() => {
        // Restore data from AsyncStorage on start app
        restoreDataFromAsyncStorage();
    });

    const restoreDataFromAsyncStorage = async () => {
        const localStorageDatas = await AsyncStorage.getItem('@recettes');
        return localStorageDatas != null
            ? setDatas(JSON.parse(localStorageDatas))
            : null;
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity style={styles.trash}><FontAwesome5 name={'trash-alt'} size={20} color="#003c62" onPress={() => { deleteMessage() }} /></TouchableOpacity>,
        });
    }, [navigation]);

    return (
        // on récupère les paramètres de chaque recette gràce à params
        <View>
            <Image source={{ uri: route.params.URL }}
                style={styles.image}
            />
            <Text style={styles.name}>{route.params.Nom}</Text>
            <Text style={styles.title}><FontAwesome5 style={styles.icon} name={'hamburger'} size={30} color="orange" />     Ingrédients</Text>
            <Text style={styles.textingrédients}>{route.params.Ingrédients}</Text>
            <Text style={styles.titledescription}><FontAwesome5 style={styles.icon} name={'utensils'} size={30} color="grey" />      Description</Text>
            <Text style={styles.textdescription}>{route.params.Description}</Text>
        </View>

    );
};

// Définition des différents styles des éléments de la page
const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 250,
        position: 'absolute'
    },
    name: {
        position: 'relative',
        backgroundColor: '#003c62',
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        width: '80%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 220,
    },
    title: {
        color: '#003c62',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 20,
        paddingLeft: 40,
    },
    titledescription: {
        color: '#003c62',
        fontSize: 25,
        fontWeight: 'bold',
        paddingTop: 80,
        paddingLeft: 40,
    },
    textingrédients: {
        color: '#003c62',
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    textdescription: {
        color: '#003c62',
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 20,
        fontSize: 13,

    },
    trash: {
        paddingRight: 20
    },
});
