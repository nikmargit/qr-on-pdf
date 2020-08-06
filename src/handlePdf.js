import QRious from 'qrious'
import download from 'downloadjs'
import { PDFDocument } from 'pdf-lib'

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
