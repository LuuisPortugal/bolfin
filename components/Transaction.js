import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import TransactionService from "../services/transactions";

import moment from 'moment';
import 'moment/locale/pt-br';
import Intl from "intl";

moment.locale("pt-BR");

export default function Transaction({item, index})
{
    let date = moment(item.date);
    let formatter = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, minimumIntegerDigits: 1});

    return (
        <TouchableOpacity
            style={[styles.container, {
                backgroundColor: index % 2
                    ? '#ffffff'
                    : '#f0f0f2'
            }]}
            onLongPress={() => TransactionService.removeTransaction(item)}>
            <View style={styles.info}>
                <Text style={styles.infoLabel}>{item.name}</Text>
                <Text style={styles.infoValue}>{item.type} R$ {formatter.format(item.value)}</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.date}>{date.calendar()}</Text>
                {item.lock && <Ionicons name="md-lock-closed-outline"/>}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 1
    },
    info: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 5
    },
    date: {
        color: '#a9a9a9',
        fontFamily: "Assistant-Light"
    },
    infoLabel: {
        flexShrink: 1,
        fontSize: 16,
        fontFamily: "Assistant-Bold"
    },
    infoValue: {
        flexShrink: 1,
        fontSize: 16,
        fontFamily: "Assistant"
    }
});
