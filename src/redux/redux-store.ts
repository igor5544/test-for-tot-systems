import {combineReducers, configureStore as crateStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {auth} from './auth/auth';
import {initial} from './app/app';
import { workChat } from './workChat/workChat';
import { floodChat } from './floodChat/floodChat';

const rootReducer = combineReducers({
    auth,
    initial,
    workChat,
    floodChat
});

export const store = crateStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;