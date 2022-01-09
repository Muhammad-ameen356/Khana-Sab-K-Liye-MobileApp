import React, { useState, useContext } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView, View, TextInput, Button } from "react-native";
import AuthContext from "../../AuthContext/AuthContext";
import { bgMaincolor, maincolor } from "../../assests/styles/style";
import firestore from '@react-native-firebase/firestore';

const SearchById = () => {
    const authCtx = useContext(AuthContext);
    const [searchVal, setSearchVal] = useState('');

    console.log(searchVal);

    const searchData = () => {
        const subscriber = firestore().collection('Forms').doc(searchVal)
            .onSnapshot(doc => {
                console.log('User data: ', doc.data());
                if(doc.data() !== undefined){
                    console.log("Mil gya");
                } else {
                    console.log("No data");
                }
            });
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.inputLabel}>User Id</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearchVal}
                            value={searchVal}
                            placeholder="Enter User Id"
                            keyboardType="default"
                        />
                        <View style={styles.Button}>
                            <Button
                                title="Search"
                                color={maincolor}
                                onPress={searchData}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        height: "100%",
        flexDirection: "row",
        backgroundColor: bgMaincolor,
    },
    container: {
        marginTop: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "green",
        padding: 10,
        backgroundColor: "white",
    },
    inputLabel: {
        // height: 0,
        marginTop: 5,
        paddingLeft: 12,
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    },
    Button: {
        justifyContent: 'center',
        alignItems: 'center'

    }
});

export default SearchById;