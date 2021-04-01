import React from 'react';
import {Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {Field, Form} from 'formik';
import {InputControl} from '../common/FormControls/FormControls';
import s from './AuthForm.module.scss';

interface Props {
    title: string;
    isLogin?: boolean;
    error: string;
    isSending: boolean;
}

export const AuthForm: React.FC<Props> = ({
                                              title,
                                              isLogin = false,
                                              error,
                                              isSending
                                          }) => {
    const registrationPassword = !isLogin &&
        <Field
            component={InputControl}
            name="repeatPassword"
            placeholder="Repeat password"
            type="password"
        />

    const errorAlert = error &&
        <Alert className={s.alert} severity="error">
            {error}
        </Alert>

    return (
        <Form className={s.form}>
            <Field
                autoComplete="on"
                component={InputControl}
                name="login"
                placeholder="Login"
                type="text"
            />
            <Field
                component={InputControl}
                name="password"
                placeholder="Password"
                type="password"
            />
            {registrationPassword}
            {errorAlert}
            <Button
                color="secondary"
                disabled={isSending}
                type="submit"
                variant="outlined"
                fullWidth
            >
                {title}
            </Button>
        </Form>
    )
}