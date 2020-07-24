import React, { Component } from "react";
import { Modal, Form, Input } from 'antd';
export default class UpdateCategoryModal extends Component {
  formRef = React.createRef()

  handleOk = () => {
    let obj = {
      id: this.props.updateCategory._id,
      ...this.formRef.current.getFieldValue()
    }
    this.props.handleUpdateCategoryOk(obj)
  }
  handleCancel = () => { }
  onFinish = () => { }
  formOnChange = (e) => {
    console.log(e)
  }
  render() {
    const { name: categoryName, _id: categoryId } = this.props.updateCategory || { 'name': '' }

    return (
      <div>
        <Modal
          title="修改分类"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.props.handleUpdateCategoryCancel}
        >
          <Form
            onFinish={this.onFinish}
            key={categoryId}
            initialValues={{ 'name': categoryName, 'id': categoryId }}
            ref={this.formRef} >
            <Form.Item
              label="分类名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入分类名称!',
                }
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}