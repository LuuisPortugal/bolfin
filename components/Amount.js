import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";

import Intl from "intl";
import "intl/locale-data/jsonp/pt-BR";

import Store from '../store';
import TransactionService from "../services/transactions"

export default function Amount()
{
    let [totalAmount, setTotalAmount] = useState("");

    const sumTotalAmount = useCallback(() =>
    {
        let transactions = TransactionService.allTransaction();
        let sum = Array.from(transactions)
            .reduce((amount, item) => item.type === '+'
                ? amount + parseFloat(item.value)
                : amount - parseFloat(item.value), 0.0);

        let formatter = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2, minimumIntegerDigits: 1});
        setTotalAmount(formatter.format(sum));
    }, []);

    useEffect(() =>
    {
        sumTotalAmount();
        return Store.subscribe(() => sumTotalAmount());
    }, []);

    return (
        <View style={styles.amount}>
            <Text style={styles.amountTitle}>Saldo</Text>
            <Text style={styles.amountValue}>R$ {totalAmount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    amount: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,
        backgroundColor: "#0d71ff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    amountTitle: {
        color: "white",
    },
    amountValue: {
        color: "white",
        fontSize: 40,
        marginVertical: 10
    }
});
