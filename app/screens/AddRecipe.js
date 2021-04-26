// Imports appelés dans la page actuelle
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default Meal = () => {
    const navigation = useNavigation();

    //  Déclaration du tableau ou seront enregistrées les valeurs rentrées dans le formulaire
    const [recettes, setRecettes] = useState([]);

    const [nomRecettes, setNomRecettes] = useState('');
    const [urlRecettes, setUrlRecettes] = useState('');
    const [ingredientsRecettes, setIngredientsRecettes] = useState('');
    const [categorieRecettes, setCategorieRecettes] = useState('');
    const [descriptionRecettes, setDescriptionRecettes] = useState('');

    useEffect(() => {
        // Restaure les données de async storage au lancement de l'application 
        restoreDataFromAsyncStorage();
    }, []);

    // Récupère les données du tableau recettes
    const restoreDataFromAsyncStorage = async () => {
        const localStorageDatas = await AsyncStorage.getItem('@recettes');
        return localStorageDatas != null
            ? setRecettes(JSON.parse(localStorageDatas))
            : null;
    };

    const idGenerator = () => {
        return (Math.floor(1+Math.random()*10000))
    };

    // Déclaration d'une fonction asynchrone avec déclaration d'un nouveau tableau pour y insérer les valeurs rentrées dans le formulaire
    const saveRecette = async () => {
        let newRecettes = [...recettes];
        let idRecettes = idGenerator();
        console.log(idRecettes);
        newRecettes = [...recettes, { id: idRecettes, Nom: nomRecettes, URL: urlRecettes, Catégorie: categorieRecettes, Ingrédients: ingredientsRecettes, Description: descriptionRecettes }];
        setRecettes(newRecettes);

        // Permet de vider les TextInputs après envoi des données
        setNomRecettes('');
        setUrlRecettes('');
        setIngredientsRecettes('');
        setCategorieRecettes('');
        setDescriptionRecettes('');

        // On vérifie que tous les champs sont bien remplis
        if (nomRecettes && urlRecettes && categorieRecettes && ingredientsRecettes && descriptionRecettes) {
            let listeRecette = recettes;
            listeRecette.push({ nom: nomRecettes, url: urlRecettes,  catégorie: categorieRecettes, ingrédients: ingredientsRecettes, description: descriptionRecettes });
            setRecettes(listeRecette);
        } else {
            Alert.alert("Veuillez remplir tous les champs avant de valider");
        }

        // Envoi des valeurs dans le tableau recettes
        await AsyncStorage.setItem('@recettes', JSON.stringify(newRecettes));
    };

    return (
        // Construction du formulaire 
        <ScrollView>
            <View style={styles.colorView}>
                <View style={styles.taskInputContainer}>
                    <Text style={styles.text}>Nom de la recette</Text>
                    <TextInput
                        style={styles.input1}
                        onChangeText={setNomRecettes}  // setNomRecettes prendra la valeur indiquée dans le formulaire
                        value={nomRecettes}            // Cette valeur sera envoyée dans le tableau recettes
                    />
                    <Text style={styles.text}>URL de l'image</Text>
                    <TextInput
                        style={styles.input1}
                        onChangeText={setUrlRecettes}
                        value={urlRecettes}
                    />
                    <Text style={styles.text}>Catégorie</Text>
                    <TextInput
                        multiline
                        style={styles.input1}
                        onChangeText={setCategorieRecettes}
                        value={categorieRecettes}
                    />
                    <Text style={styles.text}>Ingrédients</Text>
                    <TextInput
                        multiline
                        style={styles.input2}
                        onChangeText={setIngredientsRecettes}
                        value={ingredientsRecettes}
                    />
                    <Text style={styles.text}>Description</Text>
                    <TextInput
                        multiline
                        style={styles.input2}
                        onChangeText={setDescriptionRecettes}
                        value={descriptionRecettes}
                    />
                    <TouchableOpacity
                        onPress={() => { saveRecette(); navigation.navigate('HomeScreen') }}
                        title="Ajouter"
                        accessibilityLabel="Ajouter une recette"
                    >
                        <Text style={styles.button}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>

    );

};


// Définition des différents styles des éléments de la page
const styles = StyleSheet.create({
    colorView: {
        backgroundColor: '#f0faff'
    },
    title: {
        color: '#002448',

    },
    text: {
        color: '#002448',
        fontSize: 20,
        marginLeft: 22,
        fontWeight: 'bold',
        marginBottom: -20
    },
    taskInputContainer: {
        marginTop: 25,
    },
    input1: {
        backgroundColor: '#d6e7f0',
        width: '90%',
        margin: 20,
        borderRadius: 10,
        height: 65
    },
    input2: {
        backgroundColor: '#d6e7f0',
        width: '90%',
        margin: 20,
        borderRadius: 10,
        height: 90
    },
    button: {
        fontSize: 20,
        color: "white",
        borderRadius: 10,
        backgroundColor: '#003c62',
        width: 100,
        marginLeft: 155,
        height: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: -10

    },
});