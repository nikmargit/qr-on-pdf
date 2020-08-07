import React, { useState } from 'react'
import AddQr from './AddQr'
import ScanQr from './ScanQr'
import { Menu } from 'antd'
import { QrcodeOutlined, ExpandOutlined } from '@ant-design/icons'

function App() {
  const [current, setCurrent] = useState('qr')

  return (
    <>
      <Menu
        onClick={({ key }) => setCurrent(key)}
        selectedKeys={[current]}
        mode='horizontal'
        theme='dark'>
        <Menu.Item key='qr' icon={<QrcodeOutlined />}>
          Add QR Code to PDF
        </Menu.Item>
        <Menu.Item key='scan' icon={<ExpandOutlined />}>
          Scan QR Code
        </Menu.Item>
      </Menu>
      <div className='container'>
        {current === 'qr' ? <AddQr /> : <ScanQr />}
      </div>
    </>
  )
}

export default App
