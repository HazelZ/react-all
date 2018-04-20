import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HomeLayout from '../layouts/HomeLayout';

class UserList extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  
  constructor() {
    super();
    this.state = {
      userList: []
    };
  }

  handleEdit(user) {
    this.context.router.push("/user/edit" + user.id);
  }

  handleDelete(user) {
    const confirmed = window.confirm(`确定要删除用户${user.uname}吗？`);

    if (confirmed) {
      fetch("http://localhost:3000/user" + user.id, {
        method: "delete"
      })
        .then(res => res.json())
        .then(res => {
          this.setState({
            userList: this.state.userList.filter(item => item.id !== user.id)
          });
          alert("delete OK!");
        })
        .catch(error => {
          console.log(error);
          alert("delete failure");
        });
    }
  }

  componentWillMount() {
    fetch("http://localhost:3000/user")
      .then(res => res.json())
      .then(res => {
        this.setState({
          userList: res
        });
      });
  }

  render() {
    const { userList } = this.state;
    return (
      <HomeLayout title="用户列表">
        <table>
          <thead>
            <tr>
              <th>用户ID</th>
              <th>用户名</th>
              <th>性别</th>
              <th>年龄</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.uname}</td>
                  <td>{user.age}</td>
                  <td>{user.gender}</td>
                  <td>
                    <a
                      href="javascript:;"
                      onClick={this.handleEdit.bind(this, user)}
                    >
                      编辑
                    </a>
                    <a
                      href="javascript:;"
                      onClick={this.handleDelete.bind(this, user)}
                    >
                      删除
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </HomeLayout>
    );
  }
}

export default UserList;