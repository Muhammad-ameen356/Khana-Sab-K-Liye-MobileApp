import React, { useContext, useEffect } from 'react'
import { Image, StyleSheet, View, Text, ImageBackground, Button } from 'react-native';
import AuthContext from '../AuthContext/AuthContext'

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Screens/Login/Login'
import Signup from '../Screens/Signup/Signup'
import MapsandDistance from '../Screens/UserForm/MapsandDistance.js';
import UserForm from '../Screens/UserForm/UserForm.js';
import AfterSubmit from '../Screens/UserForm/AfterSubmit'
import QRPage from '../Screens/QRPage/QRPage';
import ManagerHome from '../Screens/MsnsgerPages/ManagerHome';

import { bgMaincolor, maincolor } from '../assests/styles/style';



const Stack = createNativeStackNavigator();



function splashScreen1({ navigation }) {
    const authCtx = useContext(AuthContext);
    setTimeout(() => {
        // authCtx.isLoggedIn && authCtx.checkDoc ? navigation.replace('Status') : (authCtx.isLoggedIn ? navigation.replace('MapsandDistance') : navigation.replace('Login'))
        authCtx.isLoggedIn && authCtx.checkDoc && authCtx.checkQR ? navigation.replace('QRPage') : (authCtx.isLoggedIn && authCtx.checkDoc ? navigation.replace('Status') : authCtx.isLoggedIn ? navigation.replace('MapsandDistance') : navigation.replace('Login'))
    }, 2000);
    return (
        <View style={styles.container}>
            <ImageBackground style={{ resizeMode: "cover", height: '100%', width: '100%' }} source={require('../assests/images/bc.jpg')}>

                <View style={styles.view1}>
                    <Image
                        style={styles.Image}
                        source={require('../assests/images/logo.png')} />
                </View>
            </ImageBackground>
        </View>
    )
}


const IfLog = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false, }} name="splashScreen" component={splashScreen1} />
                <Stack.Screen name="MapsandDistance" component={MapsandDistance} options={{ headerShown: false }} />
                <Stack.Screen name="UserForm" component={UserForm} options={{
                    title: 'Application Form',
                    headerStyle: {
                        backgroundColor: maincolor,
                        height: 60,
                    },
                    headerTintColor: bgMaincolor,
                    headerTitleStyle: {
                        fontSize: 22,
                        textTransform: "uppercase"
                    },
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const IfNotLog = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false, }} name="splashScreen" component={splashScreen1} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}


const IfDocFind = () => {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false, }} name="splashScreen" component={splashScreen1} />
                <Stack.Screen name="Status" component={AfterSubmit} options={{
                    title: 'Application Status',
                    headerStyle: {
                        backgroundColor: maincolor,
                        height: 60,
                    },
                    headerTintColor: bgMaincolor,
                    headerTitleStyle: {
                        fontSize: 22,
                        textTransform: "uppercase"
                    },
                    headerRight: () => (
                        <Button
                            onPress={authCtx.logout}
                            title="Logout"
                            color={maincolor}
                        />
                    ),
                }} />
                {/* <Text>Logout</Text> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const IfDocAccepted = () => {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false, }} name="splashScreen" component={splashScreen1} />
                <Stack.Screen name="QRPage" component={QRPage} options={{
                    title: 'QRPage',
                    headerStyle: {
                        backgroundColor: maincolor,
                        height: 60,
                    },
                    headerTintColor: bgMaincolor,
                    headerTitleStyle: {
                        fontSize: 22,
                        textTransform: "uppercase"
                    },
                    headerRight: () => (
                        <Button
                            onPress={authCtx.logout}
                            title="Logout"
                            color={maincolor}
                        />
                    ),
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



const IfManager = () => {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={ManagerHome} options={{
                    title: 'Home',
                    headerStyle: {
                        backgroundColor: maincolor,
                        height: 60,
                    },
                    headerTintColor: bgMaincolor,
                    headerTitleStyle: {
                        fontSize: 22,
                        textTransform: "uppercase"
                    },
                    headerRight: () => (
                        <Button
                            onPress={authCtx.logout}
                            title="Logout"
                            color={maincolor}
                        />
                    ),
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}




const AuthHandler = () => {
    const authCtx = useContext(AuthContext);
    // return authCtx.isLoggedIn && authCtx.checkDoc && authCtx.checkQR ? <IfDocAccepted /> : (authCtx.isLoggedIn && authCtx.checkDoc ? <IfDocFind /> : authCtx.isLoggedIn ? <IfLog /> : <IfNotLog />)
    return authCtx.isLoggedIn && authCtx.checkManager ? <IfManager /> : authCtx.isLoggedIn && authCtx.checkDoc && authCtx.checkQR ? <IfDocAccepted /> : (authCtx.isLoggedIn && authCtx.checkDoc ? <IfDocFind /> : authCtx.isLoggedIn ? <IfLog /> : <IfNotLog />)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Image: {
        // top: 70,
        width: 300,
        height: 300,
    },
    view1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },


})

export default AuthHandler
