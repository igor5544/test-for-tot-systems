import { Formik } from 'formik';
import React from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import * as Yup from 'yup';
import {UserAuth} from "../../api/models/user";

interface Props {
    handleSubmit: ({ login, password }: UserAuth) => void;
    title: string;
    isLogin?: boolean;
    error: string;
    isSending: boolean;
}

export const LoginForm: React.FC<Props> = ({ handleSubmit, ...props }) => {
    const registrateValidations = Yup.object({
        login: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    const fields: UserAuth = {
        login: '',
        password: '',
    }

    return (
        <Formik
            initialValues={fields}
            onSubmit={handleSubmit}
            validationSchema={registrateValidations}
        >
            <AuthForm {...props} />
        </Formik>
    )
}