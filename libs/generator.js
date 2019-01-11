const getScriptHeader = (filename) => `  Link: </${filename}>; rel=preload; as=script`
const getCssHeader = (filename) => `  Link: </${filename}>; rel=preload; as=style`

const getHeadersFile = (items, headers) => {
  Object.keys(items).forEach(key => {
    const fileName = items[key]
    if (/.js$/.test(key)) {
      if (/.chunk.js$/.test(key)) return
      headers.push(getScriptHeader(fileName))
    } else if(/.css$/.test(key)) {
      headers.push(getCssHeader(fileName))
    }
  })
  return headers
}

const generateHeadersFile = (items, headers) => {
  const lists = getHeadersFile(items, headers)
  const header = Array.from(new Set(lists))
  return header.join('\n')
}

const getFilePath = (path, fileName) => {
  if (!path) return fileName
  const items = [path, fileName.replace(/^.\//, '')]
  const filePath = items.join('/')
  const filtered = filePath.replace(/\/\//, '/')
  return filtered.replace(/\/\//, '/')
}

module.exports = {
  generateHeadersFile,
  getCssHeader,
  getScriptHeader,
  getHeadersFile,
  getFilePath
}