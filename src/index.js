import '@babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import Routes from './routes';

import './styles/common.scss';

ReactDom.render(<Routes />,  document.getElementById('myApp'));