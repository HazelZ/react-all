import React, { Component } from 'react';

class FormItem extends Component{
  render(){
    const {label,children, valid,error} = this.props;
    return (
      <div className='form-block' >
        <label htmlFor="">{label}</label>
        {children}
        {!valid && <span>{error}</span>}
      </div>
    )
  }
}

export default FormItem;