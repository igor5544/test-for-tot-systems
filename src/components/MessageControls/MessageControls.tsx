import { Button, Menu, MenuItem } from '@material-ui/core';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useStyles } from './MaterialStyles';

interface Props {
    onEditMessage: () => void,
    onDeleteMessage: () => void,
}

export const MessageControls: React.FC<Props> = ({
    onEditMessage,
    onDeleteMessage
}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const onEditBtnClic = (): void => {
        onEditMessage();
        setAnchorEl(null);
    }

    return (
        <>
            <Button
                aria-controls="message-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <DragHandleIcon/>
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={onEditBtnClic}>
                    <EditIcon
                        className={`${classes.edit} ${classes.icon}`}
                    />
                    Edit
                </MenuItem>
                <MenuItem onClick={onDeleteMessage}>
                    <DeleteIcon
                        className={classes.icon}
                        color="secondary"
                    />
                    Delete
                </MenuItem>
            </Menu>
        </>
    )
}