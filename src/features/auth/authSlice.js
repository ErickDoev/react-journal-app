import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

export const startUserLogin = createAsyncThunk(
    "auth/Start Login User",
    async ({email,password},{dispatch}) =>{

        const resp =  await fetchSinToken('auth',{email,password},'POST');
        const body =  await resp.json();
        console.log(body);
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(userLogin({
                name:body.name,
                lastName:body.lastName,
                id:body.uid
            }));
        }else{
            dispatch(setMsgError(body.msg));

        }
        
  
    });

export const startUserRegister = createAsyncThunk(
    "auth/Start Register User",
    async ({email,password,name,lastName},{dispatch}) => {
        
        const resp = await fetchSinToken('auth/new',{email,password,name,lastName},'POST');
        const body = await resp.json();
        console.log(body);
        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(userLogin({
                name:body.name,
                lastName:body.lastName,
                id:body.uid
            }));
        }else{
            dispatch(setMsgError(body.msg));
        }
    }
);

export const startChecking = createAsyncThunk(
    "auth/Start Checking",
    async (data,{dispatch}) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(userLogin({
                name:body.name,
                lastName:body.lastName,
                id:body.uid
            }));
        }
    }
);


const initialState = {
    user:{
        email:'',
        uid:''
    },
    checking:null,
    msgError:null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLogin:(state,action)=>{
            state.user = action.payload;

        },
        userLogOut:(state,action)=>{
            state.user = initialState.user;
            localStorage.removeItem('token');
            localStorage.removeItem('token-init-date');
        },
        setMsgError:(state,action)=>{
            state.msgError = action.payload;
        },
        clearMsgError:(state)=>{
            state.msgError = null;
        }
    },
    extraReducers:{
        [startUserLogin.rejected]:(state,action)=>{

        },
        [startUserLogin.pending]:(state)=>{
            state.checking = true
        },
        [startUserLogin.fulfilled]:(state,action)=>{
         
            state.checking = false
        },
        [startChecking.pending]:(state)=>{
            state.checking = true
        },
        [startChecking.fulfilled]:(state)=>{
            state.checking = false
        },
        [startChecking.rejected]:(state)=>{
            state.checking = true
        },
    }
});

export const {userLogin,userLogOut,setMsgError,clearMsgError} = authSlice.actions;

export default authSlice.reducer;