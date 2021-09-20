import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../../features/auth/authSlice';
import { clearNotes, setActiveNote, startNewNote } from '../../features/notes/notesSlice';
import { JournalEntries } from './JournalEntries'


export const Sidebar = () => {
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const handleCreateNewEntry = () => {
        dispatch(startNewNote());
      
    }

    const handleLogOut = () => {
        dispatch(setActiveNote(null));
        dispatch(clearNotes()); 
        dispatch(userLogOut());
    }

    return (
        
        <div className="sidebar">
            
            <div className="sidebar__top">
               
                <p>{user.name} {user.lastName}</p>
                <button 
                    className="btn btn-danger"
                    onClick={handleLogOut}>
                    Cerrar sesión
                </button>
            </div>

            <div 
                className="sidebar__icon" 
                onClick={handleCreateNewEntry}>
                <i className="far fa-calendar-plus fa-5x"></i>
                <p>Crea una nueva entrada</p>
            </div>
            <JournalEntries />
        </div>
    )
}
