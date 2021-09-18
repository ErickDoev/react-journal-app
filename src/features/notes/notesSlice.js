import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import moment from 'moment';
import { fetchConToken} from "../../helpers/fetch";

export const startNewNote = createAsyncThunk(
    "notes/Start New Note",
    async (sech,{dispatch}) => {

        const date = moment().format();
        const newNote = {
            title:' ',
            body:' ',
            date
        }

        const resp = await fetchConToken('notes/',newNote,'POST');
        const body = await resp.json();
        const id = body.nota.id;
        
        if(body.ok){
            dispatch(addNewNote({body:'',title:'',id,date}));
            dispatch(setActiveNote({body:'',title:'',id,date}));
        }
    }
);

export const startGetNotes = createAsyncThunk(
    'notes/ Start geting notes',
    async (id) => {
        
        const resp = await fetchConToken(`notes/${id}`);
        const body = await resp.json();
        if(body.ok){
            return body.notas;
        }
        
    }
);

export const startUpdateNote = createAsyncThunk(
    "notes/ Start updating note",
    async (nota,{dispatch}) => {
        //console.log(nota.id);
        const resp = await fetchConToken(`notes/${nota.id}`,nota,'PUT');
        const body = await resp.json();
        if(body.ok){
            return nota;
        }
        
    }
);

export const startDeleteNote = createAsyncThunk(
    'notes/ Start deleting note',
    async (id,{dispatch}) => {

        const resp = await fetchConToken(`notes/${id}`,{},'DELETE');
        const body = await resp.json();
        //console.log(body);
        if(body.ok){
            dispatch(clearActive());
            return id;
        }
    }
)

const initialState = {
    notes:null,
    active:null,

}

export const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{
        addNewNote:(state,action) => {
            state.notes = [...state.notes,action.payload];
        },
        setActiveNote:(state,action) => {
            
            state.active = action.payload;
        },
        clearActive:(state) => {
            state.active = null;
        },
        clearNotes:(state,action)=>{
            state.notes=null;
        }
        
    },
    extraReducers:{
        [startGetNotes.fulfilled]:(state,action)=>{
            state.notes = action.payload;
        },
        [startUpdateNote.fulfilled]:(state,action)=>{
            state.notes = state.notes.map(n => (n.id === state.active.id) ? action.payload : n);
        },
        [startDeleteNote.fulfilled]:(state,action) => {
            state.notes = state.notes.filter(n => n.id !== action.payload ); 
        }
    }
});    

export const {
    addNewNote,
    setActiveNote,
    clearActive,
    clearNotes
} = notesSlice.actions;

export default notesSlice.reducer;