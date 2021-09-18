import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { JournalScreen } from '../components/journal/JournalScreen';
import { startChecking } from '../features/auth/authSlice';
import { AuthRouter } from './AuthRouter';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';

export const AppRouter = () => {

    const {user,checking} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('checking');
        dispatch(startChecking());
    }, [dispatch]);

    if(checking){
        return <LoadingScreen/>
    }

    return (
        <Router>

            <div className="main">
                <Switch>

                    <PublicRoutes
                        path='/auth'
                        component={AuthRouter}
                        isLoggedIn={!!user.id}
                    />

                    <PrivateRoutes
                        exact
                        path='/'
                        component={JournalScreen}
                        isLoggedIn={!!user.id} 
                    />

                    <Redirect to='/'/>

                </Switch>
            </div>
        </Router>
    )
}
