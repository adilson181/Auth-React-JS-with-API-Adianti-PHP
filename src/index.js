import React from 'react'
import ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './containers/App'

import 'normalize.css'
import './index.css'

require('dotenv').config()

ReactDOM.render(<App />, document.getElementById('root'))
