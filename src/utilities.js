import QRious from 'qrious'
import download from 'downloadjs'
import { PDFDocument } from 'pdf-lib'
import { message } from 'antd'

export default async function handlePdf({ qrText, base64 }) {
  var qr = new QRious({
    value: qrText,
  })
  const qrUri = qr.toDataURL()

  const pdfDoc = await PDFDocument.load(base64)
  const pages = pdfDoc.getPages()
  const pngImage = await pdfDoc.embedPng(qrUri)

  const { height } = pages[0].getSize()

  pages[0].drawImage(pngImage, {
    x: 10,
    y: height - 60,
    width: 50,
    height: 50,
  })

  pages.forEach((page, i) => {
    page.drawText((i + 1).toString(), {
      x: 10,
      y: 10,
      size: 20,
    })
  })

  const pdfBytes = await pdfDoc.save()

  download(pdfBytes, 'example.pdf', 'application/pdf')
}

export function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG files!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
