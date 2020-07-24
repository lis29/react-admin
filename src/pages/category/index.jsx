import React, { Component } from 'react'
import { reqCategory, reqAddCategory, reqUpdateCategory } from '../../api'
import { message, Card, Table, Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import AddCategoryModal from '../../components/add-category/AddCategoryModal'
import CategoryCardTitle from './CategoryCardTitle'
import UpdateCategoryModal from './UpdateCategoryModal'

import './index.less'


export default class Category extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryList: [],
      visible: false,
      updateCategoryVisible: false,
      secTitle: null,
      updateCategory: null,
      currentCategoryId: '0'
    }

    // 定义表格的列数据
    this.columns = [
      {
        title: '分类名',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: (category) => {
          const categoryAction = (
            <Space size="middle">
              <Button type='link' onClick={() => { this.updateCategory(category) }}>修改分类</Button>
              <Button type='link' onClick={() => { this.showSubCategorys(category) }}>查看子分类</Button>
            </Space>
          )
          const subCategoryAction = (
            <Space size="middle">
              <Button type='link' onClick={() => { this.updateCategory(category) }}>修改分类</Button>
            </Space>
          )
          return this.state.secTitle ? subCategoryAction : categoryAction
        }
      }
    ];
  }

  showSubCategorys = (category) => {
    const { _id: id, name } = category
    this.setState({
      secTitle: name,
      currentCategoryId: id
    })
    this.getCategoryList(id)
  }

  // 弹出修改分类框框
  updateCategory = (category) => {
    this.setState(state => ({ updateCategory: category, updateCategoryVisible: true }), () => {
      // console.log('回调，', this.state.updateCategory)
    })
    // console.log('修改分类 ', category, this.state.updateCategory)
  }
  // 修改框OK事件，修改分类名称
  handleUpdateCategoryOk = (category) => {
    this.setState({
      updateCategoryVisible: false
    })
    // categoryId, categoryName
    const { id: categoryId, name: categoryName } = category
    reqUpdateCategory({ categoryId, categoryName }).then(resp => {
      message.success('修改分类名成功！')
    })
  }

  // 修改框取消事件
  handleUpdateCategoryCancel = () => {
    this.setState({
      updateCategoryVisible: false
    })
  }

  // 显示添加分类的弹框
  addCategory = async () => {
    let categoryList = await this.getCategoryList(0, false)
    this.categoryList = categoryList;

    this.setState({
      visible: true
    })
  }

  // 点击添加分类弹框的OK按钮， 添加分类
  handleAddCategoryOk = (parentId, name) => {
    this.setState({
      visible: false
    })
    const params = { parentId, categoryName: name }
    reqAddCategory(params).then(resp => {
      message.success('添加分类成功')
    })

    // 刷新分类列表
    this.getCategoryList(parentId)
  }

  // 点击添加分类弹框的Cancel按钮
  handleAddCategoryCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 点击一级分类的按钮
  showCategory = () => {
    this.getCategoryList('0')
    this.setState({
      secTitle: null
    })
  }
  // 获取分类列表
  getCategoryList = async (parentId, refreshList = true) => {
    let list = []
    try {
      list = await reqCategory(parentId)
    }
    catch (err) {
      message.error(err)
    }

    if (refreshList) {
      this.setState({
        categoryList: list
      })
    } else {
      return list
    }
  }
  componentDidMount() {
    // 获取一级分类列表
    this.getCategoryList('0')
  }
  render() {
    return (
      <div className='admin-content'>
        <Card title={<CategoryCardTitle secTitle={this.state.secTitle} showCategory={this.showCategory} />} style={{ width: '100%' }} extra={<Button type='primary' onClick={this.addCategory}><PlusOutlined />添加</Button>} >
          <Table rowKey="_id" dataSource={this.state.categoryList} columns={this.columns} bordered></Table>
        </Card>
        <AddCategoryModal
          currentCategoryId={this.state.currentCategoryId}
          categoryList={this.categoryList}
          handleAddCategoryOk={this.handleAddCategoryOk}
          handleAddCategoryCancel={this.handleAddCategoryCancel}
          visible={this.state.visible} />
        <UpdateCategoryModal
          updateCategory={this.state.updateCategory}
          handleUpdateCategoryOk={this.handleUpdateCategoryOk}
          handleUpdateCategoryCancel={this.handleUpdateCategoryCancel}
          visible={this.state.updateCategoryVisible} />
      </div >
    )
  }
}