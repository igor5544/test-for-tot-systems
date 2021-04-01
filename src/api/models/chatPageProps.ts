import { Message } from './message';
import { User } from './user';

export interface ChatPageProps {
    messages: Message[];
    currentUser: User;
    onSendMessage: (message: string) => void;
    onUpdateMessage: (message: string, messageId: string) => void;
    onAddReaction: (likesIds: string[], messageId: string) => void;
    onRemoveReaction: (likesIds: string[], messageId: string) => void;
    onDeleteMessage: (messageId: string) => void;
}