import React, { useState, useContext } from 'react';
import {
    Container,
    Text,
    Heading,
    Center,
    Input,
    Stack,
    CheckIcon,
    Button,
} from "native-base";
import { StyleSheet, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { maincolor, bgMaincolor } from '../../assests/styles/style'
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import ShowAlert from '../../Components/ShowAlert';
import AuthContext from '../../AuthContext/AuthContext';
import firestore from '@react-native-firebase/firestore';


export const Example = () => {
    const authCtx = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const navigation = useNavigation();

    const navigateScreen = () => {
        navigation.navigate('Signup');
    };


    const handleLogin = () => {
        setLoading(true)
        if (email.length === 0 || email.indexOf("@") === -1) {
            setLoading(false);
            ShowAlert("Invalid Email", "Provide Valid Email");
        } else if (pass.length < 8) {
            setLoading(false)
            ShowAlert("Required", "Password Must be 8 Character Long");
        } else {
            auth().signInWithEmailAndPassword(email, pass).then((user) => {
                if (user.user.emailVerified) {

                    const subscriber = firestore()
                        .collection('USERS')
                        .doc(`${user.user.uid}`)
                        .onSnapshot(documentSnapshot => {
                            console.log('User data: ', documentSnapshot.data().type);

                            if (documentSnapshot.data().type === "manager") {
                                setLoading(false)
                                authCtx.setToogle(true)
                                authCtx.setCheckManager(true);
                            } else {
                                authCtx.setCheckManager(false);
                                authCtx.setToogle(true)
                            }

                        });
                    setEmail('');
                    setPass('');
                    console.log('User found');



                } else {
                    authCtx.setToogle(false)
                    setLoading(false)

                    ShowAlert("Email Unverified!", "Please Verify Your Email Adress, Go and Check Your Email or Also Check Spam or Junk and Try Again")
                }
            }).catch(error => {
                authCtx.setToogle(false)
                setLoading(false)
                if (error.code === 'auth/email-already-in-use') {
                    ShowAlert("Error", "That email address is already in use!");
                }
                if (error.code === 'auth/invalid-email') {
                    ShowAlert("Invalid", 'That email address is invalid!');
                }
                console.error(error);
                ShowAlert("Error", error.message);
            });
        }
    }

    return (
        <Stack space={5} w="100%" alignItems="center">
            {/* <Icon name="rocket" size={30} color="#900" />; */}
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
                        onPress={() => handleLogin()}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                }
            </Stack>
            {/* <Text>Dont Have An Account</Text> */}
            <TouchableOpacity onPress={navigateScreen}>
                <Text style={styles.createAcc}>Create Account</Text>
            </TouchableOpacity>
        </Stack>
    )
}

const Login = () => {
    return (
        <ScrollView style={[styles.main]}>
            <Center flex={1} px="1" mt="10" >
                {/* <Heading color={maincolor}>KHANA </Heading>
                SAB K LYE */}
                <Image style={{ width: 220, height: 220 }} source={require('../../assests/images/logo.png')} />
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
