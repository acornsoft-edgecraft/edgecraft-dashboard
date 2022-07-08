import { MessageTypes } from '~/models/enums'

export interface IMessageType {
    display: boolean,
    severity: MessageTypes
    title: string,
    content: string
}

export const defaultMessageType: IMessageType = {
    display: false,
    severity: MessageTypes.INFO,
    title: "",
    content: "",
}
