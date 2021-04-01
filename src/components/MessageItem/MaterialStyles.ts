import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    avatar: {
        width: '100px',
        height: '100px',
        border: '2px solid #f40000',
        '& img': {
            objectFit: 'fill'
        }
    },
    message: {
        width: '100%',
        margin: '0 30px',
    },
    reaction: {
        transition: 'all 0.3s',
        display: 'flex',
        alignItems: 'end',
        color: '#008000',
        opacity: '0.4',
        '&:hover': {
            opacity: '1',
        }
    },
    reactionActive: {
        opacity: '1',
    }
});