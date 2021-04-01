import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import s from './AuthPage.module.scss';
import {LoginForm} from '../LoginForm/LoginFrom';
import {RegistrationForm} from '../RegistrationForm/RegistrationFrom';
import {UserAuth} from '../../api/models/user';
import {useDispatch, useSelector} from 'react-redux';
import {login as loginThunk, registration} from '../../redux/auth/auth';
import {gerIsSendingAuth, getErrorMessage, getIsAuth} from '../../redux/auth/selectors';
import { Redirect } from 'react-router-dom';

export const AuthPage: React.FC = (props) => {
    const error = useSelector(getErrorMessage);
    const isSending = useSelector(gerIsSendingAuth);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    const loginFunc = ({login, password}: UserAuth) => {
        dispatch(loginThunk(login, password));
    }

    const registrationtFunc = ({login, password}: UserAuth) => {
        dispatch(registration(login, password));
    }

    return (
        <AuthPageComponent
            loginFunc={loginFunc}
            registrationtFunc={registrationtFunc}
            error={error}
            isSending={isSending}
            isAuth={isAuth}
            {...props}
        />
    )
}

interface Props {
    loginFunc: (userData: UserAuth) => void,
    registrationtFunc: (userData: UserAuth) => void,
    error: string,
    isSending: boolean,
    isAuth: boolean,
}

const AuthPageComponent: React.FC<Props> = ({
    loginFunc,
    registrationtFunc,
    error,
    isSending,
    isAuth,
}) => {
    const [isLogin, setIsLogin] = useState(true);
    const btnText = isLogin ? 'Registration' : 'Login';
    const formTitle = !isLogin ? 'Registration' : 'Login';

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    const onLogin = (userData: UserAuth): void => {
        loginFunc(userData);
    }

    const onRegistrationt = (userData: UserAuth): void => {
        registrationtFunc(userData);
    }

    if (isAuth) {
        return <Redirect to='/work-chat' />
    }

    const form = isLogin ?
        <LoginForm
            error={error}
            handleSubmit={onLogin}
            isLogin={isLogin}
            isSending={isSending}
            title={formTitle}
        /> : <RegistrationForm
            error={error}
            handleSubmit={onRegistrationt}
            isSending={isSending}
            title={formTitle}
        />

    return (
        <section className={`container ${s.wrapper}`}>
            <div>
                <h2>
                    {formTitle} form
                </h2>
                {form}
                <Button onClick={toggleForm} color="secondary">
                    Go to {btnText}
                </Button>
            </div>
        </section>
    )
}