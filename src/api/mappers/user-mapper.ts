import { User } from '../models/user';
import {UserDto} from '../dtos/user-dto';

export const UserMapper = {
    getUser(userData: UserDto, id: string): User {
        return new User({
            login: userData.login,
            imgUrl: userData.imgUrl,
            id: id,
        });
    },
}