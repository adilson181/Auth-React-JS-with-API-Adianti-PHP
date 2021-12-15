import React from "react"
import loading from "../../images/loading.svg"
import "./Loading.css"

const Loading = () => {
    return(
        <div className="Loader-Container">
            <img className="Loader" src={loading} alt="Loading" />
        </div>
    )
}

export default Loading