import React, { useEffect,useRef } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { setActiveNote, startDeleteNote, startUpdateNote} from '../../features/notes/notesSlice';
import { useForm } from '../../hooks/useForm';

export const NotesScreen = () => {
    const {active:note} = useSelector(state => state.notes);
    const [values,handleInputChange,reset] = useForm(note);
    const {title,body} = values;
    const dispatch = useDispatch(); 

    const handleUpdateNote = () => {
        dispatch(startUpdateNote(note));
    }

    const handleDelete = () => {
        console.log('deleting note');
        dispatch(startDeleteNote(note.id));
    }

    const activeId = useRef(note.id);

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current = note.id;
        }
        
    }, [note,reset]);
    
    useEffect(() => {
        dispatch(setActiveNote({id:values.id,...values}));
    }, [values,dispatch]);

    return (
        <div className="notes ">
            <div className="notes__top">
                <div >
                    <p>{moment(note.date).format('LL')}</p>
                </div>
                <button 
                    onClick={handleUpdateNote}
                    className="btn btn-primary">
                    Guardar
                </button>
            </div>
            <div className="notes__content">
                <input 
                    type="text"
                    className="notes__input"
                    name="title"
                    value={title}
                    placeholder="Escriba algún título"
                    onChange={handleInputChange}/>
                    
                <textarea 
                    type="text"
                    className="notes__textarea"
                    name="body"
                    placeholder="Qué pasó el día de hoy?"
                    value={body}
                    onChange={handleInputChange}>

                    </textarea>
            </div>
            <div 
                onClick={handleDelete}
                className="notes__button">
                <p>Delete</p>
            </div>
        </div>
    )
}
