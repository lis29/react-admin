import React, { Component } from 'react'
import { Modal } from 'antd';
import AddCategoryForm from './AddCategoryForm'

export default class AddCategoryModal extends Component {

  constructor(props) {
    super(props)
    this.initParams()
  }
  initParams = () => {
    this.parentId = this.props.currentCategoryId
    this.name = ''
  }
  onParentCategoryChange = (val) => {
    this.parentId = val ? val : '0'
  }

  categoryNameChange = (name) => {
    this.name = name
  }
  handleAddCategoryOk = () => {
    this.props.handleAddCategoryOk(this.parentId, this.name)
  }

  render() {
    // console.log('render current category id is ', this.props.currentCategoryId)
    const currentCategoryId = this.props.currentCategoryId
    return (
      <Modal
        title="添加分类"
        visible={this.props.visible}
        onOk={this.handleAddCategoryOk}
        onCancel={this.props.handleAddCategoryCancel}
        closable
      >
        <AddCategoryForm
          currentCategoryId={currentCategoryId}
          categoryList={this.props.categoryList}
          onParentCategoryChange={this.onParentCategoryChange}
          categoryNameChange={this.categoryNameChange} />
      </Modal>
    )
  }
}