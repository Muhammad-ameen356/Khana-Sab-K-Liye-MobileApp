import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Alert, Button } from 'react-native'
import { Camera, useCameraDevices } from 'react-native-vision-camera';




const ScanQr = () => {
    const camera = useRef(null);

    const [previewImage, setPreviewImage] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [torchActive, setTorchActive] = useState(false);
    const [frontCamera, setFrontCamera] = useState(false);

    /* Here we use hook provided by library to take available devices (lenses) */
    const availableDevices = useCameraDevices();

    /* useCameraDevices hook returns an object with front/back properties,
       that you can use to switch between back and front camera */
    const currentDevice =
        frontCamera && availableDevices?.front ? availableDevices.front : availableDevices?.back;

    const takePhoto = async () => {
        try {
            const result = await camera.current?.takePhoto();
            if (result?.path) setPreviewImage(result.path);
        } catch (e) {
            Alert.alert(`Error: ${e}`);
        }
    };

    const flipCamera = () => setFrontCamera((prevState) => !prevState);
    const toggleTorch = () => setTorchActive((prevState) => !prevState);

    if (!currentDevice) return null;

    if (previewImage && showPreview) {
        return <ImagePreview path={previewImage} dismissPreview={() => setShowPreview(false)} />;
    }

    return (
        <React.Fragment>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={currentDevice}
                isActive={true}
                photo={true}
                torch={torchActive ? 'on' : 'off'}
            />
            <Button title='Clcik' onPress={toggleTorch} />
            <Button
                showPreview={() => setShowPreview(true)}
                title='Clcik'
            // takePhoto={takePhoto}
            // flipCamera={flipCamera}
            />
        </React.Fragment>
    )
}

export default ScanQr

const styles = StyleSheet.create({})


{/* <View>
    <Text>QR Scanner</Text>
</View> */}