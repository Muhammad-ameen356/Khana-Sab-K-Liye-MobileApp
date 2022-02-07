import React, { useState, useEffect } from 'react'
import AuthContext from '../AuthContext/AuthContext.js';
import AuthHandler from '../AuthHandler/AuthHandler.js';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ACTION from './Action';

const AppRoutes = () => {
    // //* Screen Toggle 
    const [toogle, setToogle] = useState(false);
    const [checkDoc, setCheckDoc] = useState(false);
    const [checkQR, setCheckQR] = useState(false);
    const [checkManager, setCheckManager] = useState(false);

    const [userData, setUserData] = useState({});
    const [userID, setUserId] = useState(0);

    const logout = () => {
        auth().signOut().then(() => {
            // Sign-out successful.
            console.log("SignOut Successfull");
        }).catch((error) => {
            console.log("error", error);
        });
    }

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.emailVerified) {
                    var uid = user.uid;
                    console.log(user.emailVerified);
                    setUserId(uid);

                    const subscriber = firestore()
                        .collection('USERS')
                        .doc(uid)
                        .onSnapshot(documentSnapshot => {
                            console.log('User data: ', documentSnapshot.data().type);

                            if (documentSnapshot.data().type === "manager") {
                                setCheckManager(true);
                                setToogle(true);
                            } else if (documentSnapshot.data().type === "user") {
                                setCheckManager(false);
                                setToogle(true);
                                authStatusAnddataCheck(uid);
                            } else {
                                setCheckManager(false);
                                setToogle(false);
                                // ShowAlert("Invalid", "No user Found");
                            }
                        });

                } else {
                    setToogle(false)
                }
            } else {
                setToogle(false);
            }
        }, []);


        const authStatusAnddataCheck = (uid) => {
            // First Function For Finding Data and the Second Function Fining Status
            const subscriber = firestore().collection('Forms').doc(uid)
                .onSnapshot(doc => {
                    // console.log('User data: ', doc.data());

                    if (doc.data() !== undefined) {
                        console.log("Document Found");
                        setCheckDoc(true)
                        setUserData(doc.data())

                        if (doc.data().active_status === ACTION.APPROVED) {
                            setCheckQR(true);
                        } else if (doc.data().active_status === ACTION.REJECT) {
                            setCheckQR(false);
                            setCheckDoc(false);
                        } else {
                            setCheckQR(false);
                        }
                    } else {
                        console.log("Not found");
                        setCheckDoc(false)
                    }
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: toogle,
            checkDoc: checkDoc,
            checkQR: checkQR,
            checkManager: checkManager,
            setToogle: setToogle,
            setCheckManager: setCheckManager,
            userID: userID,
            userData: userData,
            logout: logout,
        }}>
            <AuthHandler userID={userID} />
        </AuthContext.Provider>

    )
}

export default AppRoutes;


// . Let+Const+Hoisting
// . This Keyword
// . For in loop & fFor of Loop
// . Template String
// . Destructuring (Array and Object)
// . Default + rest + spread
// . Closure (with Scope and its benefit)
// . Arrow Function
// . immediate Invoke Function
// . Try Catch Throw
// . Local Storage
// . Conditional Ternary
// . Promises
// . Async / wait
// . Map (more array method)
// . classes

// Extra :
// . Object Dot Assign Example
// . Object Dot keys Example
// . Object Dot Values Example