import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { bgMaincolor, maincolor } from '../../assests/styles/style';
import AuthContext from '../../AuthContext/AuthContext';
import Clipboard from '@react-native-community/clipboard';



const QRPage = () => {
    const authCtx = useContext(AuthContext);
    const [copyText, setCopyText] = React.useState(authCtx.userID)


    const copyToClipboard = () => {
        Clipboard.setString(`${copyText}`);
    };

    let logoFromFile = require('../../assests/images/logo.png');
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <QRCode
                            value={authCtx.userID}
                            size={180}
                            logo={logoFromFile}
                            logoSize={50}
                            logoBackgroundColor={bgMaincolor}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={copyText}
                            editable={false}
                        />
                        <Button onPress={copyToClipboard} title="Copy" backgroundColor={maincolor} color={bgMaincolor} />
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
        paddingTop: 30,
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
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
})

export default QRPage
