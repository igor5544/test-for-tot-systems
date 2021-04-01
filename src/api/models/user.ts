import { ConstructorInitArg } from '../../utils/constructorInitArg';

export interface UserAuth {
    login: string;
    password: string;
}

export class User {
    public login: string;
    public imgUrl: string;
    public id: string;

    constructor(data: ConstructorInitArg<User>) {
        this.login = data.login;
        this.imgUrl = data.imgUrl;
        this.id = data.id;
    }
}