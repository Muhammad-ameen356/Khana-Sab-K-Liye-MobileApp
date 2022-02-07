import React, { useState } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import {
    PresenceTransition,
    useToast,
} from "native-base"
import { bgMaincolor, maincolor } from "../../assests/styles/style";
import firestore from '@react-native-firebase/firestore';
import ShowAlert from '../../Components/ShowAlert';
import UserIdDetail from "./UserIdDetail";

const SearchById = () => {
    const [searchVal, setSearchVal] = useState('');
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false)
    const toast = useToast();


    const searchData = () => {
        if (searchVal.length < 20) {
            ShowAlert("Invalid", "Invalid User Id")
        } else {
            setLoading(true)
            const subscriber = firestore().collection('Forms').doc(searchVal)
                .onSnapshot(doc => {
                    console.log('User data: ', doc.data());
                    if (doc.data() !== undefined) {
                        console.log("Mil gya");
                        setData(doc.data())
                        setLoading(false)
                    } else {
                        console.log("No data");
                        setData('')
                        toast.show({
                            description: "No Any Data Found with this ID",
                            duration: 2300,
                        })
                        setLoading(false)
                    }
                });
        }
    }

    const clearData = () => {
        setData('')
        setSearchVal('')
    }

    return (
        <SafeAreaView style={styles.maincontainer}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.inputLabel}>Verify From Serial Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setSearchVal}
                            value={searchVal}
                            placeholder="Enter Serial Number"
                            keyboardType="default"
                        />
                        <View style={styles.Button}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button1} onPress={searchData}>
                                    <Text style={styles.buttonText}>Search</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button2} onPress={clearData}>
                                    <Text style={styles.buttonText}>Clear All</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <PresenceTransition
                        visible={true}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 850,
                            },
                        }}
                    >
                        <View style={styles.marginTop}>
                            {loading ?
                                <ActivityIndicator size="large" color="green" />
                                :
                                data
                                    ?
                                    <UserIdDetail data={data} />
                                    :
                                    <Text style={styles.searchText}>Search Applicant Request By Id</Text>
                            }
                        </View>
                    </PresenceTransition>
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
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
    },
    marginTop: {
        marginTop: 50,
    },
    searchText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: maincolor,
        fontSize: 20,
    },
    buttonsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button1: {
        backgroundColor: maincolor,
        padding: 8,
        borderRadius: 4,
    },
    button2: {
        backgroundColor: maincolor,
        padding: 8,
        borderRadius: 4,
        marginLeft: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default SearchById;