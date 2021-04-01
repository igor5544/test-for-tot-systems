import './App.css';
import React, { useEffect} from 'react';
import { Header } from './components/Header/Header';
import { AuthPage } from './components/AuthPage/AuthPage';
import { Redirect, Route, Switch } from 'react-router-dom';
import { initializeApp } from './redux/app/app';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialized } from './redux/app/selectors';
import { WorkChatPage } from './components/WorkChatPage/WorkChatPage';
import { FloodChatPage } from './components/FloodChatPage/FloodChatPage';
import { Loader } from './components/common/Loader/Loader';

export const App: React.FC = (props) => {
    const initialized = useSelector(getInitialized);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeApp());
    }, []);

    return (
        initialized ?
            <AppComponent {...props} /> :
            <Loader/>
    )
}

const AppComponent: React.FC = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/" render={() => <Redirect to="/work-chat"/>} exact/>
                <Route path="/auth" render={() => <AuthPage/>}/>
                <Route path="/work-chat" render={() => <WorkChatPage/>}/>
                <Route path="/flood-chat" render={() => <FloodChatPage/>}/>
            </Switch>
        </>
    )
}
