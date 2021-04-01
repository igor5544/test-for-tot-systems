import { createAction, createReducer } from '@reduxjs/toolkit';
import { Message } from '../../api/models/message';
import { floodChatAPI } from '../../api/firebase/chatAPI';
import {
    addMessageReactionCreator,
    deleteMessageCreator, removeMessageReactionCreator, sendMessageCreator,
    setMessagesCreator, updateMessageCreator
} from '../../utils/chatFuncsCreators';
import { createNewMessagesList, removeMessage } from '../../utils/messagesListUtils';

const initialState = {
    messages: [] as Message[],
}

const setMessageAction = createAction<Message>('SET_MESSAGES/FLOOD-CHAT');
const deleteMessageAction = createAction<string>('DELETE_MESSAGES/FLOOD-CHAT');

export const floodChat = createReducer(initialState, {
    [setMessageAction.type]: (state, action) => {
        state.messages = createNewMessagesList(state.messages, action.payload);
    },
    [deleteMessageAction.type]: (state, action) => {
        state.messages = removeMessage(state.messages, action.payload);
    }
});

export const setMessagesSub = setMessagesCreator(
    floodChatAPI,
    setMessageAction,
    deleteMessageAction
);
export const sendMessage = sendMessageCreator(floodChatAPI);
export const updateMessage = updateMessageCreator(floodChatAPI);
export const addMessageReaction = addMessageReactionCreator(floodChatAPI);
export const removeMessageReaction = removeMessageReactionCreator(floodChatAPI);
export const deleteMessage = deleteMessageCreator(floodChatAPI);