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
  describe('normal', () => {
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
  Link: </static/js/main.e38f9055.js>; rel=preload; as=script`)
    })
  })

  describe('dynamic import', () => {
    const items = {
      "main.css": "static/css/main.8311bcb9.css",
      "main.css.map": "static/css/main.8311bcb9.css.map",
      "main.js": "static/js/main.e38f9055.js",
      "main.js.map": "static/js/main.e38f9055.js.map",
      "static/js/0.1064b14a.chunk.js": "static/js/0.1064b14a.chunk.js",
      "static/js/0.1064b14a.chunk.js.map": "static/js/0.1064b14a.chunk.js.map",
      "static/js/1.4fdd8c41.chunk.js": "static/js/1.4fdd8c41.chunk.js",
      "static/js/1.4fdd8c41.chunk.js.map": "static/js/1.4fdd8c41.chunk.js.map",
      "static/js/10.1da5b362.chunk.js": "static/js/10.1da5b362.chunk.js",
      "static/js/10.1da5b362.chunk.js.map": "static/js/10.1da5b362.chunk.js.map",
      "static/js/11.b6a9ca57.chunk.js": "static/js/11.b6a9ca57.chunk.js",
      "static/js/11.b6a9ca57.chunk.js.map": "static/js/11.b6a9ca57.chunk.js.map",
      "static/js/12.e61ee5ea.chunk.js": "static/js/12.e61ee5ea.chunk.js",
      "static/js/12.e61ee5ea.chunk.js.map": "static/js/12.e61ee5ea.chunk.js.map",
      "static/js/13.2abb875e.chunk.js": "static/js/13.2abb875e.chunk.js",
      "static/js/13.2abb875e.chunk.js.map": "static/js/13.2abb875e.chunk.js.map",
      "static/js/14.dca81e21.chunk.js": "static/js/14.dca81e21.chunk.js",
      "static/js/14.dca81e21.chunk.js.map": "static/js/14.dca81e21.chunk.js.map",
      "static/js/15.5bfa56be.chunk.js": "static/js/15.5bfa56be.chunk.js"
    }
    const headers = [
      '/*',
      '  Link: </service-worker.js>; rel=preload; as=script'
      ]
    it('should return header string without chunk file', () => {
      const result = generateHeadersFile(items, headers)
      assert.equal(result, `/*
  Link: </service-worker.js>; rel=preload; as=script
  Link: </static/css/main.8311bcb9.css>; rel=preload; as=style
  Link: </static/js/main.e38f9055.js>; rel=preload; as=script`)
    })
  })
})