import { ScrollView, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { ThemedView } from "./ThemedView";
import { Props } from "../types/types";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react"
import * as ImagePicker from "expo-image-picker";


export default function Footer(props: Props) {

    const pickPhotos = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            //multiple: true, // Adjust this if necessary
        });

        if (!result.canceled) {
            console.log("test")
            //setDevicePhotos(result.assets.map((asset) => asset.uri));
        }
    };

    return (
        <ThemedView style={styles.footerContainer}>
            <ThemedView style={styles.plusButtonContainer}>
                {/* Conditionally render the plus button or the options */}
                {!props.showOptions ? (
                    <TouchableOpacity style={styles.plusButton} onPress={() => {
                        props.toggleOptions?.()
                        props.toggleRecordButton?.(false)
                    }}>
                        <Entypo name="plus" size={24} color="lightgray" />
                    </TouchableOpacity>
                ) : (
                    <ThemedView style={styles.optionsContainer}>
                        <TouchableOpacity style={styles.optionButton}>
                            <Entypo name="camera" size={24} color="lightgray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton} onPress={pickPhotos}>
                            <Entypo name="image" size={24} color="lightgray" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.optionButton}>
                            <Entypo name="attachment" size={24} color="lightgray" />
                        </TouchableOpacity>
                    </ThemedView>
                )}
            </ThemedView>

            <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps='handled' scrollEnabled={false}>
                <TextInput
                    style={styles.chatInput}
                    value={props.input || ""}
                    placeholder="Type your message..."
                    placeholderTextColor="white" //handleOutsidePress
                    onChangeText={(text) => {
                        props.handleChatInput?.(text)
                        props.handleOutsidePress?.()
                        if (text === "" && !props.showRecord) {
                            props.toggleRecordButton?.(true)
                        }
                        else {
                            props.toggleRecordButton?.(false)
                        }

                    }}
                    multiline
                />
                {props.showRecord &&
                    <View style={styles.recordButtonContainer}>
                        <TouchableOpacity style={styles.recordButton} onPress= {
                            props.recording ? props.stopRecording : props.startRecording
                        }>
                            <FontAwesome name="microphone" size={22} color="lightgray" />
                        </TouchableOpacity>
                    </View>
                }
            </ScrollView>

            <TouchableOpacity style={styles.submitButton}>
                <AntDesign name="arrowup" size={24} color="lightgray" onPress={() => {
                    if (props.input) {
                        props.handleMessege?.(props.input)
                    }
                }} />
            </TouchableOpacity>

        </ThemedView>
    )
}

const styles = StyleSheet.create({
    chatInput: {
        minHeight: 30,
        // borderColor: 'gray',
        // borderWidth: 1,
        paddingHorizontal: 10,
        color: "#d8dbe2", //#d8dbe2
        textAlignVertical: "center",
        //borderRadius: 20,
        flexGrow: 1,
        //maxWidth: 265,

    },

    scrollViewContent: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        padding: 5,
        flexGrow: 1,
        //justifyContent: "center",
        flexDirection: "row",
    },

    footerContainer: {
        flexDirection: "row",
        padding: 6,
    },

    plusButton: {
        marginVertical: "auto",
        marginLeft: 10,
        marginRight: 12,
        padding: 3,
        borderRadius: 20,
        alignItems: "center",
        //alignSelf: "flex-end",
        justifyContent: "center",
        backgroundColor: "#415a77",
    },

    recordButtonContainer: {
        alignItems: "center",
        justifyContent: "flex-end",
        bottom: 4,
        alignSelf: "flex-end"
        //flex: 2,
    },

    recordButton: {
        //position: 'absolute',
        //right: 70,
        //top: 15,
        //width: 20,
        marginRight: 8,
    },

    optionsContainer: {
        marginVertical: "auto",
        flexDirection: 'row',
        marginHorizontal: 8,
        alignItems: 'center',
        //flex: 1,
    },

    optionButton: {
        marginHorizontal: 4,
        padding: 4,
        borderRadius: 20,
        backgroundColor: '#415a77',
        alignItems: 'center',
        justifyContent: 'center',
    },

    plusButtonContainer: {
        position: 'relative',
        alignSelf: "flex-end",
        marginBottom: 5
    },

    submitButton: {
        marginBottom: 5,
        marginLeft: 12,
        marginRight: 8,
        padding: 3,
        borderRadius: 20,
        //alignItems: "center",
        alignSelf: "flex-end",
        //justifyContent: "center",
        backgroundColor: "#415a77",
    }

})
