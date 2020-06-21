import React, { Component } from 'react'
import './index.less'
import { Button, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';

import localStorageUtils from '../../utils/localStorageUtils'
import { withRouter } from 'react-router-dom'

const { confirm } = Modal

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { currentTime: '' }
    this.timeID = ''
    this.username = localStorageUtils.getUser().username
  }
  componentDidMount() {
    this.timeID = setInterval(() => {
      const date = new Date()
      const str = date.toLocaleTimeString()
      this.setState({
        currentTime: str
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timeID)
  }
  logout = (e) => {
    const self = this
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK ', self);
        localStorageUtils.removeUser()

        self.props.history.replace('/login')
      }
    });
  }
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <span>你好，{this.username}</span>
          <Button danger type="text" onClick={this.logout}>退出</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            {this.props.title}
          </div>
          <div className="header-bottom-right">
            <span>{this.state.currentTime}</span>
            <img src="http://api.map.baidu.com/images/weather/night/duoyun.png" alt="" />
            <span>晴</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)