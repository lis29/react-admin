import React, { Component } from 'react'
import { Button, Card, Space, Table, message, Modal, Form, Input, Tree, Row, Col } from 'antd'
import { reqRoleList, reqAddRole, reqUpdateRole } from '../../api'
import menuList from '../../config/menuConfig'
import localStorageUtils from '../../utils/localStorageUtils'


const treeData = [
  {
    title: '平台权限',
    key: '0-0',
    children: menuList
  },
];


const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '授权时间',
    dataIndex: 'auth_time',
    key: 'auth_time',
  },
  {
    title: '授权人',
    key: 'auth_name',
    dataIndex: 'auth_name'
  }
];

export default class Role extends Component {
  addRolesFormRef = React.createRef();

  constructor(props) {
    super(props)
    this.state = {
      columns: columns,
      data: [],
      createRolesVisible: false,
      selectedRowKeys: [],
      selectedRoleName: '',
      setRolesVisible: false,
      checkedKeys: []
    }
  }
  componentDidMount() {
    this.getRolesList()
  }

  getRolesList = () => {
    reqRoleList().then(response => {
      if (response.status === 0) {
        this.setState({
          data: response.data
        })
      } else {
        message.error('获取角色列表失败')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleCreaterRoles = () => {
    this.setState({
      createRolesVisible: true
    })
  }
  handleCreateRolesOk = () => {
    this.setState({
      createRolesVisible: false
    })
    const { roleName } = this.addRolesFormRef.current.getFieldsValue()
    reqAddRole(roleName).then(res => {
      if (res.status === 0) {
        message.success("添加角色成功")
        this.getRolesList()
      }
      else {
        message.error(res.msg)
      }
    })

    this.addRolesFormRef.current.resetFields()
  }
  handleCreateRolesCancel = () => {
    this.setState({
      createRolesVisible: false
    })
  }

  handleShowSetRole = () => {
    this.setState({
      setRolesVisible: true
    })
  }

  handleSetRolesOk = () => {
    const user = localStorageUtils.getUser()
    const role = {
      '_id': this.state.selectedRowKeys[0],
      'menus': this.state.checkedKeys,
      'auth_time': Date.now(),
      'auth_name': user.username
    }

    reqUpdateRole(role).then(resp => {
      message.success("修改权限成功")
    })
    this.getRolesList()
    this.setState({
      setRolesVisible: false,
      checkedKeys: []
    })
  }
  handleSetRolesCancel = () => {
    this.setState({
      setRolesVisible: false,
      checkedKeys: []
    })
  }


  onSelect = (selectedKeys, info) => {
    let arr = []
    arr.push(...this.state.checkedKeys)
    arr.push(...selectedKeys)
    this.setState({
      checkedKeys: arr
    })
  };

  onCheck = (checkedKeys, info) => {
    this.setState({
      checkedKeys: checkedKeys
    })
  };

  render() {
    const { selectedRowKeys, createRolesVisible, setRolesVisible, selectedRoleName } = this.state

    const title = (
      <div>
        <Space>
          <Button
            type="primary"
            onClick={this.handleCreaterRoles}>
            创建角色
          </Button>
          <Button
            disabled={selectedRowKeys.length === 0}
            type="primary"
            onClick={this.handleShowSetRole}
          >
            设置角色权限
          </Button>
        </Space>
      </div>
    )
    return (
      <div className='admin-content'>
        <Card
          title={title}
          style={{ width: '100%' }}>
          <Table
            rowKey="_id"
            rowSelection={{
              type: 'radio',
              selectedRowKeys,
              onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                  selectedRowKeys,
                  selectedRoleName: selectedRows[0].name || ""
                })
              }
            }}
            dataSource={this.state.data}
            columns={this.state.columns}
            bordered
            onRow={(record) => {
              return {
                onClick: _ => {
                  this.setState({
                    selectedRowKeys: [record._id],
                    selectedRoleName: record.name
                  })
                }
              }
            }} />
        </Card>

        <Modal
          title="添加角色"
          visible={createRolesVisible}
          onOk={this.handleCreateRolesOk}
          onCancel={this.handleCreateRolesCancel}
        >
          <Form
            ref={this.addRolesFormRef}
            layout={{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }}>
            <Form.Item
              label="角色名称"
              name="roleName"
              rules={[
                { required: true, message: "必须输入角色名称" }
              ]}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={setRolesVisible}
          onOk={this.handleSetRolesOk}
          onCancel={this.handleSetRolesCancel}
        >
          <Row style={{ alignItems: 'center' }}>
            <Col span={4}>
              角色名称：
              </Col>
            <Col span={16}>
              <Input value={selectedRoleName} disabled />
            </Col>
          </Row>
          <br />
          <Tree
            defaultExpandAll
            checkable
            checkedKeys={this.state.checkedKeys}
            selectedKeys={[]}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
            treeData={treeData}
          />
        </Modal>
      </div >
    )
  }
}