import React from 'react';
import {Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getIsAuth} from '../redux/auth/selectors';

export const withAuthRedirect = (Component: React.FC<any>) => (props: any) => {
    const isAuth = useSelector(getIsAuth);

    if (!isAuth) {
        return <Redirect to="/auth"/>
    }

    return <Component {...props} />
}
