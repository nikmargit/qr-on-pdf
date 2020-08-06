import React from 'react'
import { Form, Input, Button } from 'antd'
import handlePdf from './handlePdf'
import pdf from './pdf'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
}
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
}

function App() {
  return (
    <div className='app'>
      <h1>QR on PDF</h1>
      <Form
        {...layout}
        name='basic'
        initialValues={{ base64: pdf, qrText: 'www.mqsoft.rs' }}
        onFinish={handlePdf}>
        <Form.Item
          label='PDF as Base64'
          name='base64'
          rules={[
            { required: true, message: 'Please input your PDF in base64!' },
          ]}>
          <Input.TextArea autoSize={{ minRows: 6, maxRows: 6 }} />
        </Form.Item>
        <Form.Item
          label='Text for QR code'
          name='qrText'
          rules={[{ required: true, message: 'Please input your text!' }]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Generate PDF
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default App
