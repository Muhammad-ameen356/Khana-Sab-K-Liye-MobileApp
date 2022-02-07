import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import AuthContext from '../../AuthContext/AuthContext'
import firestore from '@react-native-firebase/firestore';
import { maincolor, bgMaincolor } from '../../assests/styles/style'
import { useNavigation } from '@react-navigation/native';


const AfterSubmit = () => {
    const navigation = useNavigation();

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

    const navigationScreen = () => {
        navigation.navigate('showdetails');
    }
    return (
        <SafeAreaView style={styles.Maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={{ width: 200, height: 200 }} source={require('../../assests/images/logo.png')} />
                    <Text style={styles.statusHeading}>We're evaluating your application </Text>
                    <Text style={styles.statusValue}>In order to make sure saylani hold up a standard, Usually maximum 2 working days</Text>
                    <Text style={styles.thanks}>Thanks for your patience </Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button2} onPress={navigationScreen}>
                        <Text style={styles.buttonText} >Show Details</Text>
                    </TouchableOpacity>
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
        fontSize: 22,
        // fontWeight: "bold",
        textShadowRadius: 1,
        fontStyle: 'italic',
        textShadowColor: 'black'
    },
    statusValue: {
        marginTop: 20,
        flex: 1,
        color: maincolor,
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    thanks: {
        color: maincolor,
        fontSize: 18,
        fontStyle: 'italic',
    },
    marginTop: {
        marginTop: 20,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    button2: {
        marginTop: 20,
        backgroundColor: "white",
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 70,
        paddingLeft: 70,
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: maincolor,
    },
    buttonText: {
        color: maincolor,
        fontSize: 18,
    }

})

export default AfterSubmit
