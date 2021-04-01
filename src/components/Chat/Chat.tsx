import React, { useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { MessageItem } from '../MessageItem/MessageItem';
import s from './Chat.module.scss';
import { ChatPageProps } from '../../api/models/chatPageProps';
import { MessageForm } from '../MessageForm/MessageForm';
import { Message } from '../../api/models/message';

interface Props extends ChatPageProps {
    title: string,
}

export const Chat: React.FC<Props> = ({
    title,
    messages,
    onSendMessage,
    currentUser,
    onUpdateMessage,
    onDeleteMessage,
    onAddReaction,
    onRemoveReaction,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [messageToEdit, setMessageToEdit] = useState<Message | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = (): void => {
        messagesEndRef.current!.scrollIntoView({behavior: 'smooth'})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages.length]);

    const setEditMessage = (messageData: Message) => {
        setIsEdit(true);
        setMessageToEdit(messageData);
    }

    const removeEditMessage = () => {
        setIsEdit(false);
        setMessageToEdit(null);
    }

    const messagesList = messages.map(message => (
        <MessageItem
            key={message.id}
            messageData={message}
            currentUser={currentUser}
            setEditMessage={setEditMessage}
            onDeleteMessage={onDeleteMessage}
            onAddReaction={onAddReaction}
            onRemoveReaction={onRemoveReaction}
        />
    ));

    return (
        <section className={`container ${s.wrapper}`}>
            <h2 className={s.title}>
                {title}
            </h2>
            <div className={s.chatWrapper}>
                {messagesList}

                <div ref={messagesEndRef}/>
            </div>
            <MessageForm
                onSendMessage={onSendMessage}
                onUpdateMessage={onUpdateMessage}
                isEdit={isEdit}
                messageToEdit={messageToEdit}
                removeEditMessage={removeEditMessage}
            />
        </section>
    )
}
