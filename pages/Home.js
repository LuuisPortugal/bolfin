import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import Constants from 'expo-constants';
import Transactions from "../components/Transactions";
import Amount from "../components/Amount";
import Toolbar from "../components/Toolbar";
import DrawerService from "../services/drawer"

export default function Home()
{
    const onSwipeLeftDrawer = useCallback(() => DrawerService.close(), []);
    const onSwipeRightDrawer = useCallback(() => DrawerService.open(), []);

    return (
        <GestureRecognizer
            style={styles.container}
            onSwipeRight={onSwipeRightDrawer}
            onSwipeLeft={onSwipeLeftDrawer}>
            <Toolbar/>
            <Amount/>
            <Transactions/>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
    },
});
