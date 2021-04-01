import { createAction, createReducer } from '@reduxjs/toolkit';
import shajs from 'sha.js';
import { authAPI } from '../../api/firebase/authAPI';
import { AppDispatch } from '../redux-store';
import firebase from 'firebase';
import { User } from '../../api/models/user';
import { UserMapper } from '../../api/mappers/user-mapper';
import { UserDto } from '../../api/dtos/user-dto';

const getHash = (str: string): string => shajs('sha256')
    .update(str).digest('hex');

const initialState = {
    isAuth: false,
    isSending: false,
    login: '',
    errorMessage: '',
    activeUser: null as User | null,
    defaultImg: 'https://i.pinimg.com/736x/77/21/8b/77218b853cbd054f1e3395f55b36a43d--raccoon-illustration-graphic-illustration.jpg'
}

type SetActiveUserDataPayload = {
    userData: User | null;
    isAuth: boolean;
}

const setErrorMessageAction = createAction<string>('SET_ERROR_MESSAGE/AUTH');
const toggleIsSendingAction = createAction<boolean>('TOGGLE_IS_SENDING/AUTH');
const setActiveUserAction = createAction<SetActiveUserDataPayload>('SET_ACTIVE_USER/AUTH');

export const auth = createReducer(initialState, {
    [setErrorMessageAction.type]: (state, action) => {
        state.errorMessage = action.payload;
    },
    [toggleIsSendingAction.type]: (state, action) => {
        state.isSending = action.payload;
    },
    [setActiveUserAction.type]: (state, action) => {
        state.activeUser = action.payload.userData;
        state.isAuth = action.payload.isAuth;
    },
});

export const setActiveUser = (
    userData: User | null,
    isAuth: boolean
) => (dispatch: AppDispatch): void => {
    dispatch(setActiveUserAction({userData, isAuth}));
}

export const initialApp = () => async (dispatch: AppDispatch): Promise<void> => {
    const login = localStorage.getItem('user');

    if (login) {
        const response: any = await authAPI.getUser(login);
        const userData: UserDto = response.data();
        const userId: string = response.id;

        dispatch(setActiveUser(UserMapper.getUser(userData, userId), true));
    } else {
        dispatch(setActiveUser(null, false));
    }
}

export const closeError = () => (dispatch: AppDispatch): void => {
    dispatch(setErrorMessageAction(''));
}

const setLocalStorage = (login: string): void => {
    localStorage.setItem('user', login);
}

const removeLocalStorage = (): void => {
    localStorage.removeItem('user');
}

const loginFunc = (
    login: string,
    password: string,
    response: any,
    dispatch: AppDispatch
): void => {
    if (!response.exists || response.data().password !== getHash(password)) {
        dispatch(setErrorMessageAction('Incorrect login or password'));
        return;
    }

    setLocalStorage(login);
    dispatch(initialApp());
}

const registrationFunc = async (
    login: string,
    password: string,
    response: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>,
    dispatch: AppDispatch
): Promise<void> => {
    if (response.exists) {
        dispatch(setErrorMessageAction('this login is already taken'));
        return;
    }

    await authAPI.setUser(login, getHash(password)).catch(error => {
        dispatch(setErrorMessageAction(error));
    });

    setLocalStorage(login);
    dispatch(initialApp());
}

type FuncCreator = (action: typeof loginFunc) =>
    (login: string, password: string) =>
        (dispatch: AppDispatch) => Promise<void>;

const authFuncCreator: FuncCreator = (action) =>
    (login, password) =>
        async (dispatch: AppDispatch) => {
            dispatch(toggleIsSendingAction(true));
            const response = await authAPI.getUser(login);

            action(login, password, response, dispatch);

            dispatch(toggleIsSendingAction(false));
        }

export const login = authFuncCreator(loginFunc);
export const registration = authFuncCreator(registrationFunc);

export const logout = () => (dispatch: AppDispatch) => {
    removeLocalStorage();
    dispatch(initialApp());
}
