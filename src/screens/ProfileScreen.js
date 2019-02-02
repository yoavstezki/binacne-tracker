import React from 'react'
import { inject, observer } from 'mobx-react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

@inject('apiKeysStore')
@observer
export class ProfileScreen extends React.Component {

    updateKeys = async () => {
        const {apiKeysStore, navigation} = this.props;
        try {
            await apiKeysStore.saveApiKeys();
            navigation.navigate('Home')
        } catch (e) {
            console.error(e);
        }

    };


    render() {

        const {apiKeysStore, navigation} = this.props;

        return (
            <View style={ styles.container }>
                <TextInput
                    style={ styles.input }
                    onChangeText={ (t) => apiKeysStore.setApiKey(t) }
                    value={ apiKeysStore.apiKey }
                    placeholder="API_KEY"
                    placeholderTextColor="#DDBC44"
                />

                <TextInput
                    style={ styles.input }
                    onChangeText={ (t) => apiKeysStore.setApiSecret(t) }
                    value={ apiKeysStore.apiSecret }
                    placeholder="API_SECRET"
                    placeholderTextColor="#DDBC44"
                />

                <View style={ styles.buttonsContainer }>
                    <TouchableOpacity style={ styles.button } onPress={ this.updateKeys }>
                        <Text style={ styles.buttonText }>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={ styles.button } onPress={ () => navigation.navigate('Home') }>
                        <Text style={ styles.buttonText }>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#272C36',
        flex: 1,
        justifyContent: 'center',
        padding: 15,
    },
    input: {
        borderColor: '#DDBC44',
        borderWidth: 1,
        height: 40,
        marginBottom: 15,
        padding: 10,
        color: '#DDBC44',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    button: {
        borderWidth: 1,
        borderColor: '#DDBC44',
        padding: 8,
        marginTop: 15,
        width: 150
    },
    buttonText: {
        color: '#DDBC44',
        textAlign: 'center',
    }
});
