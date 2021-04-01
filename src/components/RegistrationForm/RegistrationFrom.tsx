import {Formik} from 'formik';
import React from 'react';
import {AuthForm} from '../AuthForm/AuthForm';
import {passwordsMatch} from '../../utils/validators';
import * as Yup from 'yup';
import {UserAuth} from "../../api/models/user";

interface Props {
    handleSubmit: ({login, password}: UserAuth) => void;
    title: string;
    error: string;
    isSending: boolean;
}

interface RegData extends UserAuth {
    repeatPassword: string;
}

export const RegistrationForm: React.FC<Props> = ({handleSubmit, ...props}) => {
    const registrateValidations = Yup.object({
        login: Yup.string()
            .required('Required'),
        password: Yup.string()
            .min(9, 'Must be 9 characters or more')
            .required('Required'),
        repeatPassword: Yup.string()
            .min(9, 'Must be 9 characters or more')
            .test('check password', 'Passwords don\'t match', passwordsMatch)
            .required('Required'),
    });

    const fields: RegData = {
        login: '',
        password: '',
        repeatPassword: '',
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