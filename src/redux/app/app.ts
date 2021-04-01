import {createAction, createReducer} from '@reduxjs/toolkit';
import {initialApp} from '../auth/auth';
import {AppDispatch} from '../redux-store';

const initialState = {
    initialized: false,
};

const initAppAction = createAction('INITIALIZED_SUCCESS/APP');

export const initial = createReducer(initialState, {
    [initAppAction.type]: (state, action) => {
        state.initialized = true;
    },
});

export const initializeApp = () => async (dispatch: AppDispatch): Promise<void> => {
    await dispatch(initialApp());

    dispatch(initAppAction());
}