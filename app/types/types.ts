import { Audio } from "expo-av";


export interface MessagesState {
    sender: string
    text: string
}

export interface Props {
    handleMessege?: (message: string) => void
    handleChatInput?: (message: any) => void
    handleOutsidePress?: (() => void)
    toggleOptions?: () => void
    startRecording?: () => void
    stopRecording?: () => void
    messeges?: MessagesState[]
    input?: string
    showOptions?: boolean
    showRecord?: boolean
    recording?: Audio.Recording | null
    toggleRecordButton?: (value: boolean) => void
}