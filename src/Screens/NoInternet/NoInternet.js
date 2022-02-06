import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const NoInternet = () => {
    return (
        <View style={styles.imgContainer}>
            <Image source={require('../../assests/images/nointernet.png')} style={{ width: 300, height: 300 }} />
        </View>
    );
};

export default NoInternet;

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
