import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    
    return (
        <div className='auth'>
            <Helmet>
                <title>Biuro Obrotu Nieruchomościami Bratki</title>
                <meta
                    name='description'
                    content='login page'
                />
            </Helmet>
            <h1 className='auth__title'>Zaloguj się</h1>
            <p className='auth__lead'>Zaloguj się na swoje konto</p>
            <form className='auth__form' onSubmit={e => onSubmit(e)}>
                <div className='auth__form__group'>
                    <input 
                        className='auth__form__input'
                        type='email'
                        placeholder='Email'
                        name='email' value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='password'
                        placeholder='Hasło'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                </div>
                <button className='auth__form__button'>Zaloguj się</button>
            </form>
            <p className='auth__authtext'>
                Nie masz jeszcze konta? <Link className='auth__authtext__link' to='/signup'>Zarejestruj się</Link>
            </p>
        </div>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
