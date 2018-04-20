import React, { Component } from "react";
import PropTypes from "prop-types";
import UserEditors from "../components/UserEditors";
import HomeLayout from "../layouts/HomeLayout";

class UserEdit extends Component{
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.state={
      user:null
    }
  }

  componentWillMount(){
    const userId = this.context.router.params.id;
    fetch('http://localhost:3000/user'+userId)
    .then(res => res.json())
    .then(res =>{
      this.setState({
        user:res
      })
    })
  }

  render(){
    const {user} = this.state;
    return(
      <HomeLayout title="编辑用户">
        {
          user ? <UserEditors editTartget={user}/> : '加载中...'
        }
      </HomeLayout>
    )
  }
}

export default UserEdit;