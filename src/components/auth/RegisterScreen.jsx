import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { startUserRegister } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export const RegisterScreen = () => {
    const [values,handleInputChange] = useForm({
        email:'',
        name:'',
        lastName:'',
        password:'',
        password2:''
    });
    const {email,password,password2,name,lastName} = values;
    const {msgError} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [validValues, setValidValues] = useState({
        isValidEmail:true,
        isValidPasword:true,
        isValidPasword2:true,
        isValidName:true,

        msgEmail:null,
        msgName:null,
        msgPasword:null
    });

    const {msgEmail,msgName,msgPasword,isValidName,isValidEmail,isValidPasword } = validValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if(name.length <= 0){
            return setValidValues((state) => {
                return {
                    ...state,
                    msgName:'El nombre no debe estar vacio',
                    isValidName:false
                }
            });
        }else{
            setValidValues((state) => {
                return {
                    ...state,
                    msgName:null,
                    isValidName:true
                }
            });
        }

        if(!validator.isEmail(email) ){
            return setValidValues((state) => {
                return {
                    ...state,
                    msgEmail:'Correo no valido',
                    isValidEmail:false
                }
            });
        }else{
            setValidValues((state) => {
                return {
                    ...state,
                    msgEmail:null,
                    isValidEmail:true
                }
            });
        }

        if( password.trim().length <=8 || password2.trim().length <=8){
            return setValidValues((state) => {
                return {
                    ...state,
                    msgPasword:'La contraseña debe tener al menos 8 caracteres',
                    isValidPasword:false
                }
            });
        }else{
          setValidValues((state) => {
                return {
                    ...state,
                    msgPasword:null,
                    isValidPasword:true
                }
            });
        }
        if(password !== password2){
            return setValidValues((state) => {
                return {
                    ...state,
                    msgPasword:'Las contraseñas no coinciden',
                    isValidPasword:false
                }
            });
        }else{
          setValidValues((state) => {
                return {
                    ...state,
                    msgPasword:null,
                    isValidPasword:true
                }
            });
        }
     
        dispatch(startUserRegister({email,password,name,lastName}));

    }

    return (
        <>
            <div className="auth__content-left">
                
                <div className="form animate__animated animate__fadeInLeft">
                    {msgError && <p className="msg-error">{msgError}</p>}
                    <form className="auth__form">
                        <h1>Regístrate</h1>
                        <div className={`input__container ${!isValidName && 'error'}`}>
                            <label htmlFor="">
                                <i className="fas fa-user"></i>
                            </label>
                            <input 
                                className="input"
                                name="name"
                                placeholder="Escribe tu nombre"
                                value={name}
                                autoComplete="off"
                                type="text"
                                onChange={handleInputChange} />
                        </div>
                       <p>{msgName}</p>
                        <div className="input__container">
                            <label htmlFor="">
                                <i className="fas fa-signature"></i>
                            </label>
                            <input 
                                className="input"
                                name="lastName"
                                placeholder="Escribe tu apellido"
                                value={lastName}
                                autoComplete="off"
                                type="text"
                                onChange={handleInputChange} />
                        </div>
                        <div className={`input__container ${!isValidEmail && 'error '}`}>
                            <label htmlFor="">
                                <i className="fas fa-envelope"></i>
                            </label>
                            <input 
                                className="input"
                                name="email"
                                placeholder="nombre@ejemplo.com"
                                value={email}
                                autoComplete="off"
                                type="text" 
                                onChange={handleInputChange}/>
                        </div>
                        <p>{msgEmail}</p>
                        <div className={`input__container ${!isValidPasword && 'error'}`}>
                            <label htmlFor="">
                                <i className="fas fa-key"></i>
                            </label>
                            <input 
                                className="input"
                                name="password"
                                placeholder="Escribe tu contraseña"
                                value={password}
                                autoComplete="off"
                                type="password" 
                                onChange={handleInputChange}/>
                        </div>
                        <p>{msgPasword}</p>
                        <div className={`input__container ${!isValidPasword && 'error'}`}>
                            <label htmlFor="">
                                <i className="fas fa-key"></i>
                            </label>
                            <input 
                                className="input"
                                name="password2"
                                placeholder="Repite tu contraseña"
                                value={password2}
                                autoComplete="off"
                                type="password"
                                onChange={handleInputChange} />
                        </div>
                        <div className="btn-group">
                            <button 
                                onClick={handleRegister}
                                className="btn btn-primary btn-block">
                                REGISTRATE
                            </button>
                        </div>
                        <p>¿Ya estás registrado? 
                            <Link 
                                to="/auth/login">Inicia sesión</Link>
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
