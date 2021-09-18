import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch,useSelector } from 'react-redux';
import {  clearMsgError, startUserLogin} from '../../features/auth/authSlice';

export const LoginScreen = () => {

    const [values,handleInputChange] = useForm({
        email:'',
        password:''
    });
    const {email,password} = values;
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState({
        isValidEmail:true,
        msgEmail:null,
        isValidPassword:true,
        msgPassword:null
    });
    const {isValidEmail,isValidPassword,msgEmail,msgPassword}= isValid;
    const {msgError} = useSelector(state => state.auth);

    const handleLogIn = (e) => {
   
        e.preventDefault();
        if(!validator.isEmail(email) ){
            return setIsValid((state)=>{
                return {
                    ...state,
                    isValidEmail:false,
                    msgEmail:'Correo no valido'
                }
            });
        }else{
            setIsValid((state)=>{
                return {
                    ...state,
                    isValidEmail:true,
                    msgEmail:''
                }
            });
        }
           
        if( password.trim().length <8 ){
            return setIsValid((state)=>{
                return {
                    ...state,
                    isValidPassword:false,
                    msgPassword:'La contraseña debe tener al menos 8 caracteres'
                }
            });
        } else {
            setIsValid((state)=>{
                return {
                    ...state,
                    isValidPassword:true,
                    msgPassword:''
                }
            });
        }

        dispatch(startUserLogin({email,password}));
    
    }

    return (
        <>
            <div className="auth__content-left animate__animated animate__fadeInLeft">
                <div className="form">
                    {msgError && <p className="msg-error">{msgError}</p>}
                    <form className="auth__form">
                        <h1>Iniciar sesión</h1>
                        <div className={isValidEmail ?"input__container" : "input__container error"}>
                            <label htmlFor="">
                                <i className="fas fa-envelope"></i>
                            </label>
                            <input
                                onChange={handleInputChange} 
                                //className="input error-input "
                                className={isValidEmail ? 'input':'input error-input'}
                                name="email"
                                value={email}
                                autoComplete="off"
                                placeholder="nombre@ejemplo.com"
                                type="text" />
                                
                        </div>
                        <p>{msgEmail}</p>
                        <div className={isValidPassword ?"input__container" : "input__container error"}>
                            <label htmlFor="">
                                <i className="fas fa-key"></i>
                            </label>
                            <input 
                                onChange={handleInputChange}
                                className={isValidPassword? 'input':'input error-input'}
                                name="password"
                                placeholder="Introduce 6 caracteres o más"
                                value={password}
                                autoComplete="off"
                                type="password" />
                                
                        </div>
                        <p>{msgPassword}</p>
                        
                        <div className="btn-group">
                            <button
                                onClick={handleLogIn} 
                                className="btn btn-primary btn-block">
                                INICIAR SESIÓN
                            </button>

                        </div>
                        <p>¿Aún no estas registrado? 
                            <Link
                                onClick={clearMsgError} 
                                to="/auth/register">Registrate</Link>
                        </p>
                    </form>
                </div>
            
            </div>
            <div className="auth__content-right">
                <div className="auth__img">
                    <img src="https://images2.alphacoders.com/559/559116.png" alt="logo" />
                </div>
            </div>
        </>
    )
}
