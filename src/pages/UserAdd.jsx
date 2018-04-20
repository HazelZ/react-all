import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formProvider from '../utils/formProvider';
import FormItem from '../components/FormItem';

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
    const { form:{ uname,gender,age }, onFormChange} = this.props;
    return(
      <div>
        <header>
          <h2>添加用户</h2>
        </header>
        <main>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <FormItem label='用户名' valid={uname.valid} error={uname.error}>
              <input
                type="text"
                value={uname.value}
                onChange={(e) => onFormChange('uname', e.target.value)} />
            </FormItem>
            <FormItem label='年龄' valid={age.valid} error={age.error}>
              <input
                type="number"
                value={age.value || ''}
                onChange={(e) => onFormChange('age', +e.target.value)} />
            </FormItem>
            <FormItem label='性别' valid={gender.valid} error={gender.error}>
              <select name=""
                value={gender.value}
                onChange={(e) => onFormChange('gender', e.target.value)} >
                <option value="">请选择</option>
                <option value="male">男</option>
                <option value="famale">女</option>
              </select>
            </FormItem>
            <div className="form-block">
              <input type="submit" value='提交'/>
            </div>
          </form>
        </main>
      </div>
    )
  }
}

UserAdd = formProvider({
  uname: {
    defaultValue:'',
    rules:[
      {
        pattern:function(value){
          return value.length > 0;
        },
        error:"请输入用户名"
      },
      {
        pattern: /^.{1,4}$/,
        error:'用户名最多4个字符'
      }
    ]
  },
  age: {
    defaultValue: 0,
    rules:[
      {
       pattern:function(value){
         return value >= 1 && value <= 100;
       },
       error:'请输入1~100的年龄' 
      }
    ]
  },
  gender:{
    defaultValue:'',
    rules:[
      {
        pattern:function(value){
          return !!value;
        },
        error:'请选择性别'
      }
    ]
  }
})(UserAdd);

export default UserAdd;