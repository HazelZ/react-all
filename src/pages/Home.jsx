import React, { Component } from 'react';
import {Link} from 'react-router';

import HomeLayout from '../layouts/HomeLayout';

class Home extends Component{
  render(){
    return(
      <HomeLayout title='Welcome to Homepage'>
        <Link to="/user/add">添加用户</Link><br />
        <Link to="/user/list">用户列表</Link><br />
      </HomeLayout>
    )
  }
}

export default Home;