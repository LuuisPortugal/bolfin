import React, {useCallback} from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native"
import CollectionsService from "../services/collections";
import {Ionicons} from "@expo/vector-icons";

export default function JoinCollection({item, closeModal})
{
    const onCollectionPress = useCallback(() =>
    {
        CollectionsService.addCollection(item)
        closeModal();
    }, []);

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onCollectionPress}>
            <Text style={styles.name}>{item.name}</Text>
            <Ionicons name={"chevron-forward-outline"} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    name: {
        color: '#000',
        fontSize: 25
    }
});
