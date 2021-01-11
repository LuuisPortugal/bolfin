import React, {useEffect, useState} from "react"
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import CollectionsService from "../services/collections"
import Collection from "./Collection";
import Store from "../store";
import NewCollectionModal from "./NewCollectionModal";
import JoinCollectionModal from "./JoinCollectionModal";

export default function Collections()
{
    let [collections, setCollections] = useState([]);

    useEffect(() =>
    {
        setCollections(CollectionsService.allCollections());
        return Store.subscribe(() => setCollections(CollectionsService.allCollections()));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.collectionsLabel}>Coleções</Text>
                <View style={styles.actions}>
                    <NewCollectionModal />
                    <JoinCollectionModal />
                </View>
            </View>
            <FlatList
                style={styles.list}
                data={collections}
                renderItem={props => <Collection {...props} />}
                keyExtractor={(item) => item.id}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    collectionsLabel: {
        fontSize: 18,
        color: '#000',
        fontFamily: "Assistant-Bold"
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    list: {
        flex: 1
    }
});
