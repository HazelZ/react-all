import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormItem from './FormItem.jsx';
import formProvider from "../utils/formProvider";

class UserEditor extends Component{
  static contextTypes = {
   router: PropTypes.object.isRequired
  }

  componentWillMount(){
    const {editTarget,setFormValue} = this.props;
    if (editTarget) {
      setFormValue(editTarget);
    }
  }

  handleSubmit(e){
    e.preventDefault();

    const { form: { uname, age, gender }, formValid, editTarget} = this.props;
    if (!formValid) {
      alert("请填写正确信息后重试");
      return;
    }

    let editType = '添加';
    let apiUrl = "http://localhost:3000/user";
    let method = 'post';
    if (editTarget) {
      editType = '编辑';
      apiUrl += '/'+ editTarget.id;
      method = 'put';
    }

    fetch(apiUrl, {
      method: method,
      body: JSON.stringify({
        uname: uname.value,
        age: age.value,
        gender: gender.value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.id) {
          alert(editType + "One! nice");
          this.context.router.push("/user/list");
        } else {
          alert(editType + "add failure! oooooooooooops");
        }
      })
      .catch(err => console.log(err));
  }

  render(){
    const {form:{uname, age, gender},onFormChange } = this.props;
    return <form onSubmit={e => this.handleSubmit(e)}>
        <FormItem label="用户名" valid={uname.valid} error={uname.error}>
          <input type="text" value={uname.value} onChange={e => onFormChange("uname", e.target.value)} />
        </FormItem>
        <FormItem label="年龄" valid={age.valid} error={age.error}>
          <input type="number" value={age.value || ""} onChange={e => onFormChange("age", +e.target.value)} />
        </FormItem>
        <FormItem label="性别" valid={gender.valid} error={gender.error}>
          <select name="" value={gender.value} onChange={e => onFormChange("gender", e.target.value)}>
            <option value="">请选择</option>
            <option value="male">男</option>
            <option value="famale">女</option>
          </select>
        </FormItem>
        <div className="form-block">
          <input type="submit" value="提交" />
        </div>
      </form>;
  }

}

UserEditor = formProvider({
  uname: {
    defaultValue: "",
    rules: [
      {
        pattern: function(value) {
          return value.length > 0;
        },
        error: "请输入用户名"
      },
      {
        pattern: /^.{1,4}$/,
        error: "用户名最多4个字符"
      }
    ]
  },
  age: {
    defaultValue: 0,
    rules: [
      {
        pattern: function(value) {
          return value >= 1 && value <= 100;
        },
        error: "请输入1~100的年龄"
      }
    ]
  },
  gender: {
    defaultValue: "",
    rules: [
      {
        pattern: function(value) {
          return !!value;
        },
        error: "请选择性别"
      }
    ]
  }
})(UserEditor);

export default UserEditor;