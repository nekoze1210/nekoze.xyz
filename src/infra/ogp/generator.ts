import * as fs from 'fs'

import { createCanvas, GlobalFonts, loadImage } from '@napi-rs/canvas'

export const generatePostOgpImage = async (id: string, title: string) => {
  GlobalFonts.registerFromPath('./internal/assets/NotoSansJP-Regular.ttf', 'NotoSansJP')
  const width = 1200
  const height = 630

  const templateImage = await loadImage('./internal/assets/ogpTemplate.png')

  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  ctx.drawImage(templateImage, 0, 0)

  // テキストスタイルの設定
  ctx.font = 'bold 50px NotoSansJP' // タイトルのフォント
  ctx.fillStyle = 'black' // テキストの色
  ctx.textAlign = 'center' // テキストの揃え

  // テキスト描画エリアの設定
  const maxWidth = canvas.width - 100 // 左右の余白分
  const lineHeight = 50 // 行間
  const maxCharsPerLine = Math.floor(maxWidth / ctx.measureText('あ').width) // 1行の最大文字数（日本語対応）
  const x = canvas.width / 2 // 中央X座標
  const yStart = canvas.height / 2 - (lineHeight * Math.ceil(title.length / maxCharsPerLine)) / 2 // 上部Y座標

  // テキストを改行処理
  const lines = wrapText(title, maxCharsPerLine)

  // 各行を描画
  let y = yStart
  lines.forEach((line) => {
    ctx.fillText(line, x, y)
    y += lineHeight
  })

  // 生成した画像をファイルとして保存
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(`./public/ogp/${id}.png`, buffer)

  return `/ogp/${id}.png`
}

const wrapText = (text: string, maxCharsPerLine: number): string[] => {
  const lines: string[] = []
  let currentLine = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const isAlphabet = /[a-zA-Z]/.test(char)

    // 次の文字がアルファベットの場合は単語として処理
    if (isAlphabet && currentLine.length > 0 && /[a-zA-Z]/.test(currentLine.slice(-1))) {
      currentLine += char
    } else {
      // 現在の行が制限を超えた場合、新しい行に移動
      if (currentLine.length >= maxCharsPerLine) {
        lines.push(currentLine)
        currentLine = char
      } else {
        currentLine += char
      }
    }
  }

  // 最後の行を追加
  if (currentLine.length > 0) {
    lines.push(currentLine)
  }

  return lines
}
