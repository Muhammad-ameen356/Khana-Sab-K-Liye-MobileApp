import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'native-base'
import QRCode from 'react-native-qrcode-svg';
import { bgMaincolor, maincolor } from '../../assests/styles/style';
import AuthContext from '../../AuthContext/AuthContext';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';



const QRPage = () => {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const [copyText, setCopyText] = React.useState(authCtx.userID)
    const toast = useToast();



    const copyToClipboard = () => {
        Clipboard.setString(`${copyText}`);
        toast.show({
            description: "Serial Number Copied!",
            duration: 1300,
        })
    };

    const navigationScreen = () => {
        // navigation.navigate('showdetails', {
        //     nearestIndex: indexFind,
        //     otherParam: {userLat: latitude, userLon: longitude},
        // });
        navigation.navigate('showdetails');
    }

    let logoFromFile = require('../../assests/images/logo.png');
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <QRCode
                            value={authCtx.userID}
                            size={180}
                            logoSize={50}
                        // logo={logoFromFile}
                        // logoBackgroundColor={bgMaincolor}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={copyText}
                            editable={false}
                        />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button1} onPress={copyToClipboard}>
                            <Text style={styles.buttonText}>Copy Serial No.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button2} onPress={navigationScreen}>
                            <Text style={styles.buttonText}>Show Details</Text>
                        </TouchableOpacity>
                        {/* <Button style={styles.button1} onPress={copyToClipboard} title="Show Detail" color={maincolor} />
                            <Button style={styles.button1} onPress={copyToClipboard} title="Copy Serial Number" color={maincolor} /> */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        flexDirection: "row",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        marginTop: 30,
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "white",
        width: "100%",
        backgroundColor: maincolor,
        fontSize: 18,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button1: {
        backgroundColor: maincolor,
        padding: 10,
        borderRadius: 4,
    },
    button2: {
        backgroundColor: maincolor,
        padding: 10,
        borderRadius: 4,
        marginLeft: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
})

export default QRPage
