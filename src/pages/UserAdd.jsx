import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';
import UserEditor from '../components/UserEditors';

import HomeLayout from '../layouts/HomeLayout';

class UserAdd extends Component { 
  static contextTypes = {
    router:PropTypes.object.isRequired
  }

  handleSubmit(e){
    e.preventDefault();

    const { form: {uname,age,gender},formValid} = this.props;
    if(!formValid){
      alert('请填写正确信息后重试');
      return;
    }

    fetch('http://localhost:3000/user',{
      method:'post',
      body: JSON.stringify({
        uname: uname.value,
        age: age.value,
        gender: gender.value
      }),
      headers:{
        "Content-Type":'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.id){
        alert('add One! nice');
        this.context.router.push('/user/list');
      }else{
        alert('add failure! oooooooooooops')
      }
    })
    .catch((err) => console.log(err));
  }

  render(){
    return(
      <HomeLayout title='添加用户'>
        <UserEditor />
      </HomeLayout>
    )
  }
}


export default UserAdd;