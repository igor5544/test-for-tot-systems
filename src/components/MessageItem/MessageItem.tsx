import React from 'react';
import parse from 'html-react-parser'
import { Avatar, Button, Card, CardContent } from '@material-ui/core';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import s from './MessageItem.module.scss';
import { Message } from '../../api/models/message';
import { useSelector } from 'react-redux';
import { getDefaultImg } from '../../redux/auth/selectors';
import { MessageControls } from '../MessageControls/MessageControls';
import { User } from '../../api/models/user';
import { useStyles } from './MaterialStyles';

interface Props {
    messageData: Message;
    currentUser: User;
    setEditMessage: (messageData: Message) => void;
    onDeleteMessage: (messageId: string) => void;
    onAddReaction: (likesIds: string[], messageId: string) => void;
    onRemoveReaction: (likesIds: string[], messageId: string) => void;
}

export const MessageItem: React.FC<Props> = (props) => {
    const defaultImg = useSelector(getDefaultImg);

    return <MessageItemComponent {...props} defaultImg={defaultImg}/>
}

interface ComponentProps extends Props {
    defaultImg: string;
}

const MessageItemComponent: React.FC<ComponentProps> = ({
    messageData,
    currentUser,
    defaultImg,
    setEditMessage,
    onDeleteMessage,
    onAddReaction,
    onRemoveReaction,
}) => {
    const classes = useStyles();
    const imgUrl = messageData.userAvatar ? messageData.userAvatar : defaultImg;
    const isCurrentUser = currentUser.id === messageData.userId;
    const isLiked = messageData.likesIds.some(id => id === currentUser.id);

    const onEditMessage = (): void => {
        setEditMessage(messageData);
    }

    const deleteMessage = (): void => {
        onDeleteMessage(messageData.id);
    }

    const onReactionClick = (): void => {
        if (isLiked) {
            onRemoveReaction(messageData.likesIds, messageData.id);
            return;
        }

        onAddReaction(messageData.likesIds, messageData.id);
    }

    const controls = isCurrentUser &&
        <MessageControls
            onEditMessage={onEditMessage}
            onDeleteMessage={deleteMessage}
        />;

    return (
        <div className={s.wrapper}>
            <Avatar
                alt={`User avatar ${messageData.userLogin}`}
                src={imgUrl}
                className={classes.avatar}/>
            <Card className={`${classes.message} ${s.card}`}>
                <CardContent>
                    <h3 className={s.userName}>
                        {messageData.userLogin}
                    </h3>
                    {parse(messageData.message)}

                    <div className={s.stateWrapper}>
                        <p className={s.date}>
                            {messageData.date}
                        </p>

                        <Button
                            endIcon={<ThumbUpAltOutlinedIcon/>}
                            className={`
                            ${classes.reaction} 
                            ${isLiked && classes.reactionActive}
                            `}
                            onClick={onReactionClick}
                        >
                            {messageData.likesIds.length}
                        </Button>
                    </div>

                    <div className={s.controls}>
                        {controls}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}