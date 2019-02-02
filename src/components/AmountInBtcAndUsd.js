import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const AmountInBtcAndUsd = ({volUsd, volBtc}) => (
    <View>
        <Text style={ [styles.usdValue, volUsd > 0 && styles.isPositive] }>{ volUsd }</Text>
        <Text style={ styles.itemValue }>{ volBtc }</Text>
    </View>
);

const styles = StyleSheet.create({
    usdValue: {
        color: '#B72970',
        width: '100%',
        marginBottom: 4,
        textAlign: 'center',
        fontSize: 18,
    },
    isPositive: {
        color: '#5E731E',
    },
    isNegative: {},
    itemValue: {
        color: '#A2A2A5',
        width: '100%',
        fontSize: 12,
        textAlign: 'center',
    },
});
