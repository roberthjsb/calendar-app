import React from 'react'
import './login.css'
import { useForm } from './../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLogin } from './../../actions/auth';
import { UserRegister } from './UserRegister';

export const LoginScreen = () => {
    const dispatch=useDispatch();
    const [formLoginValues, handleInputChange,] = useForm({
        lEmail:'roberth@gmail.com', 
        lPassword:'123456'
    });
    const {lEmail,lPassword} = formLoginValues;

    

    const handleInput =(e)=>{
        e.preventDefault();
        dispatch(startLogin(lEmail,lPassword));        
    }

    return (
        <div className="container login-container">
        <div className="row">
            <div className="col-md-6 login-form-1">
                <h3>Ingreso</h3>
                <form onSubmit={handleInput}>
                    <div className="form-group">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Correo"
                            name="lEmail"
                            onChange={handleInputChange}
                            value={lEmail}
                            data-testid="login_email"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            name="lPassword"
                            onChange={handleInputChange}
                            value={lPassword}
                            data-testid="login_password"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="submit"
                            className="btnSubmit"
                            value="Login" 
                        />
                    </div>
                </form>
            </div>
            <UserRegister/>
        </div>
    </div>
    )
}


