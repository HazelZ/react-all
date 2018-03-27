import React, { Component } from 'react';

class UserAdd extends Component { 
  constructor(){
    super()
    this.state = {
      uname:'',
      gender:'',
      age:0
    }
  }

  handleValueChange(field, value, type = 'string'){
    if(type === 'number'){
      value = +value;
    }
    
    this.setState({
      [field]:value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    const {uname,age,gender} = this.state;
    fetch('http://localhost:3000/user',{
      method:'post',
      body: JSON.stringify({
        uname,
        age,
        gender
      }),
      headers:{
        "Content-Type":'application/json'
      }
    })
    .then((res) => res.json())
    .then((res) => {
      if(res.id){
        alert('add One! nice');
        this.setState({
          uname:'',
          age:0,
          gender:''
        })
      }else{
        alert('add failure!oooooooooooops')
      }
    })
  }

  render(){
    const {uname,gender,age} = this.state;
    return(
      <div>
        <header>
          <h2>添加用户</h2>
        </header>
        <main>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <div className="form-block">
              <label htmlFor="">用户名</label>
              <input 
                type="text" 
                value={uname} 
                onChange={ (e) => this.handleValueChange('uname', e.target.value)} />
            </div>
            <div className="form-block">
              <label htmlFor="">年龄</label>
              <input 
                type="number" 
                value={age || ''}
                onChange={(e) => this.handleValueChange('age', e.target.value,'number')} />
            </div>
            <div className="form-block">
              <label htmlFor="">性别</label>
              <select name="" 
                value={gender} 
                onChange={(e) => this.handleValueChange('gender', e.target.value)} >
                  <option value="">请选择</option>
                  <option value="male">男</option>
                  <option value="famale">女</option>
              </select>
            </div>
            <div className="form-block">
              <input type="submit" value='提交'/>
            </div>
          </form>
        </main>
      </div>
    )
  }
}

export default UserAdd;