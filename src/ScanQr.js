import React, { useState, useEffect, useRef } from 'react'
import { Upload, message, Input } from 'antd'
import jsQR from 'jsqr'
import { LoadingOutlined, InboxOutlined } from '@ant-design/icons'
import { getBase64, beforeUpload } from './utilities'

const { Dragger } = Upload

export default function ScanQr() {
  const [loading, setloading] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [qrData, setQrData] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (imageUrl) {
      // we need Uint8ClampedArray data from image so we will use context
      const canvas = canvasRef.current
      var image = new Image()
      image.src = imageUrl
      const context = canvas.getContext('2d')
      image.onload = function () {
        // draw image on context and then read data from it
        context.drawImage(image, 0, 0)
        const { data } = context.getImageData(0, 0, 2000, 2000)
        const code = jsQR(data, 2000, 2000)
        if (!code) {
          message.warning('No QR code found.')
        }
        setQrData(code)
      }
    }
  }, [imageUrl])

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      return setloading(true)
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imgUrl) => {
        setloading(false)
        setImageUrl(imgUrl)
      })
    }
  }

  const tryToParse = (data) => {
    if (!data) {
      return ''
    }
    try {
      const json = JSON.parse(data.data)
      return JSON.stringify(json, null, 4)
    } catch (e) {
      return data.data
    }
  }

  const text = tryToParse(qrData)

  return (
    <>
      <Dragger
        name='avatar'
        showUploadList={false}
        action={() => {}}
        beforeUpload={beforeUpload}
        onChange={handleChange}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        {loading ? (
          <LoadingOutlined />
        ) : (
          <p className='ant-upload-text'>
            Click or drag image file to this area to read a QR code
          </p>
        )}
      </Dragger>
      {qrData && (
        <>
          <img src={imageUrl} height='200px' alt='qr code' />
          <Input.TextArea
            value={text}
            disabled
            rows={6}
            className='disabled-input'
          />
        </>
      )}
      <canvas
        ref={canvasRef}
        width={2000}
        height={2000}
        style={{ display: 'none' }}
      />
    </>
  )
}
