import { CircularProgress } from '@material-ui/core';
import React from 'react';
import s from './Loader.module.scss';

export const Loader: React.FC = () => {

    return (
        <div className={s.wrapper}>
            <CircularProgress color="secondary" size={100}/>
        </div>
    )
}