import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { ErrorMessage, Formik, Form, Field } from 'formik'
import Loading from '../../components/Loading'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'

import MaskedInput from "react-text-mask";

import '../login/Login.css'

const Register = () => {

    const [loading, setLoading] = useState(false)
    const handleSubmit = values => {   
        console.log(values)     
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/registerUserStepOne`, values,{ headers: {"Authorization" : `Basic ${process.env.REACT_APP_REST_KEY}`} })
            .then(resp => {
                setLoading(false)
                const data = resp.data
                if (data.status === 'success') {
                    history.push('/registredSuccess')
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
                    console.log(data)
                }
            })
    }

    const validations = yup.object().shape({
        nome: yup.string().required('Informe seu nome'),
        sobrenome: yup.string().required('Informe seu sobrenome'),
        email: yup.string().email().required('Informe um email'),
        cpf: yup.string().min(14,'o CPF deve conter 11 caracteres').required('Informe seu CPF'),
        data_nasc: yup.string().min(10,'informe uma data válida. Ex:01/12/1999').required('Informe sua Data de Nascimento')
    })
    
    return (
        <div className="Login">
        <ToastContainer limit={3} />
        {loading && <Loading />}
            <h1 className='center'>Cadastro</h1>
            <p className='center'>Preecha os campos para se cadastrar</p>
            <Formik
                initialValues={{
                    nome: '',
                    sobrenome: '',
                    email: '',
                    cpf: '',
                    data_nasc: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form>
                    <div className="Login-Group">
                        <Field
                            name="nome"
                            placeholder="Nome"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="nome"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field
                            name="sobrenome"
                            placeholder="Sobrenome"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="sobrenome"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field
                            name="email"
                            placeholder="Email"
                            className="Login-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="email"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field
                            name="cpf"
                            render={({ field }) => (
                                <MaskedInput
                                {...field}
                                guide={false}
                                mask={[/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,".",/\d/,/\d/,/\d/,"-",/\d/,/\d/]}
                                placeholder="CPF"
                                className={"Login-Field"}
                                />
                            )}
                        />
                        <ErrorMessage
                            component="span"
                            name="cpf"
                            className="Login-Error"
                        />
                    </div>
                    <div className="Login-Group">
                        <Field
                            name="data_nasc"
                            render={({ field }) => (
                                <MaskedInput
                                {...field}
                                guide={false}
                                mask={[/\d/,/\d/,"/",/\d/,/\d/,"/",/\d/,/\d/,/\d/,/\d/]}
                                placeholder="Data Nascimento"
                                className={"Login-Field"}
                                />
                            )}
                        />
                        <ErrorMessage
                            component="span"
                            name="data_nasc"
                            className="Login-Error"
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register
