import React, { useEffect, useState, useContext } from 'react'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { SafeAreaView, ScrollView, StyleSheet, Image, TextInput, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import allFoodBanks from '../../foodBanks';
import { maincolor, bgMaincolor } from '../../assests/styles/style';
import ShowAlert from '../../Components/ShowAlert';
import AuthContext from '../../AuthContext/AuthContext';
import { Progress } from "native-base";


const UserForm = ({ route }) => {
    const ctx = useContext(AuthContext)
    const { nearestIndex, otherParam } = route.params;
    const [nearestBranch, setNearestBranch] = useState("");
    const [name, setName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [CNIC, setCNIC] = useState("");
    const [DOB, setDOB] = useState("");
    const [familymember, setFamilymember] = useState("");
    const [helpCategory, setHelpCategory] = useState("");
    const [monthlyIncome, setMonthlyIncome] = useState("");
    const [photo1, setPhoto1] = useState(null);
    const [photo2, setPhoto2] = useState(null);
    const [photo3, setPhoto3] = useState(null);
    const [loadingVal, setLoadningVal] = useState(null);

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Monthly Ration', value: 'Monthly_Ration' },
        { label: 'Daily 1 Time', value: 'Daily_1_Time' },
        { label: 'Daily 2 Time', value: 'Daily_2_Time' },
        { label: 'Daily 3 Time', value: 'Daily_3_Time' }
    ]);



    useEffect(() => {
        console.log(nearestIndex, otherParam);
        console.log(allFoodBanks[nearestIndex].branch_name);
    }, [])
    const calculatedbranchName = allFoodBanks[nearestIndex].branch_name
    const nearestBranchLon = allFoodBanks[nearestIndex].longitude
    const nearestBranchLat = allFoodBanks[nearestIndex].latitude

    let imgArr = [];
    let imgUrl1 = "";
    let imgUrl2 = "";
    let imgUrl3 = "";

    const onFormSubmit = () => {
        if (name.length < 3) {
            ShowAlert("Invalid 🚫", "Invalid Name");
        } else if (fatherName.length < 3) {
            ShowAlert("Invalid 🚫", "Invalid Father Name");
        } else if (CNIC.length < 13) {
            ShowAlert("Invalid 🚫", "Please Provide 13 digits CNIC Number (42401XXXXXXXX)");
        } else if (DOB.length < 10) {
            ShowAlert("Invalid 🚫", "Please Provide your Birth Date (00-00-0000)");
        } else if (familymember.length < 1) {
            ShowAlert("Invalid 🚫", "Please Provide Valid Number of Family Member");
        } else if (helpCategory.length < 1) {
            ShowAlert("Required 🚫", "Which type of help category you want");
        } else if (monthlyIncome.length < 1) {
            ShowAlert("Required 🚫", "Write Your Monthly Income");
        } else if (photo1 === null) {
            ShowAlert("Required 🚫", "Please Provide Your Image");
        } else if (photo2 === null) {
            ShowAlert("Required 🚫", "Please Provide Your Front Image of National Identity Card");
        } else if (photo3 === null) {
            ShowAlert("Required 🚫", "Please Provide Your Back Image of National Identity Card");
        } else {
            setLoading(true);
            firestore()
                .collection('Forms').where('CNIC', '==', CNIC).get()
                .then((querySnapshot) => {
                    if (querySnapshot.docChanges().length === 0) {
                        console.log("data not found");
                        uploadImage();
                    } else {
                        querySnapshot.forEach((doc) => {
                            console.log(doc.data());
                            ShowAlert("Already Exists!", `THIS CNIC Number ${CNIC} Already Exists`);
                            setLoading(false);
                        });
                    }
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        }
    }

    const dataSubmit = () => {
        console.log(imgUrl1, imgUrl2, imgUrl3);
        const usersCollection = firestore().collection('Forms').doc(`${ctx.userID}`);
        usersCollection.set({
            nearestBranch: calculatedbranchName,
            nearestBranchLongitide: nearestBranchLon,
            nearestBranchLatitude: nearestBranchLat,
            name: name,
            fatherName: fatherName,
            CNIC: CNIC,
            DOB: DOB,
            familymember: familymember,
            helpCategory: helpCategory,
            monthlyIncome: monthlyIncome,
            personImg: imgUrl1,
            CNICfront: imgUrl2,
            CNICback: imgUrl3,
            userLatitude: otherParam.userLat,
            userLongitude: otherParam.userLon,
            active_status: "pending",
            user_uid: ctx.userID,
        }).then((data) => {
            console.log("done", data);
            setName("");
            setFatherName("");
            setCNIC("");
            setDOB("");
            setFamilymember("");
            setHelpCategory("");
            setMonthlyIncome("");
            setPhoto1(null);
            setPhoto2(null);
            setPhoto3(null);
            imgUrl1 = "";
            imgUrl2 = "";
            imgUrl3 = "";
            setLoading(false);
            ShowAlert("", "Form Submited Successfully")
        }).catch((err) => {
            console.log("error", err);
            setLoading(false)
            ShowAlert("Error 🚫", "Something Went Wrong")
        })
    }

    const uploadImage = async (img) => {
        const uploadUri1 = photo1;
        const uploadUri2 = photo2;
        const uploadUri3 = photo3;

        let filename1 = uploadUri1.substring(uploadUri1.lastIndexOf('/') + 1)
        const uploadTask1 = storage().ref(filename1).putFile(uploadUri1)

        let filename2 = uploadUri2.substring(uploadUri2.lastIndexOf('/') + 1)
        const uploadTask2 = storage().ref(filename2).putFile(uploadUri2)

        let filename3 = uploadUri3.substring(uploadUri3.lastIndexOf('/') + 1)
        const uploadTask3 = storage().ref(filename3).putFile(uploadUri3)

        uploadTask1.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('First Upload is ' + progress + '% done');
                setLoadningVal(progress)
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadTask1.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('First Image File available at', downloadURL);
                    imgArr.push(downloadURL);
                    imgUrl1 = downloadURL;
                    if (imgArr.length === 3) {
                        dataSubmit();
                    }
                });
            }
        );

        uploadTask2.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Second Upload is ' + progress + '% done');
                setLoadningVal(progress)
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadTask2.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('Second Image File available at', downloadURL);
                    imgArr.push(downloadURL);
                    imgUrl2 = downloadURL
                    if (imgArr.length === 3) {
                        dataSubmit();
                    }
                });
            }
        );

        uploadTask3.on('state_changed',
            (snapshot) => {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Third Image Upload is ' + progress + '% done');
                setLoadningVal(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadTask3.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('Third Image available at', downloadURL);
                    imgArr.push(downloadURL);
                    imgUrl3 = downloadURL
                    if (imgArr.length === 3) {
                        dataSubmit()
                    }
                });
            }
        );
    }


    const yourImage = () => {
        const options = {
            noData: true
        }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setPhoto1(response.assets[0].uri);
                console.log(response.assets[0].uri + " first image");
            }
        })
    }
    const CnicFront = () => {
        const options = {
            noData: true
        }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setPhoto2(response.assets[0].uri);
                console.log(response.assets[0].uri);
            }
        })
    }
    const CnicBack = () => {
        const options = {
            noData: true
        }
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setPhoto3(response.assets[0].uri);
                console.log(response.assets[0].uri);
            }
        })
    }

    const logout = () => {
        auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.Container}>
                    <View>
                        <Text style={styles.inputLabel}>Your nearest Branch</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={nearestBranch}
                            placeholder={calculatedbranchName + " " + "Branch"}
                            placeholderTextColor="green"
                            editable={false}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>Your Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setName}
                            value={name}
                            placeholder="Name"
                            autoCapitalize='words'
                        />
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>Your Father Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFatherName}
                            value={fatherName}
                            placeholder="Father Name"
                        />
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>Your CNIC Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setCNIC}
                            value={CNIC}
                            placeholder="4240100000000"
                            keyboardType="numeric"
                            maxLength={13}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>Your Date Of Birth</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setDOB}
                            value={DOB}
                            placeholder="25-03-2001"
                            keyboardType="numeric"
                            maxLength={10}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>No Of Family Members</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFamilymember}
                            value={familymember}
                            placeholder="No Of Family member"
                            keyboardType="numeric"
                            maxLength={2}
                        />
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>Help Category</Text>
                        <View style={styles.dropdownView}>
                            <DropDownPicker
                                style={styles.dropdown}
                                open={open}
                                value={helpCategory}
                                items={items}
                                setOpen={setOpen}
                                setValue={setHelpCategory}
                                setItems={setItems}
                                placeholder="Select a Category"
                                listMode="MODAL"
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={styles.inputLabel}>Your Monthly Income</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setMonthlyIncome}
                            value={monthlyIncome}
                            placeholder="XXXXX"
                            keyboardType="numeric"
                            maxLength={5}
                        />
                    </View>
                    {/* User Image */}
                    <View>
                        <Text style={styles.inputLabel}>Your Image</Text>
                        <TouchableOpacity style={styles.input} onPress={yourImage}>
                            <Text style={{ color: "black", }}>{photo1 ? photo1 : "Select Image"}</Text>
                        </TouchableOpacity>

                        {photo1 &&
                            <View style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                <Image style={{ width: 150, height: 150, borderRadius: 150 }} source={{ uri: photo1 }} />
                            </View>
                        }


                    </View>
                    {/* CNIC FRONT */}
                    <View>
                        <Text style={styles.inputLabel}>Cnic Front Image</Text>
                        <TouchableOpacity style={styles.input} onPress={CnicFront}>
                            <Text style={{ color: "black", }}>{photo2 ? photo2 : "Select Image"}</Text>
                        </TouchableOpacity>
                        {photo2 &&
                            <View style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                <Image style={{ width: 150, height: 150 }} source={{ uri: photo2 }} />
                            </View>
                        }
                    </View>
                    {/* CNIC BACK */}
                    <View>
                        <Text style={styles.inputLabel}>Cnic Back Image</Text>
                        <TouchableOpacity style={styles.input} onPress={CnicBack}>
                            <Text style={{ color: "black", }}>{photo3 ? photo3 : "Select Image"}</Text>
                        </TouchableOpacity>
                        {photo3 &&
                            <View style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                <Image style={{ width: 220, height: 220 }} source={{ uri: photo3 }} />
                            </View>
                        }
                    </View>

                    {loading &&
                        <Progress mt="5" colorScheme="green" bg="green.200" mb="4" value={loadingVal} mx="4" />
                    }
                    <View style={styles.buttonView}>
                        {loading ?
                            <View>
                                <ActivityIndicator size="large" color="green" />
                            </View>

                            :
                            <TouchableOpacity style={styles.button} onPress={onFormSubmit} >
                                <Text style={{ color: "white", fontSize: 17, }}>Submit Request</Text>
                            </TouchableOpacity>

                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Container: {
        backgroundColor: bgMaincolor,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: "green",
        padding: 10,
        backgroundColor: "white"
    },
    dropdown: {
        height: 40,
        borderWidth: 1,
        borderColor: "green",
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 0,
    },
    dropdownView: {
        paddingRight: 12,
        paddingLeft: 12,
    },
    inputLabel: {
        // height: 0,
        marginTop: 5,
        paddingLeft: 12,
    },
    buttonView: {
        marginBottom: 20,
        alignItems: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: maincolor,
        color: "white",
        padding: 10,
        width: 220,
        borderRadius: 4,
        marginTop: 20,
    },
});

export default UserForm
