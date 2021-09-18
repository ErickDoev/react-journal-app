import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../features/notes/notesSlice';
import moment from 'moment';

export const NewEntry = ({id,title,body,date}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        const note = {
            id,
            title,
            body,
            date
        }
        dispatch(setActiveNote(note));
    }

    return (
        <div 
            className="journal__entry"
            onClick={handleClick}>
            
            <div className="journal__text">
                <strong><p>{title}</p></strong>
                <p className="journal__text-body">{body}</p>
            </div>
            <div className="journal__date">
                <span>{moment(date).format('dddd')}</span>
                <h4>{moment(date).format('Do')}</h4>
            </div>
        </div>
    )
}
