import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Login.less'
import Logo from './images/logo.png'
import { Button, Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../api/index.js'
import localStorageUtils from '../../utils/localStorageUtils'


class Login extends Component {

  // 处理登录
  handleSubmit = (values) => {
    login('/login', values).then(resp => {
      localStorageUtils.saveUser(resp.data)
      // localStorageUtils.saveUser(JSON.stringify(resp.data))
      if (resp.status === 0) {
        message.success('登录成功')
        this.props.history.replace('/')
      } else {
        message.error(resp.msg)
      }
    })
  }

  pwdValidator = (rule, value) => {
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
    if (!value) {
      return Promise.reject("必须输入密码")
    }
    else if (length < 4) {
      return Promise.reject("密码必须大于 4 位")
    }
    else if (length > 12) {
      return Promise.reject("密码必须小于 12 位")
    }
    else if (!pwdReg.test(value)) {
      return Promise.reject("密码必须是英文、数组或下划线组成")
    } else {
      return Promise.resolve()
    }
  }


  render() {
    const user = localStorageUtils.getUser()
    if (user && user._id) {
      return <Redirect to='/' />
    }
    return (
      <div className='login'>
        <header className="login-header">
          <img src={Logo} alt="" />
          <h1>React后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登陆</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名！' },
                { max: 12, message: "用户名必须小于 12 位" },
                { min: 4, message: '用户名必须大于 4 位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是数组、字符或下划线' }
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { validator: this.pwdValidator }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div >
    )
  }
}
export default Login