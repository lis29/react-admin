import React from 'react'
import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  ToolOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  WindowsOutlined
} from '@ant-design/icons';
const menuList = [
  {
    title: '首页',
    // 菜单标题名称 
    key: '/home',
    // 对应的 path 
    icon: <HomeOutlined />, // 图标名称 
    isLeaf: true
  },
  {
    title: '商品',
    key: '/products',
    icon: <AppstoreOutlined />,
    isLeaf: false,
    children: [
      // 子菜单列表 
      {
        title: '品类管理',
        key: '/products/category',
        icon: <BarsOutlined />,
        isLeaf: true
      },
      {
        title: '商品管理',
        key: '/products/product',
        icon: <ToolOutlined />,
        isLeaf: true
      }
    ]
  },
  {
    title: '用户管理',
    key: '/user',
    icon: <UserOutlined />,
    isLeaf: true
  },
  {
    title: '角色管理',
    key: '/role',
    icon: <SafetyOutlined />,
    isLeaf: true
  },
  {
    title: '图形图表',
    key: '/charts',
    icon: <AreaChartOutlined />,
    isLeaf: false,
    children:
      [
        {
          title: '柱形图',
          key: '/charts/bar',
          icon: <BarChartOutlined />,
          isLeaf: true
        },
        {
          title: '折线图',
          key: '/charts/line',
          icon: <LineChartOutlined />,
          isLeaf: true
        },
        {
          title: '饼图',
          key: '/charts/pie',
          icon: <PieChartOutlined />,
          isLeaf: true
        }
      ]
  },
  {
    title: '订单管理',
    // 菜单标题名称 
    key: '/order',
    // 对应的 path 
    icon: <WindowsOutlined />, // 图标名称 
    isLeaf: true
  }
]
export default menuList