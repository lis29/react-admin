import React, { Component } from 'react'
import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';

export default class CategoryCardTitle extends Component {

  render() {
    const defaultElem = (
      <div>
        <Button type='link' style={{ fontSize: 16, fontWeight: Blob }}>一级分类列表</Button>
      </div>)
    const secElem = (
      <div>
        <Button type='link' onClick={this.props.showCategory} style={{ fontSize: 16, fontWeight: Blob }}>一级分类列表</Button>
        <ArrowRightOutlined />
        <span style={{ marginLeft: 15 }}>{this.props.secTitle}</span>
      </div>
    )
    return this.props.secTitle ? secElem : defaultElem
  }
}