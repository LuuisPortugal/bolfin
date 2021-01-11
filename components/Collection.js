import React, {useCallback, useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {Ionicons} from "@expo/vector-icons";
import Store from "../store";
import CollectionsService from "../services/collections";

export default function Collection({item})
{
    let [active, setActive] = useState(null);
    let [shouldDelete, setShouldDelete] = useState(false);

    useEffect(() =>
        {
            setActive(CollectionsService.activeCollection());

            return Store.subscribe(() =>
                setActive(CollectionsService.activeCollection()))
        },
        []
    );

    const onCollectionPress = useCallback(() =>
    {
        if (shouldDelete)
        {
            CollectionsService.setCollection(null)
            CollectionsService.removeCollection(item)
        }
        else
        {
            CollectionsService.setCollection(item)
        }
    });

    const onCollectionLongPress = useCallback(() =>
    {
        setShouldDelete(prevValue => !prevValue);
    });

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onCollectionPress}
            onLongPress={onCollectionLongPress}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.actions}>
                {active === item
                    ? <Ionicons style={styles.action} name={"radio-button-on-outline"} size={10} color={"#0d71ff"}/>
                    : null}
                {shouldDelete
                    ? <View style={styles.action}>
                        <Ionicons name="md-alert-circle-outline" size={20} color={"red"}/>
                    </View>
                    : null}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: "row",
        alignItems: "center"
    },
    action: {
        paddingHorizontal: 5
    },
    name: {
        flex: 1,
        color: '#000',
        fontSize: 25
    }
});
