import React, { useState } from 'react';
import {
    Text,
    Center,
    Input,
    Stack,
} from "native-base";
import { StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { maincolor, bgMaincolor } from '../../assests/styles/style'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import ShowAlert from '../../Components/ShowAlert';




const showAlert = (err) => {
    Alert.alert(
        "Required!",
        err,
        [
            {
                text: "Cancel",
                style: "cancel",
            },
        ],
    );
}


export const Example = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(true);

    const navigation = useNavigation();

    const navigateScreen = () => {
        navigation.navigate('Login');
    };


    const handleClick = () => {
        setLoading(true)
        if (email.length === 0 || email.indexOf("@") === -1) {
            setLoading(false)
            showAlert("Invalid Email");
        } else if (pass.length === 0 || pass.length < 8) {
            setLoading(false)
            showAlert("Password Must be 8 Character Long");
        } else {
            auth().createUserWithEmailAndPassword(email, pass)
                .then((user) => {
                    console.log('User account created & signed in!', user.user.uid);
                    createAccountOnDataBase(user.user.uid);
                }).catch(error => {
                    setLoading(false)
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                        showAlert('That email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                        showAlert('That email address is invalid!');
                    }
                    console.error(error);
                });
        }
    }

    const createAccountOnDataBase = (uid) => {
        const usersCollection = firestore().collection('USERS').doc(`${uid}`);
        usersCollection.set({
            email: email,
            user_uid: uid,
            type: "user",
        }).then(() => {
            console.log("Document Write done");
            sendEmailVerification();
        }).catch((err) => {
            console.log(err);

        })
    }

    const sendEmailVerification = () => {
        // [START auth_send_email_verification]
        auth().currentUser.sendEmailVerification()
            .then(() => {
                setLoading(false)
                setEmail('');
                setPass('');
                console.log("Email Sent");
                ShowAlert("Email Verification Sent Successfully", "Please Verify Your Email Adress, Click on Recieved Link on Your Email for verification")
            }).catch((e) => {
                console.log(e, "Error Not send Email");
            })
    }

    return (
        <Stack space={5} w="100%" alignItems="center">
            <Input w={{ base: "75%", md: "25%", }}
                InputLeftElement={
                    <Icon style={[styles.forPad]} name="user" size={20} color={maincolor} />}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                defaultValue={email}
                autoCapitalize="none"

            />
            <Input w={{ base: "75%", md: "25%", }} secureTextEntry={show}
                InputLeftElement={
                    <Icon onPress={() => setShow(!show)} style={[styles.forPad]} name="eye" size={20} color={maincolor} />
                }
                placeholder="Password"
                onChangeText={text => setPass(text)}
                defaultValue={pass}
            />
            <Stack w="60%" mb="2.5" mt="1.5"
                direction={{ base: "column", md: "row", }}
                space={2}
                mx={{ base: "auto", md: "0", }}
            >
                {loading ?
                    <ActivityIndicator size="large" color="green" />
                    :
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleClick()}>
                        <Text style={styles.buttonText}>Signup</Text>
                    </TouchableOpacity>
                }
            </Stack>
            <TouchableOpacity onPress={navigateScreen}>
                <Text style={styles.createAcc}>Login Here</Text>
            </TouchableOpacity>
        </Stack>
    )
}

const Login = () => {
    return (
        <ScrollView style={[styles.main]}>
            <Center flex={1} px="1" mt="10" >
                <Image style={{ width: 200, height: 200 }} source={require('../../assests/images/logo.png')} />
                <Example />
            </Center>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: bgMaincolor,
        height: "100%"
    },
    forPad: {
        padding: 10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 8,
        backgroundColor: maincolor,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 17,
        color: "white"
    },
    createAcc: {
        color: "green",
        textDecorationLine: "underline"
    }
})

export default Login
