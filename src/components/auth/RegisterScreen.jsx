import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { startUserRegister } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

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

    const handleRegister = (e) => {
        e.preventDefault();
        if(!validator.isEmail(email) ){
            return console.log('correo no valido');
        }
        if( password.trim().length <=8 || password2.trim().length <=8){
            return console.log('Las contraseñas deben tener almenos 8 caracteres');
        }
        if(password !== password2){
            return console.log('Las contraseñas no coinciden');
        }
     
        dispatch(startUserRegister({email,password,name,lastName}));

    }

    return (
        <>
            <div className="auth__content-left animate__animated animate__fadeInLeft">
                
                <div className="form">
                    {msgError && <p className="msg-error">{msgError}</p>}
                    <form className="auth__form">
                        <h1>Regístrate</h1>
                        <div className="input__container ">
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
                        <div className="input__container">
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
                        <div className="input__container">
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
                        <div className="input__container">
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
