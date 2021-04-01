import { RootState } from '../redux-store';
import {User} from '../../api/models/user';

export const getIsAuth = (state: RootState): boolean => (
    state.auth.isAuth
)

export const getActiveUser = (state: RootState): User | null => (
    state.auth.activeUser
)

export const getLogin= (state: RootState): string => (
    state.auth.login
)

export const getDefaultImg = (state: RootState): string => (
    state.auth.defaultImg
)

export const gerIsSendingAuth = (state: RootState): boolean => (
    state.auth.isSending
)

export const getErrorMessage = (state: RootState): string => (
    state.auth.errorMessage
)
