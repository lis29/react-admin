import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';

const { Option } = Select;


export default class AddCategoryForm extends Component {
  formRef = React.createRef()

  componentDidUpdate() {
    this.formRef.current.resetFields();
  }

  onParentCategoryChange = (val) => {
    let pid = '0'
    const item = this.props.categoryList.find(item => item.name === val)
    if (item && item._id) {
      pid = item._id
    }

    this.props.onParentCategoryChange(pid)
  }
  categoryNameChange = (e) => {
    this.props.categoryNameChange(e.target.value)
  }

  render() {
    const currentCategoryId = this.props.currentCategoryId;
    // console.log(this.props.categoryList)
    const initValues = {
      parentCategoryId: currentCategoryId,
      addCategroyName: ''
    }
    // console.log(initValues)
    return (
      <div>
        <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}
          initialValues={initValues}
        >
          <Form.Item name="parentCategoryId"
            rules={[{ required: true }]}
          >

            <Select
              onChange={this.onParentCategoryChange}
            >
              <Option value='0' key='0'>一级分类</Option>
              {
                this.props.categoryList.map((item, index) => {
                  return (
                    <Option value={item._id} key={item._id}>{`${item.name}`}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="addCategroyName">

            <Input onChange={this.categoryNameChange} />
          </Form.Item>
        </Form >
      </div>

    );
  }
}

