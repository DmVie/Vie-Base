import React from 'react';
import ReactDOM from 'react-dom';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss'

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'))