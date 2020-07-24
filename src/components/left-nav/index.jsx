import React, { Component } from "react"
import { withRouter } from "react-router-dom";

import './index.less'
import { Menu } from 'antd';

import logo from '../../pages/login/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
  constructor(props) {
    super(props)
    const pathname = props.history.location.pathname
    this.defaultSelectedKeys = pathname
    const arr = pathname.split('/')
    // console.log(pathname, arr)
    if (arr.length >= 3) {
      this.defaultOpenKeys = '/' + arr[1]
      this.defaultSelectedKeys = '/' + arr[1] + '/' + arr[2]
    } else {
      this.defaultOpenKeys = pathname
    }
    // console.log(this.defaultSelectedKeys)
    // console.log(this.defaultOpenKeys)
  }
  componentDidMount() {
    let pathname = this.props.location.pathname
    const arr = pathname.split('/')
    if (arr.length >= 3) {
      pathname = '/' + arr[1] + '/' + arr[2]
    }
    const selectedTitle = this.getTitleByKeyPath(pathname)
    this.props.selectedMenu(selectedTitle)
  }

  handleClick = (e) => {
    this.props.history.push(`${e.key}`)
    this.selectedKeys = e.key
    this.openKeys = e.key
    const selectedTitle = this.getTitleByKeyPath(e.key)
    this.props.selectedMenu(selectedTitle)
  }
  getTitleByKeyPath = (keypath) => {
    let selectedTitle = ''
    menuList.forEach(element => {
      if (!element.children) {
        if (element.key === keypath) {
          selectedTitle = element.title
        }
      }
      else {
        element.children.forEach(subElement => {
          if (subElement.key === keypath) {
            selectedTitle = subElement.title
          }
        })
      }
    });
    return selectedTitle
  }
  generateMenuList(meus) {
    return meus.map((item) => {
      if (item.children && item.children.length >= 1) {
        return (
          <SubMenu key={item.key} icon={item.icon} title="商品">
            {this.generateMenuList(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.title}
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <div className='left-nav' >
        <div className="logo">
          <img src={logo} alt="" />
          <h2>后台系统</h2>
        </div>
        <div className="menu">
          <Menu
            defaultSelectedKeys={[this.defaultSelectedKeys]}
            defaultOpenKeys={[this.defaultOpenKeys]}
            mode="inline"
            theme="dark"
            onClick={this.handleClick}
          >
            {
              this.generateMenuList(menuList)
            }
          </Menu>
        </div>
      </div >
    )
  }
}


export default withRouter(LeftNav)