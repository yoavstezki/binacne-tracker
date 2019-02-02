import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

export const SymbolAndAmount = ({item: {asset, free}}) => (

    <View style={ styles.item }>
        <Text style={ styles.itemTitle }>{ asset }</Text>
        <Text style={ styles.itemValue }>{ parseFloat(free) }</Text>
    </View>

);

const styles = StyleSheet.create({
    item: {
        width: 80,
    },
    itemTitle: {
        color: '#D8DADD',
        width: '100%',
        marginBottom: 4,
        fontSize: 18,
    },
    itemValue: {
        color: '#A2A2A5',
        width: '100%',
        fontSize: 12,
    },
});
