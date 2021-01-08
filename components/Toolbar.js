import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import NewModal from "./NewModal";

export default function Toolbar()
{
    return (
        <View style={styles.toolbar}>
            <TouchableOpacity style={styles.toolbarAction} onPress={() => console.log("menu")}>
                <Ionicons name={"menu-outline"} size={24} color={"#0060ff"}/>
            </TouchableOpacity>
            <NewModal/>
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
    toolbarAction: {}
});
