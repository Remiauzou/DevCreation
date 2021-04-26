       // Imports appelés dans la page actuelle
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Details from './screens/Details';
import ModalButton from './components/ModalButton';

        // Permet l'affichage de la barre de navigation
const Stack = createStackNavigator();

export default Router = () => {

  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="HomeScreen"           // On définit avec Stack.Navigator toutes les fenêtres où l'on veut afficher la barre de 
        screenOptions={{                                       // navigation gràce aux 'StackScreen'
        headerTintColor: '#002448',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#f0faff' }
      }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title:'Recettes',
            headerRight: () => <ModalButton />                  // Affichage du composant ModalButton dans la barre de navigation de HomeScreen, ce 
                                                                // composant est appelé dans les imports pour pouvoir être utilisé

          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};



