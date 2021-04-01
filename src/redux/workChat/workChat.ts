import { createAction, createReducer } from '@reduxjs/toolkit';
import { Message } from '../../api/models/message';
import { workChatAPI } from '../../api/firebase/chatAPI';
import {
    deleteMessageCreator, sendMessageCreator, addMessageReactionCreator, setMessagesCreator, updateMessageCreator, removeMessageReactionCreator
} from '../../utils/chatFuncsCreators';
import { createNewMessagesList, removeMessage } from '../../utils/messagesListUtils';

const initialState = {
    messages: [] as Message[],
}

const setMessageAction = createAction<Message>('SET_MESSAGES/WORK-CHAT');
const deleteMessageAction = createAction<string>('DELETE_MESSAGES/WORK-CHAT');

export const workChat = createReducer(initialState, {
    [setMessageAction.type]: (state, action) => {
        state.messages = createNewMessagesList(state.messages, action.payload);
        ;
    },
    [deleteMessageAction.type]: (state, action) => {
        state.messages = removeMessage(state.messages, action.payload);
    }
});

export const setMessagesSub = setMessagesCreator(
    workChatAPI,
    setMessageAction,
    deleteMessageAction
);
export const sendMessage = sendMessageCreator(workChatAPI);
export const updateMessage = updateMessageCreator(workChatAPI);
export const addMessageReaction = addMessageReactionCreator(workChatAPI);
export const removeMessageReaction = removeMessageReactionCreator(workChatAPI);
export const deleteMessage = deleteMessageCreator(workChatAPI);