import React from "react"

import { useState } from 'react'
import Loading from '../../components/Loading'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'

import { history } from "../../history"

import './ConfirmRegister.css'

const ConfirmRegister = props => {

    const token = props.match.params.token

    const [loading, setLoading] = useState(false)
    const [validate, setValidate] = useState(true)
    const [msgValidate, setMsgValidate] = useState(null)

    

    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/validateTokenEmail/${token}`, { headers: {"Authorization" : `Basic ${process.env.REACT_APP_REST_KEY}`} })
            .then(resp => {
                const { data } = resp
                if(data.status === 'error'){
                    setValidate(false)
                    setMsgValidate(data.data)
                    console.log('ERRO:', data.data)
                }else{
                    setValidate(true)
                    console.log('sucesso:', data.data)
                }
            })
    });

    if(validate){
        const handleSubmit = values => {
            setLoading(true)
            axios.post(`${process.env.REACT_APP_API}/registerUserStepTwo`, {values},  { headers: {"Authorization" : `Basic ${process.env.REACT_APP_REST_KEY}`} })
                .then(resp => {
                    setLoading(false)
                    const data = resp.data
                    if (data.status === 'success') {
                        history.push('/confirmSuccess')
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
            usuario: yup.string().required('Informe um usuário'),
            senha: yup.string().min(5, 'Senha muito curta. (min 5 caracteres)').required('Informe uma senha'),
            passwordConfirmation: yup.string().test('passwords-match', 'As senhas devem ser iguais', function(value){
                return this.parent.senha === value
            }).required('Confirme a senha')
        })

        return(
            <div className='RegisterAcess'>
            <ToastContainer limit={3} />
            {loading && <Loading />}
            <h1 className="center">Finalizando</h1>
            <p>Para confirmação do seu email, informe os dados de acesso:</p>
            <Formik
                initialValues={{token: token}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form className="RegisterAcess-Form">
                    <div className="RegisterAcess-Group">
                        <Field
                            name="usuario"
                            placeholder='Usuário'
                            className="RegisterAcess-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="usuario"
                            className="RegisterAcess-Error"
                        />
                    </div>
                    <div className="RegisterAcess-Group">
                        <Field
                            type='password'
                            placeholder='Senha'
                            name="senha"
                            className="RegisterAcess-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="senha"
                            className="RegisterAcess-Error"
                        />
                    </div>
                    <div className="RegisterAcess-Group">
                        <Field
                            type='password'
                            placeholder='Confirme a Senha'
                            name="passwordConfirmation"
                            className="RegisterAcess-Field"
                        />
                        <ErrorMessage
                            component="span"
                            name="passwordConfirmation"
                            className="RegisterAcess-Error"
                        />
                    </div>
                    <button className="RegisterAcess-Btn" type="submit">Finalizar</button>
                </Form>
            </Formik>
            </div>
        )
    }else{
        return(
            <>
            <div className="Box-Success">
                <h1 className="Title-StepOne">{msgValidate}</h1>
                <a href="/login" className="Btn-Login">Faça o login</a>
            </div>
            </>
        )
    }
    
}

export default ConfirmRegister