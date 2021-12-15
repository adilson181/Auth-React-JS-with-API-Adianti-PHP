import React from "react"
import './registerStepTwoSuccess.css'

const registerStepTwoSucess = () => {


    return(
        <div className="Box-Success">
            <h1 className="Title-StepOne">Parabéns</h1>
            <p className="PStepOne">Seu cadastro foi concluído com sucesso!</p>
            <a href="/login" className="Btn-Login">Faça o login</a>
        </div>
    )
}

export default registerStepTwoSucess