import { Message } from '../api/models/message';

export const createNewMessagesList = (oldMessages: Message[], newMessage: Message): Message[] => {
    const messages = [...oldMessages];

    let changeMessageIndex = 0;

    const notUnicMessage = messages.some((message, index) => {
        const isNotUnic = message.id === newMessage.id;

        if (isNotUnic) {
            changeMessageIndex = index;
        }

        return isNotUnic;
    });

    if (notUnicMessage) {
        messages[changeMessageIndex] = newMessage;
    } else {
        messages.push(newMessage);
    }

    return messages;
}

export const removeMessage = (messages: Message[], id: string): Message[] => {
    const newMessages = [...messages];

    newMessages.forEach((message, i) => {
        if (message.id === id) {
            newMessages.splice(i, 1);
            return;
        }
    });

    return newMessages;
}
