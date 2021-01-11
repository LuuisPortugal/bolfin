import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import NewTransactionModal from "./NewTransactionModal";
import CollectionsModal from "./CollectionsModal";
import CollectionsService from "../services/collections";
import Store from "../store";

export default function Toolbar()
{
    let [collection, setCollection] = useState(null);

    useEffect(() =>
    {
        setCollection(CollectionsService.activeCollection());
        return Store.subscribe(() => setCollection(CollectionsService.activeCollection()));
    }, []);

    return (
        <View style={styles.toolbar}>
            <CollectionsModal/>
            {collection
                ? <View style={styles.title}>
                    <Text style={styles.header}>{'Finpad'}</Text>
                    <Text style={styles.subHeader}>{collection.name}</Text>
                </View>
                : <Text style={styles.header}>Finpad</Text>}
            <NewTransactionModal/>
        </View>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 30,
        marginVertical: 20
    },
    title: {
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        fontFamily: "Assistant-Light",
        fontSize: 24,
        color: "#000"
    },
    subHeader: {
        fontFamily: "Assistant-Light",
        fontSize: 12,
        color: "#a9a9a9"
    }
});
