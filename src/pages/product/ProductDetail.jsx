import React, { Component } from 'react'
import { Card, Button, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import './ProductDetail.less'
class ProductDetailCardTitle extends Component {

  render() {
    return (
      <div>
        <Button type="link" onClick={this.props.handleBack}>
          <ArrowLeftOutlined />
        </Button>商品详情
      </div>
    )
  }
}

function ProductImageList(props) {
  let imgs = props.imgs;
  imgs = imgs.map(item => 'http://localhost:5000/public/upload/' + item)
  const imgList = imgs.map((imgsrc) =>
    <img className="product-img" src={imgsrc} alt='' key={imgsrc} />
  );
  return imgList;
}

export default class ProductDetail extends Component {
  componentDidMount() {
    console.log(this.props.location.query)
  }
  handleBack = () => {
    this.props.history.go(-1)
  }

  render() {
    const { name, detail, desc, price, imgs } = this.props.location.query || { imgs: [] }

    return (
      <Card title={< ProductDetailCardTitle handleBack={this.handleBack} />} >
        <List>
          <List.Item className="list-item">
            <span className="left">商品名称:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="left">商品描述:</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="left">商品价格:</span>
            <span>{price}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="left">所属分类:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item className="list-item">
            <span className="left">商品图片:</span>
            <div>
              <ProductImageList imgs={imgs} />
            </div>
          </List.Item>
          <List.Item className="list-item">
            <span className="left">商品详情:</span>
            <span dangerouslySetInnerHTML={{ __html: detail }}></span>
          </List.Item>
        </List>
      </Card >
    )
  }
}