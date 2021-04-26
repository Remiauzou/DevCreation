// Imports appelés dans la page actuelle
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default Home = () => {

    // On déclare une constante navigation qui permet la navigation entre les pages
    const navigation = useNavigation();

    // Déclaration d'un tableau datas ou seront enregistrées les valeurs du tableau recettes et qui seront envoyées dans la flatlist. Le tableau recettes 
    // est déclaré dans Meal.js, la page d'ajout de recettes avec formulaire
    const [datas, setDatas] = useState([]);

    useEffect(() => {

        // Restaure les données de async storage au lancement de l'application 
        restoreDataFromAsyncStorage();
    });
    // Récupération des valeurs du tableau recettes pour les renvoyer dans le tableau datas 
    const restoreDataFromAsyncStorage = async () => {
        const localStorageDatas = await AsyncStorage.getItem('@recettes');
        return localStorageDatas != null
            ? setDatas(JSON.parse(localStorageDatas))
            : null;
    };

    return (
        <View style={styles.container}>
            {datas.length != 0 ? null :
                <Text style={styles.text} >Bonjour et bienvenue sur LaBonneRecette! Pour commencer 
                à visualiser vos recettes préférées, veuillez cliquer sur "+" pour en ajouter une première.</Text>}
            
            {/* Construction d'une flatlist pour permettre la récupération et l'affichage des valeurs du tableau datas */}
            
            <FlatList
                //  Pour chaque item présent dans le tableau datas, on récupère son id gràce au keyextractor et on l' envoie dans la flatlist
                data={datas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (

                    <View style={styles.item}>
                        <Image source={{ uri: item.URL }}
                            style={styles.image}
                        />
                        <View>
                            <Text style={styles.textCatégorie}>{item.Catégorie}</Text>
                            <Text style={styles.textNom}>{item.Nom}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate("Details", item)}>
                            <Text style={styles.button} ><FontAwesome5 name={'eye'} size={20} color="white" /></Text>
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    );

}
// Définition des différents styles des éléments de la page
const styles = StyleSheet.create({
    container: {
        backgroundColor:"#eff9fe",
    },
    image: {
        width: 100,
        height: 95,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        margin: -30,
        marginLeft: -30

    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '96%',
        margin: 8,
        marginTop: 10,
        marginBottom: 0,
        padding: 30,
        backgroundColor: '#003c62',
        borderRadius: 15,
        height: 95,

    },
    textNom: {
        color: 'white',
        fontSize: 30,
        paddingLeft: 25

    },
    textCatégorie: {
        color: 'black',
        fontSize: 11,
        marginLeft: -40,
        backgroundColor: '#edefef',
        width: 100,
        textAlign: 'center',
        marginTop: -30

    },
    button: {
        color: 'white',
        fontSize: 20
    },

    text: {
        color: '#002448',
        fontSize:18,
        textAlign: 'center',
        margin: 15,
        paddingTop: 80,
        lineHeight: 30

    },
});