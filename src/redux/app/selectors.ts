import { RootState } from '../redux-store';

export const getInitialized = (state: RootState): boolean => (
    state.initial.initialized
)
