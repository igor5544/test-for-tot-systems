import { AppDispatch } from '../redux/redux-store';
import { ChatAPI } from '../api/firebase/chatAPI';
import { Message } from '../api/models/message';
import { MessageDto } from '../api/dtos/message-dto';
import { authAPI } from '../api/firebase/authAPI';
import { UserDto } from '../api/dtos/user-dto';
import { MessageMapper } from '../api/mappers/message-mapper';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { UserMapper } from '../api/mappers/user-mapper';

type SetMessageCreatorType = (
    api: ChatAPI,
    addAction: ActionCreatorWithPayload<Message>,
    deleteAction: ActionCreatorWithPayload<string>,
) => (dispatch: AppDispatch) => () => void;

export const setMessagesCreator: SetMessageCreatorType = (
    api,
    addAction,
    deleteAction
) => (dispatch) => {
    return api.getMessages().onSnapshot((response) => {
        response.docChanges().forEach(async (messageResponse: any) => {
            const {id} = messageResponse.doc;
            const messageDto: MessageDto = messageResponse.doc.data();

            const authorResponse: any = await authAPI.getUser(messageDto.userId);
            const authorDto: UserDto = authorResponse.data();
            const authorId = authorResponse.id;
            const author = UserMapper.getUser(authorDto, authorId);

            const message = MessageMapper.getMessage(messageDto, author, id);

            if (messageResponse.type === 'removed') {
                dispatch(deleteAction(id));
            } else  {
                dispatch(addAction(message));
            }
        });
    });
}

type SendMessageCreatorType = (
    api: ChatAPI
) => (message: string, userId: string) => void;

export const sendMessageCreator: SendMessageCreatorType = (
    api
) => (message, userId) => {
    api.sendMessage({
        message,
        likesIds: [],
        userId,
        date: new Date(),
    });
}

type UpdateMessageCreatorType = (
    api: ChatAPI
) => (message: string, messageId: string) => void;

export const updateMessageCreator: UpdateMessageCreatorType = (
    api
) => (message, messageId) => {
    api.updateMessage(
        message,
        messageId,
    );
}

type AddMessageReactionType = (
    api: ChatAPI
) => (likesIds: string[], messageId: string, uesrId: string) => void;

export const addMessageReactionCreator: AddMessageReactionType = (
    api
) => (likesIds, messageId, uesrId) => {
    api.setMessageReactions(
        [...likesIds, uesrId],
        messageId,
    );
}

type RemoveMessageReactionType = (
    api: ChatAPI
) => (likesIds: string[], messageId: string, uesrId: string) => void;

export const removeMessageReactionCreator: RemoveMessageReactionType = (
    api
) => (likesIds, messageId, uesrId) => {
    likesIds = likesIds.filter(id => id !== uesrId);

    api.setMessageReactions(
        likesIds,
        messageId,
    );
}

type DeleteMessageCreatorType = (
    api: ChatAPI
) => (messageId: string) => void;

export const deleteMessageCreator: DeleteMessageCreatorType = (
    api
) => (messageId: string) => {
    api.deleteMessage(messageId);
}