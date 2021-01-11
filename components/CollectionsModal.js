import React, {useEffect, useState} from 'react'
import Modal from 'react-native-modal';
import {Dimensions, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Store from "../store";
import DrawerService from "../services/drawer";
import Collections from "./Collections";
import Profile from "./Profile";

export default function CollectionsModal()
{
    let [visible, setVisible] = useState(false);
    let [name, setName] = React.useState('');

    useEffect(() =>
            Store.subscribe(() =>
                setVisible(DrawerService.visible())),
        []
    );

    return (
        <>
            <TouchableOpacity onPress={() => DrawerService.open()}>
                <Ionicons name={"menu-outline"} size={24} color={"#0060ff"}/>
            </TouchableOpacity>
            <Modal
                isVisible={visible}
                style={styles.modal}
                animationIn={"slideInLeft"}
                animationOut={"slideOutLeft"}
                onBackButtonPress={() => DrawerService.close()}
                onBackdropPress={() => DrawerService.close()}>
                <View style={styles.container}>
                    <View style={styles.dialog}>
                        <Profile />
                        <View style={styles.separator} />
                        <Collections />
                    </View>
                </View>
            </Modal>
        </>
    );
}


const modalWidth = Dimensions.get('window').width * 0.9;
const modalMaxWidth = 300;
const styles = StyleSheet.create({
    modal: {
        margin: 0,
        flex: 1
    },
    container: {
        flex: 1
    },
    dialog: {
        flex: 1,
        width: modalWidth <= modalMaxWidth
            ? modalWidth
            : modalMaxWidth,
        backgroundColor: "#ffffff",
        padding: 20
    },
    separator: {
        backgroundColor: "#0060ff",
        height: 2,
        width: 30,
        marginVertical: 30
    },
});
