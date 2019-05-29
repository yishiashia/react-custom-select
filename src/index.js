import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, HashRouter, BrowserRouter, NavLink } from 'react-router-dom';
import CustomSelect from './components/CustomSelect';
import 'babel-polyfill';
import "isomorphic-fetch"
import 'url-search-params-polyfill';

import './scss/main.scss';

ReactDOM.render(
  <CustomSelect title="Custom Select"
  				options={[
  					{name: "option_1", value: "value_1"},
  					{name: "option_2", value: "value_2"},
  					{name: "option_3", value: "value_3"},
  					{name: "option_4", value: "value_4"},
  					{name: "option_5", value: "value_5"}
  				]}
  />,
  document.getElementById('app'));
