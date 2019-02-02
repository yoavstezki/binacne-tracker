import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'mobx-react';
import { HomeScreen, ProfileScreen } from './src/screens'

import stores from './src/stores'

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#272C36",
    },
    navigator: {
        backgroundColor: "#272C36"
    }
});

const Navigator = createStackNavigator(
    {
        Home: {screen: HomeScreen},
        Profile: {screen: ProfileScreen}
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

const AppContainer = createAppContainer(Navigator);


export default class App extends React.Component {
    render() {
        return (
            <Provider { ...stores }>
                <SafeAreaView style={ styles.safeArea }>
                    <AppContainer />
                </SafeAreaView>
            </Provider>
        );
    }
}
