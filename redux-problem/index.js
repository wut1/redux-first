import "babel-polyfill"
import "jquery"
import "../lib/pagination/jquery.pagination.js"
import React from 'react'
import { render } from 'react-dom'
import App from "./containers/App"
import Root from './containers/Root'

render(<Root/> , document.getElementById('root'))

