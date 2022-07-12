import React from "react";
import {useState} from "react";
import { StyleSheet, Text, View } from 'react-native';

function PhoneNum(props) {
        return (
            <View style={styles.phoneNum}>
                <Text style={styles.text}>{props.userName}</Text>
            </View>
        );
    }

export default PhoneNum

const styles = StyleSheet.create({
    phoneNum: {
        paddingLeft: 40
    },
    text: {
        color: 'black',
        fontWeight: '400',
        fontSize: 20
    }
})