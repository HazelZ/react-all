import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import UserAddPage from './pages/UserAdd';
// import BookAddPage from './pages/BookAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';


require('./app.css');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={HomePage} />
    <Route path="/user/add" component={UserAddPage} />
    <Route path="/user/list" component={UserListPage} />
    <Route path="/user/edit/:id" component={UserEditPage} />
  </Router>,
  document.getElementById("app")
);