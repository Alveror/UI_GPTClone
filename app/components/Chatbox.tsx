import { ScrollView, StyleSheet, TouchableWithoutFeedback, Alert, Clipboard, } from "react-native";
import { ThemedView } from "./ThemedView";
import React from "react";
import {MessagesState,Props} from "../types/types"
import { ThemedText } from "./ThemedText";




export default function Chatbox(props : Props) {

    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        // Scroll to the bottom whenever messages change
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [props.messeges]);

    const handleLongPress = (text: string) => {
        Alert.alert(
            'Options',
            '',
            [
                { text: 'Copy', onPress: () => {
                    Clipboard.setString(text);
                    Alert.alert('Copied to clipboard');
                }},
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    return(
            <ScrollView ref={scrollViewRef} style={styles.chatScrollView} showsVerticalScrollIndicator={false}>
                {props.messeges?.map((msg : MessagesState, index : number) => (
                    <TouchableWithoutFeedback key = {index} onLongPress={() => handleLongPress(msg.text)}>
                        <ThemedView
                            style={[
                                styles.chatMessage,
                                msg.sender === "user" ? styles.userMessage : styles.botMessage
                            ]}
                        >
                            <ThemedText>{msg.text}</ThemedText>
                        </ThemedView>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
    )
}


const styles = StyleSheet.create({
    chatScrollView: {
        flex: 1,
    },

    chatMessage: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: "100%",
    },

    userMessage: {
        alignSelf: "flex-end",
        backgroundColor: "#415a77",
        marginRight: 5,
        maxWidth: "75%",
    },

    botMessage: {
        alignSelf: "flex-start",
        backgroundColor: "#3c6e71",
        marginLeft: 5,
    }
})