import { RootState } from '../redux-store';
import { Message } from '../../api/models/message';

export const getMessages = (state: RootState): Message[] | null => (
    state.floodChat.messages
)