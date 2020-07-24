import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductDetail from './ProductDetail'
import ProductAddUpdate from './ProductAddUpdate'
import ProductHome from './ProductHome'

export default class Product extends Component {

  render() {
    return (
      <div className='admin-content'>
        <Switch>
          <Redirect path='/products/product' to='/products/product/home' exact />
          <Route path='/products/product/home' component={ProductHome} />
          <Route path='/products/product/detail' component={ProductDetail} />
          <Route path='/products/product/addupdate' component={ProductAddUpdate} />
          <Redirect to='/products/product' />
        </Switch>
      </div>
    )
  }
}