import { SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from "react-native"
import Header from "./components/Header"
import Body from "./components/Body"
import React, { useState } from "react";
import axios from "axios";
import {MessagesState} from "./types/types"
import Footer from "./components/Footer";
import { Audio } from "expo-av";



export default function App() {

    const [chatMessages, setChatMessages] = useState<Array<MessagesState>>([]);
    const [chatInput, setChatInput] = useState<string>("");
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [showRecord, setShowRecord] = React.useState<boolean>(true)
    const [recording, setRecording] = useState<Audio.Recording | null>(null);

    const toggleRecordButton = (value: boolean) => {
        setShowRecord(value);
    };

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const handleOutsidePress = () => {
        setShowOptions(false);
    };

    function handleChatInput(message: string | "") {
        setChatInput(message);
    }

    const sendMessage = async (message: string) => {
        if (message.trim() === "") return;

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: message },
        ]);

        try {
            const response = await axios.post("http://10.250.2.59:6000/chat", {
                msg: message,
            });

            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: response.data.response },
            ]);
        } catch (error) {
            console.error("Error sending message:", error);
            setChatMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "An error occurred." },
            ]);
        } finally {
            setChatInput("");
        }
    };

    


    const startRecording = async () => {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync(
             Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
        } catch (err) {
          console.error('Failed to start recording', err);
        }
      };
      
      const stopRecording = async () => {
        if (recording) {
          try {
            console.log('Stopping recording..');
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            console.log('Recording stopped and stored at', uri);
    
            if (uri) {
              // Upload the recording to the server
              await sendToTranscription(uri);
            }
          } catch (err) {
            console.error('Failed to stop recording', err);
          } finally {
            setRecording(null);
          }
        }
      };

      const sendToTranscription = async (uri: string) => {
        const formData = new FormData();
        formData.append('file', {
          uri: uri,
          name: 'recording3.mp3',
          type: 'audio/mpeg',
        } as unknown as Blob);
        try {
          const response = await axios.post('http://10.250.2.59:7000/transcribe', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setChatInput(response.data.transcription); 
        } catch (error) {
          console.error(error);
        }
      };
      

    return (
        <SafeAreaView style = {styles.mainContainer}>
            <TouchableWithoutFeedback onPress={ () => {
                handleOutsidePress()
                if (chatInput === "") {
                    toggleRecordButton(true)
                }
            }} 
                disabled={!showOptions}>
                <View style = {styles.mainContainer}>
                    <Header />
                    <Body  messeges={chatMessages}/>
                    <Footer 
                    handleMessege={sendMessage} 
                    handleChatInput={handleChatInput}
                    handleOutsidePress={handleOutsidePress}
                    input={chatInput}
                    showOptions={showOptions}
                    toggleOptions={toggleOptions}
                    toggleRecordButton={toggleRecordButton}
                    showRecord={showRecord}
                    recording={recording}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                    />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: "100%",
        backgroundColor: "black"
    },
})
