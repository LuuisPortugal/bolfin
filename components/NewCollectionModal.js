import React, {useCallback, useState} from 'react'
import {Dimensions, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import Modal from 'react-native-modal';
import {Ionicons} from "@expo/vector-icons";
import CheckBox from '@react-native-community/checkbox';
import CollectionsService from "../services/collections";

export default function NewCollectionModal()
{
    let [modalVisible, setModalVisible] = useState(false);
    let [name, setName] = React.useState('');
    let [shareable, setShareable] = useState(false);

    const saveCollection = useCallback(() =>
    {
        if (!name)
        {
            return;
        }

        CollectionsService.addCollection({
            id: Date.now().toString(),
            date: Date.now(),
            name,
            shareable
        });

        setModalVisible(false);
        setName('');
        setShareable(false);
    });

    return (
        <>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => setModalVisible(true)}>
                <Ionicons name={"add"} size={24} color={"#0060ff"}/>
            </TouchableOpacity>
            <Modal
                isVisible={modalVisible}
                style={styles.modal}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.container}>
                    <View style={styles.dialog}>
                        <View style={styles.fields}>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={text => setName(text)}
                                autoCompleteType={"name"}
                                autoFocus={true}
                                underlineColorAndroid="transparent"
                                clearButtonMode={"while-editing"}
                                placeholder={"Coleção"}
                                placeholderColor={"#ddd"}/>
                            <View style={styles.checkbox}>
                                <Ionicons name={"share-social-outline"} size={24}/>
                                <CheckBox
                                    tintColor={"#767577"}
                                    onCheckColor={"#0060ff"}
                                    tintColors={{false: '#767577', true: '#0060ff'}}
                                    onValueChange={() => setShareable(_shareable => !_shareable)}
                                    value={shareable}/>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonSave} onPress={saveCollection}>
                            <Text style={styles.buttonSaveText}>Salvar</Text>
                        </TouchableOpacity>
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
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    input: {
        height: 40,
        fontFamily: "Assistant-Light",
        fontSize: 24,
        color: "#000"
    },
    checkbox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    buttonSave: {
        backgroundColor: "#0060ff",
        height: 40,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonSaveText: {
        fontFamily: "Assistant-Bold",
        color: "#ffffff",
        fontSize: 16
    }
});
