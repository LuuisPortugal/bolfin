import React from 'react';
import {StyleSheet, View} from 'react-native';

import Constants from 'expo-constants';
import Transactions from "../components/Transactions";
import Amount from "../components/Amount";
import Toolbar from "../components/Toolbar";

export default function Home()
{
    return (
        <View style={styles.container}>
            <Toolbar/>
            <Amount/>
            <Transactions/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
});
