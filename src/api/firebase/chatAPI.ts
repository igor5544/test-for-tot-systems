import firebase from 'firebase';
import { db } from './firebase';
import { MessageDto } from '../dtos/message-dto';

const workChatRequest = db.collection('work-chat');
const floodChatRequest = db.collection('flood-chat');

type Request = firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

export class ChatAPI {
    public mainRequest: Request;

    constructor(mainRequsest: Request) {
        this.mainRequest = mainRequsest;
    }

    getMessages() {
        return this.mainRequest.orderBy('date', 'asc');
    }

    sendMessage(message: MessageDto) {
        return this.mainRequest.add(message);
    }

    updateMessage(message: string, id: string) {
        return this.mainRequest.doc(id).set({message}, {merge: true});
    }

    setMessageReactions(likesIds: string[], id: string) {
        return this.mainRequest.doc(id).set({likesIds}, {merge: true});
    }

    deleteMessage(id: string) {
        return this.mainRequest.doc(id).delete();
    }
}

export const workChatAPI = new ChatAPI(workChatRequest);
export const floodChatAPI = new ChatAPI(floodChatRequest);