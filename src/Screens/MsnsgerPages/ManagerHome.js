import React, { useState, useContext } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import AuthContext from "../../AuthContext/AuthContext";
import { bgMaincolor, maincolor } from "../../assests/styles/style";
import { useNavigation } from '@react-navigation/native';

const ManagerHome = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button2} onPress={()=> {navigation.navigate('ScanQr')}}>
                            <Text style={styles.buttonText} >Scan Qr Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={()=> {navigation.navigate('SearchById')}}>
                            <Text style={styles.buttonText}>Search By Uid</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    maincontainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
        flexDirection: "row",
        backgroundColor: bgMaincolor,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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
        fontWeight: 'bold',
    }
});

export default ManagerHome;