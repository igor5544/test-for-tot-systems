import { formatDate } from '../../utils/formatDate';
import {MessageDto} from '../dtos/message-dto';
import { Message } from '../models/message';
import { User } from '../models/user';

export const MessageMapper = {
    getMessage(messageData: MessageDto, author: User, id: string): Message {
        let date: any = messageData.date;
        date = formatDate(date.toDate().toString());

        return new Message({
            message: messageData.message,
            userAvatar: author.imgUrl,
            userLogin: author.login,
            userId: author.id,
            likesIds: messageData.likesIds,
            date: date,
            id: id,
        });
    },
    getMessageDto(messageData: Message, userId: string): MessageDto {
        return {
            message: messageData.message,
            userId: userId,
            likesIds: messageData.likesIds,
            date: messageData.date,
        };
    },
}