import {Alert} from '@material-ui/lab';
import {ErrorMessage} from 'formik';
import React from 'react';
import {Input} from '@material-ui/core';
import styles from './FormsControls.module.scss';
import { useStyles } from './MaterialStyles';

const ErrorALert: React.FC = ({children}) => (
    <Alert severity="error"> {children} </Alert>
)

export const InputControl: React.FC = ({field, form, ...props}: any) => {
    const classes = useStyles();

    return (
        <div className={styles.fieldWrapper}>
            <Input
                className={classes.control}
                fullWidth
                {...field}
                {...props}
                color="secondary"
            />
            <ErrorMessage component={ErrorALert} name={field.name}/>
        </div>
    )
}