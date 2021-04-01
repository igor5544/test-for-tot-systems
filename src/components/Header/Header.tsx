import { AppBar, Avatar, Button, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import s from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveUser, getDefaultImg } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/auth';
import { useStyles } from './MaterialStyles';

export const Header: React.FC = (props) => {
    const user = useSelector(getActiveUser);
    const defaultImg = useSelector(getDefaultImg);
    const dispatch = useDispatch();

    const login = user ? user.login : '';
    const image = user?.imgUrl ? user.imgUrl : defaultImg;

    const logutFunc = () => {
        dispatch(logout());
    }

    return (
        <HeaderComponent login={login} image={image} logutFunc={logutFunc}/>
    )
}

interface Props {
    login: string;
    image: string;
    logutFunc: () => void;
}

const HeaderComponent: React.FC<Props> = ({login, image, logutFunc}) => {
    const classes = useStyles();
    const location = useLocation();
    const [value, setValue] = React.useState<number | boolean>(false);

    useEffect(() => {
        switch (location.pathname) {
            case '/work-chat':
                setValue(0);
                break;
            case '/flood-chat':
                setValue(1);
                break;
            default:
                setValue(false);
        }
    }, [location.pathname]);

    return (
        <AppBar position="static" className={s.wrapper}>
            <Toolbar variant="dense">
                <Typography variant="h6" className={classes.title}>
                    ТОТ systems
                </Typography>
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    variant="fullWidth"
                    className={classes.tabs}
                >
                    <Tab
                        label="Work chat"
                        activeClassName="active-link"
                        to="/work-chat"
                        component={NavLink}
                        disabled={!login}
                    />
                    <Tab
                        label="Flood chat"
                        to="/flood-chat"
                        component={NavLink}
                        disabled={!login}
                    />
                </Tabs>
                {login && <div className={s.logout}>
                    <p>{login}</p>
                    <Avatar alt={`Avatar ${login}`} src={image}/>
                    <Button
                        color="secondary"
                        variant="outlined"
                        className={classes.button}
                        onClick={logutFunc}
                    >Logout</Button>
                </div>}
            </Toolbar>
        </AppBar>
    )
}
