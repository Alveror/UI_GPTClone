import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";
import React from "react";
import Chatbox from "./Chatbox";
import { Props } from "../types/types";


export default function Body(props : Props) {
    return(
        <ThemedView style={styles.bodyContainer}>
            <Chatbox handleMessege={props.handleMessege} messeges={props.messeges}/>
        </ThemedView>
    )
}

const styles = StyleSheet.create({

    bodyContainer: {
        padding: 10,
        marginBottom: 0,
        flex: 10,
        backgroundColor: "#1b263b"
    },
})