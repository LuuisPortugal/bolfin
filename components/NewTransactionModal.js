import React, {useCallback, useEffect, useState} from 'react'
import {Dimensions, StatusBar, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import Modal from 'react-native-modal';
import {Ionicons} from "@expo/vector-icons";
import CheckBox from '@react-native-community/checkbox';

import TransactionService from "../services/transactions";
import CollectionsService from "../services/collections";
import Store from "../store";

export default function NewTransactionModal()
{
    let [modalVisible, setModalVisible] = useState(false);
    let [collection, setCollection] = useState(null);
    let [name, setName] = React.useState('');
    let [value, setValue] = useState('');
    let [type, setType] = useState(false);
    let [lock, setLock] = useState(false);

    useEffect(() =>
    {
        setCollection(CollectionsService.activeCollection());
        return Store.subscribe(() => setCollection(CollectionsService.activeCollection()));
    }, []);

    const saveTransaction = useCallback(() =>
    {
        if (!name || !value)
        {
            return;
        }

        TransactionService.addTransaction({
            id: Date.now().toString(),
            date: Date.now(),
            type: type
                ? "+"
                : "-",
            collection,
            name,
            lock,
            value
        });

        setModalVisible(false);
        setName('');
        setValue('');
        setType(false);
        setLock(false);
    });

    return (
        <>
            <TouchableOpacity
                disabled={!collection}
                onPress={() => setModalVisible(true)}>
                <Ionicons name={"add"} size={24} color={collection
                    ? "#0060ff"
                    : "#767577"}/>
            </TouchableOpacity>
            <Modal
                isVisible={modalVisible}
                style={styles.modal}
                onBackButtonPress={() => setModalVisible(false)}
                onBackdropPress={() => setModalVisible(false)}>
                <View style={styles.container}>
                    <View style={styles.dialog}>
                        <TextInput
                            style={[styles.input, styles.inputName]}
                            value={name}
                            onChangeText={text => setName(text)}
                            autoCompleteType={"name"}
                            autoFocus={true}
                            underlineColorAndroid="transparent"
                            clearButtonMode={"while-editing"}
                            placeholder={"Transação"}
                            placeholderColor={"#ddd"}/>
                        <View style={styles.valueAndLock}>
                            <View style={styles.value}>
                                <Text style={styles.cifao}>R$ </Text>
                                <TextInput
                                    style={[styles.input, styles.inputValue]}
                                    value={value}
                                    onChangeText={text => setValue(text)}
                                    autoCompleteType={"off"}
                                    clearButtonMode={"while-editing"}
                                    keyboardType={"decimal-pad"}
                                    placeholder={"Valor"}/>
                            </View>
                            <View style={styles.lock}>
                                <Ionicons name={type
                                    ? "md-add"
                                    : "md-remove-outline"} size={24}/>
                                <Switch

                                    trackColor={{false: '#b15353', true: '#81b0ff'}}
                                    thumbColor={type
                                        ? '#0060ff'
                                        : '#ff4e4e'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => setType(_type => !_type)}
                                    value={type}/>
                            </View>
                            <View style={styles.lock}>
                                <Ionicons name="md-lock-closed-outline" size={24}/>
                                <CheckBox
                                    tintColor={"#767577"}
                                    onCheckColor={"#0060ff"}
                                    tintColors={{false: '#767577', true: '#0060ff'}}
                                    onValueChange={() => setLock(_lock => !_lock)}
                                    value={lock}/>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.buttonSave} onPress={saveTransaction}>
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
    title: {
        fontSize: 24,
        fontFamily: "Assistant-Light"
    },
    input: {
        height: 40
    },
    inputName: {
        fontFamily: "Assistant-Light",
        fontSize: 24,
        color: "#000"
    },
    valueAndLock: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    value: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
    },
    cifao: {
        fontFamily: "Assistant-Light",
        color: "#000",
        fontSize: 24,
        paddingRight: 5,
    },
    inputValue: {
        fontFamily: "Assistant-Light",
        fontSize: 24,
        color: "#000"
    },
    lock: {
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
