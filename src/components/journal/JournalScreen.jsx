import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startGetNotes } from '../../features/notes/notesSlice'
import { NotesScreen } from '../notes/NotesScreen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const {active} = useSelector(state => state.notes);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetNotes(user.id));
        
    }, [dispatch,user.id])

    return (
        <div className="journal  animate__animated animate__fadeInLeftBig">
            <Sidebar/>
            {active?<NotesScreen/>:<NothingSelected />}
            
        </div>
    )
}
