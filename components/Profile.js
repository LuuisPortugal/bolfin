import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import UserService from "../services/user";
import Store from "../store";

export default function Profile()
{
    let [user, setUser] = useState({});

    useEffect(() =>
    {
        setUser(UserService.user());
        return Store.subscribe(() => setUser(UserService.user()));
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={{uri: user.avatar}}
            />
            <View style={styles.info}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.nick}>@{user.nick}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    logo: {
        width: 75,
        height: 75,
        borderRadius: 100,
    },
    info: {
        marginTop: 10
    },
    name: {
        fontSize: 24,
        color: '#000',

    },
    nick: {
        fontSize: 12,
        color: '#a9a9a9',

    }
});
