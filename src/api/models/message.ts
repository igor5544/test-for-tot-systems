import {ConstructorInitArg} from '../../utils/constructorInitArg';

export class Message {
    public message: string;
    public userAvatar: string;
    public userLogin: string;
    public likesIds: string[];
    public userId: string;
    public date: Date;
    public id: string;

    constructor(data: ConstructorInitArg<Message>) {
        this.message = data.message;
        this.userAvatar = data.userAvatar;
        this.userLogin = data.userLogin;
        this.userId = data.userId;
        this.likesIds = data.likesIds;
        this.date = data.date;
        this.id = data.id;
    }
}