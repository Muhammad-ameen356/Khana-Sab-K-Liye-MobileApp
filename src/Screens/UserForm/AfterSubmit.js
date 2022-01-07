import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, SafeAreaView, ScrollView } from 'react-native';
import AuthContext from '../../AuthContext/AuthContext'
import firestore from '@react-native-firebase/firestore';
import { maincolor, bgMaincolor } from '../../assests/styles/style'


const AfterSubmit = () => {
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState("");

    useEffect(() => {
        const subscriber = firestore().collection('Forms').doc(authCtx.userID)
            .onSnapshot(doc => {
                console.log('User data: ', doc.data());
                if (doc.data() !== undefined) {
                    console.log("Document Found");
                    setData(doc.data())
                } else {
                    console.log("Not found");
                }
            });
    }, [authCtx])
    return (
        <SafeAreaView style={styles.Maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={{ width: 170, height: 170 }} source={require('../../assests/images/logo.png')} />
                    <Text style={styles.statusHeading}>Current Status </Text>
                    <Text style={styles.statusValue}>{data.active_status} </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Maincontainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        flexDirection: "row",
        backgroundColor: bgMaincolor,
    },
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgMaincolor,
    },
    statusHeading: {
        color: maincolor,
        fontSize: 30,
        fontWeight: "bold",
        // textDecorationLine: "underline"
    },
    statusValue: {
        color: maincolor,
        fontSize: 22,
        textTransform: "capitalize",
        textDecorationLine: "underline"
    },
    marginTop: {
        marginTop: 20,
    }

})

export default AfterSubmit
