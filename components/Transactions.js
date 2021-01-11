import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet} from 'react-native'

import Transaction from "./Transaction"
import Store from "../store"
import TransactionService from "../services/transactions"

export default function Transactions()
{
    let [transactions, setTransactions] = useState([]);

    useEffect(() =>
    {
        setTransactions(TransactionService.allTransaction());
        return Store.subscribe(() => setTransactions(TransactionService.allTransaction()));
    }, []);

    return (
        <FlatList
            data={transactions}
            style={styles.container}
            renderItem={({item, index}) => <Transaction item={item} index={index}/>}
            keyExtractor={(item) => item.id}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40
    },
});
