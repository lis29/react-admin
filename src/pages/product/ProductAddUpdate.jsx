import React, { Component } from 'react'
import { Card, Button, Form, Input, Cascader } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { reqCategory, reqAddProduct } from '../../api'
import PicturesWall from './PicturesWall'

class ProductAddUpdateCardTitle extends Component {
  render() {
    return (
      <div>
        <Button type="link" onClick={this.props.handleBack}>
          <ArrowLeftOutlined />
        </Button>
        添加商品
      </div>
    )
  }
}



export default class ProductAddUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: []
    }
    this.imgRef = React.createRef()
  }
  componentDidMount() {
    reqCategory(0).then(resp => {
      // console.log("resp ", resp)
      this.setState({
        category: resp.map(item => {
          return {
            ...item,
            value: item._id,
            label: item.name,
            isLeaf: false
          }
        })
      }, () => {
        // console.log(this.state.category)
      })
    })
  }
  productFormRef = React.createRef();

  // 返回
  handleBack = () => {
    this.props.history.go(-1)
  }
  // 提交表单
  onFinish = values => {

    const imgs = this.imgRef.current.getImgs();
    values.imgs = imgs;
    console.log(values)
    let product = {}
    if (values.category.length === 2) {
      product.categoryId = values.category[1]
      product.pCategoryId = values.category[0]
    }
    product.name = values.name;
    product.desc = values.desc;
    product.price = values.price;
    product.detail = values.detail
    product.imgs = values.imgs;

    reqAddProduct(product).then(response => {
      console.log(response)
    }).catch(err => {
      console.log(err)
    })
  }

  // 级联选择器onchange
  onChange = (val, selectedOptions) => {
    // console.log(val, selectedOptions)

    // const targetOption = selectedOptions[selectedOptions.length - 1];
    // targetOption.loading = true

    // reqCategory(val).then(resp => {
    //   const child = resp.map(item => {
    //     return {
    //       ...item,
    //       value: item._id,
    //       label: item.name,
    //       isLeaf: true
    //     }
    //   })
    //   targetOption.child = child
    //   console.log(targetOption)

    //   const category = this.state.category.map(item => {
    //     if (item._id === val) {
    //       return targetOption
    //     }
    //     else {
    //       return item
    //     }
    //   })

    //   this.setState({
    //     category: category
    //   }, () => {
    //     console.log(this.state.category)
    //   })

    //   targetOption.loading = false
    // })
  }
  // 级联选择器懒加载
  loadData = selectedOptions => {
    const val = selectedOptions[0]._id

    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true

    reqCategory(val).then(resp => {
      targetOption.loading = false
      console.log(`二级分类列表 ${JSON.stringify(resp)}`)
      if (resp.length === 0) {
        targetOption.isLeaf = true
      }
      else if (resp.length >= 1) {
        const child = resp.map(item => {
          return {
            ...item,
            value: item._id,
            label: item.name
          }
        })
        targetOption.children = child
      }

      const category = this.state.category.map(item => item._id === val ? targetOption : item)

      this.setState({
        category: [...category]
      }, () => {
        console.log(this.state.category)
      })
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card
        title={<ProductAddUpdateCardTitle handleBack={this.handleBack} />}
        style={{ height: '100%' }}>
        <Form {...formItemLayout}
          name="product-info"
          onFinish={this.onFinish}
          ref={this.productFormRef}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              { required: true, message: '请输入商品名称' }
            ]}
          >
            <Input placeholder="请输入商品名称"></Input>
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
            rules={[
              { required: true, message: "请输入商品描述" }
            ]}>
            <Input.TextArea placeholder="请输入商品描述" autoSize={{ minRows: 1, maxRows: 76 }} />
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="price"
            rules={[
              { required: true, message: '请输入商品价格' }
            ]}>
            <Input type="number" addonAfter="元" placeholder="请输入商品价格"></Input>
          </Form.Item>
          <Form.Item
            label="商品分类"
            name="category"
            placeholder="请选择商品分类"
            rules={[
              { required: true, message: '请输入商品分类' }
            ]}>
            <Cascader
              placeholder="请选择商品分类"
              options={this.state.category}
              onChange={this.onChange}
              loadData={this.loadData}
              changeOnSelect
            />
          </Form.Item>

          <Form.Item label="商品图片" name="imgs"
            rules={[{
              required: false, message: '必须上传一张图片'
            }]}>
            <PicturesWall ref={this.imgRef} />
          </Form.Item>
          <Form.Item label="商品详情" name="detail">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}