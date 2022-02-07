import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image } from "react-native";
import MapView from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Marker } from 'react-native-maps';
import { maincolor } from '../../assests/styles/style';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import allFoodBanks from '../../foodBanks';
import { useNavigation } from '@react-navigation/native';


const MapsandDistance = () => {
    const navigation = useNavigation();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [refresh, setRefresh] = useState(false);
    const [totalDistance, setTotaldistance] = useState([]);
    const [nearestbranchIndex, setNearestIndex] = useState(0)
    const [rr, setRr] = useState(false)

    let latitudeVar = 0;
    let longitudeVar = 0;

    const getGeoLocation = () => {
        Geolocation.getCurrentPosition(info => {
            let lati = info.coords.latitude
            let longi = info.coords.longitude
            setLatitude(lati)
            setLongitude(longi)
            latitudeVar = lati;
            longitudeVar = longi;
            console.log(lati, info.coords.longitude, "from geo");
            console.log(latitude, longitude, "FRom state");
            console.log(latitudeVar, longitudeVar, "FRom var");

            setRr(!rr)
        },
            error => console.log(error),
            {
                enableHighAccuracy: false,
                timeout: 2000,
                maximumAge: 3600000
            });
    }

    useEffect(() => {
        getGeoLocation()
    }, [latitude, longitude])

    // //* This is for enable popup for Enable location

    const locationPopUp = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        }).then((data) => {
            console.log(data, "data 123");
            setRefresh(true)
            getGeoLocation()
        }).catch((err) => {
            console.log(err, "error");
            setRefresh(false)
        });
    }

    useEffect(() => {
        locationPopUp()
        getGeoLocation()
        console.log(latitude, longitude, "FRom state");
        setRr(!rr)
    }, [refresh]);


    // https://www.geeksforgeeks.org/program-distance-two-points-earth/

    ////* JavaScript program to calculate Distance Between Two Points on Earth

    const distance = (lat1, lon1) => {
        // The math module contains a function
        // named toRadians which converts from
        // degrees to radians.
        let totalDistanceArr = [];
        for (let i = 0; i < allFoodBanks.length; i++) {
            const lat2 = allFoodBanks[i].latitude;
            const lon2 = allFoodBanks[i].longitude;

            let firstlon1 = lon1 * Math.PI / 180;
            let secondlon2 = lon2 * Math.PI / 180;
            let firstlat1 = lat1 * Math.PI / 180;
            let secondlat2 = lat2 * Math.PI / 180;

            // Haversine formula
            let dlon = secondlon2 - firstlon1;
            let dlat = secondlat2 - firstlat1;
            let a = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(firstlat1) * Math.cos(lat2)
                * Math.pow(Math.sin(dlon / 2), 2);
            let c = 2 * Math.asin(Math.sqrt(a));
            // //* Radius of earth in kilometers. Use 3956 for miles
            let r = 6371;
            // calculate the result
            const cr = (c * r)
            // console.log("This is ddd===>", cr, allFoodBanks[i].branch_name);
            totalDistanceArr.push(cr)
            setTotaldistance(totalDistanceArr);
            // K.M
        }
    }

    // //* Javascript Program for finding shortest value and its index
    useEffect(() => {
        const findBranch = () => {
            console.log(totalDistance);
            // console.log(Math.min(...totalDistance));
            let indexFind = totalDistance.indexOf(Math.min(...totalDistance))
            console.log("index", indexFind);
            setNearestIndex(indexFind)
            setTimeout(() => {
                navigation.navigate('UserForm', {
                    nearestIndex: indexFind,
                    otherParam: { userLat: latitude, userLon: longitude },
                });
            }, 500);
        }
        if (totalDistance.length > 0) {
            findBranch();
        }
    }, [totalDistance])

    // const navigate = () => {
    //     setTimeout(() => {
    //         navigation.navigate('UserForm', {
    //             itemId: nearestbranchIndex,
    //             otherParam: 'anything you want here',
    //         });
    //     }, 3000);
    // }


    const onPress = () => {
        console.log("Press");
    }

    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                {refresh ?
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: longitude >0 ? latitude : 24.8607,
                            longitude: longitude >0 ? longitude : 67.0011,
                            latitudeDelta: 0.0322,
                            longitudeDelta: 0.0211,
                        }}>
                        <Marker
                            coordinate={{ latitude: latitude, longitude: longitude }}
                            // image={{ uri: 'custom_pin' }}
                            title="Current Location"
                            opacity={1}
                        >
                        </Marker>
                        {allFoodBanks.map((address, index) => {
                            return <Marker
                                key={index}
                                coordinate={{ latitude: address.latitude, longitude: address.longitude }}
                                image={require('../../assests/images/greenmarker.png')}
                                title={address.branch_name}
                                opacity={1}
                            >
                                {/* <Image source={require('../../assests/images/greenmarker.png')} style={{ height: 40, width: 25 }} /> */}
                            </Marker>
                        })
                        }
                    </MapView>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => locationPopUp()}>
                        <Text style={styles.buttonText}>Need To Access Location</Text>
                    </TouchableOpacity>
                }
                {refresh
                    ?
                    <TouchableOpacity style={styles.button} onPress={() => distance(latitude, longitude)}>
                        <Text style={styles.buttonText}>Continue to Fill Form</Text>
                    </TouchableOpacity>
                    :
                    null
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    map: {
        // width: "100%",
        // height: "100%",
        flex: 6
    },
    button: {
        alignItems: "center",
        backgroundColor: maincolor,
        padding: 12,
        flex: 0,
        TouchableOpacity: 1,
    },
    buttonText: {
        color: "white",
        fontSize: 17,
    }
});

export default MapsandDistance;