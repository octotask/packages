const Zip = require('node-zip')
const files = ['index.min.js', 'manifest.json']
const fs = require('fs')
const path = require('path')

const zip = new Zip()

files.forEach(file => {
  zip.file(file, fs.readFileSync(path.join(__dirname, '..', file), 'utf8'))
})

const data = zip.generate({ base64: false, compression: 'DEFLATE' })
fs.writeFileSync(path.join(__dirname, '..', 'octotask-ui.zip'), data, 'binary')
console.log('📦 Your package has been delivered!')
