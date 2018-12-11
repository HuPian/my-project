import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';
import Routes from './routes';

import './styles/common.scss';

ReactDom.render(<Router> <Routes /> </Router>,  document.getElementById('myApp'));