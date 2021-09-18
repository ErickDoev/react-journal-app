import React from 'react';
//import { JournalScreen } from './components/journal/JournalScreen'
import { store } from "./store/store";
import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter';
export const JournalApp = () => {

    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}
