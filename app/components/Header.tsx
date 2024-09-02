import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { StyleSheet } from "react-native";


export default function Header() {
    return(
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="subtitle" style={styles.title}>CloneGPT</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({

    titleContainer: {
        padding: 10,
        minHeight: "6%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%"
    },

    title: {
        color: "#7ebdc2"
    }
})