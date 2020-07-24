import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, Table, Space, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

import { reqProductList, reqUpdateStatus } from '../../api/index'

const { Option } = Select

class ProductCardTitle extends Component {
  handleSearch = (vals) => {
    console.log('*******')
    console.log(vals)
  }
  render() {
    return (
      <div>
        <Form layout="inline" initialValues={{
          search: '0'
        }}
          onFinish={this.handleSearch}
        >
          <Form.Item name="search">
            <Select style={{ width: 150 }}>
              <Option value="0">按名称搜索</Option>
              <Option value="1">按描述搜索</Option>
            </Select>
          </Form.Item>
          <Form.Item name="keyword">
            <Input placeholder="关键字" style={{ width: 150 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Search</Button>
          </Form.Item>
        </Form>
      </div >
    )
  }
}



export default class ProductHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productList: {}
    }
    // 定义表格的列数据
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc'
      },
      {
        title: '价格',
        dataIndex: 'price'
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 150,
        render: (status, product) => {
          const element = status === 1 ? (
            <div>
              <Button type="primary" style={{ width: 80 }} onClick={() => { this.handleProductOff(product) }}>下架</Button>
              <br />
              <div style={{ width: 80, textAlign: "center" }}>在售</div>
            </div>
          ) : (
              <div>
                <Button type="primary" style={{ width: 80 }} onClick={() => this.handleProductOff(product)}>上架</Button>
                <br />
                <div style={{ width: 80, textAlign: "center" }}>已下架</div>
              </div>
            )
          return element
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <Space size="middle">
              <Button type='link' onClick={() => { this.handleProductDetail(product) }}>详情</Button>
              <Button type='link' >修改</Button>
            </Space>
          )
        }
      }
    ];
  }
  componentDidMount() {
    this.getProductList()
  }
  getProductList = async () => {
    let res = await reqProductList({ pageNum: 1, pageSize: 10 })
    this.setState({
      productList: res
    })
  }
  handleAddProduct = (product) => {
    this.props.history.push('/products/product/addupdate')
  }
  handleProductDetail = (product) => {
    const path = {
      pathname: '/products/product/detail',
      query: product
    }
    this.props.history.push(path)
  }

  handleProductOff = async (product) => {
    let productStatus = product.status === 1 ? 2 : 1
    let resp = await reqUpdateStatus(product._id, productStatus)
    if (resp.status === 0) {
      message.success("修改成功")
      product.status = productStatus
      this.getProductList()
    } else {
      message.error('修改失败')
    }
  }

  render() {
    const cardExtra = <Button type="primary" onClick={this.handleAddProduct}><PlusOutlined />添加商品</Button>
    return (
      <Card title={<ProductCardTitle />} extra={cardExtra} style={{ height: '100%' }}>
        <div>
          <Table rowKey="_id" dataSource={this.state.productList.list} columns={this.columns} bordered></Table>
        </div>
      </Card>
    )
  }
}