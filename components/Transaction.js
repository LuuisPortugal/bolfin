import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TransactionService from "../services/transactions";

import moment from 'moment';
import 'moment/locale/pt-br';
import Intl from "intl";

moment.locale("pt-BR");

export default function Transaction({item, index})
{
    let [shouldDelete, setShouldDelete] = useState(false);

    let date = moment(item.date);
    let formatter = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, minimumIntegerDigits: 1});

    const onTransactionPress = useCallback(() =>
    {
        if (shouldDelete)
        {
            TransactionService.removeTransaction(item)
        }
    });

    const onTransactionLongPress = useCallback(() =>
    {
        setShouldDelete(prevValue => !prevValue);
    });

    return (
        <TouchableOpacity
            style={[styles.container, {
                backgroundColor: index % 2
                    ? '#ffffff'
                    : '#f0f0f2'
            }]}
            onPress={onTransactionPress}
            onLongPress={onTransactionLongPress}>
            <View style={styles.info}>
                <Text style={styles.infoLabel}>{item.name}</Text>
                <Text style={styles.date}>{date.calendar()}</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.infoValue}>{item.type} R$ {formatter.format(item.value)}</Text>
                {item.lock && <Ionicons name="md-lock-closed-outline"/>}
            </View>
            {
                shouldDelete &&
                <View style={styles.deletedView}>
                    <Ionicons name="md-alert-circle-outline" size={20} color={"red"}/>
                </View>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: 'white',
        flexDirection: "row",
        marginBottom: 1
    },
    info: {
        flex: 3,
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    header: {
        flex: 2,
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    date: {
        color: '#a9a9a9',

    },
    infoLabel: {
        fontSize: 16,

    },
    infoValue: {
        color: "#000",
        fontSize: 16,

    },
    deletedView: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    }
});
