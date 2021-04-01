import { db } from './firebase';

const mainRequest = db.collection('users');

export const authAPI = {
    getUser(login: string) {
        return mainRequest
            .doc(login.toLowerCase()).get().then((response) =>
                response
            )
    },
    setUser(login: string, password: string): Promise<boolean> {
        return mainRequest
            .doc(login.toLowerCase()).set({
                login,
                password,
                imgUrl: null,
            }).then(() =>
                true
            )
    }
}