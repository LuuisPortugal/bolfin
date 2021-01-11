import React, {useCallback, useState} from 'react'
import {Dimensions, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import Modal from 'react-native-modal';
import {Ionicons} from "@expo/vector-icons";
import JoinService from "../services/join";
import JoinCollection from "./JoinCollection";

export default function JoinCollectionModal()
{
    let [collections, setCollections] = useState([]);
    let [modalVisible, setModalVisible] = useState(false);
    let [nick, setNick] = useState('');

    const searchCollectionByUser = useCallback(() =>
    {
        if (!nick)
        {
            return;
        }

        let response = JoinService.allCollectionsByUser(nick);
        setCollections(response);
    }, [nick])

    const closeModal = useCallback(() =>
        {
            setModalVisible(false);
            setCollections([]);
            setNick('');
        },
        []);

    return (
        <>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                <Ionicons name={"attach-outline"} size={24} color={"#0060ff"}/>
            </TouchableOpacity>
            <Modal
                isVisible={modalVisible}
                style={styles.modal}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.container}>
                    <View style={styles.dialog}>
                        <View style={styles.fields}>
                            <View style={styles.input}>
                                <Text style={styles.aroba}>@</Text>
                                <TextInput
                                    style={styles.nick}
                                    value={nick}
                                    onChangeText={text => setNick(text)}
                                    autoCompleteType={"name"}
                                    autoCapitalize={'none'}
                                    autoFocus={true}
                                    underlineColorAndroid="transparent"
                                    clearButtonMode={"while-editing"}
                                    placeholder={"Usuário"}
                                    placeholderColor={"#ddd"}/>
                            </View>
                            <TouchableOpacity onPress={searchCollectionByUser}>
                                <Ionicons name={"search-outline"} size={20} color={"#0060ff"}/>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            style={styles.list}
                            data={collections}
                            renderItem={props => <JoinCollection {...props} closeModal={closeModal}/>}
                            keyExtractor={(item) => item.id}/>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modal: {
        margin: 0
    },
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    dialog: {
        width: Dimensions.get('window').width,
        backgroundColor: "#ffffff",
        padding: 20,
        paddingBottom: StatusBar.currentHeight || 0
    },
    buttonAdd: {
        paddingLeft: 20,
        paddingVertical: 10
    },
    fields: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        flexDirection: "row",
        alignItems: "center"
    },
    nick: {
        height: 40,
        fontSize: 24,
        color: "#000"
    },
    aroba: {
        color: "#000",
        fontSize: 24,
        paddingRight: 5,
    },
    list: {
        marginTop: 10
    },
    buttonSave: {
        backgroundColor: "#0060ff",
        height: 40,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSaveText: {

        color: "#ffffff",
        fontSize: 16
    }
});
