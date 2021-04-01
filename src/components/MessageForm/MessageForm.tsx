import ReactQuill from 'react-quill';
import s from './MessageForm.module.scss';
import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Message } from '../../api/models/message';
import { useStyles } from './MaterialStyles';

interface Props {
    onSendMessage: (message: string) => void;
    isEdit: boolean;
    messageToEdit: Message | null;
    removeEditMessage: () => void;
    onUpdateMessage: (message: string, messageId: string) => void;
}

export const MessageForm: React.FC<Props> = ({
    onSendMessage,
    isEdit,
    messageToEdit,
    removeEditMessage,
    onUpdateMessage,
}) => {
    const classes = useStyles();
    const [message, setMessage] = useState('');
    const btnText = isEdit ? 'Save message' : 'Send message';

    useEffect(() => {
        if (messageToEdit) {
            setMessage(messageToEdit.message);
        }
    }, [messageToEdit]);

    const onMessageChange = (evt: string): void => {
        if (evt === '<p><br></p>') {
            evt = '';
        }
        setMessage(evt);
    }

    const onSendBtnClick = (): void => {
        if (isEdit) {
            onUpdateMessage(message, messageToEdit!.id);
            removeEditMessage();
        } else {
            onSendMessage(message);
        }
        setMessage('');
    }

    const onCancelClick = (): void => {
        removeEditMessage();
        setMessage('');
    }

    const cancelBtn = isEdit &&
        <Button
            fullWidth
            variant="contained"
            className={classes.btn}
            onClick={onCancelClick}
        >
            Cancel
        </Button>;

    return (
        <div>
            <ReactQuill
                theme="snow"
                className={s.messageControl}
                value={message}
                onChange={onMessageChange}
            />
            <div className={s.btnsWrapper}>
                {cancelBtn}
                <Button
                    color="secondary"
                    fullWidth
                    variant="contained"
                    onClick={onSendBtnClick}
                    disabled={message === ''}
                    className={classes.btn}
                >
                    {btnText}
                </Button>
            </div>
        </div>
    )
}