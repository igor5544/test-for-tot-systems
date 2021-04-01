import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
    control: {
        marginBottom: '10px',
        color: '#ffffff',
    },
    textarea: {
        display: 'block',
        width: '100%',
        marginTop: '10px',
        resize: 'none',
        border: 'none',
        borderBottom: '2px solid rgba(0, 0, 0, 0.22)',
        '&:hover': {
            outline: 'none',
            borderBottomColor: '#000000'
        },
        '&:focus': {
            outline: 'none',
            borderBottomColor: '#f50057'
        }
    },
});