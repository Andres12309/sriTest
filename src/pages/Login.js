import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/Auth';
import API from '../data';
import Cookies from 'js-cookie';
import App from '../App';

export const Login = () => {
    const { setAuthenticated, setCurrentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onFinish = async () => {
        try {
            const response = await API.post('/login/authenticate', {
                user: username,
                password: password
            });
            console.log('response login', response);

            localStorage.setItem('login', JSON.stringify(true)); // this is to sync auth state in local storage
            //localStorage.setItem('menu', JSON.stringify(response)); // this is to sync auth state in local storage
            Cookies.set('token', response.data.token, { expires: 1 });
            API.headers['Authorization'] = response.data.token; // start sending authorization header
            setCurrentUser(response.data.user);
            setAuthenticated(true);
        } catch (e) {
            console.error('No se pudo iniciar sesión', e.message);
            setAuthenticated(false);
        }
    };
    console.log("ll",useAuth().isAuthenticated)
    if (useAuth().isAuthenticated) {
        navigate('/')
    }

    return (
        <div className="login-body">
            <div className="login-panel"></div>
            <div className="login-content">
                <img src="assets/layout/images/logo-black.png" alt="babylon-layout" />
                <div className="contenedor-login" >
                    <div className="contenedor-titulo-login">
                        <h4>Iniciar Sesión</h4>
                    </div>

                    <div className="login-input-wrapper">
                        <InputText placeholder="Ingrese usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <i className="pi pi-user"></i>
                    </div>

                    <div className="login-input-wrapper">
                        <InputText type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <i className="pi pi-lock"></i>
                    </div>

                    <div className="contenedor-footer-login">
                        <Button label="Olvido la contraseña?" className="p-button-secondary p-button-text mr-2 mb-2" />
                        <Button label="Realizar prueba" className="p-button-secondary p-button-text mr-2 mb-2" />

                        <Button label="Ingresar" onClick={onFinish} />
                    </div>
                </div>
            </div>
        </div>
    );
};
