import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd';

import localStorageUtils from '../../utils/localStorageUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home'
import Product from '../product'
import Category from '../category'
import User from '../user'
import Role from '../role'
import Bar from '../bar'
import Line from '../line'
import Pie from '../pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleClickedMenu = (title) => {
    this.setState({
      title
    })
  }
  render() {
    const user = localStorageUtils.getUser()
    if (!user || !user._id) {
      return < Redirect to='/login' />
    }

    return (
      <div style={{ height: '100%' }}>
        <Layout style={{ height: '100%', color: 'red' }}>
          <Sider>
            <LeftNav selectedMenu={this.handleClickedMenu} />
          </Sider>
          <Layout>
            <Header title={this.state.title}>
              头部信息
            </Header>
            <Content style={{ padding: '15px 15px 0px' }}>
              <Switch>
                <Redirect path='/' exact to='/home' />
                <Route path='/home' component={Home} />
                <Route path='/products/product' component={Product} />
                <Route path='/products/category' component={Category} exact />
                <Route path='/user' component={User} />
                <Route path='/role' component={Role} />
                <Route path='/charts/line' component={Line} />
                <Route path='/charts/pie' component={Pie} />
                <Route path='/charts/bar' component={Bar} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center', color: '#cccccc' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验 -- {this.state.title}</Footer>
          </Layout>
        </Layout>
      </div>
    )
  }
}