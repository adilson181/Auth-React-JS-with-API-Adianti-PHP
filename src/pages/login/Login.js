import React from 'react'
import { useState } from 'react'

import Loading from '../../components/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'
import './Login.css'

const Login = () => {

    const [loading, setLoading] = useState(false)

    //VERIFICAR SE JA EXISTE UMA SECTION SE EXISTIR REDIRECIONA PARA A HOME
    const isLogged = !!localStorage.getItem('app-token')
    if(isLogged){
        history.push('/')
    }


    const handleSubmit = values => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_API}/authUser/${values.user}/${values.password}`, { headers: {"Authorization" : `Basic ${process.env.REACT_APP_REST_KEY}`} })
            .then(resp => {
                setLoading(false)
                const { data } = resp
                if(data.status === 'success'){
                    //Armazena token
                    localStorage.setItem('app-token', data.data)
                    history.push('/')
                    console.log(data.data)
                }else{
                    toast.error(data.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        })
                    // console.log(data.data)
                }
            })
    }

    const validations = yup.object().shape({
        user: yup.string().required('Informe um usuario'),
        password: yup.string().min(3, 'Senha muito curta').required('Informe uma senha')
    })
    return (
        <div className='Login'>
            <ToastContainer limit={3} />
            {loading && <Loading />}
            <h1 className='center'>Login</h1>            
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="Login-Form">
                    <div className="Login-Group">
                        <Field
                            name="user"
                            placeholder='Usuário'
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="user"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field
                            type='password'
                            placeholder='Senha'
                            name="password"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="password"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Login</button>
                </Form>
            </Formik>
            <a href="/register" className='linkRegister'>Cadastre-se</a>
        </div>
    )
}

export default Login
