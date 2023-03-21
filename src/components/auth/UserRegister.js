import React from "react";
import { useForm } from './../../hooks/useForm';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { startUserRegister } from "../../actions/auth";

export const UserRegister = () => {
    const dispatch = useDispatch();
    const [formRegisterValues, handleRegisterChange,] = useForm({
        rname: '',
        remail: '',
        rpassword1: '',
        rpassword2: ''
    });

    const { rname,
            remail,
            rpassword1,
            rpassword2 } = formRegisterValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rpassword1 !== rpassword2) {
            return Swal.fire('Error', 'las contraseñas no son iguales', 'error')
        }
        dispatch(startUserRegister(remail, rname, rpassword1));
    }

    return <div className="col-md-6 login-form-2">
        <h3>Registro</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    name="rname"
                    value={rname}
                    onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Correo"
                    name="remail"
                    value={remail}
                    onChange={handleRegisterChange} />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="rpassword1"
                    value={rpassword1}
                    onChange={handleRegisterChange} />
            </div>

            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder="Repita la contraseña"
                    name="rpassword2"
                    value={rpassword2}
                    onChange={handleRegisterChange} />
            </div>

            <div className="form-group">
                <input
                    type="submit"
                    className="btnSubmit"
                    value="Crear cuenta" />
            </div>
        </form>
    </div>;
}