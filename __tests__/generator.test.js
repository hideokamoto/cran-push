const assert = require('power-assert')
const {
  generateHeadersFile,
  getCssHeader,
  getScriptHeader,
  getFilePath
} = require('../libs/generator')

describe('getFilePath', () => {
  it('should return valid path', () => {
    const path = getFilePath('build', 'index.js')
    assert.equal(path, 'build/index.js')
  })
  it('should return valid path', () => {
    const path = getFilePath('build/', 'index.js')
    assert.equal(path, 'build/index.js')
  })
  it('should return valid path', () => {
    const path = getFilePath('build/', './index.js')
    assert.equal(path, 'build/index.js')
  })
  it('should return valid path', () => {
    const path = getFilePath('build/', '/index.js')
    assert.equal(path, 'build/index.js')
  })
  it('should return valid path', () => {
    const path = getFilePath('./build', 'index.js')
    assert.equal(path, './build/index.js')
  })
})
describe('getCssHeader', () => {
  it('should return header string', () => {
    const result = getCssHeader('hoge.css')
    assert.equal(result, '  Link: </hoge.css>; rel=preload; as=style')
  })
})


describe('getScriptHeader', () => {
  it('should return header string', () => {
    const result = getScriptHeader('hoge.js')
    assert.equal(result, '  Link: </hoge.js>; rel=preload; as=script')
  })
})


describe('generateHeadersFile', () => {
  const items = {
    "main.css": "static/css/main.8311bcb9.css",
    "main.css.map": "static/css/main.8311bcb9.css.map",
    "main.js": "static/js/main.e38f9055.js",
    "main.js.map": "static/js/main.e38f9055.js.map"
  }
  const headers = [
    '/*',
    '  Link: </service-worker.js>; rel=preload; as=script'
    ]
  it('should return header string', () => {
    const result = generateHeadersFile(items, headers)
    assert.equal(result, `/*
  Link: </service-worker.js>; rel=preload; as=script
  Link: </static/css/main.8311bcb9.css>; rel=preload; as=style
  Link: </static/css/main.8311bcb9.css.map>; rel=preload; as=style
  Link: </static/js/main.e38f9055.js>; rel=preload; as=script
  Link: </static/js/main.e38f9055.js.map>; rel=preload; as=style`)
  })
})