import React, { useEffect } from 'react';
import { withAuthRedirect } from '../../hocs/withAuthRedirect';
import { Chat } from '../Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import {
    addMessageReaction, removeMessageReaction, deleteMessage, sendMessage, setMessagesSub, updateMessage
} from '../../redux/workChat/workChat';
import { getMessages } from '../../redux/workChat/selectors';
import { ChatPageProps } from '../../api/models/chatPageProps';
import { getActiveUser } from '../../redux/auth/selectors';

const WorkChatPageApi = () => {
    const currentUser = useSelector(getActiveUser);
    let messages = useSelector(getMessages);
    messages = messages ? messages : [];
    const dispatch = useDispatch();

    /** Return unsubscribe func */
    useEffect(() => setMessagesSub(dispatch), []);

    const sendMessageFunc = (message: string): void => {
        sendMessage(message, currentUser!.id);
    }

    const addMessageReactionFunc = (
        likesIds: string[],
        messageId: string,
    ): void => {
        addMessageReaction(likesIds, messageId, currentUser!.id);
    }

    const removeMessageReactionFunc = (
        likesIds: string[],
        messageId: string,
    ): void => {
        removeMessageReaction(likesIds, messageId, currentUser!.id);
    }

    return (
        <WorkChatPageComponent
            messages={messages}
            onDeleteMessage={deleteMessage}
            onSendMessage={sendMessageFunc}
            onUpdateMessage={updateMessage}
            onAddReaction={addMessageReactionFunc}
            onRemoveReaction={removeMessageReactionFunc}
            currentUser={currentUser!}
        />
    )
}

const WorkChatPageComponent: React.FC<ChatPageProps> = (props) => (
    <Chat title={'Work chat'} {...props}/>
)

export const WorkChatPage = withAuthRedirect(WorkChatPageApi);