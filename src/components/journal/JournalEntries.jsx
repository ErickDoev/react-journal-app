import React from 'react'
import { useSelector } from 'react-redux'
import { NewEntry } from './NewEntry'

export const JournalEntries = () => {
    const {notes} = useSelector(state => state.notes);

    return (
        <div className="journal__entries animate__animated animate__fadeInDown">
            {
                notes && 
                notes.map(e => 
                    <NewEntry 
                        key={e.id} 
                        id={e.id}
                        title={e.title}
                        body={e.body}
                        date={e.date}/>
                )
            }
        </div>
    )
}
