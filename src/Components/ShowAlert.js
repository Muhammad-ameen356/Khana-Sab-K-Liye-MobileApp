import { Alert } from "react-native";

const ShowAlert = (title, message) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: "Cancel",
                // onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
            },
        ],
    );
}

export default ShowAlert;