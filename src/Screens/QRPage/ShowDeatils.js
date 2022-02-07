import React, { useContext } from "react"
import {
    Box,
    Heading,
    AspectRatio,
    Image,
    Text,
    Center,
    HStack,
    Stack,
} from "native-base"
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import AuthContext from "../../AuthContext/AuthContext";

const ShowDeatils = () => {
    const authCtx = useContext(AuthContext)

    const data = authCtx.userData


    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView
                _contentContainerStyle={{
                    px: "20px",
                    mb: "4",
                    minW: "72",
                }}
            >
                <Center flex={1} px="3">

                    <Box
                        maxW="80"
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"
                        _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700",
                        }}
                        _web={{
                            shadow: 2,
                            borderWidth: 0,
                        }}
                        _light={{
                            backgroundColor: "gray.50",
                        }}
                    >
                        <Box>
                            <AspectRatio w="100%">
                                <Image
                                    source={{
                                        uri: `${data.personImg}`,
                                    }}
                                    alt="image"
                                    resizeMode={"contain"}
                                />
                            </AspectRatio>
                            <Center
                                bg="green.500"
                                _dark={{
                                    bg: "violet.400",
                                }}
                                _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs",
                                }}
                                position="absolute"
                                bottom="0"
                                px="3"
                                py="1.5"
                            >
                                PROFILE
                            </Center>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {data.name}
                                </Heading>
                                <Text
                                    fontSize="sm"
                                    _light={{
                                        color: "green.500",
                                    }}
                                    _dark={{
                                        color: "violet.400",
                                    }}
                                    fontWeight="500"
                                    ml="-0.5"
                                    mt="-1"
                                >
                                   CNIC: {data.CNIC}
                                </Text>
                            </Stack>
                            <Text>
                                <Text fontWeight="700"> Father Name: </Text><Text> {data.fatherName}</Text>
                            </Text>
                            <Text>
                                <Text fontWeight="700"> Contact Number: </Text> <Text>Dummy number</Text>
                            </Text>
                            <Text>
                                <Text fontWeight="700"> Date of Issue </Text> <Text>Dummy number</Text>
                            </Text>
                            <Text>
                                <Text fontWeight="700"> Date of Expiry: </Text> <Text>Dummy number</Text>
                            </Text>
                            <Text>
                                <Text fontWeight="700"> Branch Name: </Text> <Text>{data.nearestBranch}</Text>
                            </Text>
                            <Text>
                                <Text fontWeight="700"> Status: </Text> <Text textTransform="uppercase">{data.active_status}</Text>
                            </Text>
                            <Text>
                                <Text fontWeight="700"> ID: </Text> <Text>{data.user_uid}</Text>
                            </Text>
                        </Stack>
                    </Box>
                </Center>
            </ScrollView>
        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 20,
        marginBottom: 20,
    }
})

export default ShowDeatils
