/**
 * 生成 tabBar 用纯色小图（81×81），无第三方依赖。
 * 运行：node scripts/gen-tabbar-png.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { deflateSync } from 'zlib'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'static', 'tabbar')

function makeCrcTable() {
  const c = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let k = n
    for (let i = 0; i < 8; i++) {
      k = (k & 1) ? (0xedb88320 ^ (k >>> 1)) : (k >>> 1)
    }
    c[n] = k >>> 0
  }
  return c
}

const CRC_TABLE = makeCrcTable()

function crc32(buf) {
  let crc = -1
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ -1) >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii')
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  const forCrc = Buffer.concat([typeBuf, data])
  crcBuf.writeUInt32BE(crc32(forCrc), 0)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function solidPng(width, height, r, g, b, a) {
  const rowSize = 1 + width * 4
  const raw = Buffer.alloc(height * rowSize)
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize
    raw[rowStart] = 0
    for (let x = 0; x < width; x++) {
      const i = rowStart + 1 + x * 4
      raw[i] = r
      raw[i + 1] = g
      raw[i + 2] = b
      raw[i + 3] = a
    }
  }
  const idat = deflateSync(raw, { level: 9 })

  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', idat),
    chunk('IEND', Buffer.alloc(0))
  ])
}

mkdirSync(outDir, { recursive: true })
// 未选中 #9ca3af，选中 #0e7490（与 tabBar selectedColor 一致）
writeFileSync(join(outDir, 'tab-normal.png'), solidPng(81, 81, 0x94, 0xa3, 0xb8, 0xff))
writeFileSync(join(outDir, 'tab-active.png'), solidPng(81, 81, 0x3b, 0x82, 0xf6, 0xff))
console.log('written:', join(outDir, 'tab-normal.png'), join(outDir, 'tab-active.png'))
